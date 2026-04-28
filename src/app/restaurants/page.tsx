// ·················································· //
// ··· PAGE.TSX: Listado de restaurantes (ZonaTechFood) ··· //
// ·················································· //

// ··· Página cliente: carga todos los registros una vez y filtra/ordena en memoria. ··· //
// ··· Incluye búsqueda, filtro de categoría, ordenación y paginación por página. ··· //

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { RestaurantFilters, type SortOption } from "@/components/restaurants/restaurant-filters";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { getAllRestaurants, type Restaurant } from "@/lib/supabase/restaurants";

const PAGE_SIZE = 9;

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      const data = await getAllRestaurants();
      setRestaurants(data);
      setLoading(false);
    };
    loadRestaurants();
  }, []);

  // ··· Reiniciar a página 1 cuando cambia cualquier filtro. ··· //
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, onlyFeatured, sortBy]);

  // ··· Categorías únicas para el desplegable. ··· //
  const categories = useMemo(
    () => [...new Set(restaurants.map((r) => r.category))],
    [restaurants]
  );

  // ··· Filtrado + ordenación en cliente. ··· //
  const filteredAndSorted = useMemo(() => {
    const filtered = restaurants.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const matchCategory =
        selectedCategory === "all" || r.category === selectedCategory;
      const matchFeatured = !onlyFeatured || r.is_featured;
      return matchSearch && matchCategory && matchFeatured;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc": return b.rating - a.rating;
        case "rating-asc": return a.rating - b.rating;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        default: return 0;
      }
    });
  }, [restaurants, search, selectedCategory, onlyFeatured, sortBy]);

  // ··· Paginación: slicear solo la página actual. ··· //
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const paginated = filteredAndSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <section className="px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Intro animada */}
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
          <RestaurantFilters
            search={search}
            selectedCategory={selectedCategory}
            onlyFeatured={onlyFeatured}
            sortBy={sortBy}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setSelectedCategory}
            onFeaturedChange={setOnlyFeatured}
            onSortChange={setSortBy}
          />

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="glass h-[420px] animate-pulse rounded-[28px] border-white/10"
                />
              ))}
            </div>
          ) : (
            <>
              {/* Contador de resultados */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/50">
                  {filteredAndSorted.length === 0
                    ? "Sin resultados"
                    : `${filteredAndSorted.length} restaurante${filteredAndSorted.length !== 1 ? "s" : ""} encontrado${filteredAndSorted.length !== 1 ? "s" : ""}`}
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-white/40">
                    Página {page} de {totalPages}
                  </p>
                )}
              </div>

              <RestaurantGrid restaurants={paginated} />

              {/* Controles de paginación */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center justify-center gap-2"
                >
                  {/* Botón anterior */}
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label="Página anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/6 text-white/70 transition-all hover:bg-white/12 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {/* Números de página */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      aria-label={`Página ${p}`}
                      aria-current={p === page ? "page" : undefined}
                      className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${p === page
                          ? "bg-[#FF5B04] text-white shadow-[0_0_16px_rgba(255,91,4,0.3)]"
                          : "border border-white/12 bg-white/6 text-white/60 hover:bg-white/12 hover:text-white"
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Botón siguiente */}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    aria-label="Página siguiente"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/6 text-white/70 transition-all hover:bg-white/12 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}