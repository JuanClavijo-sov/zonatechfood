// ·················································· //
// ··· FEATURED-RESTAURANTS.TSX: Restaurantes destacados en la home ··· //
// ·················································· //

// ··· Cliente: animaciones al entrar en viewport; los datos llegan desde page.tsx (RSC). ··· //
// ··· Cada tarjeta enlaza al detalle por slug; boton secundario lleva al listado completo. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Props: arreglo ya filtrado y ordenado en el servidor (no se vuelve a consultar aquí). */
type FeaturedRestaurantsProps = {
  restaurants: Restaurant[];
};

export function FeaturedRestaurants({
  restaurants,
}: FeaturedRestaurantsProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Cabecera de sección: título, copy y CTA al listado general */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              Restaurantes destacados
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Descubre algunos de los lugares más llamativos de la plataforma
            </h2>
            <p className="mt-4 text-base leading-7 text-white/65">
              Una selección especial de restaurantes con propuestas modernas,
              experiencias memorables y estilos gastronómicos que vale la pena explorar.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/20 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_16px_rgba(30,70,107,0.18)]"
          >
            <Link href="/restaurants">Ver todos</Link>
          </Button>
        </motion.div>

        {/* Rejilla responsive: hasta tres columnas en pantallas grandes */}
        <div className="grid gap-6 lg:grid-cols-3">
          {restaurants.map((restaurant, index) => (
            /* Entrada escalonada por índice y ligero lift al hover */
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              <Card className="glass group overflow-hidden rounded-[28px] border-white/10 bg-white/8 p-0 transition-all duration-300 hover:shadow-[0_0_30px_rgba(30,70,107,0.25)]">
                <CardContent className="p-0">
                  {/* Bloque hero de la tarjeta: imagen, degradado, categoría y valoración */}
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#08172f]/80 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="glass rounded-full px-3 py-1 text-xs font-medium text-white transition-all duration-300 group-hover:bg-white/12">
                        {restaurant.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-md">
                      <Star className="size-4 fill-[#FF5B04] text-[#FF5B04]" />
                      {restaurant.rating}
                    </div>
                  </div>

                  {/* Texto y acción: nombre, descripción corta, ubicación y enlace al detalle */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-white/95">
                      {restaurant.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {restaurant.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="size-4 text-[#FF5B04]" />
                      {restaurant.location}
                    </div>

                    <div className="mt-6">
                      <Button
                        asChild
                        className="group/button relative overflow-hidden rounded-xl bg-[#FF5B04] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)]"
                      >
                        <Link href={`/restaurants/${restaurant.slug}`}>
                          <span className="relative z-10">Ver detalle</span>
                          <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}