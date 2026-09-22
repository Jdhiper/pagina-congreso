import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnvConfig } from "@next/env";

import { certificateGenerator } from "../src/certificates/generator/CertificateGenerator";
import { buildStoragePath } from "../src/certificates/utils/buildStoragePath";

const EVENT_ID = "ba74c6ac-d95a-4294-b6b7-60253ec0a3a9";
const TEST_USER = {
  document: "9999999998",
  full_name: "María Fernanda Ramírez Torres",
  email: "demostracion.certificado@example.invalid",
};

async function main() {
  loadEnvConfig(process.cwd());
  const { adminClient } = await import("../utils/supabase/admin");
  const registrations = [TEST_USER].map((person) => ({
    ...person,
    event_id: EVENT_ID,
    city: "prueba",
    occupation: "prueba automatización",
    source: "prueba_automatizacion",
  }));

  for (const registration of registrations) {
    const { data: existing, error: findError } = await adminClient
      .from("registrations")
      .select("id")
      .eq("event_id", EVENT_ID)
      .eq("document", registration.document)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (findError) throw findError;
    const result = existing
      ? await adminClient.from("registrations").update(registration).eq("id", existing.id)
      : await adminClient.from("registrations").insert(registration);
    if (result.error) throw result.error;
  }

  const storagePath = buildStoragePath(EVENT_ID, TEST_USER.document, "virtual");
  const pdf = await certificateGenerator.generate({
    fullName: TEST_USER.full_name,
    type: "virtual",
  });
  const outputDirectory = path.join("output", "certificates", EVENT_ID, "test-users");
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, `${TEST_USER.document}.pdf`), pdf);

  const upload = await adminClient.storage
    .from("certificates")
    .upload(storagePath, pdf, { contentType: "application/pdf", upsert: true });
  if (upload.error) throw upload.error;

  const { data: existingCertificate, error: certificateFindError } = await adminClient
    .from("certificates")
    .select("id")
    .eq("event_id", EVENT_ID)
    .eq("document", TEST_USER.document)
    .maybeSingle();
  if (certificateFindError) throw certificateFindError;
  const certificate = {
    event_id: EVENT_ID,
    document: TEST_USER.document,
    generated: true,
    generated_at: new Date().toISOString(),
    storage_path: storagePath,
    certificate_type: "virtual",
    download_count: 0,
  };
  const certificateResult = existingCertificate
    ? await adminClient.from("certificates").update(certificate).eq("id", existingCertificate.id)
    : await adminClient.from("certificates").insert(certificate);
  if (certificateResult.error) throw certificateResult.error;

  await adminClient
    .from("attendances")
    .delete()
    .eq("event_id", EVENT_ID)
    .eq("document", TEST_USER.document);

  console.log(`Usuario de prueba preparado y bloqueado: ${TEST_USER.document}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
