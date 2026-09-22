import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { CertificateData } from "../types/certificate";
import { loadTemplate } from "../pdf/loadTemplate";
import { getCenteredX } from "../utils/centerText";

export class CertificateGenerator {
  async generate(
    data: CertificateData
  ): Promise<Buffer> {

    // Cargar la plantilla
    const template = await loadTemplate(data.type);

    const pdfDoc = await PDFDocument.load(template);

    // Primera página del diploma
    const page = pdfDoc.getPages()[0];

    // Fuente
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ============================
    // Nombre
    // ============================

    const maxNameSize = 24;
    const minNameSize = 15;
    const maxNameWidth = 480;
    let nameSize = maxNameSize;

    while (
      nameSize > minNameSize &&
      font.widthOfTextAtSize(data.fullName, nameSize) > maxNameWidth
    ) {
      nameSize -= 1;
    }

    const nameX = getCenteredX(
      data.fullName,
      font,
      nameSize,
      page.getWidth() / 2 - 22
    );
    page.drawText(data.fullName, {
      x: nameX,
      y: 322,
      size: nameSize,
      font,
      color: rgb(1, 1, 1),
    });

    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes);
  }
}

export const certificateGenerator =
  new CertificateGenerator();
