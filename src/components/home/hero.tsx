// ·············································· //
// ··· HERO.TSX: Componente principal del Hero ··· //
// ·············································· //

// ··· Indicamos que el componente se ejecuta en el cliente. ··· //
"use client";

// ··· Importamos los componentes necesarios. ··· //
import Link from "next/link";
import { motion } from "motion/react";

// ··· Importamos los sub-componentes del Hero. ··· //
import { HeroMessages } from "@/components/home/hero-messages";
import { HeroStats } from "@/components/home/hero-stats";
import { HeroTypewriter } from "@/components/home/hero-typewriter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
    return (
        <section className="relative overflow-hidden px-4 pb-20 pt-6 md:pb-28 md:pt-10">
            <div className="hero-glow left-[8%] top-[12%]" />

            <div className="mx-auto grid max-w-7xl items-start gap-14 md:grid-cols-2 lg:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -36 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="max-w-2xl pt-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.55 }}
                    >
                        <HeroTypewriter />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.65 }}
                        className="text-balance mt-6 text-[2.05rem] font-bold leading-[1.08] text-white sm:text-[2.8rem] md:text-[3.25rem]"
                    >
                        Encuentra los restaurantes más innovadores en un solo lugar
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28, duration: 0.65 }}
                        className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg"
                    >
                        ZonaTechFood te ayuda a explorar restaurantes modernos, descubrir
                        nuevas propuestas culinarias y guardar tus lugares favoritos con una
                        experiencia visual atractiva, rápida y actual.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.38, duration: 0.65 }}
                        className="mt-9 flex flex-wrap items-center gap-5"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group relative min-h-14 overflow-hidden rounded-xl bg-[#FF5B04] px-9 text-base text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#e65000] hover:shadow-[0_0_25px_rgba(255,91,4,0.35)]"
                        >
                            <Link href="/restaurants">
                                <span className="relative z-10">Explorar restaurantes</span>
                                <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.28)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <span className="absolute -left-16 top-0 h-full w-10 rotate-12 bg-white/20 blur-md transition-all duration-500 group-hover:left-[115%]" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="group relative min-h-14 overflow-hidden rounded-xl border-white/20 bg-white/5 px-9 text-base text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(30,70,107,0.35)]"
                        >
                            <Link href="/contact">
                                <span className="relative z-10">Contáctanos</span>
                                <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <span className="absolute -left-16 top-0 h-full w-10 rotate-12 bg-white/15 blur-md transition-all duration-500 group-hover:left-[115%]" />
                            </Link>
                        </Button>
                    </motion.div>

                    <HeroStats />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 36, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.85, ease: "easeOut", delay: 0.18 }}
                    className="relative mx-auto w-full max-w-[560px] pt-4"
                >
                    <div className="hero-glow bottom-[18%] right-[8%]" />

                    <Card className="glass overflow-hidden rounded-[30px] border-white/10 bg-white/8 p-0">
                        <CardContent className="p-3">
                            <motion.img
                                initial={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                                alt="Interior moderno de un restaurante"
                                className="block h-[326px] w-full rounded-[24px] object-cover sm:h-[400px] lg:h-[485px]"
                            />
                        </CardContent>
                    </Card>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.55 }}
                        className="mt-2 w-full md:mt-4"
                    >
                        <HeroMessages />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}