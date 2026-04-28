// ·················································· //
// ··· REGISTER/LAYOUT.TSX: Guardia para página de registro ··· //
// ·················································· //

// ··· Si hay sesión activa, redirige al inicio para no repetir alta autenticada. ··· //

import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Registrarse",
  description:
    "Crea tu cuenta en ZonaTechFood para guardar restaurantes favoritos y personalizar tu experiencia gastronómica.",
};

export default async function RegisterLayout({
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