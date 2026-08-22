import type { CertificateType } from "../types/certificate";

export function buildStoragePath(
  eventId: string,
  document: string,
  type: CertificateType
): string {
  const cleanDocument = document.replace(/\D/g, "");

  return `${eventId}/${type}/${cleanDocument}.pdf`;
}
