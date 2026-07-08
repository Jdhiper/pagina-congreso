import type { Metadata } from "next";
import ProgramacionClient from "./ProgramacionClient";

export const metadata: Metadata = {
  title: "Programación Oficial",
  description:
    "Consulta la programación oficial de las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026. Conoce las conferencias, paneles y actividades en Pasto, Envigado y Guadalajara.",
};

export default function Page() {
  return <ProgramacionClient />;
}