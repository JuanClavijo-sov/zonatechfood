// ·················································· //
// ··· PROXY.TS: Guardia centralizado de rutas ··· //
// ·················································· //

// ··· Sustituye a middleware.ts (deprecado en Next.js 16). ··· //
// ··· Protege /profile y /favorites: redirige a /login si no hay sesión. ··· //
// ··· Protege /login y /register: redirige a / si ya hay sesión activa. ··· //
// ··· Refresca el token de Supabase en cada request para mantener la sesión viva. ··· //

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ··· Rutas que requieren sesión activa. ··· //
const PROTECTED = ["/profile", "/favorites"];

// ··· Rutas que solo se muestran a usuarios NO autenticados. ··· //
const AUTH_ONLY = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // ··· Refrescar la sesión (renueva el access token si está caducado). ··· //
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // ··· Si la ruta es protegida y no hay sesión → login con redirect de retorno. ··· //
    if (PROTECTED.some((p) => pathname.startsWith(p)) && !user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ··· Si la ruta es solo para invitados pero hay sesión → home. ··· //
    if (AUTH_ONLY.some((p) => pathname.startsWith(p)) && user) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
}

export const config = {
    // ··· Aplica a todas las rutas excepto archivos estáticos, imágenes y API de Next. ··· //
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
