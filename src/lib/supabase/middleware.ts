// ·················································· //
// ··· MIDDLEWARE.TS: Cliente Supabase para middleware ··· //
// ·················································· //

// ··· A diferencia del server client, aquí SÍ podemos escribir cookies ··· //
// ··· porque el middleware recibe el NextRequest/NextResponse directamente. ··· //

import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function createMiddlewareClient(
    request: NextRequest,
    response: NextResponse
) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });
}
