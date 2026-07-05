"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">

      <div
        className="overflow-hidden"
        ref={emblaRef}
      >

        <div className="flex">

          {children}

        </div>

      </div>

      <button
        onClick={scrollPrev}
        className="
          absolute
          left-2
          top-1/2
          -translate-y-1/2
          z-10
          rounded-full
          bg-white/90
          p-2
          shadow-lg
          transition
          hover:bg-white
        "
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={scrollNext}
        className="
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          z-10
          rounded-full
          bg-white/90
          p-2
          shadow-lg
          transition
          hover:bg-white
        "
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}