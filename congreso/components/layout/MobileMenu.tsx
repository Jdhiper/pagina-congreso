"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface Props {
  open: boolean;
}

const links = [
  { name: "Inicio", href: "/" },
  { name: "Congreso", href: "/congreso" },
  { name: "Programación", href: "/programacion" },
  { name: "Ponentes", href: "/ponentes" },
  { name: "Sedes", href: "/sedes" },
  { name: "Certificados", href: "/certificados" },
];

export default function MobileMenu({ open }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="absolute left-0 right-0 top-full mt-3 rounded-3xl border border-black/5 bg-white p-6 shadow-xl"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark transition hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}