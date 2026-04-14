// ·················································· //
// ··· RESTAURANT-GRID.TSX: Rejilla de tarjetas de restaurantes ··· //
// ·················································· //

// ··· Recibe la lista ya filtrada por la página padre; muestra vacío amigable si no hay coincidencias. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Lista renderizada tal cual llega desde el padre (sin nueva petición a Supabase). */
type RestaurantGridProps = {
  restaurants: Restaurant[];
};

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  if (restaurants.length === 0) {
    return (
      /* Estado vacío: sugiere relajar filtros o la búsqueda */
      <div className="glass rounded-[28px] border-white/10 px-6 py-12 text-center">
        <h3 className="text-2xl font-semibold text-white">
          No encontramos restaurantes
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Prueba ajustando la búsqueda o cambiando los filtros.
        </p>
      </div>
    );
  }

  return (
    /* Misma densidad visual que la home: tres columnas en pantallas grandes */
    <div className="grid gap-6 lg:grid-cols-3">
      {restaurants.map((restaurant, index) => (
        /* Tarjeta con animación de entrada escalonada y hover suave */
        <motion.article
          key={restaurant.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="glass group overflow-hidden rounded-[28px] border-white/10 bg-white/8"
        >
          {/* Cabecera visual: imagen, degradado, chips de categoría y destacado, nota */}
          <div className="relative overflow-hidden">
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#08172f]/80 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="glass rounded-full px-3 py-1 text-xs font-medium text-white">
                {restaurant.category}
              </span>

              {restaurant.is_featured ? (
                <span className="rounded-full bg-[#FF5B04] px-3 py-1 text-xs font-medium text-white">
                  Destacado
                </span>
              ) : null}
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-md">
              <Star className="size-4 fill-[#FF5B04] text-[#FF5B04]" />
              {restaurant.rating}
            </div>
          </div>

          {/* Cuerpo: título, descripción, ubicación y CTA al detalle por slug */}
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white">
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
        </motion.article>
      ))}
    </div>
  );
}