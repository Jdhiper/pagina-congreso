"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <header className="fixed top-5 left-0 z-50 w-full">
      <Container>

        <nav
          className="
          relative
          mx-auto
          flex
          h-20
          items-center
          justify-between
          rounded-full
          border
          border-white/10
          bg-white/5
          px-8
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.10)]
          "
        >

          {/* Logo */}
            
            <Logo />

          {/* Desktop */}

          <ul className="hidden lg:flex items-center gap-9">

            {links.map((item) => (

              <li key={item.name}>

                <Link
                  href={item.href}
                  className="text-sm text-white/90 transition hover:text-[#D9B471]"
                >
                  {item.name}
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
            className="lg:hidden text-white"
          >

            {open ? (

              <XMarkIcon className="h-7 w-7" />

            ) : (

              <Bars3Icon className="h-7 w-7" />

            )}

          </button>

          {/* Menú */}

          {open && (

            <div className="absolute left-0 top-[90px] w-full rounded-3xl border border-white/20 bg-[#222931]/95 p-6 backdrop-blur-xl lg:hidden">

              <div className="flex flex-col gap-5">

                {links.map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white transition hover:text-[#D9B471]"
                    onClick={() => setOpen(false)}
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