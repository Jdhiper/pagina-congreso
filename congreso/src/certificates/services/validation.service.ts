import { adminClient } from "@/utils/supabase/admin";
import { attendanceRepository } from "../repositories/attendance.repository";
import { certificateRepository } from "../repositories/certificate.repository";

export type ValidationResult =
  | {
      status: "ready";
      storagePath: string;
    }
  | {
      status: "generate";
    }
  | {
      status: "not_found";
      message: string;
    };

export async function validateCertificate(
  document: string,
  eventId: string
): Promise<ValidationResult> {

    const attendance =
    await attendanceRepository.findByDocumentAndEvent(
        document,
        eventId
    );

    if (!attendance) {
    return {
        status: "not_found",
        message: "No encontramos un registro de asistencia.",
    };
    }

    const certificate =
    await certificateRepository.findByDocumentAndEvent(
        document,
        eventId
    );
    if (certificate?.generated && certificate.storage_path) {
    return {
        status: "ready",
        storagePath: certificate.storage_path,
    };
    }

  return {
    status: "generate",
  };
}