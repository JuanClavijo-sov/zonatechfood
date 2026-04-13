// ··············································································· //
// ··· PASSWORD-INPUT.TSX: Campo de contrasena con boton mostrar / ocultar      ··· //
// ··············································································· //

// ··· Envuelve el Input base; alterna type entre "password" y "text" por accesibilidad. ··· //
// ··· Reserva padding derecho (pr-12) para que el texto no quede bajo el icono. ··· //

"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

/** Mismas props que el Input de shadcn; className se fusiona con el espacio del boton. */
type PasswordInputProps = React.ComponentProps<typeof Input>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
    /** Estado local: visibilidad del secreto sin persistir en el servidor. */
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={show ? "text" : "password"}
                className={`pr-12 ${className}`}
            />

            {/* type="button" evita enviar el formulario al pulsar; aria-label para lectores de pantalla */}
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
                {show ? (
                    <EyeOff className="size-5" />
                ) : (
                    <Eye className="size-5" />
                )}
            </button>
        </div>
    );
}