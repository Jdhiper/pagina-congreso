import type { Metadata } from "next";
import CertificadosClient from "./CertificadosClient";

export const metadata: Metadata = {
  title: "Certificados | III Jornadas Iberoamericanas 2026",
  description:
    "Consulta y verifica los certificados de participación de las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026.",
};

export default function Page() {
  return <CertificadosClient />;
}