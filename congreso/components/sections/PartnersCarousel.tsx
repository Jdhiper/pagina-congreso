"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { partners } from "@/data/partners";

export default function PartnersCarousel() {
  const logos = [...partners, ...partners];

  return (
    <section className="bg-[#F8F8F7] py-12 overflow-hidden">

      <Container>

        <div className="mb-8 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Organizan y apoyan
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-dark">
            Instituciones Aliadas
          </h2>

        </div>

      </Container>

      <div className="relative overflow-hidden">

        <div className="partners-track">

          {logos.map((partner, index) => (

            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-16 w-36 mx-8 flex-shrink-0"
            >

              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain opacity-70 transition hover:opacity-100"
              />

            </a>

          ))}

        </div>

      </div>

    </section>
  );
}