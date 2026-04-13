// ············································· //
// ··· PAGE.TSX: Pagina de inicio de sesion   ··· //
// ············································· //

// ··· Pagina de inicio de sesion del usuario. ··· //
// ··· TODO: Conectar envío del formulario con autenticación real (API, sesión, validación). ··· //
// ··· Presentación: AuthShell (columna informativa + tarjeta) y campos con animación suave. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { AuthShell } from "@/components/forms/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/forms/password-input";

export default function LoginPage() {
  return (
    /* Contenedor de auth: título lateral, tarjeta con formulario y enlace a registro */
    <AuthShell
      badge="Acceso"
      title="Inicia sesión y continúa explorando tus lugares favoritos"
      description="Accede a tu cuenta para gestionar favoritos, descubrir restaurantes destacados y mantener una experiencia personalizada dentro de ZonaTechFood."
      footerText="¿Aún no tienes una cuenta?"
      footerLinkText="Regístrate"
      footerLinkHref="/register"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white">Bienvenido de nuevo</h2>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Introduce tus credenciales para acceder a tu cuenta.
        </p>
      </div>

      <form className="mt-8 space-y-5">
        {/* Campo correo: type email y estilos coherentes con el tema oscuro de la tarjeta. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="space-y-2"
        >
          <Label htmlFor="email" className="text-white/80">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Contraseña con alternancia mostrar/ocultar (PasswordInput) y enlace placeholder a recuperación. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="password" className="text-white/80">
              Contraseña
            </Label>

            <Link
              href="#"
              className="text-xs font-medium text-[#FF5B04] transition-colors hover:text-[#ff7a33]"
            >
              ¿La olvidaste?
            </Link>
          </div>

          <PasswordInput
            id="password"
            placeholder="••••••••"
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Acción principal: submit pendiente de handler (login real). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="pt-2"
        >
          <Button
            type="submit"
            className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-[#FF5B04] text-base text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)]"
          >
            <span className="relative z-10">Iniciar sesión</span>
            <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </motion.div>
      </form>
    </AuthShell>
  );
}