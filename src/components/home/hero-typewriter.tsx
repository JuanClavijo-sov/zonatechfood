// ·················································· //
// ··· HERO-TYPEWRITER.TSX: Efecto de escritura     ··· //
// ·················································· //

// ··· Indicamos que el componente se ejecuta en el cliente. ··· //
"use client";

// ··· Importamos los hooks de React necesarios. ··· //
import { useEffect, useMemo, useState } from "react";

// ··· Frases que se escriben y borran en el efecto typewriter. ··· //
const phrases = [
  "Descubre tu próxima experiencia gastronómica",
  "Explora restaurantes modernos e innovadores",
  "Encuentra sabores únicos en tu ciudad",
  "Guarda tus lugares favoritos en un solo sitio",
];

// ··· Constantes de velocidad: escritura, borrado y tiempo de espera (ms). ··· //
const TYPING_SPEED = 55;
const DELETING_SPEED = 28;
const HOLD_TIME = 1400;

// ··· Componente de efecto typewriter: escribe y borra frases en bucle. ··· //
export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = useMemo(
    () => phrases[phraseIndex],
    [phraseIndex]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, HOLD_TIME);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, DELETING_SPEED);
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      }, TYPING_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [currentPhrase, displayedText, isDeleting]);

  return (
    <div className="min-h-[40px] sm:min-h-[44px]">
      <p className="text-sm font-medium tracking-wide text-white/75 sm:text-base">
        {displayedText}
        <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-[#FF5B04] align-middle" />
      </p>
    </div>
  );
}