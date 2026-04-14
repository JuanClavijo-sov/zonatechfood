// ·················································· //
// ··· FAVORITES-CLIENT.TSX: Estado cliente para favoritos ··· //
// ·················································· //

// ··· Gestiona estado local de la lista para reflejar eliminación de favoritos al instante. ··· //

"use client";

import Link from "next/link";
import { useState } from "react";

import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Lista inicial entregada por el Server Component de /favorites. */
type FavoritesClientProps = {
  initialFavorites: Restaurant[];
};

export function FavoritesClient({
  initialFavorites,
}: FavoritesClientProps) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleFavoriteRemoved = (restaurantId: number) => {
    // ··· Actualización optimista: quitar tarjeta sin recargar la ruta. ··· //
    setFavorites((prev) =>
      prev.filter((restaurant) => restaurant.id !== restaurantId)
    );
  };

  if (favorites.length === 0) {
    return (
      <div className="glass rounded-[28px] border-white/10 px-6 py-12 text-center">
        <h3 className="text-2xl font-semibold text-white">
          Aún no has guardado favoritos
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Explora restaurantes y empieza a guardar tus lugares preferidos.
        </p>

        <div className="mt-6">
          <Button
            asChild
            className="rounded-xl bg-[#FF5B04] px-7 text-white hover:bg-[#e65000]"
          >
            <Link href="/restaurants">Explorar restaurantes</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <RestaurantGrid
      restaurants={favorites}
      onFavoriteRemoved={handleFavoriteRemoved}
    />
  );
}