"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, IdCard, LoaderCircle, PenLine } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { normalizeDocument } from "@/src/certificates/utils/normalizeDocument";

const correctionEndpoint = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/correct-certificate-name`
  : "";

const errorMessages: Record<string, string> = {
  invalid_document: "Ingresa un número de documento válido.",
  invalid_name:
    "Ingresa el nombre completo usando únicamente letras, espacios, puntos, apóstrofes o guiones.",
  certificate_not_found:
    "No encontramos un certificado asociado a ese documento.",
  certificate_not_ready:
    "Ese certificado todavía no está disponible para corrección.",
  ambiguous_certificate:
    "Encontramos más de un certificado para ese documento. Comunícate con soporte.",
  attendance_not_found:
    "Encontramos el certificado, pero no el registro necesario para regenerarlo. Comunícate con soporte.",
};

export default function CorrectionForm() {
  const [document, setDocument] = useState("");
  const [correctedName, setCorrectedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!document || correctedName.trim().length < 3) {
      setError("Completa el documento y el nombre corregido.");
      return;
    }

    if (!correctionEndpoint) {
      setError("El formulario no está configurado. Comunícate con soporte.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(correctionEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document,
          correctedName,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(
          errorMessages[data.error] ??
            "No fue posible realizar la corrección. Inténtalo nuevamente."
        );
        return;
      }

      setSuccess(true);
    } catch {
      setError("No fue posible conectar con el servicio. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="text-center" hover={false}>
        <CheckCircle2 className="mx-auto text-[#AF8428]" size={52} />
        <h2 className="mt-5 font-playfair text-3xl font-semibold text-[#1B2126]">
          Nombre corregido
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-[#222931]/70">
          Guardamos el nombre <strong className="text-[#1B2126]">{correctedName.trim()}</strong>.
          Ahora vuelve a consultar el documento para generar la versión actualizada
          del certificado.
        </p>
        <Link
          href="/certificados"
          className="mt-8 inline-flex rounded-2xl bg-[#AF8428] px-6 py-3 font-medium text-white transition hover:bg-[#D9B471]"
        >
          Consultar certificado actualizado
        </Link>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="space-y-7" hover={false}>
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#F7F3E8] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#AF8428]">
            Corrección de certificado
          </span>
          <h2 className="mt-5 font-playfair text-3xl font-semibold text-[#1B2126]">
            Corrige tu nombre
          </h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 text-[#222931]/70">
            Este formulario solo funciona si ya existe un certificado asociado a
            tu documento.
          </p>
        </div>

        <Input
          id="correction-document"
          label="Documento de identidad"
          placeholder="Ej. 1091234567"
          value={document}
          icon={<IdCard size={18} />}
          helperText="Ingresa el mismo documento con el que consultas tu certificado."
          autoComplete="off"
          inputMode="text"
          required
          onChange={(event) => setDocument(normalizeDocument(event.target.value))}
        />

        <Input
          id="corrected-name"
          label="Nombre completo corregido"
          placeholder="Ej. María José Muñoz Pérez"
          value={correctedName}
          icon={<PenLine size={18} />}
          helperText="Escríbelo con las mayúsculas, minúsculas y tildes que deseas ver en el certificado."
          autoComplete="name"
          maxLength={120}
          required
          onChange={(event) => setCorrectedName(event.target.value)}
        />

        <div className="rounded-2xl border border-[#D9B471]/35 bg-[#F8F5EE] p-5">
          <p className="text-sm font-semibold text-[#1B2126]">
            Revisa cuidadosamente antes de enviar
          </p>
          <p className="mt-2 text-sm leading-6 text-[#222931]/70">
            El nombre aparecerá en el certificado tal como lo escribas aquí:
          </p>
          <p className="mt-3 break-words font-semibold text-[#AF8428]">
            {correctedName.trim() || "Tu nombre aparecerá aquí"}
          </p>
        </div>

        {error && (
          <div role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AF8428] px-6 py-3.5 font-semibold text-white transition hover:bg-[#D9B471] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <LoaderCircle className="animate-spin" size={18} />}
          {loading ? "Guardando corrección..." : "Corregir nombre"}
        </button>

        <p className="text-center text-sm text-[#222931]/60">
          ¿No necesitas hacer cambios?{" "}
          <Link href="/certificados" className="font-semibold text-[#AF8428] hover:underline">
            Volver a certificados
          </Link>
        </p>
      </Card>
    </form>
  );
}
