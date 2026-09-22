import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnvConfig } from "@next/env";
import * as XLSX from "xlsx";

import { certificateGenerator } from "../src/certificates/generator/CertificateGenerator";
import type { CertificateType } from "../src/certificates/types/certificate";
import { buildStoragePath } from "../src/certificates/utils/buildStoragePath";
import { normalizeDocument } from "../src/certificates/utils/normalizeDocument";
import type { Database } from "../types/database.types";

type RegistrationInsert = Database["public"]["Tables"]["registrations"]["Insert"];
type AttendanceInsert = Database["public"]["Tables"]["attendances"]["Insert"];
type CertificateInsert = Database["public"]["Tables"]["certificates"]["Insert"];

interface Arguments {
  input: string;
  overrides?: string;
  eventId: string;
  type: CertificateType;
  minAttendance: number;
  output: string;
  upload: boolean;
  prepareOnly: boolean;
  pdfOnly: boolean;
  limit?: number;
}

interface Participant {
  sourceRow: number;
  fullName: string;
  document: string;
  email: string;
  occupation: string;
  city: string;
  attendanceCount: number;
  forcedPresencial: boolean;
  overrideReason: string;
}

interface RejectedParticipant extends Participant { reason: string }
interface WarningParticipant extends Participant { warning: string }

const PROJECT_ROOT = process.cwd();

function parseArguments(values: string[]): Arguments {
  const flags = new Map<string, string>();
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) continue;
    if (["--upload", "--prepare-only", "--pdf-only"].includes(value)) {
      flags.set(value.slice(2), "true");
      continue;
    }
    const nextValue = values[index + 1];
    if (!nextValue || nextValue.startsWith("--")) throw new Error(`Falta el valor de ${value}.`);
    flags.set(value.slice(2), nextValue);
    index += 1;
  }

  const input = flags.get("input");
  const eventId = flags.get("event-id");
  const type = flags.get("type");
  const minAttendance = Number(flags.get("min-attendance") ?? "3");
  const limitValue = flags.get("limit");

  if (!input || !eventId || (type !== "presencial" && type !== "virtual")) {
    throw new Error(
      "Uso: npm run certificates:batch -- --input archivo.csv --event-id UUID --type presencial|virtual --min-attendance 3 [--upload] [--limit N]"
    );
  }
  if (!Number.isInteger(minAttendance) || minAttendance < 0) {
    throw new Error("--min-attendance debe ser un entero mayor o igual a cero.");
  }

  const limit = limitValue ? Number(limitValue) : undefined;
  const prepareOnly = flags.get("prepare-only") === "true";
  const pdfOnly = flags.get("pdf-only") === "true";
  if (prepareOnly && pdfOnly) throw new Error("--prepare-only y --pdf-only no se pueden usar juntos.");
  if (flags.get("upload") === "true" && (prepareOnly || pdfOnly)) {
    throw new Error("--upload requiere la ejecución completa, sin --prepare-only ni --pdf-only.");
  }
  if (flags.get("upload") === "true" && limit !== undefined) {
    throw new Error("--limit es solo para pruebas locales y no se puede combinar con --upload.");
  }
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
    throw new Error("--limit debe ser un entero mayor que cero.");
  }

  return {
    input: path.resolve(input),
    overrides: flags.get("overrides") ? path.resolve(flags.get("overrides")!) : undefined,
    eventId,
    type,
    minAttendance,
    output: path.resolve(flags.get("output") ?? path.join("output", "certificates", eventId, type)),
    upload: flags.get("upload") === "true",
    prepareOnly,
    pdfOnly,
    limit,
  };
}

function repairMojibake(value: unknown): string {
  let result = String(value ?? "").trim();
  if (/[ÃÂ]|ï»¿/.test(result)) result = Buffer.from(result, "latin1").toString("utf8");
  // Dos nombres del archivo fuente contienen U+0090 donde claramente corresponde É.
  // Se corrige después de deshacer la doble codificación del CSV exportado por Excel.
  return result
    .replace(/\u0090/g, "É")
    .replace(/^\uFEFF/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value: string): string {
  return repairMojibake(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function readParticipants(csvBuffer: Buffer): Participant[] {
  const workbook = XLSX.read(csvBuffer.toString("utf8"), { type: "string" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "", raw: false });
  return rows.map((row, index) => {
    const normalizedRow = Object.fromEntries(
      Object.entries(row).map(([key, value]) => [normalizeHeader(key), repairMojibake(value)])
    );
    return {
      sourceRow: index + 2,
      fullName: normalizedRow["nombre completo"],
      document: normalizeDocument(normalizedRow.documento),
      email: normalizedRow.email.toLowerCase(),
      occupation: normalizedRow.ocupacion,
      city: normalizedRow.sede,
      attendanceCount: Number(normalizedRow["total asistencias"]),
      forcedPresencial: false,
      overrideReason: "",
    };
  });
}

function readOverrides(csvBuffer: Buffer): Participant[] {
  const workbook = XLSX.read(csvBuffer.toString("utf8"), { type: "string" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "", raw: false });
  return rows.map((row, index) => {
    const normalizedRow = Object.fromEntries(
      Object.entries(row).map(([key, value]) => [normalizeHeader(key), repairMojibake(value)])
    );
    return {
      sourceRow: index + 2,
      fullName: normalizedRow["nombre completo"],
      document: normalizeDocument(normalizedRow.documento),
      email: normalizedRow.email.toLowerCase(),
      occupation: normalizedRow.ocupacion,
      city: normalizedRow.sede || "pasto presencial",
      attendanceCount: 0,
      forcedPresencial: true,
      overrideReason: normalizedRow.motivo || "Excepción presencial autorizada",
    };
  });
}

function prepareRegistrants(participants: Participant[]): {
  registrants: Participant[];
  rejected: RejectedParticipant[];
  warnings: WarningParticipant[];
} {
  const rejected: RejectedParticipant[] = [];
  const warnings: WarningParticipant[] = [];
  const valid: Participant[] = [];
  for (const participant of participants) {
    let reason = "";
    if (!participant.fullName) reason = "Nombre vacío";
    else if (!participant.document) reason = "Documento vacío";
    else if (!Number.isInteger(participant.attendanceCount)) reason = "Total de asistencias inválido";
    if (reason) {
      rejected.push({ ...participant, reason });
      continue;
    }
    if (!participant.email || !participant.email.includes("@")) {
      warnings.push({ ...participant, warning: "Email vacío o con formato inválido; revisar" });
    }
    valid.push(participant);
  }

  const byDocument = new Map<string, Participant>();
  for (const participant of valid) {
    const previous = byDocument.get(participant.document);
    if (!previous) {
      byDocument.set(participant.document, participant);
      continue;
    }
    const keepCurrent = participant.forcedPresencial || (
      !previous.forcedPresencial && participant.attendanceCount > previous.attendanceCount
    );
    const discarded = keepCurrent ? previous : participant;
    const kept = keepCurrent ? participant : previous;
    rejected.push({
      ...discarded,
      reason: `Documento duplicado; se conservó la fila ${kept.sourceRow}${
        kept.forcedPresencial ? " por excepción presencial" : ` con ${kept.attendanceCount} asistencias`
      }`,
    });
    if (keepCurrent) byDocument.set(participant.document, participant);
  }
  return { registrants: [...byDocument.values()], rejected, warnings };
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

async function writeCsvFiles(
  options: Arguments,
  registrants: Participant[],
  eligible: Participant[],
  pendingVirtual: Participant[],
  rejected: RejectedParticipant[],
  warnings: WarningParticipant[]
) {
  const generatedAt = new Date().toISOString();
  const registrationRows = registrants.map((participant) => ({
    full_name: participant.fullName,
    document: participant.document,
    email: participant.email,
    event_id: options.eventId,
    city: participant.city,
    occupation: participant.occupation,
    source: participant.forcedPresencial ? "excepcion_presencial" : "registro_presencial",
  }));
  const attendanceRows = eligible.map((participant) => ({
    full_name: participant.fullName,
    document: participant.document,
    email: participant.email,
    event_id: options.eventId,
    source: options.type,
    attendances_type: options.type === "presencial" ? "presential" : "virtual",
  }));
  const certificateRows = eligible.map((participant) => ({
    event_id: options.eventId,
    document: participant.document,
    generated: true,
    storage_path: buildStoragePath(options.eventId, participant.document, options.type),
    generated_at: generatedAt,
    download_count: 0,
    certificate_type: options.type === "presencial" ? "presential" : "virtual",
  }));
  const manifestRows = eligible.map((participant) => ({
    ...participant,
    eventId: options.eventId,
    certificateType: options.type,
    status: "certificado_presencial_generado",
    forcedPresencial: participant.forcedPresencial,
    overrideReason: participant.overrideReason,
    storagePath: buildStoragePath(options.eventId, participant.document, options.type),
  }));
  const pendingRows = pendingVirtual.map((participant) => ({
    ...participant,
    eventId: options.eventId,
    status: "pendiente_formulario_virtual",
    nextAction: "Aprobar formulario y crear attendance con source=virtual",
  }));

  await Promise.all([
    writeFile(path.join(options.output, "registrations-supabase.csv"), toCsv(
      ["full_name", "document", "email", "event_id", "city", "occupation", "source"], registrationRows
    ), "utf8"),
    writeFile(path.join(options.output, "attendances-supabase.csv"), toCsv(
      ["full_name", "document", "email", "event_id", "source", "attendances_type"], attendanceRows
    ), "utf8"),
    writeFile(path.join(options.output, "certificates-supabase.csv"), toCsv(
      ["event_id", "document", "generated", "storage_path", "generated_at", "download_count", "certificate_type"], certificateRows
    ), "utf8"),
    writeFile(path.join(options.output, "manifest.csv"), toCsv(
      ["sourceRow", "fullName", "document", "email", "occupation", "city", "attendanceCount", "eventId", "certificateType", "status", "forcedPresencial", "overrideReason", "storagePath"], manifestRows
    ), "utf8"),
    writeFile(path.join(options.output, "pending-virtual.csv"), toCsv(
      ["sourceRow", "fullName", "document", "email", "occupation", "city", "attendanceCount", "eventId", "status", "nextAction"], pendingRows
    ), "utf8"),
    writeFile(path.join(options.output, "rejected.csv"), toCsv(
      ["sourceRow", "fullName", "document", "email", "occupation", "city", "attendanceCount", "reason"], rejected
    ), "utf8"),
    writeFile(path.join(options.output, "data-warnings.csv"), toCsv(
      ["sourceRow", "fullName", "document", "email", "occupation", "city", "attendanceCount", "warning"], warnings
    ), "utf8"),
  ]);
  return { registrationRows, attendanceRows, certificateRows };
}

async function uploadToSupabase(
  options: Arguments,
  eligible: Participant[],
  registrationRows: RegistrationInsert[],
  attendanceRows: AttendanceInsert[],
  certificateRows: CertificateInsert[]
) {
  loadEnvConfig(PROJECT_ROOT);
  const { adminClient } = await import("../utils/supabase/admin");

  async function syncRegistrations(rows: RegistrationInsert[]) {
    const { data, error } = await adminClient
      .from("registrations")
      .select("id,document")
      .eq("event_id", options.eventId);
    if (error) throw error;
    const existing = new Map(data.map((row) => [row.document, row.id]));
    const missing = rows.filter((row) => !existing.has(row.document));
    for (let index = 0; index < missing.length; index += 250) {
      const result = await adminClient.from("registrations").insert(missing.slice(index, index + 250));
      if (result.error) throw result.error;
    }
    for (const row of rows.filter((item) => existing.has(item.document))) {
      const result = await adminClient
        .from("registrations")
        .update(row)
        .eq("id", existing.get(row.document)!);
      if (result.error) throw result.error;
    }
  }

  async function syncCertificates(rows: CertificateInsert[]) {
    const { data, error } = await adminClient
      .from("certificates")
      .select("id,document")
      .eq("event_id", options.eventId);
    if (error) throw error;
    const existing = new Map(data.map((row) => [row.document, row.id]));
    const missing = rows.filter((row) => !existing.has(row.document));
    for (let index = 0; index < missing.length; index += 250) {
      const result = await adminClient.from("certificates").insert(missing.slice(index, index + 250));
      if (result.error) throw result.error;
    }
    for (const row of rows.filter((item) => existing.has(item.document))) {
      const result = await adminClient
        .from("certificates")
        .update(row)
        .eq("id", existing.get(row.document)!);
      if (result.error) throw result.error;
    }
  }

  async function syncAttendances(rows: AttendanceInsert[]) {
    const { data, error } = await adminClient
      .from("attendances")
      .select("id,document")
      .eq("event_id", options.eventId);
    if (error) throw error;
    const existing = new Map(data.map((row) => [row.document, row.id]));
    const missing = rows.filter((row) => !existing.has(row.document));
    for (let index = 0; index < missing.length; index += 250) {
      const result = await adminClient.from("attendances").insert(missing.slice(index, index + 250));
      if (result.error) throw result.error;
    }
    for (const row of rows.filter((item) => existing.has(item.document))) {
      const result = await adminClient
        .from("attendances")
        .update(row)
        .eq("id", existing.get(row.document)!);
      if (result.error) throw result.error;
    }
  }

  await syncRegistrations(registrationRows);

  for (const participant of eligible) {
    const storagePath = buildStoragePath(options.eventId, participant.document, options.type);
    const pdf = await readFile(path.join(options.output, "pdf", `${participant.document}.pdf`));
    const { error } = await adminClient.storage
      .from("certificates")
      .upload(storagePath, pdf, { contentType: "application/pdf", upsert: true });
    if (error) throw error;
  }

  // Se registra el certificado antes de habilitar la asistencia para evitar que el
  // formulario público pueda crear uno virtual durante una carga incompleta.
  await syncCertificates(certificateRows);
  await syncAttendances(attendanceRows);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const sourceParticipants = readParticipants(await readFile(options.input));
  const overrides = options.overrides
    ? readOverrides(await readFile(options.overrides))
    : [];
  const participants = [...sourceParticipants, ...overrides];
  const prepared = prepareRegistrants(participants);
  const allEligible = prepared.registrants.filter(
    (participant) => participant.forcedPresencial || participant.attendanceCount >= options.minAttendance
  );
  const pendingVirtual = prepared.registrants.filter(
    (participant) => !participant.forcedPresencial && participant.attendanceCount < options.minAttendance
  );
  const eligible = options.limit ? allEligible.slice(0, options.limit) : allEligible;

  await mkdir(options.output, { recursive: true });
  if (!options.prepareOnly) {
    await mkdir(path.join(options.output, "pdf"), { recursive: true });
    for (const participant of eligible) {
      const pdf = await certificateGenerator.generate({ fullName: participant.fullName, type: options.type });
      await writeFile(path.join(options.output, "pdf", `${participant.document}.pdf`), pdf);
    }
  }

  const csvRows = options.pdfOnly ? undefined : await writeCsvFiles(
    options,
    prepared.registrants,
    eligible,
    pendingVirtual,
    prepared.rejected,
    prepared.warnings
  );
  if (options.upload) {
    if (!csvRows) throw new Error("No se generaron los CSV requeridos para la carga.");
    await uploadToSupabase(
      options, eligible, csvRows.registrationRows, csvRows.attendanceRows, csvRows.certificateRows
    );
  }

  console.log(`Filas leídas del archivo principal: ${sourceParticipants.length}`);
  console.log(`Excepciones presenciales: ${overrides.length}`);
  console.log(`Registrados únicos preparados: ${prepared.registrants.length}`);
  console.log(`Elegibles presenciales (>= ${options.minAttendance}): ${allEligible.length}`);
  console.log(`Pendientes del formulario virtual: ${pendingVirtual.length}`);
  console.log(`Certificados generados: ${options.prepareOnly ? 0 : eligible.length}`);
  console.log(`Duplicados o filas inválidas: ${prepared.rejected.length}`);
  console.log(`Advertencias de datos: ${prepared.warnings.length}`);
  console.log(`Salida: ${options.output}`);
  console.log(options.upload ? "Carga a Supabase completada." : "No se realizaron cambios en Supabase.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
