"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

import Card from "@/components/ui/Card";

import DocumentInput from "./DocumentInput";
import EventSelector from "./EventSelector";
import SubmitButton from "./SubmitButton";

import { events } from "@/data/events";

interface CertificateFormProps {
  loading: boolean;
  onSearch: (
    document: string,
    eventId: string
  ) => Promise<void>;
}

export function CertificateForm({
  loading,
  onSearch,
}: CertificateFormProps) {
  const [document, setDocument] = useState("");

  const [eventId, setEventId] = useState(
    events[0].id
  );

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!document.trim()) return;

    await onSearch(
      document.trim(),
      eventId
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="mx-auto w-full max-w-2xl"
    >
      <Card className="space-y-8">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-[#F7F3E8] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#AF8428]">
            Certificados
          </span>

          <h2 className="mt-5 font-playfair text-3xl font-semibold text-[#1B2126]">
            Consulta tu certificado
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-[#222931]/70 leading-7">
            Ingresa el documento con el que realizaste tu inscripción
            y selecciona la sede correspondiente.
          </p>

        </div>

        <DocumentInput
          value={document}
          onChange={setDocument}
        />

        <EventSelector
          value={eventId}
          onChange={setEventId}
        />

        <SubmitButton
          loading={loading}
        />

        <p className="text-center text-sm leading-6 text-[#222931]/55">
          Si tu asistencia fue registrada correctamente,
          podrás descargar tu certificado oficial en formato PDF.
        </p>

      </Card>
    </motion.form>
  );
}