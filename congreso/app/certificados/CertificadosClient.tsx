"use client";

import { useState } from "react";

import { CertificateForm } from "@/components/pages/certificates/CertificateForm";
import { CertificateResult } from "@/components/pages/certificates/CertificateResult";

export default function CertificadosClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSearch(
    document: string,
    eventId: string
  ) {
    setLoading(true);

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document,
          eventId,
        }),
      });

      const data = await response.json();

      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#F2F2F1] py-20">
      <div className="mx-auto max-w-3xl px-6">

        <div className="mb-12 text-center">

          <span className="inline-flex rounded-full border border-[#D9B471]/30 bg-[#D9B471]/10 px-4 py-1 text-sm font-medium text-[#AF8428]">
            Certificados
          </span>

          <h1 className="mt-5 font-playfair text-5xl font-bold text-[#1B2126]">
            Consulta tu certificado
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#222931]/70">
            Verifica tu asistencia y descarga tu certificado de
            participación en cualquiera de las sedes del Congreso.
          </p>

        </div>

        <CertificateForm
          loading={loading}
          onSearch={handleSearch}
        />

        {result && (
          <div className="mt-8">
            <CertificateResult result={result} />
          </div>
        )}

      </div>
    </section>
  );
}