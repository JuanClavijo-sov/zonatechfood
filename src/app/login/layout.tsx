// ·················································· //
// ··· LOGIN/LAYOUT.TSX: Guardia para página de login ··· //
// ·················································· //

// ··· Si hay sesión activa, redirige al inicio para evitar mostrar login autenticado. ··· //

import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description:
    "Accede a tu cuenta en ZonaTechFood para gestionar favoritos y descubrir restaurantes destacados.",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return children;
}