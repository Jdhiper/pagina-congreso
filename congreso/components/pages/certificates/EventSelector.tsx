"use client";

import { motion } from "framer-motion";
import { Building2, Check,Mountain,Landmark, } from "lucide-react";

import { events } from "@/data/events";
import { cn } from "@/lib/utils";


interface EventSelectorProps {
  value: string;
  onChange: (eventId: string) => void;
}

export default function EventSelector({
  value,
  onChange,
}: EventSelectorProps) {
  return (
    <div className="space-y-3">

      <label className="block text-sm font-semibold text-[#222931]">
        Evento
      </label>

      <div
        className="
          grid
          grid-cols-3
          gap-3
        "
      >

        {events.map((event) => {

          const selected = value === event.id;
          let Icon = Building2;

            if (event.name === "Pasto") {
            Icon = Mountain;
            }

            if (event.name === "Envigado") {
            Icon = Building2;
            }

            if (event.name === "Guadalajara") {
            Icon = Landmark;
            }

          return (

            <motion.button
              key={event.id}
              type="button"
              onClick={() => onChange(event.id)}
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: .98,
              }}
              transition={{
                duration: .18,
              }}
              className={cn(
                `
                relative
                overflow-hidden

                rounded-2xl

                border

                px-3
                py-4

                transition-all

                duration-300
                `,
                selected
                  ? `
                    border-[#D9B471]

                    bg-[#222931]

                    shadow-xl

                    shadow-[#AF8428]/25
                  `
                  : `
                    border-gray-200

                    bg-white

                    hover:border-[#D9B471]

                    hover:bg-[#FAF8F2]
                  `
              )}
            >

              {/* Glow */}

              {selected && (

                <div
                  className="
                    absolute
                    left-1/2
                    top-0

                    h-24
                    w-24

                    -translate-x-1/2

                    rounded-full

                    bg-[#AF8428]/20

                    blur-3xl
                  "
                />

              )}

              <div className="relative z-10 flex flex-col items-center">

                <div
                  className={cn(
                    `
                    mb-3

                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-xl

                    transition
                    `,
                    selected
                      ? "bg-white/10"
                      : "bg-[#F7F3EA]"
                  )}
                >

                  <Icon
                    size={20}
                    className={
                      selected
                        ? "text-[#D9B471]"
                        : "text-[#AF8428]"
                    }
                  />

                </div>

                <span
                  className={cn(
                    `
                    text-sm
                    font-semibold
                    text-center
                    `,
                    selected
                      ? "text-white"
                      : "text-[#222931]"
                  )}
                >
                  {event.name}
                </span>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: selected ? 1 : 0,
                    scale: selected ? 1 : .5,
                    marginTop: selected ? 12 : 0,
                    height: selected ? 24 : 0,
                  }}
                  transition={{
                    duration: .18,
                  }}
                  className="
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      flex

                      h-6
                      w-6

                      items-center
                      justify-center

                      rounded-full

                      bg-[#D9B471]
                    "
                  >
                    <Check
                      size={14}
                      className="text-[#222931]"
                    />
                  </div>

                </motion.div>

              </div>

            </motion.button>

          );

        })}

      </div>

    </div>
  );
}