// ·················································· //
// ··· PAGE.TSX: Pagina principal de ZonaTechFood ··· //
// ·················································· //

// ··· Se implemento un estilo basico para la pagina principal ··· //
// ··· Los destacados se cargan en el servidor con Supabase antes de pintar la página. ··· //
// ··· Orden del layout: impacto, categorías, prueba social, proceso y llamada a la acción. ··· //

import { CategoryTicker } from "@/components/home/category-ticker";
import { FeaturedRestaurants } from "@/components/home/featured-restaurants";
import { Hero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/home-cta";
import { HowItWorks } from "@/components/home/how-it-works";
import { getFeaturedRestaurants } from "@/lib/supabase/restaurants";

export default async function HomePage() {
  // ··· Límite fijo de tarjetas en home; la lista completa vive en /restaurants. ··· //
  const featuredRestaurants = await getFeaturedRestaurants(3);

  return (
    <>
      {/* Portada y mensaje principal de la marca */}
      <Hero />
      {/* Carrusel o franja de categorías para exploración rápida */}
      <CategoryTicker />
      {/* Tarjetas con datos ya resueltos en este Server Component */}
      <FeaturedRestaurants restaurants={featuredRestaurants} />
      {/* Pasos resumidos de como usar la plataforma */}
      <HowItWorks />
      {/* Cierre orientado a conversion o siguiente paso */}
      <HomeCta />
    </>
  );
}