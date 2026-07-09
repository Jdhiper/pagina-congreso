import Image from "next/image";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1B2126] text-white">

      {/* Luz superior */}

            <div
        className="
          absolute
          left-1/2
          top-[-220px]
          -translate-x-1/2
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#D9B471]
          opacity-35
          blur-[180px]
          z-10
        "
      />
      {/* Imagen de fondo */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Imagen ocupando todo el hero */}

          <Image
            src="/images/hero.jpg"
            alt="Hero"
            fill
            priority
            className="
              object-cover
              object-center
              opacity-[0.18]
              scale-105
              blur-[0.5px]
            "
          />

        {/* Capa oscura */}

        <div className="absolute inset-0 bg-[#1B2126]/65" />

        {/* Degradado para ocultar los bordes */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2126] via-[#1B2126]/60 to-[#1B2126]/80" />

        {/* Degradado inferior */}

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1B2126] to-transparent" />

      </div>

        <Container className="relative z-20 flex min-h-[88vh] items-center pt-36 pb-16">

        <div className="max-w-3xl">

          <span className="text-sm uppercase tracking-[0.35em] text-[#D9B471]">

            Agosto • Octubre 2026

          </span>

          <h1 className="mt-7 font-playfair text-5xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-7xl">

            III Jornadas

            <br />

            Iberoamericanas de

            <span className="block text-[#D9B471]">

              Derecho Procesal Penal

            </span>

          </h1>

          <div className="mt-12 flex flex-wrap items-center gap-8">

            <Button
            href="https://forms.cloud.microsoft/r/00RS9Lhvjp?origin=QRCode&qrcodeorigin=presentation">

              Inscripciones

            </Button>

            <Link
              href="/programacion"
              className="font-medium text-white transition hover:text-[#D9B471]"
            >
              Ver programación →
            </Link>

          </div>

          <div className="mt-14 border-t border-white/10 pt-8">

            <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.25em] text-white/60">

              <span>Jalisco</span>

              <span>•</span>

              <span>Envigado</span>

              <span>•</span>

              <span>Pasto</span>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}