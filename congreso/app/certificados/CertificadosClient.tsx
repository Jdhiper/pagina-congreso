"use client";

import { useState } from "react";

import PageHeroCompact from "@/components/pages/PageHeroCompact";
import Container from "@/components/ui/Container";

import { CertificateForm } from "@/components/pages/certificates/CertificateForm";
import CertificateModal from "@/components/pages/certificates/CertificateModal";

import {
  Search,
  FileCheck,
  Download,
  CircleHelp,
} from "lucide-react";

import type {
  CertificateStatus,
} from "@/components/pages/certificates/CertificateModal";



export default function CertificadosClient() {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [status, setStatus] =
  useState<CertificateStatus>("loading");

  const [message, setMessage] =
    useState("");

  const [downloadUrl, setDownloadUrl] =
    useState("");

  const [documentValue, setDocumentValue] =
    useState("");

  const [eventIdValue, setEventIdValue] =
  useState("");

  async function handleSearch(
    document: string,
    eventId: string
  ) {
    setLoading(true);
    setDocumentValue(document);
    setEventIdValue(eventId);

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

      if (data.status === "ready") {
        setDownloadUrl(data.url);
        setStatus("ready");
      }

      else if (data.status === "generate") {
        setStatus("generate");
      }

      else {
        setStatus("not_found");
        setMessage(data.message);
      }



      

setOpen(true);

      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

        function handleDownload() {
        if (!downloadUrl) return;

        window.open(downloadUrl, "_blank");
      }

      async function handleGenerate() {
      try {
        setStatus("generating");

        const response = await fetch("/api/certificates/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document: documentValue,
            eventId: eventIdValue,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "No fue posible generar el certificado."
          );
        }

        setDownloadUrl(data.url);
        setStatus("ready");

      } catch (error) {

        setMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado."
        );

        setStatus("error");
      }
    }
  return (
    <>
      <PageHeroCompact
        title="Consulta tu certificado"
        subtitle="Verifica tu participación y descarga tu certificado de manera rápida."
      />

      <section className="-mt-14 relative z-20 pb-20">
        <Container>

          <div className="mx-auto max-w-3xl">
            <CertificateForm
              loading={loading}
              onSearch={handleSearch}
            />
          </div>

        </Container>
      </section>

      <section className="pb-24">
        <Container>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

        {[
          {
            icon: <Search size={28} />,
            title: "Consulta",
            text: "Ingresa el número de documento utilizado durante tu inscripción y selecciona el evento correspondiente.",
          },
          {
            icon: <FileCheck size={28} />,
            title: "Generación",
            text: "Si el certificado aún no existe, el sistema lo generará automáticamente en unos segundos.",
          },
          {
            icon: <Download size={28} />,
            title: "Descarga",
            text: "Una vez disponible podrás descargar el certificado en formato PDF las veces que lo necesites.",
          },
        ].map((item) => (

          <div
            key={item.title}
            className="
              group
              relative
              overflow-hidden

              rounded-3xl

              border
              border-[#D9B471]/20

              bg-[#222931]

              p-8

              text-white

              transition-all
              duration-300

              hover:-translate-y-2
              hover:shadow-2xl
              hover:shadow-[#AF8428]/20
            "
          >

            <div
              className="
                absolute

                -right-10
                -top-10

                h-36
                w-36

                rounded-full

                bg-[#AF8428]/15

                blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className="
                  mb-6

                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-[#AF8428]/15

                  text-[#D9B471]
                "
              >
                {item.icon}
              </div>

              <h3 className="font-playfair text-2xl">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-white/75">
                {item.text}
              </p>

            </div>

          </div>

        ))}

      </div>
          <div
  className="
    relative
    mx-auto
    mt-20
    max-w-5xl
    overflow-hidden
    rounded-3xl
    border
    border-[#D9B471]/20
    bg-gradient-to-br
    from-[#1B2126]
    via-[#222931]
    to-[#1B2126]
    p-10
    text-white
  "
>

  <div
    className="
      absolute

      -right-20
      -top-20

      h-60
      w-60

      rounded-full

      bg-[#AF8428]/10

      blur-3xl
    "
  />

  <div className="relative z-10">

    <div
      className="
        mb-8

        flex

        h-16
        w-16

        items-center
        justify-center

        rounded-2xl

        bg-[#AF8428]/20

        text-[#D9B471]
      "
    >
      <CircleHelp size={30} />
    </div>

    <h3 className="font-playfair text-3xl">
      ¿No pudiste obtener tu certificado?
    </h3>

    <p className="mt-5 max-w-3xl leading-8 text-white/80">
      Si asististe al evento y el sistema no encontró tu registro o
      presentó algún inconveniente al generar el certificado, nuestro
      equipo revisará tu caso y realizará la validación correspondiente.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-2">

      <div
        className="
          rounded-2xl

          bg-white/5

          p-6

          backdrop-blur
        "
      >

        <p className="text-sm uppercase tracking-widest text-[#D9B471]">
          Correo de soporte
        </p>

        <p className="mt-2 text-lg font-semibold">
          congresoderechopro@gmail.com
        </p>

        <p className="mt-3 text-sm text-white/65">
          Incluye tu nombre completo, documento de identidad y la sede
          donde asististe.
        </p>

      </div>

        <div
          className="
            rounded-2xl

            bg-white/5

            p-6

            backdrop-blur
          "
        >

          <p className="text-sm uppercase tracking-widest text-[#D9B471]">
            Tiempo de respuesta
          </p>

          <p className="mt-2 text-lg font-semibold">
            1 a 3 días hábiles
          </p>

          <p className="mt-3 text-sm text-white/65">
            Una vez validada la asistencia, recibirás el certificado en el
            correo registrado durante la inscripción.
          </p>

        </div>

      </div>

    </div>

  </div>

        </Container>
      </section>

    <CertificateModal
      open={open}
      status={status}
      message={message}
      onClose={() => setOpen(false)}
      onGenerate={handleGenerate}
      onDownload={handleDownload}
    />
    </>
  );
}