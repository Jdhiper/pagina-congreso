import Link from "next/link";
import Container from "../ui/Container";
import {
  CalendarDays,
  Users,
  MapPin,
  GraduationCap,
  ClipboardPen,
} from "lucide-react";

const actions = [
  {
    title: "Inscripciones",
    href: "/inscripciones",
    icon: ClipboardPen,
    primary: true,
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
    title: "Certificados",
    href: "/certificados",
    icon: GraduationCap,
    dark: true,
  },
];

export default function QuickAccess() {
  return (
    <section className="bg-[#F2F2F1] py-16">

      <Container>

        <div className="mb-10 text-center">

          <span className="text-sm uppercase tracking-[0.35em] text-[#AF8428]">
            Acceso rápido
          </span>

          <h2 className="mt-3 font-playfair text-3xl text-[#1B2126] md:text-4xl">
            ¿Qué desea hacer?
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

          {actions.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.title}
                href={item.href}
                className={`
                  group
                  rounded-3xl
                  border
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg

                  ${
                    item.primary
                      ? "bg-[#AF8428] border-[#AF8428] text-white"
                      : item.dark
                      ? "bg-[#1B2126] border-[#1B2126] text-white"
                      : "bg-white border-[#D9B471]/40 text-[#1B2126]"
                  }
                `}
              >

                <Icon
                  size={34}
                  className={`mb-5 transition-transform duration-300 group-hover:scale-110 ${
                    item.primary || item.dark
                      ? "text-white"
                      : "text-[#AF8428]"
                  }`}
                />

                <p className="font-medium leading-6">
                  {item.title}
                </p>

              </Link>

            );

          })}

        </div>

      </Container>

    </section>
  );
}