import type { CertificateType } from "../types/certificate";
import { normalizeDocument } from "./normalizeDocument";

export function buildStoragePath(
  eventId: string,
  document: string,
  type: CertificateType,
  revision?: string
): string {
  const cleanDocument = normalizeDocument(document);
  const cleanRevision = revision?.replace(/[^a-zA-Z0-9_-]/g, "");
  const suffix = cleanRevision ? `-${cleanRevision}` : "";

  return `${eventId}/${type}/${cleanDocument}${suffix}.pdf`;
}
