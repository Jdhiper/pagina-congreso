import type { Metadata } from "next";
import CongresoClient from "./CongresoClient";

export const metadata: Metadata = {
  title: "Congreso",
  description:
    "Conoce las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026, un encuentro académico internacional con énfasis en Inteligencia Artificial y la participación de magistrados, jueces, docentes e investigadores de Iberoamérica.",
};

export default function Page() {
  return <CongresoClient />;
}