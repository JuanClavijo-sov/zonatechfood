// ·················································· //
// ··· FAVORITES.TS: Operaciones sobre favoritos en Supabase ··· //
// ·················································· //

// ··· Encapsula consultas y mutaciones para la tabla favorites y su relación restaurants. ··· //
// ··· Las funciones devuelven arrays vacíos o false/null en error para evitar romper UI. ··· //

import { supabase } from "@/lib/supabase/client";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Registro mínimo de la tabla favorites. */
export type Favorite = {
  id: number;
  user_id: string;
  restaurant_id: number;
  created_at: string;
};

/** Fila de join favorites -> restaurants que devuelve Supabase en getFavoriteRestaurants. */
type FavoriteRestaurantRow = {
  restaurant_id: number;
  restaurants: Restaurant | Restaurant[] | null;
};

/** Lista favoritos de un usuario ordenados por fecha de creación (más recientes primero). */
export async function getUserFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorites:", error.message);
    return [];
  }

  return (data ?? []) as Favorite[];
}

/** Solo IDs de restaurantes favoritos; útil para checks rápidos en cliente. */
export async function getUserFavoriteRestaurantIds(
  userId: string
): Promise<number[]> {
  const favorites = await getUserFavorites(userId);
  return favorites.map((favorite) => favorite.restaurant_id);
}

/** Inserta una relación usuario-restaurante en favorites. */
export async function addFavorite(userId: string, restaurantId: number) {
  const { error } = await supabase.from("favorites").insert({
    user_id: userId,
    restaurant_id: restaurantId,
  });

  return { error };
}

/** Elimina una relación usuario-restaurante de favorites. */
export async function removeFavorite(userId: string, restaurantId: number) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("restaurant_id", restaurantId);

  return { error };
}

/** Indica si un restaurante está guardado por el usuario actual. */
export async function isRestaurantFavorite(
  userId: string,
  restaurantId: number
): Promise<boolean> {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("restaurant_id", restaurantId)
    .maybeSingle();

  if (error) {
    console.error("Error checking favorite:", error.message);
    return false;
  }

  return !!data;
}

/** Devuelve restaurantes completos marcados como favoritos por el usuario. */
export async function getFavoriteRestaurants(
  userId: string
): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
        restaurant_id,
        restaurants (
          id,
          slug,
          name,
          category,
          description,
          image_url,
          location,
          rating,
          is_featured
        )
      `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorite restaurants:", error.message);
    return [];
  }

  const rows = (data ?? []) as FavoriteRestaurantRow[];

  // ··· Supabase puede devolver objeto o array en la relación; normalizamos a Restaurant. ··· //
  return rows
    .map((row) =>
      Array.isArray(row.restaurants) ? row.restaurants[0] : row.restaurants
    )
    .filter((restaurant): restaurant is Restaurant => !!restaurant);
}