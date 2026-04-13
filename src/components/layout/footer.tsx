// ··············································· //
// ··· FOOTER.TSX: Componente de Pie de Pagina ··· //
// ··············································· //

// TODO: Mejorar el diseño del pie de pagina.

// ··· Componente de Pie de Pagina ··· //

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
    navegacion: [
        { href: "/", label: "Inicio" },
        { href: "/restaurants", label: "Restaurantes" },
        { href: "/favorites", label: "Favoritos" },
        { href: "/contact", label: "Contacto" },
    ],
    cuenta: [
        { href: "/login", label: "Iniciar sesión" },
        { href: "/register", label: "Registrarse" },
    ],
};

export function Footer() {
    return (
        <footer className="relative mt-12 border-t border-white/10 px-4 pb-8 pt-14">
            <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FF5B04]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-10 h-52 w-52 rounded-full bg-[#1E466B]/20 blur-3xl" />

            <div className="mx-auto max-w-7xl">
                <div className="glass rounded-[30px] border-white/10 px-6 py-10 md:px-10">
                    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                        <div>
                            <Link
                                href="/"
                                className="text-2xl font-bold tracking-tight text-white"
                            >
                                ZonaTechFood
                            </Link>

                            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
                                Descubre restaurantes innovadores, guarda tus favoritos y explora
                                una experiencia gastronómica moderna desde una sola plataforma.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="glass rounded-xl px-4 py-2 text-sm text-white/75">
                                    Diseño moderno
                                </span>
                                <span className="glass rounded-xl px-4 py-2 text-sm text-white/75">
                                    Experiencia intuitiva
                                </span>
                                <span className="glass rounded-xl px-4 py-2 text-sm text-white/75">
                                    Descubrimiento gastronómico
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                                Navegación
                            </h3>

                            <ul className="mt-5 space-y-3">
                                {footerLinks.navegacion.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                                Cuenta
                            </h3>

                            <ul className="mt-5 space-y-3">
                                {footerLinks.cuenta.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                                Contacto
                            </h3>

                            <div className="mt-5 space-y-4 text-sm text-white/70">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 size-4 text-[#FF5B04]" />
                                    <span>hola@zonatechfood.com</span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 size-4 text-[#FF5B04]" />
                                    <span>Medellín, Colombia</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
                        <p>© 2026 ZonaTechFood. Todos los derechos reservados.</p>
                        <p>Diseñado para descubrir experiencias gastronómicas modernas.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}