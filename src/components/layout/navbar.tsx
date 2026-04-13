// ············································ //
// ··· NAVBAR.TSX: Componente de Navegacion ··· //
// ············································ //

// TODO: Mejorar el diseño de la barra de navegacion.

// ··· Utilizamos "Link" de next/link para la navegacion entre paginas. ··· //
import Link from "next/link";

// ··· Definimos los enlaces de navegacion. ··· //
const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/restaurants", label: "Restaurantes" },
    { href: "/favorites", label: "Favoritos" },
    { href: "/contact", label: "Contacto" },
];

// ··· Componente de Navegacion ··· //
export function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    ZonaTechFood
                </Link>

                <nav>
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}