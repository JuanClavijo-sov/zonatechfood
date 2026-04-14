// ·················································· //
// ··· FAVORITES/PAGE.TSX: Vista de restaurantes favoritos ··· //
// ·················································· //

// ··· Página cliente: depende de sesión activa para consultar favoritos del usuario. ··· //
// ··· Estados renderizados: carga, invitado sin sesión y listado (o vacío) de favoritos. ··· //

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { supabase } from "@/lib/supabase/client";
import { getFavoriteRestaurants } from "@/lib/supabase/favorites";
import type { Restaurant } from "@/lib/supabase/restaurants";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  // ··· Estado de autenticación y colección de restaurantes guardados. ··· //
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // ··· Carga inicial: resolver sesión y consultar favoritos solo si hay usuario. ··· //
    const loadFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      setUser(user);

      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getFavoriteRestaurants(user.id);

      if (!isMounted) return;

      setFavorites(data);
      setLoading(false);
    };

    loadFavorites();

    // ··· Suscripción auth: sincroniza cambios de login/logout en tiempo real. ··· //
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (!currentUser) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const data = await getFavoriteRestaurants(currentUser.id);

      if (!isMounted) return;

      setFavorites(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleFavoriteRemoved = (restaurantId: number) => {
    // ··· Actualización optimista al quitar un favorito desde RestaurantGrid. ··· //
    setFavorites((prev) =>
      prev.filter((restaurant) => restaurant.id !== restaurantId)
    );
  };

  if (loading) {
    return (
      <section className="px-4 pb-20 pt-8 md:pt-12">
        <div className="mx-auto max-w-7xl">
          {/* Skeleton de cabecera mientras llegan sesión y favoritos */}
          <div className="glass rounded-[28px] border-white/10 p-8">
            <div className="h-8 w-56 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 h-5 w-80 animate-pulse rounded-xl bg-white/10" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="glass h-[420px] animate-pulse rounded-[28px] border-white/10"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="px-4 pb-20 pt-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          {/* Estado invitado: acceso guiado a login o registro */}
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

  return (
    <section className="px-4 pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado de la sección de favoritos */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
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
        </motion.div>

        {favorites.length === 0 ? (
          /* Estado vacío: usuario autenticado sin restaurantes guardados */
          <div className="glass rounded-[28px] border-white/10 px-6 py-12 text-center">
            <h3 className="text-2xl font-semibold text-white">
              Aún no has guardado favoritos
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Explora restaurantes y empieza a guardar tus lugares preferidos.
            </p>

            <div className="mt-6">
              <Button
                asChild
                className="rounded-xl bg-[#FF5B04] px-7 text-white hover:bg-[#e65000]"
              >
                <Link href="/restaurants">Explorar restaurantes</Link>
              </Button>
            </div>
          </div>
        ) : (
          <RestaurantGrid
            restaurants={favorites}
            onFavoriteRemoved={handleFavoriteRemoved}
          />
        )}
      </div>
    </section>
  );
}