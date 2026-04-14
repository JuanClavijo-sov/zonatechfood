// ·················································· //
// ··· NOT-FOUND.TSX: Respuesta global 404 (Next.js) ··· //
// ·················································· //

// ··· Se renderiza cuando ninguna ruta coincide o se invoca notFound() desde un servidor. ··· //
// ··· Misma línea visual que el resto de la app (glass, botones primario/secundario). ··· //

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        {/* Tarjeta centrada con mensaje corto y salidas a listado o inicio */}
        <div className="glass rounded-[32px] border-white/10 px-8 py-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/45">
            No encontrado
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            No encontramos el contenido que buscas
          </h1>

          <p className="mt-5 text-base leading-8 text-white/65">
            Puede que el restaurante ya no exista, el enlace haya cambiado o la
            página no esté disponible.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Ver catálogo de restaurantes o volver a la landing */}
            <Button
              asChild
              className="rounded-xl bg-[#FF5B04] px-7 text-white hover:bg-[#e65000]"
            >
              <Link href="/restaurants">Ver restaurantes</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/">Ir al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}