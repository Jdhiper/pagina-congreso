import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import { CertificateData } from "../types/certificate";
import { loadTemplate } from "../pdf/loadTemplate";
import { getCenteredX } from "../utils/centerText";

export class CertificateGenerator {
  async generate(
    data: CertificateData
  ): Promise<Buffer> {

    // Cargar la plantilla
    const template = await loadTemplate();

    const pdfDoc = await PDFDocument.load(template);

    // Primera página del diploma
    const page = pdfDoc.getPages()[0];

    // Fuente
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ============================
    // Nombre
    // ============================

    const nameSize = 28;

    page.drawText(data.fullName, {
      x: getCenteredX(
        data.fullName,
        font,
        nameSize,
        422
      ),
      y: 287,
      size: nameSize,
      font,
      color: rgb(0, 0, 0),
    });

    // ============================
    // Documento
    // ============================

    const documentSize = 18;

    page.drawText(data.document, {
      x: getCenteredX(
        data.document,
        font,
        documentSize,
        422
      ),
      y: 180,
      size: documentSize,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes);
  }
}

export const certificateGenerator =
  new CertificateGenerator();