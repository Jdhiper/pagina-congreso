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
            className="pb-28 last:pb-0"
          >

          {/* Cabecera */}

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            {block.title}
          </span>

          <h2 className="mt-4 font-playfair text-4xl leading-tight text-dark">
            {block.theme}
          </h2>

          <div className="mt-8 border-b border-[#D9B471]/30" />

          {/* Eventos */}

          <div className="mt-4">

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