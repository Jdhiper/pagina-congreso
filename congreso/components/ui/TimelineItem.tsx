interface TimelineItemProps {
  event: {
    time: string;
    title?: string;
    subtitle?: string;
    speaker?: string;
    position?: string;
    country?: string;
  };
  isLast?: boolean;
}

export default function TimelineItem({
  event,
  isLast = false,
}: TimelineItemProps) {
  return (
      <article
        className={`
          py-5 md:py-6
          ${!isLast ? "border-b border-[#D9B471]/20" : ""}
        `}
      >
      <div className="flex flex-col md:flex-row md:gap-12">

        <div className="mb-4 w-24 shrink-0">

          <span className="font-playfair text-2xl text-primary">
            {event.time}
          </span>

        </div>

        <div className="flex-1">

          {event.speaker ? (

            <>

              <h3 className="text-2xl font-semibold text-dark">
                {event.speaker}
              </h3>

              <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
                {event.position}
              </p>

              {event.country && (

                <p className="mt-3 text-primary font-medium">
                  {event.country}
                </p>

              )}

            </>

          ) : (

            <>

              <h3 className="text-2xl font-semibold text-dark">
                {event.title}
              </h3>

              {event.subtitle && (

                <p className="mt-3 text-lg leading-8 text-gray-600">
                  {event.subtitle}
                </p>

              )}

            </>

          )}

        </div>

      </div>

    </article>
  );
}
