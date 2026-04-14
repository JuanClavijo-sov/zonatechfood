// ·················································· //
// ··· CLIENT.TS: Factory de cliente Supabase para navegador ··· //
// ·················································· //

// ··· Se usa en componentes cliente (CSR) para auth y lecturas con contexto de sesión. ··· //

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // ··· Variables públicas requeridas para inicializar el cliente en frontend. ··· //
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Faltan variables de entorno de Supabase: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}