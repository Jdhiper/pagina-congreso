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

    const certificateType =
      options.certificateType ??
      getCertificateTypeFromAttendanceSource(attendance.source);

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
        url: storageService.getPublicUrl(
          existing.storage_path
        ),
      };

    }
    // 4. Generar PDF
    const pdf = await certificateGenerator.generate({
      fullName: attendance.full_name,
      document: attendance.document,
      type: certificateType,
    });
    // 5. Construir ruta
    const storagePath = buildStoragePath(
      event.id,
      attendance.document,
      certificateType
    );
    // 6. Subir PDF
    await storageService.upload(storagePath, pdf);
    
    // 7. Registrar certificado
    await certificateRepository.create({
      event_id: event.id,
      document: attendance.document,
      generated: true,
      storage_path: storagePath,
      generated_at: new Date().toISOString(),
      download_count: 0,
    });
    // 8. Devolver URL
    return {
      status: "ready" as const,
      storagePath,
      url: storageService.getPublicUrl(storagePath),
      certificateType,
    };
  }

}

export const certificateService =
  new CertificateService();
