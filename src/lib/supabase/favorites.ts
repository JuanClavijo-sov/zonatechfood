// ·················································· //
// ··· FAVORITES.TS: Operaciones de favoritos con Supabase ··· //
// ·················································· //

// ··· Recibe un SupabaseClient externo para reutilizarse en CSR y SSR sin duplicar lógica. ··· //

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Fila base de la tabla favorites. */
export type Favorite = {
  id: number;
  user_id: string;
  restaurant_id: number;
  created_at: string;
};

/** Resultado del join favorites -> restaurants. */
type FavoriteRestaurantRow = {
  restaurant_id: number;
  restaurants: Restaurant | Restaurant[] | null;
};

/** Obtiene favoritos de un usuario ordenados por fecha descendente. */
export async function getUserFavorites(
  supabase: SupabaseClient,
  userId: string
): Promise<Favorite[]> {
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

/** Variante ligera: devuelve solo los IDs de restaurantes favoritos. */
export async function getUserFavoriteRestaurantIds(
  supabase: SupabaseClient,
  userId: string
): Promise<number[]> {
  const favorites = await getUserFavorites(supabase, userId);
  return favorites.map((favorite) => favorite.restaurant_id);
}

/** Inserta una relación usuario-restaurante en favorites. */
export async function addFavorite(
  supabase: SupabaseClient,
  userId: string,
  restaurantId: number
) {
  const { error } = await supabase.from("favorites").insert({
    user_id: userId,
    restaurant_id: restaurantId,
  });

  return { error };
}

/** Elimina una relación usuario-restaurante en favorites. */
export async function removeFavorite(
  supabase: SupabaseClient,
  userId: string,
  restaurantId: number
) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("restaurant_id", restaurantId);

  return { error };
}

/** Comprueba si el restaurante ya está guardado por el usuario. */
export async function isRestaurantFavorite(
  supabase: SupabaseClient,
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

/** Devuelve entidades Restaurant completas para poblar tarjetas de favoritos. */
export async function getFavoriteRestaurants(
  supabase: SupabaseClient,
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

  return rows
    .map((row) =>
      Array.isArray(row.restaurants) ? row.restaurants[0] : row.restaurants
    )
    .filter((restaurant): restaurant is Restaurant => !!restaurant);
}