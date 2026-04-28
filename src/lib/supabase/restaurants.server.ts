// ·················································· //
// ··· RESTAURANTS.SERVER.TS: Consultas Server Components ··· //
// ·················································· //

// ··· Usa el cliente de servidor (cookies). Solo importar desde Server Components. ··· //

import { createClient } from "@/lib/supabase/server";
import type { Restaurant } from "@/lib/supabase/restaurants";

/** Destacados con límite; para la home (Server Component). */
export async function getFeaturedRestaurants(limit = 3): Promise<Restaurant[]> {
    const supabase = await createClient();

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

/** Una fila por slug o null (Server Component). */
export async function getRestaurantBySlug(
    slug: string
): Promise<Restaurant | null> {
    const supabase = await createClient();

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
