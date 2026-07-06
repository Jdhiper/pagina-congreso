import Container from "@/components/ui/Container";

interface Venue {
  id: string;
  city: string;
  country: string;
  date: string;
  phase: string;
  name: string;
  address: string;
  modality: string;
  image: string;
  map: string;
  description: string;
  digitalRoute: string;
  features: string[];
}

interface VenueMapProps {
  venue: Venue;
}

export default function VenueMap({ venue }: VenueMapProps) {
  return (
    <section className="bg-white py-24">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
            Ubicación
          </span>

          <h2 className="mt-5 font-playfair text-4xl text-[#1B2126] md:text-5xl">
            Cómo llegar a la sede
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Consulta la ubicación de{" "}
            <strong className="font-semibold text-[#1B2126]">
              {venue.name}
            </strong>{" "}
            y planifica tu llegada con anticipación.
          </p>

        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] border border-[#D9B471]/20 shadow-xl">

          <iframe
            src={venue.map}
            width="100%"
            height="520"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />

        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-[#F8F8F7] p-8">

            <h3 className="font-playfair text-2xl text-[#1B2126]">
              Dirección
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              {venue.address}
            </p>

          </div>

          <div className="rounded-3xl bg-[#F8F8F7] p-8">

            <h3 className="font-playfair text-2xl text-[#1B2126]">
              Modalidad
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              {venue.modality}
            </p>

          </div>

          <div className="rounded-3xl bg-[#F8F8F7] p-8">

            <h3 className="font-playfair text-2xl text-[#1B2126]">
              Fechas
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              {venue.date}
            </p>

          </div>

        </div>

      </Container>

    </section>
  );
}