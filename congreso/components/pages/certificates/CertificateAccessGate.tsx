"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, ExternalLink, LockKeyhole } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const STORAGE_KEY = "certificates-youtube-access-v1";

interface CertificateAccessGateProps {
  children: ReactNode;
}

export default function CertificateAccessGate({
  children,
}: CertificateAccessGateProps) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUnlocked(window.localStorage.getItem(STORAGE_KEY) === "unlocked");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function openYoutubeChannel() {
    window.open(
      `${siteConfig.youtubeChannelUrl}?sub_confirmation=1`,
      "_blank",
      "noopener,noreferrer"
    );
    window.localStorage.setItem(STORAGE_KEY, "unlocked");
    setUnlocked(true);
  }

  if (unlocked) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-green-700">
          <CheckCircle2 size={18} />
          Acceso habilitado
        </div>
        {children}
      </div>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <LockKeyhole size={30} />
      </div>

      <span className="mt-6 inline-flex rounded-full bg-[#F7F3E8] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#AF8428]">
        Paso previo
      </span>

      <h2 className="mt-5 font-playfair text-3xl font-semibold text-[#1B2126]">
        Suscríbete para consultar tu certificado
      </h2>

      <p className="mx-auto mt-4 max-w-lg leading-7 text-[#222931]/70">
        Visita nuestro canal de YouTube, suscríbete y vuelve a esta pestaña.
        El formulario se habilitará al regresar.
      </p>

      <Button
        type="button"
        className="mt-8 w-full py-3.5"
        onClick={openYoutubeChannel}
      >
        <span className="flex items-center justify-center gap-2">
          <FaYoutube size={20} />
          Ir al canal y suscribirme
          <ExternalLink size={16} />
        </span>
      </Button>

      <p className="mt-6 text-xs leading-5 text-[#222931]/50">
        No solicitamos acceso a tu cuenta de Google ni almacenamos datos de YouTube.
      </p>
    </Card>
  );
}
