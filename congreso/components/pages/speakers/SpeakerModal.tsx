"use client";

import Image from "next/image";
import Link from "next/link";

import Modal from "@/components/ui/Modal";
import { Speaker } from "@/data/speakers";

interface Props {
  speaker: Speaker | null;
  open: boolean;
  onClose: () => void;
}

export default function SpeakerModal({
  speaker,
  open,
  onClose,
}: Props) {
  if (!open || !speaker) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8">

        <div className="flex flex-col gap-6 md:flex-row md:items-start">

          {/* FOTO */}

          <div className="mx-auto md:mx-0">

            <div className="relative mx-auto h-56 w-40 overflow-hidden rounded-2xl md:mx-0">

              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover"
              />

            </div>

          </div>

          {/* INFORMACIÓN */}

          <div className="flex-1">

            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              {speaker.country}
            </p>

            <h2 className="mt-3 font-playfair text-3xl text-dark leading-tight">
              {speaker.name}
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {speaker.position}
            </p>

            {speaker.bio && (

              <p className="mt-6 leading-8 text-gray-600">
                {speaker.bio}
              </p>

            )}

            {(speaker.website || speaker.linkedin || speaker.x) && (

              <div className="mt-8">

                <h3 className="mb-3 text-sm font-semibold text-dark">
                  Enlaces
                </h3>

                <div className="flex flex-wrap gap-3">

                  {speaker.website && (

                    <Link
                      href={speaker.website}
                      target="_blank"
                      className="
                        rounded-full
                        border
                        border-[#D9B471]/20
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:bg-[#F8F8F7]
                      "
                    >
                      Sitio web
                    </Link>

                  )}

                  {speaker.linkedin && (

                    <Link
                      href={speaker.linkedin}
                      target="_blank"
                      className="
                        rounded-full
                        border
                        border-[#D9B471]/20
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:bg-[#F8F8F7]
                      "
                    >
                      LinkedIn
                    </Link>

                  )}

                  {speaker.x && (

                    <Link
                      href={speaker.x}
                      target="_blank"
                      className="
                        rounded-full
                        border
                        border-[#D9B471]/20
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:bg-[#F8F8F7]
                      "
                    >
                      X
                    </Link>

                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </Modal>
  );
}