// ······················································ //
// ··· CONTACT/LAYOUT.TSX: Layout para pagina de contacto ··· //
// ······················································ //

// ··· Metadata SEO para la ruta /contact. ··· //

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "Ponte en contacto con el equipo de ZonaTechFood. Escríbenos tus preguntas, sugerencias o reporta cualquier problema.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
