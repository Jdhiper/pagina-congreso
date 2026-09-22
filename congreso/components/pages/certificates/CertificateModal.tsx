"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";

export type CertificateStatus =
  | "loading"
  | "not_found"
  | "ready"
  | "error";

interface CertificateModalProps {
  open: boolean;
  status: CertificateStatus;
  message?: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function CertificateModal({
  open,
  status,
  message,
  onClose,
  onDownload,
}: CertificateModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="px-10 py-12 text-center">

        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-14 w-14 animate-spin text-[#AF8428]" />

            <h2 className="mt-6 text-2xl font-playfair font-semibold text-[#1B2126]">
              Consultando información
            </h2>

            <p className="mt-3 text-[#222931]/70">
              Estamos verificando tu asistencia.
            </p>
          </>
        )}

        {/* No encontrado */}
        {status === "not_found" && (
          <>
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />

            <h2 className="mt-6 text-2xl font-playfair font-semibold text-red-600">
              Registro no encontrado
            </h2>

            <p className="mt-3 text-[#222931]/70">
              {message}
            </p>

            <Button
              className="mt-8"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />

            <h2 className="mt-6 font-playfair text-2xl font-semibold text-red-600">
              No fue posible generar el certificado
            </h2>

            <p className="mt-3 text-[#222931]/70">
              {message}
            </p>

            <div className="mt-8 flex justify-center gap-4">

              <Button
                variant="outline"
                onClick={onClose}
              >
                Cerrar
              </Button>

            </div>
          </>
        )}

        {/* Listo */}
        {status === "ready" && (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />

            <h2 className="mt-6 text-2xl font-playfair font-semibold text-green-700">
              Certificado disponible
            </h2>

            <p className="mt-3 text-[#222931]/70">
              Ya puedes descargar tu certificado.
            </p>

            <Button
              className="mt-8 inline-flex items-center gap-2"
              onClick={onDownload}
            >
              <Download size={18} />
              Descargar certificado
            </Button>
          </>
        )}

      </div>
    </Modal>
  );
}
