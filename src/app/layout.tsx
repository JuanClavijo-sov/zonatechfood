// ········································ //
// ··· LAYOUT.TSX: Componente de Layout ··· //
// ········································ //


import type { Metadata } from "next";
// ··· Importamos las fuentes. ··· //
import { Geist, Geist_Mono } from "next/font/google";
// ··· Importamos los estilos globales. ··· //
import "./globals.css";
// ··· Importamos los componentes de layout. ··· //
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
// ··· Importamos los componentes de layout. ··· //
import { BackToTopButton } from "@/components/layout/back-to-top-button";
import { ScrollToTopOnRoute } from "@/components/layout/scroll-to-top-on-route";


// ··· Definimos las fuentes. ··· //
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ··· Definimos los metadatos. ··· //
export const metadata: Metadata = {
  title: "ZonaTechFood",
  description: "Discover the best tech-inspired restaurants in one place.",
};

// ··· Componente de Layout ··· //
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ScrollToTopOnRoute />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}