import { createClient } from "npm:@supabase/supabase-js@2.110.2";

const EVENT_ID = "ba74c6ac-d95a-4294-b6b7-60253ec0a3a9";
const EXPECTED_SECRET_HASH = "bf859f00dda7c297c346efb87cb07882f4240a70da6ee962a947be728704d490";

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function normalizeDocument(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
    : "";
}

function normalizeName(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleUpperCase("es-CO")
    : "";
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function collectDocumentCandidates(value: unknown, candidates = new Set<string>()): Set<string> {
  if (typeof value === "string") {
    const candidate = normalizeDocument(value);
    if (candidate.length >= 5 && candidate.length <= 40) candidates.add(candidate);
    return candidates;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectDocumentCandidates(item, candidates));
    return candidates;
  }
  if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) =>
      collectDocumentCandidates(item, candidates)
    );
  }
  return candidates;
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  const suppliedSecret = request.headers.get("x-automation-secret") ?? "";
  if (!suppliedSecret || !safeEqual(await sha256(suppliedSecret), EXPECTED_SECRET_HASH)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (body.eventId && body.eventId !== EVENT_ID) {
    return json({ ok: false, error: "invalid_event" }, 400);
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ ok: false, error: "server_misconfigured" }, 500);
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const explicitDocument = normalizeDocument(body.document);
  const documentCandidates = explicitDocument
    ? [explicitDocument]
    : [...collectDocumentCandidates(body)];
  if (!documentCandidates.length) return json({ ok: false, error: "document_required" }, 400);
  if (documentCandidates.length > 1) return json({ ok: false, error: "ambiguous_document" }, 409);
  const document = documentCandidates[0];
  const fullName = normalizeName(body.fullName ?? body.name);
  const email = normalizeText(body.email).toLowerCase();
  if (fullName.length < 3 || fullName.length > 160) {
    return json({ ok: false, error: "name_required" }, 400);
  }

  const { data: existing, error: attendanceError } = await supabase
    .from("attendances")
    .select("id,source,attendances_type")
    .eq("event_id", EVENT_ID)
    .eq("document", document)
    .maybeSingle();
  if (attendanceError) return json({ ok: false, error: "attendance_lookup_failed" }, 500);
  if (existing) {
    const isVirtual = existing.attendances_type === "virtual" || existing.source === "virtual";
    if (!isVirtual) return json({ ok: false, error: "presential_certificate_has_priority" }, 409);
  }

  const { data: existingCertificate, error: certificateError } = await supabase
    .from("certificates")
    .select("certificate_type")
    .eq("event_id", EVENT_ID)
    .eq("document", document)
    .maybeSingle();
  if (certificateError) return json({ ok: false, error: "certificate_lookup_failed" }, 500);
  if (existingCertificate?.certificate_type === "presential") {
    return json({ ok: false, error: "presential_certificate_has_priority" }, 409);
  }

  const { data: registrations, error: registrationError } = await supabase
    .from("registrations")
    .select("id")
    .eq("event_id", EVENT_ID)
    .eq("document", document)
    .order("created_at", { ascending: false })
    .limit(1);
  if (registrationError) return json({ ok: false, error: "registration_lookup_failed" }, 500);

  const registrationPayload = {
    event_id: EVENT_ID,
    document,
    full_name: fullName,
    email: email || null,
    city: "virtual",
    occupation: "participante virtual",
    source: "google_forms_virtual",
  };
  const registrationResult = registrations?.[0]
    ? await supabase.from("registrations").update(registrationPayload).eq("id", registrations[0].id)
    : await supabase.from("registrations").insert(registrationPayload);
  if (registrationResult.error) return json({ ok: false, error: "registration_save_failed" }, 500);

  const reflection = normalizeText(body.reflection);
  const question = normalizeText(body.question);
  const recommendation = normalizeText(body.recommendation);
  const { error: responseError } = await supabase.from("virtual_certificate_responses").insert({
    event_id: EVENT_ID,
    document,
    submitted_name: fullName,
    submitted_email: email || null,
    reflection: reflection || null,
    question: question || null,
    recommendation: recommendation || null,
    submitted_at: new Date().toISOString(),
  });
  if (responseError) return json({ ok: false, error: "response_save_failed" }, 500);

  if (existing) {
    const { error: updateError } = await supabase.from("attendances").update({
      full_name: fullName,
      email: email || null,
      source: "virtual",
      attendances_type: "virtual",
    }).eq("id", existing.id);
    if (updateError) return json({ ok: false, error: "release_update_failed" }, 500);
    return json({ ok: true, released: true, alreadyReleased: true });
  }

  const { error: insertError } = await supabase.from("attendances").insert({
    event_id: EVENT_ID,
    document,
    full_name: fullName,
    email: email || null,
    source: "virtual",
    attendances_type: "virtual",
  });
  if (insertError) {
    if (insertError.code === "23505") {
      return json({ ok: true, released: true, alreadyReleased: true });
    }
    return json({ ok: false, error: "release_failed" }, 500);
  }

  return json({ ok: true, released: true, alreadyReleased: false });
});
