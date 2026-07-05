"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Button from "../ui/Button";
import Container from "../ui/Container";
import Logo from "./logo";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Congreso", href: "/congreso" },
  { name: "Programación", href: "/programacion" },
  { name: "Ponentes", href: "/ponentes" },
  { name: "Sedes", href: "/sedes" },
  { name: "Certificados", href: "/certificados" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pageTitles: Record<string, string> = {
  "/": "INICIO",
  "/congreso": "CONGRESO",
  "/programacion": "PROGRAMACIÓN",
  "/ponentes": "PONENTES",
  "/sedes": "SEDES",
  "/certificados": "CERTIFICADOS",
  "/inscripciones": "INSCRIPCIONES",
};

  return (
    <header className="fixed top-5 left-0 z-50 w-full">
      <Container>

      <nav
        className={`
          relative
          mx-auto
          flex
          items-center
          justify-between
          rounded-full
          border
          border-white/15
          bg-white/5
          backdrop-blur-2xl
          transition-all
          duration-500
          ${
            scrolled
              ? "h-16 px-6 shadow-lg"
              : "h-20 px-8"
          }
        `}
      >

          {/* Logo */}
            
            <Logo />


            <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">

              <span
                className="
                  text-xs
                  tracking-[0.35em]
                  text-[#D9B471]
                  uppercase
                "
              >
                {pageTitles[pathname]}
              </span>

            </div>

          {/* Desktop */}

          <ul className="hidden lg:flex items-center gap-9">

            {links.map((item) => (

              <li key={item.name}>

                <Link
                  href={item.href}
                  className={`
                    relative
                    pb-2
                    text-sm
                    transition-colors
                    duration-300

                    ${
                      pathname === item.href
                        ? "text-[#D9B471]"
                        : "text-white hover:text-[#D9B471]"
                    }
                  `}
                >

                  {item.name}

                  {pathname === item.href && (

                    <span
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-full
                        rounded-full
                        bg-[#D9B471]
                      "
                    />

                  )}

                </Link>
              </li>

            ))}

          </ul>

          <div className="hidden lg:block">
            <Button>
              Inscripciones
            </Button>
          </div>

          {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="
                lg:hidden
                rounded-full
                p-2
                text-white
                transition
                hover:bg-white/10
              "
            >
            {open ? (

              <XMarkIcon className="h-7 w-7" />

            ) : (

              <Bars3Icon className="h-7 w-7" />

            )}

          </button>

          {/* Menú móvil */}

          {open && (

            <div
              className="
                absolute
                left-0
                top-[78px]
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#1B2126]/90
                p-5
                backdrop-blur-2xl
                lg:hidden
              "
            >

              <div className="flex flex-col gap-2">

                {links.map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      rounded-2xl
                      px-4
                      py-3
                      transition-all
                      ${
                        pathname === item.href
                          ? "bg-white/10 text-[#D9B471]"
                          : "text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {item.name}
                  </Link>

                ))}

                <Button className="mt-4 w-full">
                  Inscripciones
                </Button>

              </div>

            </div>

          )}

        </nav>

      </Container>
    </header>
  );
}