"use client";

import { useState } from "react";
import Container from "../ui/Container";
import { faqs } from "@/data/faq";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background py-16">

      <Container className="max-w-4xl">

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Preguntas frecuentes
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-dark">
            Resolvemos tus dudas
          </h2>

        </div>

        <div className="space-y-3">

          {faqs.map((faq, index) => (

            <div
              key={faq.question}
              className="rounded-3xl border border-[#D9B471]/20 bg-white overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >

                <span className="font-medium text-dark">

                  {faq.question}

                </span>

                <ChevronDown
                  size={18}
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (

                <div className="px-5 pb-5 text-gray-600">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
}