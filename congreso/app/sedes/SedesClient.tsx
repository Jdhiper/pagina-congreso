"use client";

import { useMemo, useState } from "react";

import PageHero from "@/components/pages/PageHero";

import SegmentedControl from "@/components/ui/SegmentedControl";

import VenueInfo from "@/components/pages/venues/VenueInfo";
import VenueMap from "@/components/pages/venues/VenueMap";

import { venues } from "@/data/venues";

export default function SedesPage() {
  const [selectedVenue, setSelectedVenue] = useState("Pasto");

  const venue = useMemo(() => {
    return venues.find((v) => v.city === selectedVenue);
  }, [selectedVenue]);

  if (!venue) return null;

  return (
    <>
      <main className="bg-[#F8F8F7]">

        <PageHero
          title="Nuestras sedes"
          subtitle="Conoce las ciudades e instituciones que recibirán las III Jornadas Iberoamericanas de Derecho Procesal Penal durante sus diferentes fases en Colombia y México."
        />

        {/* Selector */}

        <section className="py-12">

          <SegmentedControl
            items={["Pasto", "Envigado", "Guadalajara"]}
            value={selectedVenue}
            onChange={setSelectedVenue}
          />

        </section>

        {/* Información */}

        <VenueInfo venue={venue} />

        {/* Mapa */}

        <VenueMap venue={venue} />

      </main>

    </>
  );
}