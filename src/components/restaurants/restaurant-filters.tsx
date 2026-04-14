// ·················································· //
// ··· RESTAURANT-FILTERS.TSX: Barra de filtros del listado ··· //
// ·················································· //

// ··· Componente controlado: la página posee el estado; aquí solo se notifican cambios. ··· //

"use client";

import { Search } from "lucide-react";

/** Props de solo lectura + callbacks para búsqueda, categoría y filtro "solo destacados". */
type RestaurantFiltersProps = {
  search: string;
  selectedCategory: string;
  onlyFeatured: boolean;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
};

export function RestaurantFilters({
  search,
  selectedCategory,
  onlyFeatured,
  categories,
  onSearchChange,
  onCategoryChange,
  onFeaturedChange,
}: RestaurantFiltersProps) {
  return (
    <div className="glass rounded-[28px] border-white/10 p-5 md:p-6">
      {/* Tres huecos en desktop: búsqueda ancha, selector, toggle destacados */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_auto]">
        {/* Campo de texto: busca en nombre, descripción y ubicación (lógica en el padre) */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar restaurantes..."
            className="h-12 w-full rounded-xl border border-white/12 bg-white/6 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 transition-colors focus:border-white/25"
          />
        </div>

        {/* Opciones dinámicas más "Todas"; valores provienen del dataset cargado */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-12 rounded-xl border border-white/12 bg-[#10284c] px-4 text-sm text-white outline-none transition-colors focus:border-white/25"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Alterna filtro booleano is_featured sin enviar el formulario */}
        <button
          type="button"
          onClick={() => onFeaturedChange(!onlyFeatured)}
          className={`h-12 rounded-xl px-5 text-sm font-medium transition-all duration-300 ${
            onlyFeatured
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