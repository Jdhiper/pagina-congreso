import { Coffee, MessageSquare, Mic2, Landmark, Drama } from "lucide-react";

interface Event {
  time: string;
  type: string;
  title?: string;
  subtitle?: string;
  speaker?: string;
  role?: string;
}

interface Session {
  title: string;
  period: string;
  events: Event[];
}

interface Day {
  date: string;
  sessions: Session[];
}

interface Props {
  day: Day;
}

export default function ScheduleTimeline({ day }: Props) {
  const getIcon = (type: string) => {
    switch (type) {
      case "conference":
        return <Mic2 className="h-5 w-5 text-[#AF8428]" />;

      case "break":
        return <Coffee className="h-5 w-5 text-[#AF8428]" />;

      case "panel":
        return <MessageSquare className="h-5 w-5 text-[#AF8428]" />;

      case "ceremony":
        return <Landmark className="h-5 w-5 text-[#AF8428]" />;

      case "culture":
        return <Drama className="h-5 w-5 text-[#AF8428]" />;

      default:
        return <Mic2 className="h-5 w-5 text-[#AF8428]" />;
    }
  };

  return (
    <div className="space-y-12">

      <div>

        <h2 className="font-playfair text-3xl text-dark">
          {day.date}
        </h2>

      </div>

      {day.sessions.map((session) => (

        <section key={session.title}>

          <div className="mb-8">

            <span className="rounded-full bg-[#AF8428]/10 px-4 py-2 text-sm text-primary">

              {session.period}

            </span>

            <h3 className="mt-4 text-2xl font-semibold text-dark">

              {session.title}

            </h3>

          </div>

          <div className="space-y-5">

            {session.events.map((event, index) => (

              <div
                key={index}
                className="
                  flex
                  gap-5
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  transition
                  hover:border-[#AF8428]/40
                  hover:shadow-lg
                "
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#AF8428]/10">

                  {getIcon(event.type)}

                </div>

                <div className="flex-1">

                  <span className="text-sm font-semibold text-primary">

                    {event.time}

                  </span>

                  {event.speaker ? (

                    <>
                      <h4 className="mt-2 text-lg font-semibold text-dark">
                        {event.speaker}
                      </h4>

                      <p className="mt-1 text-gray-600">
                        {event.role}
                      </p>
                    </>

                  ) : (

                    <>
                      <h4 className="mt-2 text-lg font-semibold text-dark">
                        {event.title}
                      </h4>

                      {event.subtitle && (
                        <p className="mt-1 text-gray-600">
                          {event.subtitle}
                        </p>
                      )}
                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

      ))}

    </div>
  );
}