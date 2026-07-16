import Container from "@/components/ui/Container";

interface PageHeroCompactProps {
  title: string;
  subtitle: string;
}

export default function PageHeroCompact({
  title,
  subtitle,
}: PageHeroCompactProps) {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#1B2126]

        pt-28
        pb-20
      "
    >
      {/* Imagen */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-[#1B2126]/85" />

      {/* Glow */}

      <div
        className="
          absolute

          left-1/2
          top-0

          h-64
          w-64

          -translate-x-1/2

          rounded-full

          bg-[#AF8428]/20

          blur-[120px]
        "
      />

      <Container className="relative z-10">

        <div className="max-w-3xl">

          <span
            className="
              text-xs

              uppercase

              tracking-[0.35em]

              text-[#D9B471]
            "
          >
            III Jornadas Iberoamericanas
          </span>

          <h1
            className="
              mt-4

              font-playfair

              text-4xl

              text-white

              md:text-5xl
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-5

              max-w-2xl

              text-white/75

              leading-8
            "
          >
            {subtitle}
          </p>

        </div>

      </Container>

    </section>
  );
}