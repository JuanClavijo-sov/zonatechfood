// ·················································· //
// ··· FAVORITES/PAGE.TSX: Vista de restaurantes favoritos ··· //
// ·················································· //

// ··· Server Component: valida sesión y trae favoritos del usuario autenticado. ··· //
// ··· Renderiza estado invitado o delega la interacción dinámica a FavoritesClient. ··· //

import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Favoritos",
  description:
    "Gestiona tus restaurantes favoritos en ZonaTechFood. Accede a tu lista personalizada y organiza tus próximas salidas.",
};
import { Heart } from "lucide-react";

import { FavoritesClient } from "@/components/favorites/favorites-client";
import { Button } from "@/components/ui/button";
import { getFavoriteRestaurants } from "@/lib/supabase/favorites";
import { createClient } from "@/lib/supabase/server";

export default async function FavoritesPage() {
  // ··· Cliente de servidor con cookies para resolver sesión actual. ··· //
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // ··· Usuario no autenticado: CTA a login/registro para habilitar favoritos. ··· //
    return (
      <section className="px-4 pb-20 pt-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          <div className="glass rounded-[32px] border-white/10 p-8 md:p-10">
            <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
              <Heart className="size-6 text-[#FF5B04]" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-white/45">
              Favoritos
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Inicia sesión para ver tus restaurantes favoritos
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              Guarda tus lugares preferidos en tu cuenta para acceder a ellos en
              cualquier momento y organizar mejor tus próximas salidas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-xl bg-[#FF5B04] px-7 text-white hover:bg-[#e65000]"
              >
                <Link href="/login">Iniciar sesión</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/register">Crear cuenta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ··· Usuario autenticado: cargar restaurantes favoritos (join favorites -> restaurants). ··· //
  const favorites = await getFavoriteRestaurants(supabase, user.id);

  return (
    <section className="px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Tus favoritos
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Restaurantes guardados en tu cuenta
          </h1>
          <p className="mt-5 text-base leading-8 text-white/65">
            Aquí encontrarás los lugares que has marcado como favoritos para
            volver a ellos cuando quieras.
          </p>
        </div>

        <FavoritesClient initialFavorites={favorites} />
      </div>
    </section>
  );
}