import Container from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#1B2126] pt-36 pb-16 md:pt-40 md:pb-20">

      {/* Imagen de fondo */}

      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay oscuro */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2126]/55 via-[#1B2126]/70 to-[#1B2126]/90" />

      {/* Glow dorado */}

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#AF8428]/20 blur-[140px]" />

      <Container className="relative z-10">

        <div className="max-w-3xl">

          <span
            className="
              text-xs
              md:text-sm
              uppercase
              tracking-[0.35em]
              text-[#D9B471]
            "
          >
            III Jornadas Iberoamericanas
          </span>

          <h1
            className="
              mt-5
              font-playfair
              text-4xl
              font-semibold
              leading-tight
              text-white
              md:text-5xl
              lg:text-6xl
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-white/75
              md:text-lg
              md:leading-8
            "
          >
            {subtitle}
          </p>

        </div>

      </Container>

    </section>
  );
}