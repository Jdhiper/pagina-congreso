import { attendanceRepository } from "../repositories/attendance.repository";
import { certificateRepository } from "../repositories/certificate.repository";
import { storageService } from "../storage/storage.service";

export type ValidationResult =
  | {
      status: "ready";
      storagePath: string;
      url: string;
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
  // Buscar asistencia
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

  // Buscar certificado
  const certificate =
    await certificateRepository.findByDocumentAndEvent(
      document,
      eventId
    );

  if (certificate?.generated && certificate.storage_path) {
    return {
      status: "ready",
      storagePath: certificate.storage_path,
      url: storageService.getPublicUrl(
        certificate.storage_path
      ),
    };
  }

  return {
    status: "generate",
  };
}