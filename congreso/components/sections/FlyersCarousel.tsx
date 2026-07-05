"use client";

import Image from "next/image";
import Container from "../ui/Container";
import Carousel from "../ui/Carousel";
import { flyers } from "@/data/flyers";

export default function FlyersCarousel() {
  return (
    <section className="py-16 bg-background">

      <Container>

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Información
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-dark">
            Flyers del Congreso
          </h2>

        </div>

        <Carousel>

          {flyers.map((flyer) => (

            <div
              key={flyer}
              className="
                min-w-full
                md:min-w-[50%]
                lg:min-w-[33.333%]
                px-3
              "
            >

              <div className="overflow-hidden rounded-[32px]">

                <Image
                  src={flyer}
                  alt="Flyer"
                  width={600}
                  height={800}
                  className="
                    w-full
                    rounded-[32px]
                    transition
                    duration-500
                    hover:scale-105
                  "
                />

              </div>

            </div>

          ))}

        </Carousel>

      </Container>

    </section>
  );
}