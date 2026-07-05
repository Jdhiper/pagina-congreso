import Button from "../ui/Button";
import Container from "../ui/Container";
import { venues } from "@/data/venues";

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

            <div
              key={venue.city}
              className="
                rounded-3xl
                border
                border-[#D9B471]/20
                p-6
                text-center
              "
            >

              <div className="text-3xl">

                {venue.country}

              </div>

              <h3 className="mt-3 font-playfair text-2xl text-dark">

                {venue.city}

              </h3>

              <p className="mt-2 text-sm text-gray-500">

                {venue.date}

              </p>

            </div>

          ))}

        </div>

          <div className = "text-center">
            <Button
                href="/sedes"
                className="mt-10"
            >
                Ver las sedes
            </Button>
          </div>

      </Container>

    </section>
  );
}