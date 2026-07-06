import Link from "next/link";
import Container from "../ui/Container";
import { speakers } from "@/data/speakers";
import Button from "../ui/Button";
import Image from "next/image";

export default function FeaturedSpeakers() {
  return (
    <section className="bg-[#F8F8F7] py-16">

      <Container>

        <div className="mb-10 flex items-end justify-between">

          <div>

            <span className="text-sm uppercase tracking-[0.35em] text-primary">
              Ponentes
            </span>

            <h2 className="mt-3 font-playfair text-3xl text-dark">
              Invitados destacados
            </h2>

          </div>

          <Link
            href="/ponentes"
            className="hidden md:block text-primary font-medium"
          >
            Ver todos →
          </Link>

        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {speakers
            .filter((speaker) => speaker.featured)
            .map((speaker) => (
            <div
              key={speaker.name}
              className="
                rounded-3xl
                overflow-hidden
                border
                border-[#D9B471]/20
                bg-white
              "
            >

              <div className="group overflow-hidden rounded-3xl relative aspect-[4/5]">

                <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105"
                />
            </div>

              <div className="p-3">

                <h3 className="font-semibold text-dark leading-snug">

                  {speaker.name}

                </h3>

                <p className="mt-2 text-xs text-primary">

                  {speaker.country}

                </p>

                <p className="mt-2 text-sm text-gray-500">

                  {speaker.position}

                </p>
                

              </div>

            </div>

          ))}

        </div>
          <div className = "text-center">
            <Button
                href="/ponentes"
                className="mt-10"
            >
                Ver todos los ponentes
            </Button>
          </div>

      </Container>

    </section>
  );
}