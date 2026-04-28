// ·················································· //
// ··· RESTAURANTS/LAYOUT.TSX: Layout para restaurantes ··· //
// ·················································· //

// ··· Metadata SEO para la ruta /restaurants (la página es "use client"). ··· //

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Restaurantes",
    description:
        "Explora restaurantes innovadores en Medellín. Filtra por categoría, busca por nombre y descubre propuestas gastronómicas con personalidad.",
};

export default function RestaurantsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
