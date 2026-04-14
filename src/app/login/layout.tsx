// ·················································· //
// ··· LOGIN/LAYOUT.TSX: Guardia para página de login ··· //
// ·················································· //

// ··· Si hay sesión activa, redirige al inicio para evitar mostrar login autenticado. ··· //

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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