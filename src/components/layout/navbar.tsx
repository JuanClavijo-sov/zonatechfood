// ·················································· //
// ··· NAVBAR.TSX: Barra superior de ZonaTechFood ··· //
// ·················································· //

// ··· Cabecera sticky con transición al scroll y acciones según sesión (Supabase). ··· //
// ··· TODO: Refinar responsive (menu movil) y estados hover/focus del bloque auth. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

// ··· Enlaces principales; la columna central solo se muestra desde breakpoint md. ··· //
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/restaurants", label: "Restaurantes" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  // ··· isScrolled: estrecha la barra y refuerza el fondo al bajar la pagina. ··· //
  const [isScrolled, setIsScrolled] = useState(false);
  // ··· user: null hasta resolver getUser; luego se actualiza con onAuthStateChange. ··· //
  const [user, setUser] = useState<User | null>(null);
  // ··· authLoading: evita parpadeo entre "invitado" y "logueado" en la primera pintura. ··· //
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // ··· Umbrales distintos al subir y bajar para que el cambio no tiemble (histeresis). ··· //
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

  useEffect(() => {
    let isMounted = true;

    // ··· Sesión inicial y suscripción: login/logout en otras pestañas también se reflejan. ··· //
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (isMounted) {
        setUser(user);
        setAuthLoading(false);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    // ··· Cierra sesión en Supabase y recarga el origen para limpiar estado en cliente. ··· //
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    /* Cabecera animada: padding superior y entrada desde arriba */
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
      {/* Contenedor tipo "capsula" que al hacer scroll pasa a ancho completo y borde 0 */}
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
        {/* Columna 1: marca / home */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-white sm:text-lg"
          >
            ZonaTechFood
          </Link>
        </div>

        {/* Columna 2: navegacion secundaria (solo md+) */}
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
                  className="text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Columna 3: estado de auth — esqueleto | sesión | invitado */}
        <div className="flex items-center justify-end gap-6">
          {authLoading ? (
            /* Placeholder mientras getUser no ha terminado */
            <div className="h-9 w-32 rounded-xl bg-white/8" />
          ) : user ? (
            /* Usuario logueado: nombre o email + cierre de sesión */
            <div className="flex items-center gap-4">
              <span className="max-w-[180px] truncate text-sm text-white/70">
                {user.user_metadata?.full_name || user.email}
              </span>

              <Button
                onClick={handleLogout}
                className="h-auto rounded-xl bg-[#FF5B04] px-5 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_18px_rgba(255,91,4,0.24)]"
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            /* Invitado: login (ghost) y registro (primario) con entrada escalonada */
            <>
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
            </>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}