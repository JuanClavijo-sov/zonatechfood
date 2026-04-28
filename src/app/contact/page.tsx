// ······················································ //
// ··· CONTACT/PAGE.TSX: Pagina principal de Contacto ··· //
// ······················································ //

// ··· Formulario de contacto con diseño glassmorphism acorde al resto de la app. ··· //
// ··· Formulario de contacto con diseño glassmorphism. Guarda en tabla contact_messages. ··· //

"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const supabase = useMemo(() => createClient(), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !subject || !message) {
      setErrorMessage("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    // ··· Inserta en la tabla contact_messages (RLS permite insert para anon). ··· //
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message });

    if (error) {
      setErrorMessage("No se pudo enviar el mensaje. Inténtalo de nuevo.");
      console.error("Error inserting contact message:", error.message);
    } else {
      setSuccessMessage(
        "¡Mensaje enviado correctamente! Te responderemos lo antes posible."
      );
      form.reset();
    }

    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 md:pt-12">
      {/* Luces decorativas */}
      <div className="hero-glow left-[8%] top-[12%]" />
      <div className="hero-glow bottom-[10%] right-[6%]" />

      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Contacto
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            ¿Tienes alguna pregunta o sugerencia?
          </h1>
          <p className="mt-5 text-base leading-8 text-white/65">
            Estamos aquí para ayudarte. Escríbenos y nos pondremos en contacto
            contigo lo antes posible.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Columna izquierda: información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Tarjeta de email */}
            <div className="glass rounded-[28px] border-white/10 p-6 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5B04]/15">
                <Mail className="size-5 text-[#FF5B04]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Correo electrónico
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Envíanos un correo y te responderemos en menos de 24 horas.
              </p>
              <p className="mt-3 text-sm font-medium text-[#FF5B04]">
                hola@zonatechfood.com
              </p>
            </div>

            {/* Tarjeta de ubicación */}
            <div className="glass rounded-[28px] border-white/10 p-6 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5B04]/15">
                <MapPin className="size-5 text-[#FF5B04]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Ubicación
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Operamos de forma digital desde Medellín, Colombia.
              </p>
              <p className="mt-3 text-sm font-medium text-[#FF5B04]">
                Medellín, Colombia
              </p>
            </div>

            {/* Tarjeta de soporte */}
            <div className="glass rounded-[28px] border-white/10 p-6 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5B04]/15">
                <MessageSquare className="size-5 text-[#FF5B04]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                Soporte
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                ¿Problemas con tu cuenta o favoritos? Cuéntanos y lo resolvemos
                rápido.
              </p>
            </div>
          </motion.div>

          {/* Columna derecha: formulario */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="glass rounded-[28px] border-white/10 p-6 md:p-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Envíanos un mensaje
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Rellena el formulario y nos pondremos en contacto contigo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-white/80">
                  Tu nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre completo"
                  disabled={loading}
                  className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
                />
              </motion.div>

              {/* Email */}
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

              {/* Asunto */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.45 }}
                className="space-y-2"
              >
                <Label htmlFor="subject" className="text-white/80">
                  Asunto
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="¿Sobre qué quieres hablar?"
                  disabled={loading}
                  className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
                />
              </motion.div>

              {/* Mensaje */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="space-y-2"
              >
                <Label htmlFor="message" className="text-white/80">
                  Mensaje
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/6 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#FF5B04] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </motion.div>

              {/* Feedback */}
              {(errorMessage || successMessage) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border px-4 py-3 text-sm ${errorMessage
                    ? "border-red-400/20 bg-red-500/10 text-red-200"
                    : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                    }`}
                >
                  {errorMessage || successMessage}
                </motion.div>
              )}

              {/* Botón enviar */}
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
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="size-4" />
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </span>
                  <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}