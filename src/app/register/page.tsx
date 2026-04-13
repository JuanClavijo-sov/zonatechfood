// ············································· //
// ··· PAGE.TSX: Pagina de registro de usuario ··· //
// ············································· //

// ··· Pagina de registro de nuevos usuarios.      ··· //
// ··· TODO: Conectar envío con API de alta, validación y políticas de contraseña. ··· //
// ··· Misma envoltura visual que login (AuthShell) para coherencia entre flujos.   ··· //

"use client";

import { motion } from "motion/react";

import { AuthShell } from "@/components/forms/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/forms/password-input";

export default function RegisterPage() {
  return (
    /* Registro: datos basicos + confirmacion de contrasena; pie con enlace a login */
    <AuthShell
      badge="Registro"
      title="Crea tu cuenta y empieza a vivir una experiencia gastronómica más personalizada"
      description="Regístrate en ZonaTechFood para guardar restaurantes favoritos, descubrir nuevas propuestas y construir tu propio recorrido dentro de la plataforma."
      footerText="¿Ya tienes una cuenta?"
      footerLinkText="Inicia sesión"
      footerLinkHref="/login"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white">Crear cuenta</h2>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Completa tus datos para empezar a explorar.
        </p>
      </div>

      <form className="mt-8 space-y-5">
        {/* Nombre visible en la cuenta; animación escalonada con el resto de bloques. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="space-y-2"
        >
          <Label htmlFor="name" className="text-white/80">
            Nombre completo
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Correo como identificador principal para acceso posterior */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
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

        {/* Contraseña inicial; la coincidencia con confirmación se validará en el backend o en cliente. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="space-y-2"
        >
          <Label htmlFor="password" className="text-white/80">
            Contraseña
          </Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Repetición de contraseña para reducir errores de tecleo antes del envío. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="space-y-2"
        >
          <Label htmlFor="confirmPassword" className="text-white/80">
            Confirmar contraseña
          </Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Envío del alta; falta onSubmit y estados de carga / error. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45 }}
          className="pt-2"
        >
          <Button
            type="submit"
            className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-[#FF5B04] text-base text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)]"
          >
            <span className="relative z-10">Crear cuenta</span>
            <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </motion.div>
      </form>
    </AuthShell>
  );
}