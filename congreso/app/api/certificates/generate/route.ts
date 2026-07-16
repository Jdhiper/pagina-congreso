import { NextRequest, NextResponse } from "next/server";
import { certificateService } from "@/src/certificates/services/certificate.service";

export async function POST(request: NextRequest) {
  try {
    const { document, eventId } = await request.json();

    const result = await certificateService.generate(
      document,
      eventId
    );

    return NextResponse.json(result);

  } catch (error) {

    // Error real para el desarrollador
    console.error("Error generando certificado:", error);

    // Mensaje amigable para el usuario
    return NextResponse.json(
      {
        error:
          "No fue posible generar el certificado. Inténtalo nuevamente en unos minutos.",
      },
      {
        status: 500,
      }
    );

  }
}