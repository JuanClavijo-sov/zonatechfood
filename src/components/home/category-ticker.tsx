// ·················································· //
// ··· CATEGORY-TICKER.TSX: Ticker de Categorias ··· //
// ·················································· //

// ··· Componente de carrusel animado con las categorias de restaurantes. ··· //

"use client";

import { motion } from "motion/react";

// ··· Lista de categorias disponibles en la plataforma. ··· //
const categories = [
    "Hamburguesas",
    "Sushi",
    "Pizza",
    "Cafeterías",
    "Vegano",
    "Parrilla",
    "Italiana",
    "Mexicana",
    "Asiática",
    "Postres",
    "Fusión",
    "Mariscos",
];

// ··· Duplicamos las categorias para generar el efecto de loop infinito. ··· //
const duplicatedCategories = [...categories, ...categories];

export function CategoryTicker() {
    return (
        <section className="px-4 py-8 md:py-10">
            <div className="mx-auto max-w-7xl overflow-hidden">
                <div className="mb-4">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                        Categorías destacadas
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0A1E3F]/80 via-[#0A1E3F]/20 to-transparent backdrop-blur-[2px]" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0A1E3F]/80 via-[#0A1E3F]/20 to-transparent backdrop-blur-[2px]" />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 34,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex w-max gap-4"
                        style={{ willChange: "transform" }}
                    >
                        {duplicatedCategories.map((category, index) => (
                            <motion.div
                                key={`${category}-${index}`}
                                whileHover={{ y: -3, scale: 1.03 }}
                                transition={{ duration: 0.2 }}
                                className="glass flex min-w-max items-center rounded-full px-5 py-3 text-sm font-medium text-white/85 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,91,4,0.16)]"
                            >
                                <span className="mr-2 h-2 w-2 rounded-full bg-[#FF5B04]" />
                                {category}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}