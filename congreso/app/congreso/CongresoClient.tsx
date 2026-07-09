import Container from "@/components/ui/Container";

import PageHero from "@/components/pages/PageHero";

import CongressIntro from "@/components/pages/congress/CongressIntro";
import CongressHistory from "@/components/pages/congress/CongressHistory";
import CongressTopics from "@/components/pages/congress/CongressTopics";
import FlyersCarousel from "@/components/sections/FlyersCarousel";

import PartnersCarousel from "@/components/sections/PartnersCarousel";
import RegistrationCTA from "@/components/sections/RegistrationCTA";

export default function CongresoClient() {
  return (
    <>

      <main className="bg-[#F8F8F7]">

        <PageHero
          title="El Congreso"
          subtitle="Conoce la historia, los objetivos y el alcance de las III Jornadas Iberoamericanas de Derecho Procesal Penal con énfasis en Inteligencia Artificial."
        />

        <CongressIntro />

        <section className="bg-white pt-20">

          <Container>

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
                Material informativo
              </span>

              <h2 className="mt-5 font-playfair text-4xl text-[#1B2126] md:text-5xl">
                Conoce más sobre las Jornadas
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Explora las piezas oficiales de divulgación del evento y conoce las sedes,
                fechas y principales ejes temáticos de esta edición.
              </p>

            </div>

          </Container>

        </section>

        <FlyersCarousel />

        <CongressHistory />

        <CongressTopics />

        <section className="bg-white pt-24">

          <Container>

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
                Instituciones
              </span>

              <h2 className="mt-5 font-playfair text-4xl text-[#1B2126] md:text-5xl">
                Organizan las III Jornadas
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                El Congreso es organizado por tribunales superiores de Colombia y México,
                junto con universidades e instituciones comprometidas con el fortalecimiento
                de la justicia y la formación jurídica.
              </p>

            </div>

          </Container>

        </section>

        <PartnersCarousel />

        <RegistrationCTA />

      </main>

    </>
  );
}