"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PageHero from "@/components/pages/PageHero";
import SegmentedControl from "@/components/ui/SegmentedControl";
import VenueInfo from "@/components/pages/venues/VenueInfo";
import VenueMap from "@/components/pages/venues/VenueMap";

import { venues } from "@/data/venues";

export default function SedesPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const city =
    (searchParams.get("city") ?? "pasto").toLowerCase();

  const selectedVenue =
    venues.find(
      (v) => v.city.toLowerCase() === city
    )?.city ?? "Pasto";

  const venue = useMemo(() => {
    return (
      venues.find(
        (v) => v.city === selectedVenue
      ) ?? venues[0]
    );
  }, [selectedVenue]);

  return (
    <main className="bg-[#F8F8F7]">

      <PageHero
        title="Nuestras sedes"
        subtitle="Conoce las ciudades e instituciones que recibirán las III Jornadas Iberoamericanas de Derecho Procesal Penal durante sus diferentes fases en Colombia y México."
      />

      <section className="py-12">

        <SegmentedControl
          items={[
            "Pasto",
            "Envigado",
            "Guadalajara",
          ]}
          value={selectedVenue}
          onChange={(city) =>
            router.push(
              `/sedes?city=${city.toLowerCase()}`
            )
          }
        />

      </section>

      <VenueInfo venue={venue} />

      <VenueMap venue={venue} />

    </main>
  );
}