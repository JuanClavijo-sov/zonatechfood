// ··············································································· //
// ··· AUTH-SHELL.TSX: Layout compartido para login y registro (ZonaTechFood)   ··· //
// ··············································································· //

// ··· Dos columnas en desktop: mensaje de marca + tarjeta con el formulario.   ··· //
// ··· Props tipadas para título, descripción, pie y enlace al flujo complementario. ··· //

"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

/** Propiedades del layout: texto de marketing + hijo (formulario) + pie con enlace. */
type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: ReactNode;
};

export function AuthShell({
  badge,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthShellProps) {
  return (
    <section className="relative overflow-hidden px-4 py-10 md:px-6 md:py-16">
      {/* Luces de fondo reutilizadas del hero para mantener continuidad visual */}
      <div className="hero-glow left-[8%] top-[12%]" />
      <div className="hero-glow bottom-[10%] right-[6%]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Columna izquierda: entrada animada con argumentos de valor (seguro, rápido, intuitivo). */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium tracking-[0.18em] text-white/55 uppercase">
            {badge}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/68 md:text-lg">
            {description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-bold text-white">Seguro</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Accede con una experiencia clara, moderna y confiable.
              </p>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-bold text-white">Rápido</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Formularios sencillos diseñados para completar en pocos pasos.
              </p>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-bold text-white">Intuitivo</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Una interfaz consistente con toda la experiencia de ZonaTechFood.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Columna derecha: tarjeta de cristal con el formulario inyectado como children */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="mx-auto w-full max-w-md"
        >
          <Card className="glass rounded-[30px] border-white/10 bg-white/8">
            <CardContent className="p-6 md:p-8">
              {children}

              {/* CTA secundario: alternar entre login y registro según la página padre. */}
              <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/60">
                {footerText}{" "}
                <Link
                  href={footerLinkHref}
                  className="font-medium text-[#FF5B04] transition-colors hover:text-[#ff7a33]"
                >
                  {footerLinkText}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}