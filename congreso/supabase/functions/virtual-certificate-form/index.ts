import { createClient } from "npm:@supabase/supabase-js@2.110.2";

const EVENT_ID = "ba74c6ac-d95a-4294-b6b7-60253ec0a3a9";
const CERTIFICATES_URL =
  "https://www.jornadasiberoamericanasdederechoprocesalpenal.com/certificados";

const securityHeaders = {
  "Cache-Control": "no-store",
  "Content-Security-Policy":
    "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, { status, headers: securityHeaders });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function normalizeDocument(value: unknown): string {
  return typeof value === "string"
    ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
    : "";
}

function page(): Response {
  return new Response(`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reflexión para certificado virtual</title><style>
:root{font-family:Inter,system-ui,sans-serif;color:#172033;background:#f3f6fb}*{box-sizing:border-box}body{margin:0;padding:32px 16px}.card{max-width:760px;margin:auto;background:#fff;border:1px solid #dfe5ef;border-radius:18px;padding:clamp(22px,5vw,44px);box-shadow:0 16px 48px #14213d18}h1{margin:0 0 10px;font-size:clamp(1.65rem,4vw,2.25rem);color:#173b68}p{line-height:1.55}.note{background:#edf5ff;border-left:4px solid #2367a7;padding:12px 14px;border-radius:8px;margin:20px 0}label{display:block;font-weight:700;margin:18px 0 7px}input,textarea{width:100%;font:inherit;border:1px solid #b8c3d3;border-radius:10px;padding:12px;background:#fff}textarea{min-height:115px;resize:vertical}input:focus,textarea:focus{outline:3px solid #8bc1ff66;border-color:#2367a7}button,.button{display:inline-block;border:0;border-radius:10px;padding:13px 20px;background:#173b68;color:#fff;font-weight:800;font-size:1rem;text-decoration:none;cursor:pointer;margin-top:22px}button[disabled]{opacity:.55;cursor:wait}.status{display:none;margin-top:20px;padding:14px;border-radius:10px}.ok{display:block;background:#e5f7eb;color:#145a2d}.error{display:block;background:#fdeaea;color:#8a1f1f}.hp{position:absolute;left:-10000px}.small{font-size:.9rem;color:#586477}</style></head>
<body><main class="card"><h1>Reflexión para certificado virtual</h1><p>III Jornadas Iberoamericanas de Derecho Procesal Penal</p>
<div class="note">Este formulario habilita únicamente certificados virtuales previamente preparados. Escriba el documento sin puntos ni espacios.</div>
<form id="form"><label>Nombre completo<input name="fullName" maxlength="160" required autocomplete="name"></label>
<label>Número de documento<input name="document" maxlength="40" required inputmode="numeric" autocomplete="off"></label>
<label>Correo electrónico<input name="email" type="email" maxlength="254" required autocomplete="email"></label>
<label>Reflexión personal sobre los principales aprendizajes<textarea name="reflection" maxlength="3000" required></textarea></label>
<label>Pregunta relacionada con los temas desarrollados<textarea name="question" maxlength="1500" required></textarea></label>
<label>Recomendación para una próxima edición<textarea name="recommendation" maxlength="1500" required></textarea></label>
<label class="hp" aria-hidden="true">Sitio web<input name="website" tabindex="-1" autocomplete="off"></label>
<button id="submit" type="submit">Enviar y habilitar certificado</button></form><div id="status" class="status" role="status"></div>
<p class="small">La información se utiliza para registrar la reflexión y habilitar el certificado correspondiente.</p></main>
<script>const f=document.getElementById('form'),s=document.getElementById('status'),b=document.getElementById('submit');f.addEventListener('submit',async e=>{e.preventDefault();b.disabled=true;s.className='status';s.textContent='';const data=Object.fromEntries(new FormData(f));try{const r=await fetch(location.href,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});const j=await r.json();if(!r.ok)throw new Error(j.message||'No fue posible habilitar el certificado.');s.className='status ok';s.innerHTML='Certificado habilitado correctamente. <a class="button" href="${CERTIFICATES_URL}">Consultar certificado</a>';f.reset()}catch(err){s.className='status error';s.textContent=err.message}finally{b.disabled=false}});</script></body></html>`, {
    headers: { ...securityHeaders, "Content-Type": "text/html; charset=utf-8" },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "GET") return page();
  if (request.method !== "POST") return json({ ok: false, message: "Método no permitido." }, 405);
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return json({ ok: false, message: "La respuesta es demasiado extensa." }, 413);
  }

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ ok: false, message: "Solicitud inválida." }, 400); }
  if (body.website) return json({ ok: true });

  const document = normalizeDocument(body.document);
  const submittedName = cleanText(body.fullName, 160);
  const submittedEmail = cleanText(body.email, 254).toLowerCase();
  const reflection = cleanText(body.reflection, 3000);
  const question = cleanText(body.question, 1500);
  const recommendation = cleanText(body.recommendation, 1500);
  if (!document || !submittedName || !submittedEmail.includes("@") || !reflection || !question || !recommendation) {
    return json({ ok: false, message: "Complete correctamente todos los campos." }, 400);
  }

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ ok: false, message: "Servicio temporalmente no disponible." }, 500);
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: certificate, error: certificateError } = await supabase.from("certificates")
    .select("id").eq("event_id", EVENT_ID).eq("document", document).eq("generated", true)
    .eq("certificate_type", "virtual").not("storage_path", "is", null).maybeSingle();
  if (certificateError) return json({ ok: false, message: "No fue posible validar el certificado." }, 500);
  if (!certificate) return json({ ok: false, message: "No existe un certificado virtual preparado para este documento." }, 404);

  const { data: registrations, error: registrationError } = await supabase.from("registrations")
    .select("full_name,email").eq("event_id", EVENT_ID).eq("document", document)
    .order("created_at", { ascending: false }).limit(1);
  if (registrationError) return json({ ok: false, message: "No fue posible validar la inscripción." }, 500);
  const registration = registrations?.[0];
  if (!registration) return json({ ok: false, message: "El documento no está registrado para este evento." }, 404);

  const { data: existing, error: attendanceError } = await supabase.from("attendances")
    .select("source,attendances_type").eq("event_id", EVENT_ID).eq("document", document).maybeSingle();
  if (attendanceError) return json({ ok: false, message: "No fue posible validar la asistencia." }, 500);
  if (existing && existing.attendances_type !== "virtual" && existing.source !== "virtual") {
    return json({ ok: false, message: "Este documento tiene certificado presencial; consúltelo en la página de certificados." }, 409);
  }

  const { error: responseError } = await supabase.from("virtual_certificate_responses").insert({
    event_id: EVENT_ID, document, submitted_name: submittedName, submitted_email: submittedEmail,
    reflection, question, recommendation, submitted_at: new Date().toISOString(),
  });
  if (responseError && responseError.code !== "23505") {
    return json({ ok: false, message: "No fue posible guardar la respuesta." }, 500);
  }

  if (!existing) {
    const { error: releaseError } = await supabase.from("attendances").insert({
      event_id: EVENT_ID, document, full_name: registration.full_name, email: registration.email,
      source: "virtual", attendances_type: "virtual",
    });
    if (releaseError && releaseError.code !== "23505") {
      return json({ ok: false, message: "La respuesta se guardó, pero no fue posible habilitar el certificado." }, 500);
    }
  }
  return json({ ok: true, released: true, certificatesUrl: CERTIFICATES_URL });
});
