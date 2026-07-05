import Link from "next/link";
import Container from "../ui/Container";
import {
  CalendarDays,
  Users,
  MapPin,
  ClipboardPen,
  GraduationCap,
} from "lucide-react";

const links = [
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
    href: "/inscripciones",
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
    <section className="bg-background py-12">

      <Container>

        {/* Encabezado */}

        <div className="mb-8 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-primary">
            Explore el Congreso
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-dark">
            Accesos rápidos
          </h2>

          <div className="mx-auto mt-4 h-px w-20 bg-[#D9B471]" />

        </div>

        {/* Barra de accesos */}

        <div
          className="
            rounded-[32px]
            border
            border-[#D9B471]/20
            bg-white/70
            p-3
            backdrop-blur-xl
          "
        >

          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">

            {links.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    p-4
                    transition-all
                    duration-300
                    hover:bg-[#F7F5F0]

                    ${
                      item.title === "Certificados"
                        ? "col-span-2 md:col-span-1"
                        : ""
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D9B471]/40
                      bg-white
                      transition-all
                      duration-300
                      group-hover:border-[#AF8428]
                      group-hover:bg-[#AF8428]
                      group-hover:scale-105
                    "
                  >

                    <Icon
                      size={20}
                      className="
                        text-primary
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    />

                  </div>

                  <span
                    className="
                      mt-3
                      text-center
                      text-xs
                      font-medium
                      leading-4
                      text-dark
                      transition-colors
                      duration-300
                      group-hover:text-primary
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