// ·················································································· //
// ··· SCROLL-TO-TOP-ON-ROUTE.TSX: Scroll al Inicio en Cambio de Ruta        ··· //
// ·················································································· //

// ··· Componente sin renderizado visual que reinicia el scroll al cambiar de ruta. ··· //

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// ··· Detecta cambios en la ruta mediante usePathname y hace scroll al top instantaneamente. ··· //
export function ScrollToTopOnRoute() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant" as ScrollBehavior,
        });
    }, [pathname]);

    return null;
}