// ·················································· //
// ··· NAVBAR.TSX: Barra superior de ZonaTechFood ··· //
// ·················································· //

// ··· Cabecera sticky con transición al scroll y acciones según sesión (Supabase). ··· //
// ··· Menú móvil: hamburger + drawer animado con AnimatePresence. ··· //

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

// ··· Enlaces principales de navegación. ··· //
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/restaurants", label: "Restaurantes" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  // ··· Estado del menú móvil. ··· //
  const [mobileOpen, setMobileOpen] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  // ··· Scroll con histeresis para evitar parpadeo en el umbral. ··· //
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

  // ··· Sesión inicial + suscripción a cambios de auth. ··· //
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (isMounted) setUser(user);
      } catch {
        // ··· Sin conexión: dejamos user=null para mostrar botones de invitado. ··· //
      } finally {
        if (isMounted) setAuthLoading(false);
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
  }, [supabase]);

  // ··· Cerrar menú móvil al cambiar de ruta (click en enlace). ··· //
  const closeMobile = () => setMobileOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0, paddingTop: isScrolled ? "0rem" : "1rem" }}
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
          {/* Columna 1: marca */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="text-base font-bold tracking-tight text-white sm:text-lg"
              onClick={closeMobile}
            >
              ZonaTechFood
            </Link>
          </div>

          {/* Columna 2: navegación desktop (md+) */}
          <nav className="hidden items-center justify-center md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.35 }}
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

          {/* Columna 3: auth desktop + hamburger móvil */}
          <div className="flex items-center justify-end gap-3">
            {/* Auth — solo visible en md+ */}
            <div className="hidden items-center gap-4 md:flex">
              {authLoading ? (
                <div className="h-9 w-32 rounded-xl bg-white/8" />
              ) : user ? (
                <>
                  <Link
                    href="/profile"
                    className="max-w-[180px] truncate text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {user.user_metadata?.full_name || user.email}
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="h-auto rounded-xl bg-[#FF5B04] px-5 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_18px_rgba(255,91,4,0.24)]"
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-auto rounded-xl px-4 py-2 text-white transition-all duration-300 hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/login">Iniciar sesión</Link>
                  </Button>
                  <Button
                    asChild
                    className="h-auto rounded-xl bg-[#FF5B04] px-5 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_18px_rgba(255,91,4,0.24)]"
                  >
                    <Link href="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Hamburger — solo visible en móvil */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Drawer móvil ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay oscuro para cerrar al hacer clic fuera */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />

            {/* Panel del menú */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[#0d0d0d]/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              {/* Cabecera del drawer */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                <span className="text-base font-bold tracking-tight text-white">
                  ZonaTechFood
                </span>
                <button
                  onClick={closeMobile}
                  aria-label="Cerrar menú"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Links de navegación */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className="flex h-11 items-center rounded-xl px-4 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Enlace de perfil si hay sesión */}
                  {user && (
                    <motion.li
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.29, duration: 0.3 }}
                    >
                      <Link
                        href="/profile"
                        onClick={closeMobile}
                        className="flex h-11 items-center rounded-xl px-4 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                      >
                        Mi perfil
                      </Link>
                    </motion.li>
                  )}
                </ul>
              </nav>

              {/* Footer del drawer: auth */}
              <div className="border-t border-white/8 px-4 py-5">
                {authLoading ? (
                  <div className="h-11 rounded-xl bg-white/8" />
                ) : user ? (
                  <div className="space-y-3">
                    <p className="truncate px-1 text-xs text-white/45">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <Button
                      onClick={() => { closeMobile(); handleLogout(); }}
                      className="h-11 w-full rounded-xl bg-[#FF5B04] text-white hover:bg-[#e65000]"
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      asChild
                      className="h-11 w-full rounded-xl bg-[#FF5B04] text-white hover:bg-[#e65000]"
                    >
                      <Link href="/login" onClick={closeMobile}>
                        Iniciar sesión
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 w-full rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href="/register" onClick={closeMobile}>
                        Registrarse
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}