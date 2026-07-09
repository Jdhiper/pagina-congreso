"use client";

import { useMemo, useState } from "react";

import PageHero from "@/components/pages/PageHero";

import RegistrationCTA from "@/components/sections/RegistrationCTA";

import SpeakerGrid from "@/components/pages/speakers/SpeakerGrid";
import SpeakerModal from "@/components/pages/speakers/SpeakerModal";

import { speakers, Speaker } from "@/data/speakers";

export default function PonentesClient() {
  const [country, setCountry] = useState("Todos");
  const [search, setSearch] = useState("");

  const [selectedSpeaker, setSelectedSpeaker] =
    useState<Speaker | null>(null);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) => {
      const matchesCountry =
        country === "Todos" ||
        speaker.countryCode === country;

      const matchesSearch = speaker.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCountry && matchesSearch;
    });
  }, [country, search]);

  return (
    <>

      <main className="bg-[#F8F8F7]">

        <PageHero
          title="Ponentes"
          subtitle="Magistrados, jueces, docentes, investigadores y profesionales del Derecho provenientes de diferentes países participarán en las III Jornadas Iberoamericanas de Derecho Procesal Penal."
        />

        <SpeakerGrid
          speakers={filteredSpeakers}
          country={country}
          setCountry={setCountry}
          search={search}
          setSearch={setSearch}
          onSelectSpeaker={setSelectedSpeaker}
        />

        <SpeakerModal
          speaker={selectedSpeaker}
          open={selectedSpeaker !== null}
          onClose={() => setSelectedSpeaker(null)}
        />

        <RegistrationCTA />

      </main>

    </>
  );
}