// ·················································· //
// ··· RESTAURANTS.TS: Consultas a la tabla restaurants ··· //
// ·················································· //

// ··· Usa el cliente Supabase compartido; respeta RLS y políticas de lectura en producción. ··· //
// ··· getFeaturedRestaurants está pensado para Server Components (home) con límite acotado. ··· //

import { supabase } from "@/lib/supabase/client";

/** Fila típica de public.restaurants con los campos que consume la UI de tarjetas. */
export type Restaurant = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  location: string;
  rating: number;
  is_featured: boolean;
};

/** Devuelve los destacados ordenados por valoración descendente; ante error, lista vacía. */
export async function getFeaturedRestaurants(limit = 3): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("is_featured", true)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured restaurants:", error.message);
    return [];
  }

  return (data ?? []) as Restaurant[];
}
