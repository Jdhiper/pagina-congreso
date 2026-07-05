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

export default function Footer() {
  return (
    <footer className="bg-[#1B2126]">

      <Container className="py-14">

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Logo */}

          <div className="text-center lg:text-left">

            <div className="flex items-center justify-center">
                <Logo />
            </div>
            

            <p className="mt-6 text-gray-400">

              III Jornadas Iberoamericanas de Derecho Procesal Penal.

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

              contacto@jornadasiberoamericanas.com

            </p>

            <p className="mt-2 text-gray-400">

              Colombia · México

            </p>

            <div className="mt-6 flex justify-center gap-5 lg:justify-start">

                {[FaInstagram, FaFacebookF, FaTiktok, FaYoutube].map(
                (Icon, i) => (
                    <a
                    key={i}
                    href="#"
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
                        transition
                        hover:border-[#D9B471]
                        hover:text-[#D9B471]
                    "
                    >
                    <Icon size={18} />
                    </a>
                )
                )}

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">

          © 2026 III Jornadas Iberoamericanas de Derecho Procesal Penal.

        </div>

      </Container>

    </footer>
  );
}