import { ScheduleBlock } from "@/data/schedule";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
  blocks: ScheduleBlock[];
}

export default function Timeline({ blocks }: TimelineProps) {
  return (
    <div className="mx-auto max-w-5xl">

      {blocks.map((block, index) => (

        <section
          key={index}
          className="pb-16 md:pb-20 last:pb-0"
        >

          {/* Cabecera */}

          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary">
            {block.title}
          </span>

          <h2 className="mt-2 font-playfair text-3xl md:text-4xl leading-tight text-dark">
            {block.theme}
          </h2>

          <div className="mt-6 border-b border-[#D9B471]/30" />

          {/* Eventos */}

          <div className="mt-2">

            {block.events.map((event, i) => (

              <TimelineItem
                key={i}
                event={event}
                isLast={i === block.events.length - 1}
              />

            ))}

          </div>

        </section>

      ))}

    </div>
  );
}