// ·················································· //
// ··· PROFILE/PAGE.TSX: Página de perfil de usuario ··· //
// ·················································· //

// ··· Server Component protegido: redirige a login si no hay sesión activa. ··· //
// ··· Lee datos del usuario autenticado y delega edición a ProfileForm (client). ··· //

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
    title: "Mi perfil",
    description:
        "Gestiona tu información personal y personaliza tu experiencia en ZonaTechFood.",
};

export default async function ProfilePage() {
    // ··· Verificar sesión: sin usuario → login. ··· //
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <section className="px-4 pb-20 pt-8 md:pt-12">
            <div className="mx-auto max-w-4xl">
                {/* Cabecera del perfil */}
                <div className="mb-10 max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                        Tu cuenta
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                        Mi perfil
                    </h1>
                    <p className="mt-5 text-base leading-8 text-white/65">
                        Consulta y actualiza tu información personal para mantener tu
                        experiencia en ZonaTechFood siempre al día.
                    </p>
                </div>

                {/* Formulario de edición delegado a componente cliente */}
                <ProfileForm
                    initialName={user.user_metadata?.full_name ?? ""}
                    initialPhone={user.user_metadata?.phone ?? ""}
                    email={user.email ?? ""}
                />
            </div>
        </section>
    );
}
