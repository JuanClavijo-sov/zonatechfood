// ·················································· //
// ··· PAGE.TSX: Pagina principal de ZonaTechFood ··· //
// ·················································· //

// ··· Se implemento un estilo basico para la pagina principal ··· //

export default function HomePage() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">ZonaTechFood</h1>
      <p className="mt-4 text-muted-foreground">
        Descubre restaurantes, guarda favoritos y explora los mejores lugares de comida.
      </p>
    </section>
  );
}