import ScheduleItem from "./ScheduleItem";

interface Event {
  time: string;
  title: string;
  subtitle?: string;
  type?: string;
}

interface Props {
  date: string;
  period: string;
  title: string;
  events: Event[];
}

export default function ScheduleSection({
  date,
  period,
  title,
  events,
}: Props) {
  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      {date && (
        <p className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
          {date}
        </p>
      )}

      <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-[#355C7D]">
        {period}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#1B2126]">
        {title}
      </h2>

      <div className="mt-8">

        {events.map((event, index) => (
          <ScheduleItem
            key={index}
            {...event}
          />
        ))}

      </div>

    </section>
  );
}