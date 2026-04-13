// ············································ //
// ··· NAVBAR.TSX: Componente de Navegacion ··· //
// ············································ //

// TODO: Mejorar el diseño de la barra de navegacion.

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/restaurants", label: "Restaurantes" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ENTER_SCROLL = 80;
    const EXIT_SCROLL = 32;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled((prev) => {
        if (!prev && currentY > ENTER_SCROLL) return true;
        if (prev && currentY < EXIT_SCROLL) return false;
        return prev;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{
        opacity: 1,
        y: 0,
        paddingTop: isScrolled ? "0rem" : "1rem",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 px-0"
    >
      <motion.div
        animate={{
          maxWidth: isScrolled ? "100%" : "67.9rem",
          borderRadius: isScrolled ? "0rem" : "1rem",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.07)"
            : "rgba(255, 255, 255, 0.08)",
          borderColor: isScrolled
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.12)",
          boxShadow: isScrolled
            ? "0 10px 28px rgba(0, 0, 0, 0.18)"
            : "0 10px 30px rgba(0, 0, 0, 0.18)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto grid h-14 grid-cols-[1fr_auto_1fr] items-center border px-4 backdrop-blur-[18px]"
        style={{ WebkitBackdropFilter: "blur(18px)" }}
      >
        <div className="flex items-center justify-start">
          <Link href="/" className="text-base font-bold tracking-tight text-white sm:text-lg">
            ZonaTechFood
          </Link>
        </div>

        <nav className="hidden items-center justify-center md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
          >
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-xl px-4 py-2 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.38, duration: 0.45 }}
          >
            <Button
              asChild
              className="h-auto rounded-xl bg-[#FF5B04] px-5 py-2 text-white hover:bg-[#e65000]"
            >
              <Link href="/register">Registrarse</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}