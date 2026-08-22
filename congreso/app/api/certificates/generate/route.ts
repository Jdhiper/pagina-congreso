import { NextRequest, NextResponse } from "next/server";
import { certificateService } from "@/src/certificates/services/certificate.service";

export async function POST(request: NextRequest) {
  try {
    const { document, eventId } = await request.json();

    if (typeof document !== "string" || typeof eventId !== "string") {
      return NextResponse.json(
        { message: "Documento y evento son obligatorios." },
        { status: 400 }
      );
    }

    const result = await certificateService.generate(
      document.trim(),
      eventId.trim(),
      // Toda generación iniciada desde el formulario público es virtual.
      { certificateType: "virtual" }
    );

    return NextResponse.json(result);

  } catch (error) {

    // Error real para el desarrollador
    console.error("Error generando certificado:", error);

    // Mensaje amigable para el usuario
    return NextResponse.json(
      {
        message:
          "No fue posible generar el certificado. Inténtalo nuevamente en unos minutos.",
      },
      {
        status: 500,
      }
    );

  }
}
