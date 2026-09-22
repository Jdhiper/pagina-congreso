import { attendanceRepository } from "../repositories/attendance.repository";
import { eventRepository } from "../repositories/event.repository";
import { certificateRepository } from "../repositories/certificate.repository";
import { storageService } from "../storage/storage.service";
import { certificateGenerator } from "../generator/CertificateGenerator";
import { buildStoragePath } from "../utils/buildStoragePath";
import {
  getCertificateTypeFromAttendanceSource,
  type CertificateType,
} from "../types/certificate";

export interface GenerateCertificateOptions {
  certificateType?: CertificateType;
  requiredAttendanceType?: CertificateType;
}

export class CertificateService {

  async generate(
    document: string,
    eventId: string,
    options: GenerateCertificateOptions = {}
  ) {

    // 1. Buscar asistencia
    const attendance =
      await attendanceRepository.findByDocumentAndEvent(
        document,
        eventId
      );

    if (!attendance) {
      throw new Error("Asistencia no encontrada.");
    }

    // 2. Buscar evento
    const event =
      await eventRepository.findById(eventId);

    if (!event) {
      throw new Error("Evento no encontrado.");
    }

    const attendanceType = getCertificateTypeFromAttendanceSource(attendance.source);

    if (
      options.requiredAttendanceType &&
      attendanceType !== options.requiredAttendanceType
    ) {
      throw new Error(
        `La asistencia registrada es ${attendanceType}; no se puede generar un certificado ${options.requiredAttendanceType}.`
      );
    }

    // 3. Verificar certificado existente
    const existing =
      await certificateRepository.findByDocumentAndEvent(
        document,
        eventId
      );

    if (existing?.generated && existing.storage_path) {

      return {
        status: "ready" as const,
        storagePath: existing.storage_path,
        url: await storageService.createSignedUrl(
          existing.storage_path
        ),
      };

    }
    const storedCertificateType =
      existing?.certificate_type === "presential"
        ? "presencial"
        : existing?.certificate_type === "virtual"
          ? "virtual"
          : undefined;
    const certificateType =
      options.certificateType ?? storedCertificateType ?? attendanceType;

    // 4. Generar PDF
    const pdf = await certificateGenerator.generate({
      fullName: attendance.full_name
        .normalize("NFC")
        .trim()
        .replace(/\s+/g, " "),
      type: certificateType,
    });
    // 5. Construir ruta
    const storagePath = buildStoragePath(
      event.id,
      attendance.document,
      certificateType,
      `v${Date.now()}`
    );
    // 6. Subir PDF
    await storageService.upload(storagePath, pdf);
    
    // 7. Registrar certificado
    const certificateRecord = {
      event_id: event.id,
      document: attendance.document,
      generated: true,
      storage_path: storagePath,
      generated_at: new Date().toISOString(),
      download_count: 0,
      certificate_type: certificateType === "presencial" ? "presential" : "virtual",
    };

    if (existing) {
      await certificateRepository.update(existing.id, certificateRecord);
    } else {
      await certificateRepository.create(certificateRecord);
    }
    // 8. Devolver URL
    return {
      status: "ready" as const,
      storagePath,
      url: await storageService.createSignedUrl(storagePath),
      certificateType,
    };
  }

}

export const certificateService =
  new CertificateService();
