"use client";

import { useMemo, useState } from "react";

import PageHero from "@/components/pages/PageHero";

import Container from "@/components/ui/Container";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Timeline from "@/components/ui/Timeline";

import { schedule, ScheduleBlock } from "@/data/schedule";

export default function ProgramacionClient() {
  const [venue, setVenue] = useState("Pasto");
  const [day, setDay] = useState("13 Ago");

  const venueInfo = {
  Pasto: {
    phase: "Primera fase",
    dates: "13 y 14 de agosto de 2026",
    place: "San Juan de Pasto · Modalidad presencial y virtual",
    badges: [
      "Inscripción gratuita",
      "Certificación con 80% de asistencia",
      "Más de 90 ponentes internacionales",
    ],
  },

  Envigado: {
    phase: "Segunda fase",
    dates: "22, 23 y 24 de septiembre · 20, 21, 22 y 23 de octubre de 2026",
    place: "Envigado · Modalidad presencial y virtual",
    badges: [
      "Inscripción gratuita",
      "8 ejes temáticos",
      "Conferencistas internacionales",
    ],
  },

  Jalisco: {
    phase: "Tercera fase",
    dates: "17, 18 y 19 de noviembre de 2026",
    place: "Guadalajara, Jalisco · México",
    badges: [
      "Inscripción gratuita",
      "Encuentro internacional",
      "Modalidad presencial y virtual",
    ],
  },
};

const info = venueInfo[venue as keyof typeof venueInfo];

const blocks: ScheduleBlock[] = useMemo(() => {
  if (venue !== "Pasto") return [];

  return day === "13 Ago"
    ? schedule.pasto["13"] ?? []
    : schedule.pasto["14"] ?? [];
}, [venue, day]);

  return (
    <>

      <main className="bg-[#F8F8F7]">

        <PageHero
          title="Programación Oficial"
          subtitle="Consulta la agenda académica de las III Jornadas Iberoamericanas de Derecho Procesal Penal. Explora las conferencias, paneles y actividades programadas para cada una de las sedes del evento."
        />

        {/* Encabezado */}

        <section className="py-14 md:py-20">

          <Container>

            <div className="mx-auto max-w-4xl text-center">

              <span className="text-sm uppercase tracking-[0.35em] text-primary">
                {info.phase}
              </span>

              <h2 className="mt-5 font-playfair text-4xl text-dark md:text-5xl">
                {info.dates}
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {info.place}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">

                {info.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[#D9B471]/10 px-5 py-2 text-sm font-medium text-primary"
                  >
                    {badge}
                  </span>
                ))}

              </div>

            </div>

          </Container>

        </section>

        {/* Selector de sedes */}

        <section className="pb-10">

          <Container>

            <SegmentedControl
              items={["Pasto", "Envigado", "Jalisco"]}
              value={venue}
              onChange={setVenue}
            />

          </Container>

        </section>

        {/* Selector de días */}

        {venue === "Pasto" && (

          <section className="pb-16">

            <Container>

              <SegmentedControl
                items={["13 Ago", "14 Ago"]}
                value={day}
                onChange={setDay}
              />

            </Container>

          </section>

        )}

        {/* Timeline */}

        <section className="pt-8 pb-32 md:pt-12 md:pb-40">

          <Container>

            {blocks.length > 0 ? (

              <Timeline blocks={blocks} />

            ) : (

              <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-12 md:p-16 shadow-sm">

                <div className="text-center">

                  <span className="text-sm uppercase tracking-[0.35em] text-primary">
                    Próximamente
                  </span>

                  <h2 className="mt-4 font-playfair text-3xl text-dark">
                    Programación en construcción
                  </h2>

                  <p className="mt-5 text-gray-600 leading-8">
                    La agenda oficial para esta sede será publicada muy pronto.
                    Mientras tanto puedes consultar la programación disponible
                    para la ciudad de Pasto.
                  </p>

                </div>

              </div>

            )}

          </Container>

        </section>

      </main>


    </>
  );
}