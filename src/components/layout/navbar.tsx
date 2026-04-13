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
    const ENTER_SCROLL = 96;
    const EXIT_SCROLL = 36;

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
      initial={{ opacity: 0, y: -18 }}
      animate={{
        opacity: 1,
        y: 0,
        paddingTop: isScrolled ? "0rem" : "1rem",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="sticky top-0 z-50 px-0"
      style={{ willChange: "padding-top, transform, opacity" }}
    >
      <motion.div
        animate={{
          maxWidth: isScrolled ? "100%" : "75%",
          borderRadius: isScrolled ? "0rem" : "1rem",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.08)",
          borderColor: isScrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.12)",
          boxShadow: isScrolled
            ? "0 8px 24px rgba(0, 0, 0, 0.14)"
            : "0 10px 24px rgba(0, 0, 0, 0.16)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="mx-auto grid h-14 w-full grid-cols-[1fr_auto_1fr] items-center border px-4 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(10px)",
          willChange: "max-width, background-color, border-radius, box-shadow",
        }}
      >
        {/* LOGO */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-white sm:text-lg"
          >
            ZonaTechFood
          </Link>
        </div>

        {/* LINKS */}
        <nav className="hidden items-center justify-center md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.06,
                  duration: 0.35,
                }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {link.label}

                  {/* underline animado */}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF5B04] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* BOTONES */}
        <div className="flex items-center justify-end gap-2">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
          >
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-xl px-4 py-2 text-white transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.35 }}
          >
            <Button
              asChild
              className="h-auto rounded-xl bg-[#FF5B04] px-5 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_18px_rgba(255,91,4,0.24)]"
            >
              <Link href="/register">Registrarse</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}