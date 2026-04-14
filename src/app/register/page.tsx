// ·················································· //
// ··· PAGE.TSX: Pagina de registro de usuario ··· //
// ·················································· //

// ··· Pagina de registro de nuevos usuarios. ··· //
// ··· Conectada con Supabase Auth (signUp) y metadata full_name en user_metadata. ··· //
// ··· Misma envoltura visual que login (AuthShell) para coherencia entre flujos. ··· //

"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { AuthShell } from "@/components/forms/auth-shell";
import { PasswordInput } from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  // ··· Estados locales: carga, validación y mensajes tras signUp. ··· //
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // ··· Supabase client para CSR. ··· //
  const supabase = createClient(); // Supabase client para CSR

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ··· Reiniciar avisos y marcar envío en curso. ··· //
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    // ··· Comprobar que todos los campos llegaron desde el formulario. ··· //
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    // ··· Evitar registros con contraseñas distintas antes de llamar a Supabase. ··· //
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    // ··· Política mínima de longitud alineada con lo habitual en Auth. ··· //
    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    // ··· Alta en Supabase; full_name queda en user_metadata para perfil futuro. ··· //
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // ··· Éxito: limpiar formulario y enviar al login con recarga para alinear sesión y navbar. ··· //
    setSuccessMessage("Cuenta creada correctamente. Ya puedes iniciar sesión.");
    form.reset();
    setLoading(false);

    window.location.href = "/login";
  };

  return (
    /* Registro: datos básicos + confirmación de contraseña; pie con enlace a login */
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

      <form onSubmit={handleRegister} className="mt-8 space-y-5">
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
            name="name"
            type="text"
            placeholder="Tu nombre"
            disabled={loading}
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Correo como identificador principal para acceso posterior. */}
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
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            disabled={loading}
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Contraseña inicial; la coincidencia con confirmación se validará antes del envío. */}
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
            name="password"
            placeholder="••••••••"
            disabled={loading}
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
            name="confirmPassword"
            placeholder="••••••••"
            disabled={loading}
            className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
          />
        </motion.div>

        {/* Banner de feedback: error de validación o Supabase, o mensaje de cuenta creada. */}
        {(errorMessage || successMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-4 py-3 text-sm ${
              errorMessage
                ? "border-red-400/20 bg-red-500/10 text-red-200"
                : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {errorMessage || successMessage}
          </motion.div>
        )}

        {/* Envío del alta: botón deshabilitado mientras Supabase procesa signUp. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45 }}
          className="pt-2"
        >
          <Button
            type="submit"
            disabled={loading}
            className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-[#FF5B04] text-base text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="relative z-10">
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </span>
            <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </motion.div>
      </form>
    </AuthShell>
  );
}