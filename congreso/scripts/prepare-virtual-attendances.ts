import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnvConfig } from "@next/env";
import * as XLSX from "xlsx";

import { normalizeDocument } from "../src/certificates/utils/normalizeDocument";
import type { Database } from "../types/database.types";

type AttendanceInsert = Database["public"]["Tables"]["attendances"]["Insert"];

interface Options {
  input: string;
  pending: string;
  eventId: string;
  documentColumn: string;
  approvalColumn?: string;
  approvalValue?: string;
  output: string;
  upload: boolean;
}

interface PendingPerson {
  fullName: string;
  document: string;
  email: string;
}

function normalizeText(value: unknown): string {
  return String(value ?? "").replace(/^\uFEFF/, "").replace(/\s+/g, " ").trim();
}

function normalizeHeader(value: unknown): string {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseOptions(args: string[]): Options {
  const flags = new Map<string, string>();
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) continue;
    if (key === "--upload") {
      flags.set("upload", "true");
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Falta el valor de ${key}.`);
    flags.set(key.slice(2), value);
    index += 1;
  }

  const input = flags.get("input");
  const pending = flags.get("pending");
  const eventId = flags.get("event-id");
  const documentColumn = flags.get("document-column");
  const approvalColumn = flags.get("approval-column");
  const approvalValue = flags.get("approval-value");
  if (!input || !pending || !eventId || !documentColumn) {
    throw new Error(
      "Uso: npm run certificates:virtual -- --input respuestas.xlsx --pending pending-virtual.csv --event-id UUID --document-column Documento [--approval-column Resultado --approval-value Aprobado] [--upload]"
    );
  }
  if (Boolean(approvalColumn) !== Boolean(approvalValue)) {
    throw new Error("--approval-column y --approval-value deben usarse juntos.");
  }
  return {
    input: path.resolve(input),
    pending: path.resolve(pending),
    eventId,
    documentColumn,
    approvalColumn,
    approvalValue,
    output: path.resolve(flags.get("output") ?? "output/virtual-attendances"),
    upload: flags.get("upload") === "true",
  };
}

function readRows(buffer: Buffer): Record<string, string>[] {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "", raw: false })
    .map((row) => Object.fromEntries(
      Object.entries(row).map(([key, value]) => [normalizeHeader(key), normalizeText(value)])
    ));
}

function csv(headers: string[], rows: Array<Record<string, unknown>>): string {
  const escape = (value: unknown) => {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return `${[headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n")}\n`;
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const pendingRows = readRows(await readFile(options.pending));
  const pending = new Map<string, PendingPerson>();
  for (const row of pendingRows) {
    const document = normalizeDocument(row.document);
    if (document) {
      pending.set(document, {
        fullName: row.fullname,
        document,
        email: row.email,
      });
    }
  }

  const responseRows = readRows(await readFile(options.input));
  const documentHeader = normalizeHeader(options.documentColumn);
  const approvalHeader = options.approvalColumn
    ? normalizeHeader(options.approvalColumn)
    : undefined;
  const expectedApproval = normalizeHeader(options.approvalValue);
  const accepted = new Map<string, AttendanceInsert>();
  const rejected: Array<Record<string, unknown>> = [];

  responseRows.forEach((row, index) => {
    const document = normalizeDocument(row[documentHeader]);
    if (!document) {
      rejected.push({ responseRow: index + 2, document: "", reason: "Documento vacío" });
      return;
    }
    if (approvalHeader && normalizeHeader(row[approvalHeader]) !== expectedApproval) {
      rejected.push({ responseRow: index + 2, document, reason: "Respuesta no aprobada" });
      return;
    }
    const person = pending.get(document);
    if (!person) {
      rejected.push({ responseRow: index + 2, document, reason: "No está en pending-virtual.csv" });
      return;
    }
    if (accepted.has(document)) {
      rejected.push({ responseRow: index + 2, document, reason: "Respuesta duplicada" });
      return;
    }
    accepted.set(document, {
      full_name: person.fullName,
      document,
      email: person.email,
      event_id: options.eventId,
      source: "virtual",
      attendances_type: "virtual",
    });
  });

  const attendanceRows = [...accepted.values()];
  await mkdir(options.output, { recursive: true });
  await Promise.all([
    writeFile(
      path.join(options.output, "attendances-virtual-supabase.csv"),
      csv(["full_name", "document", "email", "event_id", "source", "attendances_type"], attendanceRows),
      "utf8"
    ),
    writeFile(
      path.join(options.output, "rejected-virtual-responses.csv"),
      csv(["responseRow", "document", "reason"], rejected),
      "utf8"
    ),
  ]);

  if (options.upload && attendanceRows.length > 0) {
    loadEnvConfig(process.cwd());
    const { adminClient } = await import("../utils/supabase/admin");
    const documents = attendanceRows.map((row) => String(row.document));
    const existingAttendances = new Map<string, { id: string; source: string }>();
    for (let index = 0; index < documents.length; index += 100) {
      const { data, error } = await adminClient
        .from("attendances")
        .select("id,document,source")
        .eq("event_id", options.eventId)
        .in("document", documents.slice(index, index + 100));
      if (error) throw error;
      data.forEach((row) => existingAttendances.set(row.document, { id: row.id, source: row.source }));
    }
    const conflict = attendanceRows.find(
      (row) => existingAttendances.get(String(row.document))?.source === "presencial"
    );
    if (conflict) {
      throw new Error(`Carga cancelada: ${conflict.document} ya tiene asistencia presencial.`);
    }
    const missing = attendanceRows.filter((row) => !existingAttendances.has(row.document));
    for (let index = 0; index < missing.length; index += 250) {
      const result = await adminClient.from("attendances").insert(missing.slice(index, index + 250));
      if (result.error) throw result.error;
    }
    for (const row of attendanceRows.filter((item) => existingAttendances.has(item.document))) {
      const result = await adminClient
        .from("attendances")
        .update(row)
        .eq("id", existingAttendances.get(row.document)!.id);
      if (result.error) throw result.error;
    }
  }

  console.log(`Respuestas leídas: ${responseRows.length}`);
  console.log(`Habilitaciones virtuales preparadas: ${attendanceRows.length}`);
  console.log(`Respuestas rechazadas: ${rejected.length}`);
  console.log(options.upload ? "Carga virtual a Supabase completada." : "No se realizaron cambios en Supabase.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
