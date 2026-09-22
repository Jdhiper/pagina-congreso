import { createClient } from "npm:@supabase/supabase-js@2.110.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      ...corsHeaders,
      "Cache-Control": "no-store",
    },
  });
}

function normalizeDocument(value: unknown): string {
  return typeof value === "string"
    ? value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
    : "";
}

function normalizeName(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFC").trim().replace(/\s+/g, " ")
    : "";
}

function isValidName(value: string): boolean {
  return (
    value.length >= 3 &&
    value.length <= 120 &&
    /^[\p{L}\p{M}.'’\- ]+$/u.test(value)
  );
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const document = normalizeDocument(body.document);
  const correctedName = normalizeName(body.correctedName);

  if (document.length < 5 || document.length > 40) {
    return json({ ok: false, error: "invalid_document" }, 400);
  }

  if (!isValidName(correctedName)) {
    return json({ ok: false, error: "invalid_name" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: certificates, error: certificateError } = await supabase
    .from("certificates")
    .select("id,event_id,generated,storage_path")
    .eq("document", document)
    .limit(2);

  if (certificateError) {
    return json({ ok: false, error: "certificate_lookup_failed" }, 500);
  }

  if (!certificates?.length) {
    return json({ ok: false, error: "certificate_not_found" }, 404);
  }

  if (certificates.length > 1) {
    return json({ ok: false, error: "ambiguous_certificate" }, 409);
  }

  const certificate = certificates[0];
  if (!certificate.generated || !certificate.storage_path) {
    return json({ ok: false, error: "certificate_not_ready" }, 409);
  }

  const { data: attendance, error: attendanceError } = await supabase
    .from("attendances")
    .select("id")
    .eq("event_id", certificate.event_id)
    .eq("document", document)
    .maybeSingle();

  if (attendanceError) {
    return json({ ok: false, error: "attendance_lookup_failed" }, 500);
  }

  if (!attendance) {
    return json({ ok: false, error: "attendance_not_found" }, 409);
  }

  const { error: attendanceUpdateError } = await supabase
    .from("attendances")
    .update({ full_name: correctedName })
    .eq("id", attendance.id);

  if (attendanceUpdateError) {
    return json({ ok: false, error: "attendance_update_failed" }, 500);
  }

  const { error: registrationUpdateError } = await supabase
    .from("registrations")
    .update({ full_name: correctedName })
    .eq("event_id", certificate.event_id)
    .eq("document", document);

  if (registrationUpdateError) {
    return json({ ok: false, error: "registration_update_failed" }, 500);
  }

  const { error: certificateUpdateError } = await supabase
    .from("certificates")
    .update({
      generated: false,
      generated_at: null,
      storage_path: null,
    })
    .eq("id", certificate.id);

  if (certificateUpdateError) {
    return json({ ok: false, error: "certificate_update_failed" }, 500);
  }

  return json({
    ok: true,
    message: "Nombre corregido. El certificado se regenerará en la próxima consulta.",
  });
});
