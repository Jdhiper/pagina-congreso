import Link from "next/link";
import Container from "../ui/Container";
import {
  CalendarDays,
  Users,
  MapPin,
  ClipboardPen,
  GraduationCap,
  Landmark,
} from "lucide-react";

const links = [
  {
    title: "Congreso",
    href: "/congreso",
    icon: Landmark,
  },
  {
    title: "Programación",
    href: "/programacion",
    icon: CalendarDays,
  },
  {
    title: "Ponentes",
    href: "/ponentes",
    icon: Users,
  },
  {
    title: "Sedes",
    href: "/sedes",
    icon: MapPin,
  },
  {
    title: "Inscripciones",
    href: "https://forms.cloud.microsoft/r/00RS9Lhvjp?origin=QRCode&qrcodeorigin=presentation",
    icon: ClipboardPen,
  },
  {
    title: "Certificados",
    href: "/certificados",
    icon: GraduationCap,
  },
];

export default function QuickAccess() {
  return (
    <section className="bg-background pt-10 pb-4">

      <Container>

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
            Explore el Congreso
          </span>

          <h2 className="mt-3 font-playfair text-4xl text-[#1B2126]">
            Accesos rápidos
          </h2>

          <p className="mt-4 text-gray-500">
            Toda la información importante a un solo clic.
          </p>

        </div>

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/60
            bg-white/55
            p-2
            backdrop-blur-2xl
            shadow-xl
            shadow-black/5
            "
        >

          {/* brillo superior */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-br
              from-white/40
              via-transparent
              to-[#D9B471]/10
            "
          />

          <div className="grid grid-cols-3 gap-2 md:grid-cols-6">

            {links.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.title}
                  href={item.href}
                  className="
                  group
                  relative

                  flex
                  flex-col
                  items-center
                  justify-center

                  overflow-hidden

                  rounded-2xl

                  border
                  border-transparent

                  bg-white/35

                  px-3
                  py-4

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#D9B471]/60
                  hover:bg-white/70
                  hover:shadow-lg
                  hover:shadow-[#AF8428]/15
                "
                >

                  {/* Glow */}

                   <div
                    className="
                      absolute

                      -right-8
                      -top-8

                      h-24
                      w-24

                      rounded-full

                      bg-[#AF8428]/10

                      opacity-0

                      blur-3xl

                      transition-all
                      duration-300

                      group-hover:opacity-100
                    "
                    />


                  <div
                    className="
                      relative

                      flex
                      h-11
                      w-11
                      md:h-12
                      md:w-12

                      items-center
                      justify-center

                      rounded-2xl

                      bg-white

                      transition-all
                      duration-300

                      group-hover:bg-[#AF8428]/10
                    "
                  >

                    <Icon
                      size={20}
                      className="
                        text-[#AF8428]

                        transition-all
                        duration-300

                        group-hover:scale-110
                        group-hover:rotate-6
                    "
                    />

                  </div>

                  <span
                    className="
                      mt-2

                      text-[11px]
                      md:text-xs

                      font-semibold

                      leading-tight

                      text-center

                      text-[#222931]

                      transition-colors
                      duration-300

                      group-hover:text-[#AF8428]
                    "
                  >
                    {item.title}
                  </span>

                </Link>

              );

            })}

          </div>

        </div>

      </Container>

    </section>
  );
}