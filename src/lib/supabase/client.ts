// ·················································· //
// ··· CLIENT.TS: Cliente Supabase para el navegador ··· //
// ·················································· //

// ··· Usa @supabase/supabase-js con URL y clave pública (NEXT_PUBLIC_*). ··· //
// ··· Si faltan variables, lanza error al cargar el modulo para fallar pronto. ··· //

import { createClient } from "@supabase/supabase-js";

// ··· URL del proyecto; debe coincidir con el dashboard de Supabase. ··· //
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// ··· Clave anónima o pública: acepta nombre nuevo o legacy según tu .env. ··· //
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase: NEXT_PUBLIC_SUPABASE_URL y una key pública válida"
  );
}

// ··· Instancia única importada en login, registro y futuras rutas cliente. ··· //
export const supabase = createClient(supabaseUrl, supabaseKey);
