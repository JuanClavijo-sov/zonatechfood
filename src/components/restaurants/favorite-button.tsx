// ·················································· //
// ··· FAVORITE-BUTTON.TSX: Toggle de favorito por restaurante ··· //
// ·················································· //

// ··· Controla estado local + sesión para añadir o quitar favoritos en Supabase. ··· //
// ··· Si no hay sesión, redirige a login antes de permitir el cambio. ··· //

"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import {
  addFavorite,
  isRestaurantFavorite,
  removeFavorite,
} from "@/lib/supabase/favorites";

/** Identificador del restaurante y callback opcional para reaccionar al toggle. */
type FavoriteButtonProps = {
  restaurantId: number;
  onToggle?: (isFavorite: boolean) => void;
};

export function FavoriteButton({
  restaurantId,
  onToggle,
}: FavoriteButtonProps) {
  // ··· Estado de sesión, estado actual del corazón y banderas de carga. ··· //
  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // ··· Cargar sesión + estado del restaurante para pintar el icono correctamente. ··· //
    const loadFavoriteState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      setUser(user);

      if (!user) {
        setIsFavorite(false);
        setLoading(false);
        return;
      }

      const favorite = await isRestaurantFavorite(user.id, restaurantId);

      if (!isMounted) return;

      setIsFavorite(favorite);
      setLoading(false);
    };

    loadFavoriteState();

    // ··· Revalidar el estado cuando cambie la autenticación del usuario. ··· //
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (!currentUser) {
        setIsFavorite(false);
        setLoading(false);
        return;
      }

      const favorite = await isRestaurantFavorite(currentUser.id, restaurantId);

      if (!isMounted) return;

      setIsFavorite(favorite);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [restaurantId]);

  const handleToggleFavorite = async () => {
    // ··· Sin sesión: mandar al flujo de acceso antes de mutar favoritos. ··· //
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setToggling(true);

    // ··· Alterna insert/delete según estado actual del restaurante. ··· //
    if (isFavorite) {
      const { error } = await removeFavorite(user.id, restaurantId);

      if (!error) {
        setIsFavorite(false);
        onToggle?.(false);
      }
    } else {
      const { error } = await addFavorite(user.id, restaurantId);

      if (!error) {
        setIsFavorite(true);
        onToggle?.(true);
      }
    }

    setToggling(false);
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={loading || toggling}
      aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
        isFavorite
          ? "border-[#FF5B04]/40 bg-[#FF5B04]/15 text-[#FF5B04] shadow-[0_0_20px_rgba(255,91,4,0.18)]"
          : "border-white/15 bg-white/6 text-white/75 hover:bg-white/10 hover:text-white"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <Heart
        className={`size-5 transition-all duration-300 ${
          isFavorite ? "fill-[#FF5B04] text-[#FF5B04]" : "fill-transparent"
        }`}
      />
    </button>
  );
}