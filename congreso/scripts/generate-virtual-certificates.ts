import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnvConfig } from "@next/env";
import * as XLSX from "xlsx";

import { certificateGenerator } from "../src/certificates/generator/CertificateGenerator";
import { buildStoragePath } from "../src/certificates/utils/buildStoragePath";
import { normalizeDocument } from "../src/certificates/utils/normalizeDocument";
import type { Database } from "../types/database.types";

type RegistrationInsert = Database["public"]["Tables"]["registrations"]["Insert"];
type CertificateInsert = Database["public"]["Tables"]["certificates"]["Insert"];

interface Options {
  virtualInput: string;
  presencialInput: string;
  overrides?: string;
  eventId: string;
  output: string;
  upload: boolean;
  prepareOnly: boolean;
  limit?: number;
}

interface Person {
  fullName: string;
  document: string;
  email: string;
  city: string;
  occupation: string;
  source: "registro_virtual" | "registro_presencial_pendiente_virtual";
  attendanceCount: number | null;
  sourceRow: number;
}

interface PresencialPerson extends Person {
  source: "registro_presencial_pendiente_virtual";
  attendanceCount: number;
}

const PROJECT_ROOT = process.cwd();

function parseOptions(args: string[]): Options {
  const flags = new Map<string, string>();
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--")) continue;
    if (key === "--upload" || key === "--prepare-only") {
      flags.set(key.slice(2), "true");
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Falta el valor de ${key}.`);
    flags.set(key.slice(2), value);
    index += 1;
  }

  const virtualInput = flags.get("virtual-input");
  const presencialInput = flags.get("presencial-input");
  const eventId = flags.get("event-id");
  const limitValue = flags.get("limit");
  if (!virtualInput || !presencialInput || !eventId) {
    throw new Error(
      "Uso: npm run certificates:virtual-batch -- --virtual-input registro.xlsx --presencial-input asistentes.csv --event-id UUID [--overrides archivo.csv] [--prepare-only] [--upload]"
    );
  }
  const limit = limitValue ? Number(limitValue) : undefined;
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
    throw new Error("--limit debe ser un entero mayor que cero.");
  }
  if (flags.get("upload") === "true" && (flags.get("prepare-only") === "true" || limit)) {
    throw new Error("--upload no se puede combinar con --prepare-only ni --limit.");
  }

  return {
    virtualInput: path.resolve(virtualInput),
    presencialInput: path.resolve(presencialInput),
    overrides: flags.get("overrides") ? path.resolve(flags.get("overrides")!) : undefined,
    eventId,
    output: path.resolve(
      flags.get("output") ?? path.join("output", "certificates", eventId, "virtual")
    ),
    upload: flags.get("upload") === "true",
    prepareOnly: flags.get("prepare-only") === "true",
    limit,
  };
}

function repairMojibake(value: unknown): string {
  let result = String(value ?? "").replace(/^\uFEFF/, "").trim();
  if (/[ÃÂ]|ï»¿/.test(result)) result = Buffer.from(result, "latin1").toString("utf8");
  return result.replace(/\u0090/g, "É").replace(/\s+/g, " ").trim();
}

function normalizeHeader(value: unknown): string {
  return repairMojibake(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeRow(row: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [normalizeHeader(key), repairMojibake(value)])
  );
}

function valueFrom(row: Record<string, string>, names: string[]): string {
  for (const name of names) {
    const value = row[normalizeHeader(name)];
    if (value) return value;
  }
  return "";
}

function repairVirtualName(value: string): string {
  const replacements: Record<string, string> = {
    A: "á",
    E: "é",
    I: "í",
    O: "ó",
    U: "ú",
  };
  return value.replace(/(?<=[a-zñ])[AEIOU](?=[a-zñ])/g, (letter) => replacements[letter]);
}

function readSheet(buffer: Buffer, format: "xlsx" | "csv" = "xlsx"): Record<string, string>[] {
  const workbook = format === "csv"
    ? XLSX.read(buffer.toString("utf8"), { type: "string" })
    : XLSX.read(buffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils
    .sheet_to_json<Record<string, unknown>>(worksheet, { defval: "", raw: false })
    .map(normalizeRow);
}

function readDocument(value: string): string {
  const document = normalizeDocument(value);
  return ["NA", "NAN", "NINGUNO", "SINDOCUMENTO"].includes(document) ? "" : document;
}

function readVirtualPeople(buffer: Buffer): { people: Map<string, Person>; warnings: string[] } {
  const rows = readSheet(buffer);
  const people = new Map<string, Person>();
  const warnings: string[] = [];
  rows.forEach((row, index) => {
    const document = readDocument(
      valueFrom(row, ["Número de cédula", "Numero de cedula", "Documento"])
    );
    const fullName = repairVirtualName(valueFrom(row, ["Nombre completo", "Nombre"]));
    const email = valueFrom(row, ["Correo electrónico2", "Correo electronico2", "Correo electrónico"])
      .toLowerCase();
    if (!document) {
      warnings.push(`Fila virtual ${index + 2}: documento vacío.`);
      return;
    }
    const previous = people.get(document);
    people.set(document, {
      fullName: fullName || previous?.fullName || "",
      document,
      email: email.includes("@") ? email : previous?.email || email,
      city: previous?.city || "virtual",
      occupation: previous?.occupation || "",
      source: "registro_virtual",
      attendanceCount: null,
      sourceRow: index + 2,
    });
  });
  return { people, warnings };
}

function readPresencialPeople(buffer: Buffer): Map<string, PresencialPerson> {
  const rows = readSheet(buffer, "csv");
  const people = new Map<string, PresencialPerson>();
  rows.forEach((row, index) => {
    const document = readDocument(valueFrom(row, ["Documento"]));
    const attendanceCount = Number(valueFrom(row, ["Total asistencias"]));
    if (!document || !Number.isInteger(attendanceCount)) return;
    const person: PresencialPerson = {
      fullName: valueFrom(row, ["Nombre completo"]),
      document,
      email: valueFrom(row, ["Email", "Correo electrónico"]).toLowerCase(),
      city: valueFrom(row, ["Sede"]) || "pasto presencial",
      occupation: valueFrom(row, ["Ocupación", "Ocupacion"]),
      source: "registro_presencial_pendiente_virtual",
      attendanceCount,
      sourceRow: index + 2,
    };
    const previous = people.get(document);
    if (!previous || attendanceCount > previous.attendanceCount) people.set(document, person);
  });
  return people;
}

function readOverrideDocuments(buffer: Buffer): Set<string> {
  return new Set(
    readSheet(buffer, "csv")
      .map((row) => readDocument(valueFrom(row, ["Documento"])))
      .filter(Boolean)
  );
}

function escapeCsv(value: unknown): string {
  const content = String(value ?? "");
  return /[",\r\n]/.test(content) ? `"${content.replace(/"/g, '""')}"` : content;
}

function toCsv<T extends object>(headers: string[], rows: T[]): string {
  return `${[
    headers.join(","),
    ...rows.map((row) => {
      const record = row as Record<string, unknown>;
      return headers.map((header) => escapeCsv(record[header])).join(",");
    }),
  ].join("\n")}\n`;
}

async function writeOutputs(options: Options, people: Person[], excluded: Person[], warnings: string[]) {
  const generatedAt = new Date().toISOString();
  const registrationRows: RegistrationInsert[] = people.map((person) => ({
    full_name: person.fullName,
    document: person.document,
    email: person.email,
    event_id: options.eventId,
    city: person.city,
    occupation: person.occupation,
    source: person.source,
  }));
  const certificateRows: CertificateInsert[] = people.map((person) => ({
    event_id: options.eventId,
    document: person.document,
    generated: true,
    storage_path: buildStoragePath(options.eventId, person.document, "virtual"),
    generated_at: generatedAt,
    download_count: 0,
    certificate_type: "virtual",
  }));
  const manifest = people.map((person) => ({
    ...person,
    eventId: options.eventId,
    certificateType: "virtual",
    status: "pregenerado_bloqueado",
    storagePath: buildStoragePath(options.eventId, person.document, "virtual"),
  }));
  await Promise.all([
    writeFile(
      path.join(options.output, "registrations-supabase.csv"),
      toCsv(
        ["full_name", "document", "email", "event_id", "city", "occupation", "source"],
        registrationRows
      ),
      "utf8"
    ),
    writeFile(
      path.join(options.output, "certificates-supabase.csv"),
      toCsv(
        ["event_id", "document", "generated", "storage_path", "generated_at", "download_count", "certificate_type"],
        certificateRows
      ),
      "utf8"
    ),
    writeFile(
      path.join(options.output, "manifest.csv"),
      toCsv(
        ["fullName", "document", "email", "city", "occupation", "source", "attendanceCount", "sourceRow", "eventId", "certificateType", "status", "storagePath"],
        manifest
      ),
      "utf8"
    ),
    writeFile(
      path.join(options.output, "excluded-presential.csv"),
      toCsv(
        ["fullName", "document", "email", "source", "attendanceCount", "sourceRow"],
        excluded
      ),
      "utf8"
    ),
    writeFile(
      path.join(options.output, "data-warnings.txt"),
      warnings.length ? `${warnings.join("\n")}\n` : "Sin advertencias.\n",
      "utf8"
    ),
  ]);
  return { registrationRows, certificateRows };
}

async function uploadToSupabase(
  options: Options,
  people: Person[],
  registrationRows: RegistrationInsert[],
  certificateRows: CertificateInsert[]
) {
  loadEnvConfig(PROJECT_ROOT);
  const { adminClient } = await import("../utils/supabase/admin");

  const { data: existingRegistrations, error: registrationError } = await adminClient
    .from("registrations")
    .select("id,document")
    .eq("event_id", options.eventId);
  if (registrationError) throw registrationError;
  const registrationIds = new Map<string, string>();
  existingRegistrations.forEach((row) => registrationIds.set(row.document, row.id));
  const missingRegistrations = registrationRows.filter((row) => !registrationIds.has(row.document));
  for (let index = 0; index < missingRegistrations.length; index += 250) {
    const result = await adminClient.from("registrations").insert(missingRegistrations.slice(index, index + 250));
    if (result.error) throw result.error;
  }
  for (const row of registrationRows.filter((item) => registrationIds.has(item.document))) {
    const result = await adminClient
      .from("registrations")
      .update(row)
      .eq("id", registrationIds.get(row.document)!);
    if (result.error) throw result.error;
  }

  for (let index = 0; index < people.length; index += 8) {
    await Promise.all(
      people.slice(index, index + 8).map(async (person) => {
        const storagePath = buildStoragePath(options.eventId, person.document, "virtual");
        const pdf = await readFile(path.join(options.output, "pdf", `${person.document}.pdf`));
        const { error } = await adminClient.storage
          .from("certificates")
          .upload(storagePath, pdf, { contentType: "application/pdf", upsert: true });
        if (error) throw error;
      })
    );
  }

  const documents = people.map((person) => person.document);
  const existingCertificates = new Map<string, { id: string; event_id: string }>();
  for (let index = 0; index < documents.length; index += 100) {
    const { data, error } = await adminClient
      .from("certificates")
      .select("id,document,event_id")
      .in("document", documents.slice(index, index + 100));
    if (error) throw error;
    data.forEach((row) => existingCertificates.set(row.document, { id: row.id, event_id: row.event_id }));
  }
  const otherEventConflict = people.find((person) => {
    const existing = existingCertificates.get(person.document);
    return existing && existing.event_id !== options.eventId;
  });
  if (otherEventConflict) {
    throw new Error(
      `Carga cancelada: el documento ${otherEventConflict.document} ya tiene un certificado de otro evento.`
    );
  }
  const missingCertificates = certificateRows.filter((row) => !existingCertificates.has(row.document));
  for (let index = 0; index < missingCertificates.length; index += 250) {
    const result = await adminClient.from("certificates").insert(missingCertificates.slice(index, index + 250));
    if (result.error) throw result.error;
  }
  for (const row of certificateRows.filter((item) => existingCertificates.has(item.document))) {
    const result = await adminClient
      .from("certificates")
      .update(row)
      .eq("id", existingCertificates.get(row.document)!.id);
    if (result.error) throw result.error;
  }
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const virtual = readVirtualPeople(await readFile(options.virtualInput));
  const presencial = readPresencialPeople(await readFile(options.presencialInput));
  const overrideDocuments = options.overrides
    ? readOverrideDocuments(await readFile(options.overrides))
    : new Set<string>();

  const presencialDocuments = new Set<string>(overrideDocuments);
  presencial.forEach((person, document) => {
    if (person.attendanceCount >= 3) presencialDocuments.add(document);
  });

  const candidates = new Map<string, Person>();
  virtual.people.forEach((person, document) => candidates.set(document, person));
  presencial.forEach((person, document) => {
    if (person.attendanceCount <= 2) candidates.set(document, person);
  });

  const excluded: Person[] = [];
  presencialDocuments.forEach((document) => {
    const person = candidates.get(document);
    if (person) {
      excluded.push(person);
      candidates.delete(document);
    }
  });

  const warnings = [...virtual.warnings];
  const valid = [...candidates.values()].filter((person) => {
    if (!person.fullName) {
      warnings.push(`Documento ${person.document}: nombre vacío; certificado omitido.`);
      return false;
    }
    if (!person.email.includes("@")) {
      warnings.push(`Documento ${person.document}: correo vacío o inválido; se conserva para revisión.`);
    }
    return true;
  });
  const people = options.limit ? valid.slice(0, options.limit) : valid;

  await mkdir(options.output, { recursive: true });
  if (!options.prepareOnly) {
    await mkdir(path.join(options.output, "pdf"), { recursive: true });
    for (const person of people) {
      const pdf = await certificateGenerator.generate({ fullName: person.fullName, type: "virtual" });
      await writeFile(path.join(options.output, "pdf", `${person.document}.pdf`), pdf);
    }
  }
  const rows = await writeOutputs(options, people, excluded, warnings);
  if (options.upload) {
    await uploadToSupabase(options, people, rows.registrationRows, rows.certificateRows);
  }

  console.log(`Registros únicos del Excel virtual: ${virtual.people.size}`);
  console.log(`Registros presenciales únicos: ${presencial.size}`);
  console.log(`Excluidos por prioridad presencial: ${excluded.length}`);
  console.log(`Certificados virtuales preparados: ${people.length}`);
  console.log(`Advertencias: ${warnings.length}`);
  console.log(`Salida: ${options.output}`);
  console.log(options.upload ? "Carga virtual a Supabase completada; no se habilitaron asistencias." : "No se realizaron cambios en Supabase.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
