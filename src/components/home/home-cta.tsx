// ········································································ //
// ··· HOME-CTA.TSX: Seccion de Llamada a la Accion de la Pagina Principal ··· //
// ········································································ //

// ··· Banner CTA animado para incitar al usuario a registrarse y explorar. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HomeCta() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                >
                    <Card className="glass group relative overflow-hidden rounded-[32px] border-white/10 bg-white/8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(30,70,107,0.18)]">
                        <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#FF5B04]/20 blur-3xl transition-all duration-500 group-hover:bg-[#FF5B04]/25" />
                        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#1E466B]/30 blur-3xl transition-all duration-500 group-hover:bg-[#1E466B]/40" />

                        <CardContent className="relative px-8 py-10 md:px-12 md:py-14">
                            <div className="max-w-3xl">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                                    Empieza ahora
                                </p>

                                <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                                    ¿Listo para descubrir tu próximo restaurante favorito?
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                                    Explora lugares únicos, guarda tus favoritos y vive una experiencia
                                    moderna con ZonaTechFood desde una sola plataforma.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="group/button relative min-h-14 overflow-hidden rounded-xl bg-[#FF5B04] px-8 text-base text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#e65000] hover:shadow-[0_0_24px_rgba(255,91,4,0.28)]"
                                    >
                                        <Link href="/restaurants">
                                            <span className="relative z-10">Explorar restaurantes</span>
                                            <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="group/button relative min-h-14 overflow-hidden rounded-xl border-white/20 bg-white/5 px-8 text-base text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 hover:text-white hover:shadow-[0_0_18px_rgba(30,70,107,0.24)]"
                                    >
                                        <Link href="/register">
                                            <span className="relative z-10">Crear cuenta</span>
                                            <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.14)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}