export function buildStoragePath(
  eventId: string,
  document: string
): string {
  const cleanDocument = document.replace(/\D/g, "");

  return `${eventId}/${cleanDocument}.pdf`;
}