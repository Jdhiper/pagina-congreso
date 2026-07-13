import { PDFFont } from "pdf-lib";

export function getCenteredX(
  text: string,
  font: PDFFont,
  size: number,
  centerX: number
) {
  const width = font.widthOfTextAtSize(text, size);

  return centerX - width / 2;
}