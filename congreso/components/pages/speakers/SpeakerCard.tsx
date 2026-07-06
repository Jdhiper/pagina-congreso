"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Speaker } from "@/data/speakers";

interface SpeakerCardProps {
  speaker: Speaker;
  onClick: () => void;
}

export default function SpeakerCard({
  speaker,
  onClick,
}: SpeakerCardProps) {
  return (
    <div
      className="
        rounded-3xl
        overflow-hidden
        border
        border-[#D9B471]/20
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="group relative aspect-[4/5] overflow-hidden">

        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

      </div>

      <div className="p-5">

        <h3 className="font-playfair text-xl leading-snug text-dark">
          {speaker.name}
        </h3>

        <p className="mt-2 text-xs text-primary">
          {speaker.country}
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {speaker.position}
        </p>

        <button
          onClick={onClick}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
            transition-all
            hover:gap-3
          "
        >
          Más información

          <ArrowRightIcon className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}