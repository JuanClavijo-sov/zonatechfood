// ·················································· //
// ··· [SLUG]/PAGE.TSX: Ficha de restaurante (ZonaTechFood) ··· //
// ·················································· //

// ··· Server Component: lee el slug de la URL y carga la fila con Supabase. ··· //
// ··· Sin resultado: pantalla explicativa con enlaces; con datos: layout hero + información. ··· //

import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getRestaurantBySlug } from "@/lib/supabase/restaurants";

/** Params asíncronos (App Router); el segmento dinámico es el slug del restaurante. */
type RestaurantDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return (
      <section className="px-4 pb-20 pt-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          {/* Enlace de retorno y mensaje cuando el slug no existe en base de datos */}
          <div className="mb-8">
            <Link
              href="/restaurants"
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              ← Volver a restaurantes
            </Link>
          </div>

          <div className="glass rounded-[32px] border-white/10 p-8 md:p-10">
            {/* Copy orientado a usuario: posibles causas y CTAs a listado o inicio */}
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/45">
              Restaurante no encontrado
            </p>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              No encontramos este restaurante
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              Puede que el enlace haya cambiado, el restaurante ya no exista o
              el slug no coincida con los datos guardados en la base de datos.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* Primario: volver al catálogo; secundario: home */}
              <Button
                asChild
                className="rounded-xl bg-[#FF5B04] px-7 text-white hover:bg-[#e65000]"
              >
                <Link href="/restaurants">Ver restaurantes</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/">Ir al inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb ligero: vuelta al listado filtrable */}
        <div className="mb-8">
          <Link
            href="/restaurants"
            className="text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            ← Volver a restaurantes
          </Link>
        </div>

        {/* Dos columnas en desktop: imagen grande + panel de datos y acciones */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="h-full">
            <div className="glass h-full overflow-hidden rounded-[32px] border-white/10 p-2">
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                className="h-full w-full rounded-[24px] object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="glass flex h-full flex-col rounded-[32px] border-white/10 p-7 md:p-8">
              {/* Chips de categoría y destacado */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  {restaurant.category}
                </span>

                {restaurant.is_featured ? (
                  <span className="rounded-full bg-[#FF5B04] px-4 py-1.5 text-sm font-medium text-white">
                    Destacado
                  </span>
                ) : null}
              </div>

              <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                {restaurant.name}
              </h1>

              <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
                {restaurant.description}
              </p>

              {/* Ubicación y valoración reutilizando iconos del listado */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#FF5B04]" />
                  {restaurant.location}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="size-4 fill-[#FF5B04] text-[#FF5B04]" />
                  {restaurant.rating}
                </div>
              </div>

              {/* Bloques de texto fijo (marketing); se pueden sustituir por campos de BD si existen */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="glass rounded-2xl p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                    Experiencia
                  </p>
                  <p className="mt-3 text-white/75">
                    Una propuesta moderna pensada para quienes disfrutan lugares
                    con identidad, diseño y buena cocina.
                  </p>
                </div>

                <div className="glass rounded-2xl p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                    Recomendado para
                  </p>
                  <p className="mt-3 text-white/75">
                    Salidas urbanas, planes con amigos y exploración de nuevos
                    sabores en Medellín.
                  </p>
                </div>
              </div>

              {/* CTAs: favoritos (pendiente de lógica) y contacto */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="min-h-12 rounded-xl bg-[#FF5B04] px-7 text-base text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)]">
                  Guardar en favoritos
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="min-h-12 rounded-xl border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/contact">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}