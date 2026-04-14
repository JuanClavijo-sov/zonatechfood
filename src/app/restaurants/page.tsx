// ·················································· //
// ··· PAGE.TSX: Listado de restaurantes (ZonaTechFood) ··· //
// ·················································· //

// ··· Página cliente: carga todos los registros una vez y filtra en memoria con useMemo. ··· //
// ··· Filtros en RestaurantFilters; resultados en RestaurantGrid o esqueletos mientras carga. ··· //

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

import { RestaurantFilters } from "@/components/restaurants/restaurant-filters";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { getAllRestaurants, type Restaurant } from "@/lib/supabase/restaurants";

export default function RestaurantsPage() {
  // ··· Dataset completo tras el fetch; los filtros no vuelven a llamar a Supabase. ··· //
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ··· Montaje: traer filas y liberar el estado de carga para pintar grid o vacío. ··· //
    const loadRestaurants = async () => {
      setLoading(true);
      const data = await getAllRestaurants();
      setRestaurants(data);
      setLoading(false);
    };

    loadRestaurants();
  }, []);

  // ··· Categorías únicas derivadas de los datos (alimentan el desplegable del filtro). ··· //
  const categories = useMemo(() => {
    return [...new Set(restaurants.map((restaurant) => restaurant.category))];
  }, [restaurants]);

  // ··· Búsqueda por texto + categoría + toggle "solo destacados", todo en cliente. ··· //
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || restaurant.category === selectedCategory;

      const matchesFeatured = !onlyFeatured || restaurant.is_featured;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [restaurants, search, selectedCategory, onlyFeatured]);

  return (
    <section className="px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Intro animada: título y descripción del listado */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Explora restaurantes
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Encuentra propuestas gastronómicas con estilo y personalidad
          </h1>
          <p className="mt-5 text-base leading-8 text-white/65">
            Descubre restaurantes destacados, filtra por categoría y explora
            lugares diseñados para ofrecer experiencias memorables.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Controles de búsqueda, categoría y destacados (estado elevado en esta página) */}
          <RestaurantFilters
            search={search}
            selectedCategory={selectedCategory}
            onlyFeatured={onlyFeatured}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setSelectedCategory}
            onFeaturedChange={setOnlyFeatured}
          />

          {loading ? (
            /* Placeholders tipo tarjeta mientras Supabase responde */
            <div className="grid gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="glass h-[420px] animate-pulse rounded-[28px] border-white/10"
                />
              ))}
            </div>
          ) : (
            <RestaurantGrid restaurants={filteredRestaurants} />
          )}
        </div>
      </div>
    </section>
  );
}