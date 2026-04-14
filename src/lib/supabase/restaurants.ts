// ·················································· //
// ··· RESTAURANTS.TS: Consultas a la tabla restaurants ··· //
// ·················································· //

// ··· Cliente Supabase compartido; lecturas sujetas a RLS en producción. ··· //
// ··· getRestaurantBySlug usa maybeSingle() para 0 o 1 fila sin error por duplicados. ··· //

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/** Fila alineada con `public.restaurants` y campos usados en listados y ficha. */
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

/** Destacados con límite; pensado para la home (Server Component). */
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

/** Lista completa ordenada por valoración; ante error devuelve array vacío. */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error fetching restaurants:", error.message);
    return [];
  }

  return (data ?? []) as Restaurant[];
}

/** Una fila por slug o null; errores de red/consulta devuelven null (no lanza). */
export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching restaurant by slug:", error.message);
    return null;
  }

  return (data as Restaurant | null) ?? null;
}