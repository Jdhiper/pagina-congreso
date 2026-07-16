"use client";

import Button from "@/components/ui/Button";
import { Search, LoaderCircle } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
}

export default function SubmitButton({
  loading,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="
        w-full
        py-3.5
        text-base
        rounded-2xl
        shadow-lg
        shadow-[#AF8428]/20
      "
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            Consultando...
          </>
        ) : (
          <>
            <Search size={18} />
            Buscar certificado
          </>
        )}
      </span>
    </Button>
  );
}