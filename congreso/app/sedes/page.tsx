import type { Metadata } from "next";
import SedesClient from "./SedesClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sedes | III Jornadas Iberoamericanas 2026",
  description:
    "Conoce las sedes oficiales de las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026 en Pasto, Envigado y Guadalajara, con modalidad presencial y virtual.",
};

export default function Page() {
  return (
  <Suspense fallback={null}>
  <SedesClient />;
  </Suspense>
  );
}