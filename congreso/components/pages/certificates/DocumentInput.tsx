"use client";

import { IdCard } from "lucide-react";
import Input from "@/components/ui/Input";

interface DocumentInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DocumentInput({
  value,
  onChange,
}: DocumentInputProps) {
  return (
    <Input
      id="document"
      label="Documento de identidad"
      placeholder="Ej. 1091234567"
      value={value}
      icon={<IdCard size={18} />}
      helperText="Ingresa el mismo documento utilizado durante la inscripción."
      autoComplete="off"
      inputMode="numeric"
      onChange={(e) =>
        onChange(
          e.target.value.replace(/\D/g, "")
        )
      }
    />
  );
}