// ·················································· //
// ··· PAGE.TSX: Pagina principal de ZonaTechFood ··· //
// ·················································· //

// ··· Se implemento un estilo basico para la pagina principal ··· //

import { CategoryTicker } from "@/components/home/category-ticker";
import { FeaturedRestaurants } from "@/components/home/featured-restaurants";
import { Hero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/home-cta";
import { HowItWorks } from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTicker />
      <FeaturedRestaurants />
      <HowItWorks />
      <HomeCta />
    </>
  );
}