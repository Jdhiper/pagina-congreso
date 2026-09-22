import { attendanceRepository } from "../repositories/attendance.repository";
import { certificateRepository } from "../repositories/certificate.repository";
import { registrationRepository } from "../repositories/registration.repository";
import { storageService } from "../storage/storage.service";
import { certificateService } from "./certificate.service";

export type ValidationResult =
  | {
      status: "ready";
      storagePath: string;
      url: string;
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
    const registration =
      await registrationRepository.findByDocumentAndEvent(document, eventId);

    if (registration) {
      return {
        status: "not_found",
        message:
          "Encontramos tu registro, pero tu certificado todavía está bloqueado. Completa el formulario virtual y espera la validación de la organización.",
      };
    }

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
      url: await storageService.createSignedUrl(
        certificate.storage_path
      ),
    };
  }

  if (certificate) {
    const certificateType =
      certificate.certificate_type === "presential"
        ? "presencial"
        : certificate.certificate_type === "virtual"
          ? "virtual"
          : null;

    if (certificateType) {
      return certificateService.generate(document, eventId, {
        certificateType,
      });
    }
  }

  const isVirtualAttendance =
    attendance.attendances_type === "virtual" || attendance.source === "virtual";

  if (isVirtualAttendance) {
    return certificateService.generate(document, eventId, {
      certificateType: "virtual",
      requiredAttendanceType: "virtual",
    });
  }

  return {
    status: "not_found",
    message:
      "Tu participación está habilitada, pero el certificado pregenerado todavía no está disponible. Comunícate con la organización.",
  };
}
