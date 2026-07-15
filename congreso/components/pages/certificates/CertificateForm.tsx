"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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
  const [eventId, setEventId] = useState(events[0].id);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!document.trim()) return;

    await onSearch(
      document.trim(),
      eventId
    );
  }

  return (
    <div className="rounded-3xl border border-[#D9B471]/20 bg-white shadow-lg shadow-[#AF8428]/5">
      <div className="border-b border-[#D9B471]/15 px-8 py-7">
        <h2 className="font-playfair text-3xl font-semibold text-[#1B2126]">
          Consulta de certificados
        </h2>

        <p className="mt-2 text-[#222931]/70">
          Selecciona la sede del evento e ingresa el documento
          utilizado durante la inscripción.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-7 p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#222931]">
            Documento de identidad
          </label>

          <input
            type="text"
            value={document}
            onChange={(e) =>
              setDocument(e.target.value)
            }
            placeholder="Ej. 1081274507"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3.5
              transition
              outline-none
              focus:border-[#AF8428]
              focus:ring-4
              focus:ring-[#D9B471]/20
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#222931]">
            Sede del evento
          </label>

          <select
            value={eventId}
            onChange={(e) =>
              setEventId(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3.5
              transition
              outline-none
              focus:border-[#AF8428]
              focus:ring-4
              focus:ring-[#D9B471]/20
            "
          >
            {events.map((event) => (
              <option
                key={event.id}
                value={event.id}
              >
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-[#AF8428]
            px-6
            py-3.5
            font-medium
            text-white
            transition
            hover:bg-[#9B7724]
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          <Search size={18} />

          {loading
            ? "Consultando..."
            : "Consultar certificado"}
        </button>
      </form>
    </div>
  );
}