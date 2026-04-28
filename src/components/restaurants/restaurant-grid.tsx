// ·················································· //
// ··· RESTAURANT-GRID.TSX: Rejilla de tarjetas de restaurantes ··· //
// ·················································· //

// ··· Recibe la lista ya filtrada por la página padre; muestra vacío amigable si no hay coincidencias. ··· //

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/restaurants/favorite-button";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Lista a renderizar y callback opcional para quitar tarjetas al desfavoritar. */
type RestaurantGridProps = {
  restaurants: Restaurant[];
  onFavoriteRemoved?: (restaurantId: number) => void;
};

export function RestaurantGrid({
  restaurants,
  onFavoriteRemoved,
}: RestaurantGridProps) {
  if (restaurants.length === 0) {
    return (
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
    /* Rejilla con fade suave al cambiar de contenido (paginación, filtros, etc.) */
    <motion.div
      key={restaurants.map((r) => r.id).join(",")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid gap-6 lg:grid-cols-3"
    >
      {restaurants.map((restaurant) => (
        <motion.article
          key={restaurant.id}
          whileHover={{ y: -6 }}
          className="glass group overflow-hidden rounded-[28px] border-white/10 bg-white/8"
        >
          {/* Cabecera visual con imagen, categoría, badge destacado y rating */}
          <div className="relative h-[230px] overflow-hidden">
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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

          {/* Contenido textual + acciones (detalle y favorito) */}
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

            <div className="mt-6 flex items-center gap-3">
              <Button
                asChild
                className="group/button relative overflow-hidden rounded-xl bg-[#FF5B04] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)]"
              >
                <Link href={`/restaurants/${restaurant.slug}`}>
                  <span className="relative z-10">Ver detalle</span>
                  <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
                </Link>
              </Button>

              {/* onToggle permite retirar el item localmente en la página de favoritos */}
              <FavoriteButton
                restaurantId={restaurant.id}
                onToggle={(isFavorite) => {
                  if (!isFavorite) {
                    onFavoriteRemoved?.(restaurant.id);
                  }
                }}
              />
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}