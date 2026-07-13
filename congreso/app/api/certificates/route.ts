import { NextRequest, NextResponse } from "next/server";

import { validateCertificate } from "@/src/certificates/services/validation.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const document = body.document?.trim();
    const eventId = body.eventId?.trim();

    if (!document || !eventId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Documento y evento son obligatorios.",
        },
        { status: 400 }
      );
    }

    const result = await validateCertificate(document, eventId);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Error consultando certificado:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}