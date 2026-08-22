export const certificateTypes = ["presencial", "virtual"] as const;

export type CertificateType = (typeof certificateTypes)[number];

export interface CertificateData {
  fullName: string;
  document: string;
  type: CertificateType;
}

export function isCertificateType(value: unknown): value is CertificateType {
  return typeof value === "string" && certificateTypes.includes(value as CertificateType);
}

export function getCertificateTypeFromAttendanceSource(
  source: string | null | undefined
): CertificateType {
  const normalizedSource = source
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  return normalizedSource === "presencial" || normalizedSource === "in_person"
    ? "presencial"
    : "virtual";
}
