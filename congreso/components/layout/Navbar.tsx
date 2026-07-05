"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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

const pageTitles: Record<string, string> = {
  "/": "INICIO",
  "/congreso": "CONGRESO",
  "/programacion": "PROGRAMACIÓN",
  "/ponentes": "PONENTES",
  "/sedes": "SEDES",
  "/certificados": "CERTIFICADOS",
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
  mobile?: boolean;
  onClick?: () => void;
}

function NavLink({
  href,
  children,
  active,
  mobile = false,
  onClick,
}: NavLinkProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`
          flex
          items-center
          justify-between
          rounded-2xl
          px-5
          py-4
          transition-all
          duration-300

          ${
            active
              ? "border border-[#D9B471]/30 bg-[#D9B471]/10 text-[#D9B471]"
              : "text-white hover:bg-white/5"
          }
        `}
      >
        <span>{children}</span>

        {active && (
          <span className="h-2 w-2 rounded-full bg-[#D9B471]" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`
        relative
        pb-2
        text-sm
        transition-colors
        duration-300

        ${
          active
            ? "text-[#D9B471]"
            : "text-white hover:text-[#D9B471]"
        }
      `}
    >
      {children}

      <span
        className={`
          absolute
          left-0
          -bottom-[2px]
          h-[2px]
          rounded-full
          bg-[#D9B471]
          transition-all
          duration-300

          ${
            active
              ? "w-full"
              : "w-0 group-hover:w-full"
          }
        `}
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
    return (
    <header className="fixed inset-x-0 top-5 z-50">

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
            border-white/10
            backdrop-blur-2xl
            transition-all
            duration-500

            ${
              scrolled
                ? "h-16 bg-[#1B2126]/65 px-6 shadow-xl"
                : "h-20 bg-white/5 px-8"
            }
          `}
        >

          {/* Logo */}

          <div className="z-20 flex items-center">
            <Logo />
          </div>

          {/* Desktop */}

          <ul className="hidden items-center gap-10 lg:flex">

            {links.map((item) => (

              <li key={item.href} className="group">

                <NavLink
                  href={item.href}
                  active={pathname === item.href}
                >
                  {item.name}
                </NavLink>

              </li>

            ))}

          </ul>

          {/* Botón Desktop */}

          <div className="hidden lg:block">

            <Button href="/inscripciones">
              Inscripciones
            </Button>

          </div>

          {/* Centro Mobile */}

          <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">

            <span className="text-xs uppercase tracking-[0.35em] text-[#D9B471]">

              {pageTitles[pathname] ?? ""}

            </span>

          </div>

          {/* Botón menú */}

          <button
            onClick={() => setOpen(!open)}
            className="
              z-20
              rounded-full
              p-2
              text-white
              transition-all
              duration-300
              hover:bg-white/10
              lg:hidden
            "
          >

            {open ? (

              <XMarkIcon className="h-7 w-7" />

            ) : (

              <Bars3Icon className="h-7 w-7" />

            )}

          </button>

          {/* Menú móvil */}

          <AnimatePresence>

            {open && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: -20,
                  scale: 0.98,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.98,
                }}

                transition={{
                  duration: 0.25,
                }}

                className="
                  absolute
                  left-0
                  top-[85px]
                  w-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#1B2126]/90
                  p-5
                  backdrop-blur-3xl
                  lg:hidden
                "
              >

                <div className="flex flex-col gap-2">

                  {links.map((item) => (

                    <NavLink
                      key={item.href}
                      href={item.href}
                      mobile
                      active={pathname === item.href}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </NavLink>

                  ))}

                  <div className="pt-4">

                    <Button
                      href="/inscripciones"
                      className="w-full"
                    >
                      Inscripciones
                    </Button>

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </nav>

      </Container>

    </header>
  );
}