import type { Metadata } from "next";

import PageHeroCompact from "@/components/pages/PageHeroCompact";
import Container from "@/components/ui/Container";

import CorrectionForm from "./CorrectionForm";

export const metadata: Metadata = {
  title: "Corregir certificado",
  description:
    "Formulario para corregir el nombre que aparece en un certificado de las III Jornadas Iberoamericanas.",
};

export default function CorrectCertificatePage() {
  return (
    <>
      <PageHeroCompact
        title="Corrección de certificado"
        subtitle="Actualiza la escritura de tu nombre y genera nuevamente tu certificado."
      />

      <section className="relative z-20 -mt-14 pb-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CorrectionForm />
          </div>
        </Container>
      </section>
    </>
  );
}
