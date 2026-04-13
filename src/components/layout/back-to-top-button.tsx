// ·················································································· //
// ··· BACK-TO-TOP-BUTTON.TSX: Boton Flotante para Volver al Inicio de Pagina ··· //
// ·················································································· //

// ··· Boton flotante animado que aparece al hacer scroll y lleva al usuario al inicio. ··· //

"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

// ··· Umbral de scroll en pixeles a partir del cual se muestra el boton. ··· //
export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 320);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ··· Funcion que desplaza la pagina suavemente hasta el inicio. ··· //
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.button
                    type="button"
                    aria-label="Volver arriba"
                    onClick={handleBackToTop}
                    initial={{ opacity: 0, y: 24, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="glass fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_0_24px_rgba(255,91,4,0.18)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,91,4,0.28)]"
                >
                    <ChevronUp className="size-5" />
                </motion.button>
            ) : null}
        </AnimatePresence>
    );
}