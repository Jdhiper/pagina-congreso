import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface Venue {
  id: string;
  city: string;
  country: string;
  date: string;
  phase: string;
  name: string;
  address: string;
  modality: string;
  image: string;
  map: string;
  description: string;
  digitalRoute: string;
  features: string[];
}

interface VenueInfoProps {
  venue: Venue;
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  return (
    <section className="pb-24">

      <Container>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Imagen */}

          <div className="relative overflow-hidden rounded-[32px]">

            <Image
              src={venue.image}
              alt={venue.name}
              width={900}
              height={700}
              className="h-[520px] w-full object-cover"
              priority
            />

          </div>

          {/* Información */}

          <div>

            <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
              {venue.phase}
            </span>

            <h2 className="mt-5 font-playfair text-4xl leading-tight text-[#1B2126] md:text-5xl">
              {venue.name}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {venue.description}
            </p>

            {/* Datos */}

            <div className="mt-10 space-y-6">

              <div className="border-b border-[#D9B471]/30 pb-5">

                <p className="text-sm uppercase tracking-[0.2em] text-[#AF8428]">
                  Ciudad
                </p>

                <p className="mt-2 text-xl text-[#1B2126]">
                  {venue.city} {venue.country}
                </p>

              </div>

              <div className="border-b border-[#D9B471]/30 pb-5">

                <p className="text-sm uppercase tracking-[0.2em] text-[#AF8428]">
                  Fechas
                </p>

                <p className="mt-2 text-xl text-[#1B2126]">
                  {venue.date}
                </p>

              </div>

              <div className="border-b border-[#D9B471]/30 pb-5">

                <p className="text-sm uppercase tracking-[0.2em] text-[#AF8428]">
                  Modalidad
                </p>

                <p className="mt-2 text-xl text-[#1B2126]">
                  {venue.modality}
                </p>

              </div>

              <div>

                <p className="text-sm uppercase tracking-[0.2em] text-[#AF8428]">
                  Dirección
                </p>

                <p className="mt-2 text-lg leading-7 text-gray-600">
                  {venue.address}
                </p>

              </div>

            </div>

            {/* Características */}

            <div className="mt-10 flex flex-wrap gap-3">

              {venue.features.map((feature) => (

                <span
                  key={feature}
                  className="rounded-full bg-[#D9B471]/10 px-5 py-2 text-sm font-medium text-[#AF8428]"
                >
                  {feature}
                </span>

              ))}

            </div>

            {/* Botones */}

            <div className="mt-12 flex flex-wrap gap-4">

              <Button href="/programacion">
                Ver programación
              </Button>

              <button
                disabled
                className="
                  rounded-full
                  border
                  border-[#AF8428]/30
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  text-[#AF8428]
                  transition
                  opacity-60
                  cursor-not-allowed
                "
              >
                Enlace virtual 
                <span className="ml-2 text-xs">
                  (Próximamente)
                </span>
              </button>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}