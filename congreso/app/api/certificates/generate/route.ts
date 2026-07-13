import { NextRequest, NextResponse } from "next/server";
import { certificateService } from "@/src/certificates/services/certificate.service";

export async function POST(request: NextRequest) {


  try {

    const { document, eventId } =
      await request.json();

    const result =
      await certificateService.generate(
        document,
        eventId
      );

    return NextResponse.json(result);

} catch (error) {

  console.error(error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : String(error),
    },
    {
      status: 500,
    }
  );

}

}