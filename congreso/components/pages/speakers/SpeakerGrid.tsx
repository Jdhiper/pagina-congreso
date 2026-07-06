"use client";

import Container from "@/components/ui/Container";

import SpeakerCard from "./SpeakerCard";

import { Speaker } from "@/data/speakers";

interface SpeakerGridProps {
  speakers: Speaker[];

  country: string;
  setCountry: (value: string) => void;

  search: string;
  setSearch: (value: string) => void;

  onSelectSpeaker: (speaker: Speaker) => void;
}

const countries = [
  "Todos",
  "Colombia",
  "México",
  "Ecuador",
  "Alemania",
];

export default function SpeakerGrid({
  speakers,
  country,
  setCountry,
  search,
  setSearch,
  onSelectSpeaker,
}: SpeakerGridProps) {
  return (
    <section className="pb-24 md:pb-32">

      <Container>

        {/* Encabezado */}

        <div className="mx-auto mb-14 max-w-3xl">

          <input
            type="text"
            placeholder="Buscar ponente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-full
              border
              border-[#D9B471]/20
              bg-white
              px-6
              py-4
              text-dark
              shadow-sm
              outline-none
              transition
              focus:border-[#AF8428]
              focus:ring-4
              focus:ring-[#AF8428]/10
            "
          />

          {/* Filtros */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {countries.map((item) => {

              const active = item === country;

              return (

                <button
                  key={item}
                  onClick={() => setCountry(item)}
                  className={`
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-300

                    ${
                      active
                        ? "bg-[#AF8428] text-white shadow-lg shadow-[#AF8428]/20"
                        : "border border-[#D9B471]/20 bg-white text-gray-600 hover:border-[#AF8428] hover:text-[#AF8428]"
                    }
                  `}
                >
                  {item}
                </button>

              );

            })}

          </div>

        </div>

        {/* Grid */}

        {speakers.length > 0 ? (

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            {speakers.map((speaker) => (

              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                onClick={() => onSelectSpeaker(speaker)}
              />

            ))}

          </div>

        ) : (

          <div className="py-20 text-center">

            <h2 className="font-playfair text-4xl text-dark">
              No se encontraron ponentes
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Intenta realizar otra búsqueda o selecciona un país diferente.
            </p>

          </div>

        )}

      </Container>

    </section>
  );
}