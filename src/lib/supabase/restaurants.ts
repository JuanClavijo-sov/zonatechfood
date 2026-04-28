// ·················································· //
// ··· RESTAURANTS.TS: Consultas al cliente de navegador ··· //
// ·················································· //

// ··· Usado desde Client Components (restaurants/page.tsx, etc.) ··· //

import { createClient } from "@/lib/supabase/client";

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

/** Lista completa ordenada por valoración; para Client Components. */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  const supabase = createClient();

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