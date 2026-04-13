// ···················································· //
// ··· HERO-MESSAGES.TSX: Mensajes animados del Hero ··· //
// ···················································· //

// ··· Indicamos que el componente se ejecuta en el cliente. ··· //
"use client";

// ··· Importamos las librerías de animación y hooks de React. ··· //
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ··· Lista de mensajes que rotan en el carrusel del hero. ··· //
const messages = [
  "Descubre lugares únicos cerca de ti",
  "Guarda tus restaurantes favoritos",
  "Explora propuestas modernas y urbanas",
  "Conecta con nuevas experiencias gastronómicas",
  "Encuentra ambientes memorables y auténticos",
];

// ··· Componente de mensajes animados con control de puntos de navegacion. ··· //
export function HeroMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass w-full rounded-2xl px-5 py-5">
      <p className="text-sm text-white/60">Experiencias destacadas</p>

      <div className="relative mt-3 h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute left-0 top-0 text-base font-semibold text-white sm:text-lg"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {messages.map((_, bulletIndex) => (
          <button
            key={bulletIndex}
            type="button"
            aria-label={`Ir al mensaje ${bulletIndex + 1}`}
            onClick={() => setIndex(bulletIndex)}
            className={`h-2.5 rounded-full transition-all duration-300 ${bulletIndex === index
              ? "w-6 bg-[#FF5B04]"
              : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}