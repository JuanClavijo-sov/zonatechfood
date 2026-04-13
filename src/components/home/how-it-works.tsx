// ··············································································· //
// ··· HOW-IT-WORKS.TSX: Seccion de Como Funciona la Plataforma              ··· //
// ··············································································· //

// ··· Explica en tres pasos (Explora, Guarda, Conecta) el funcionamiento de la app. ··· //

"use client";

import { motion } from "motion/react";
import { Heart, Search, Send } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// ··· Definicion de los tres pasos que explican el funcionamiento de la plataforma. ··· //
const steps = [
    {
        icon: Search,
        title: "Explora",
        description:
            "Navega por categorías, descubre restaurantes destacados y encuentra propuestas gastronómicas que encajen contigo.",
    },
    {
        icon: Heart,
        title: "Guarda",
        description:
            "Añade tus restaurantes favoritos para acceder rápidamente a ellos y organizar mejor tus próximos planes.",
    },
    {
        icon: Send,
        title: "Conecta",
        description:
            "Consulta detalles clave, revisa información importante y contacta con lugares que te interesen.",
    },
];

export function HowItWorks() {
    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 max-w-2xl"
                >
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                        Cómo funciona
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                        Una forma simple, visual y moderna de descubrir restaurantes
                    </h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: index * 0.12, duration: 0.55, ease: "easeOut" }}
                            >
                                <Card className="glass group h-full rounded-[28px] border-white/10 bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(255,91,4,0.14)]">
                                    <CardContent className="p-7">
                                        <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,91,4,0.18)]">
                                            <Icon className="size-6 text-[#FF5B04]" />
                                        </div>

                                        <h3 className="mt-6 text-2xl font-semibold text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mt-4 text-sm leading-7 text-white/65">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}