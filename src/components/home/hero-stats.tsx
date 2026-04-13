// ················································· //
// ··· HERO-STATS.TSX: Estadisticas del Hero       ··· //
// ················································· //

// ··· Indicamos que el componente se ejecuta en el cliente. ··· //
"use client";

// ··· Importamos las librerías de animación e iconos. ··· //
import { animate, motion, useInView } from "motion/react";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ··· Datos estáticos de estadísticas mostradas en el hero. ··· //
const stats = [
    {
        value: 200,
        suffix: "+",
        label: "Restaurantes",
    },
    {
        value: 50,
        suffix: "K+",
        label: "Usuarios activos",
    },
    {
        value: 4.9,
        suffix: "",
        label: "Valoración media",
        icon: true,
    },
];

// ··· Componente interno: anima un valor numérico al entrar en el viewport. ··· //
function AnimatedValue({
    value,
    suffix,
    decimals = 0,
}: {
    value: number;
    suffix: string;
    decimals?: number;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(0, value, {
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(latest) {
                setDisplayValue(latest);
            },
        });

        return () => controls.stop();
    }, [isInView, value]);

    const formatted =
        decimals > 0
            ? displayValue.toFixed(decimals)
            : Math.round(displayValue).toString();

    return (
        <motion.span
            ref={ref}
            initial={{ scale: 0.92, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
            {formatted}
            {suffix}
        </motion.span>
    );
}

// ··· Componente de estadísticas del hero con animaciones y divisores. ··· //
export function HeroStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.65, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            className="glass mt-8 grid max-w-xl grid-cols-3 gap-3 rounded-2xl px-5 py-5"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.58 + index * 0.08, duration: 0.45 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative"
                >
                    {index < stats.length - 1 && (
                        <span className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/10 md:block" />
                    )}

                    <div className="flex items-center gap-1">
                        <AnimatedValue
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                        />

                        {stat.icon ? (
                            <motion.div
                                initial={{ rotate: -12, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ delay: 1.05, duration: 0.45 }}
                            >
                                <Star className="size-5 fill-white text-white sm:size-6" />
                            </motion.div>
                        ) : null}
                    </div>

                    <p className="mt-2 text-sm text-white/65 sm:text-base">{stat.label}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}