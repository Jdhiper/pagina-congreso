import Link from "next/link";
import Container from "../ui/Container";
import Logo from "./logo";
import {
    FaInstagram,
    FaFacebookF,
    FaTiktok,
    FaYoutube,
} from "react-icons/fa6";

const links = [
  ["Inicio", "/"],
  ["Congreso", "/congreso"],
  ["Programación", "/programacion"],
  ["Ponentes", "/ponentes"],
  ["Sedes", "/sedes"],
  ["Certificados", "/certificados"],
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/jornadasidpp/",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1EnNrE2fHF/",
    label: "Facebook",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@congreso.de.derec?_r=1&_t=ZS-97vEWiuTJyS",
    label: "TikTok",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@jornadasiberoamericanas",
    label: "YouTube",
  },
];
export default function Footer() {
  return (
    <footer className="bg-[#1B2126]">

      <Container className="py-14">

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* Logo */}

          <div className="text-center lg:text-left">

            <div className="flex items-center justify-center lg:justify-start">
                <Logo />
            </div>
            

            <p className="mt-6 text-gray-400">

              III Jornadas Iberoamericanas de Derecho Procesal Penal.
            </p>

            <p className="mt-6 max-w-sm text-gray-400">
              Un espacio académico para el intercambio de conocimientos en Derecho
              Procesal Penal con énfasis en Inteligencia Artificial.
            </p>

          </div>

          {/* Navegación */}

          <div>

            <h3 className="mb-5 text-center font-semibold text-[#D9B471] lg:text-left">

              Navegación

            </h3>

            <div className="grid grid-cols-2 gap-3 text-center lg:text-left">

              {links.map(([title, href]) => (

                <Link
                  key={title}
                  href={href}
                  className="text-gray-300 transition hover:text-[#D9B471]"
                >
                  {title}
                </Link>

              ))}

            </div>

          </div>

          {/* Contacto */}

          <div className="text-center lg:text-left">

            <h3 className="mb-5 font-semibold text-[#D9B471]">

              Contacto

            </h3>

            <p className="text-gray-300">

              congresoderechopro@gmail.com

            </p>

            <p className="mt-2 text-gray-400">

              Colombia · México

            </p>

          <div className="mt-6 flex justify-center gap-5 lg:justify-start">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-gray-300
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D9B471]
                  hover:text-[#D9B471]
                "
              >
                <Icon size={18} />
              </a>
            ))}

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500 space-y-2">
          <p>
            © 2026 III Jornadas Iberoamericanas de Derecho Procesal Penal.
            Todos los derechos reservados.
          </p>

          <p>
            Diseñado y desarrollado por{" "}
            <a
              href="https://github.com/Jdhiper"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D9B471] transition hover:text-white"
            >
              Juan Zambrano
            </a>
          </p>
        </div>

      </Container>

    </footer>
  );
}