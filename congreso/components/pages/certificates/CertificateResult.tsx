interface CertificateResultProps {
  result: {
    status: string;
    message?: string;
    url?: string;
  };
}

export function CertificateResult({
  result,
}: CertificateResultProps) {
  if (result.status === "not_found") {
    return (
      <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-red-700">
          No encontramos un registro
        </h3>

        <p className="mt-3 text-red-600">
          Verifica el documento y la sede seleccionada.
        </p>
      </div>
    );
  }

  if (result.status === "generate") {
    return (
      <div className="mt-8 rounded-3xl border border-[#D9B471]/20 bg-white p-8 shadow-sm">
        <h3 className="font-playfair text-2xl font-semibold text-[#1B2126]">
          Certificado disponible
        </h3>

        <p className="mt-3 text-[#222931]/70">
          Tu asistencia fue validada. El certificado aún no ha sido generado.
        </p>

        <button
          className="
            mt-6
            rounded-xl
            bg-[#AF8428]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#9B7724]
          "
        >
          Generar certificado
        </button>
      </div>
    );
  }

  if (result.status === "ready") {
    return (
      <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-8">
        <h3 className="text-2xl font-semibold text-green-700">
          Certificado listo
        </h3>

        <p className="mt-3 text-green-600">
          Ya puedes descargar tu certificado.
        </p>

        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6
            inline-flex
            rounded-xl
            bg-green-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-green-700
          "
        >
          Descargar certificado
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-yellow-200 bg-yellow-50 p-8 text-center">
      <p className="text-yellow-700">
        {result.message ?? "Ha ocurrido un error."}
      </p>
    </div>
  );
}