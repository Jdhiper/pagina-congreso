import Container from "../ui/Container";
import { venues } from "@/data/venues";
import Link from "next/link";

export default function Venues() {
  return (
    <section className="bg-background py-16">

      <Container>

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Sedes
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-dark">
            Tres ciudades
          </h2>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

        {venues.map((venue) => (

          <Link
            key={venue.city}
            href={`/sedes?city=${venue.city.toLowerCase()}`}
            className="
              group
              relative
              overflow-hidden

              rounded-3xl

              border
              border-[#D9B471]/20

              bg-white

              p-7

              text-center

              transition-all
              duration-300

              hover:-translate-y-2
              hover:border-[#AF8428]
              hover:shadow-xl
              hover:shadow-[#AF8428]/15
            "
          >

            <div
              className="
                absolute
                right-0
                top-0

                h-28
                w-28

                rounded-full

                bg-[#AF8428]/5

                blur-3xl
              "
            />

            <div className="relative z-10">

              <div className="text-4xl">
                {venue.country}
              </div>

              <h3 className="mt-4 font-playfair text-2xl text-[#1B2126]">
                {venue.city}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {venue.date}
              </p>

              <p
                className="
                  mt-6

                  font-medium

                  text-[#AF8428]

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                Ver información →
              </p>

            </div>

          </Link>

        ))}
        </div>

      </Container>

    </section>
  );
}