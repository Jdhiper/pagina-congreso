import type { Metadata } from "next";
import PonentesClient from "./PonentesClient";

export const metadata: Metadata = {
  title: "Ponentes Internacionales | III Jornadas Iberoamericanas 2026",
  description:
    "Conoce a los magistrados, jueces, docentes e investigadores nacionales e internacionales que participarán como conferencistas en las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026 con énfasis en Inteligencia Artificial.",
};

export default function Page() {
  return <PonentesClient />;
}