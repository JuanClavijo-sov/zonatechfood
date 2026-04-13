// ··············································· //
// ··· FOOTER.TSX: Componente de Pie de Pagina ··· //
// ··············································· //

// TODO: Mejorar el diseño del pie de pagina.

// ··· Componente de Pie de Pagina ··· //
export function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-6">
                <p className="text-sm text-muted-foreground">
                    © 2026 ZonaTechFood. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}