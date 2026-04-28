// ·················································· //
// ··· RESTAURANT-FILTERS.TSX: Barra de filtros del listado ··· //
// ·················································· //

// ··· Componente controlado: la página posee el estado; aquí solo se notifican cambios. ··· //
// ··· Incluye: búsqueda por texto, categoría, ordenación y toggle «solo destacados». ··· //

"use client";

import { Search, ArrowUpDown } from "lucide-react";

export type SortOption = "rating-desc" | "rating-asc" | "name-asc" | "name-desc";

/** Props de solo lectura + callbacks para todos los controles de filtrado y ordenación. */
type RestaurantFiltersProps = {
  search: string;
  selectedCategory: string;
  onlyFeatured: boolean;
  sortBy: SortOption;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
  onSortChange: (value: SortOption) => void;
};

export function RestaurantFilters({
  search,
  selectedCategory,
  onlyFeatured,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onFeaturedChange,
  onSortChange,
}: RestaurantFiltersProps) {
  return (
    <div className="glass rounded-[28px] border-white/10 p-5 md:p-6">
      {/* Fila 1: búsqueda (ancha) + categoría */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, descripción o ubicación..."
            className="h-12 w-full rounded-xl border border-white/12 bg-white/6 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 transition-colors focus:border-white/25"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-12 rounded-xl border border-white/12 bg-[#293955] px-4 text-sm text-white outline-none transition-colors focus:border-white/25"
        >
          <option value="all" className="bg-[#293955] text-white">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category} className="bg-[#293955] text-white">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Fila 2: ordenación + solo destacados */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Selector de ordenación */}
        <div className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3">
          <ArrowUpDown className="size-4 shrink-0 text-white/40" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-11 bg-[#293955] text-sm text-white outline-none rounded-lg px-1"
          >
            <option value="rating-desc" className="bg-[#293955] text-white">Mejor valorados</option>
            <option value="rating-asc" className="bg-[#293955] text-white">Menor valoración</option>
            <option value="name-asc" className="bg-[#293955] text-white">Nombre A → Z</option>
            <option value="name-desc" className="bg-[#293955] text-white">Nombre Z → A</option>
          </select>
        </div>

        {/* Toggle solo destacados */}
        <button
          type="button"
          onClick={() => onFeaturedChange(!onlyFeatured)}
          className={`h-11 rounded-xl px-5 text-sm font-medium transition-all duration-300 ${onlyFeatured
            ? "bg-[#FF5B04] text-white shadow-[0_0_20px_rgba(255,91,4,0.22)]"
            : "border border-white/12 bg-white/6 text-white/80 hover:bg-white/10"
            }`}
        >
          Solo destacados
        </button>
      </div>
    </div>
  );
}