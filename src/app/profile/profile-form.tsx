// ·················································· //
// ··· PROFILE-FORM.TSX: Formulario de edición de perfil ··· //
// ·················································· //

// ··· Permite editar nombre, teléfono (formato Colombia) y correo (con confirmación). ··· //
// ··· Cada sección guarda de forma independiente para mayor claridad de feedback. ··· //

"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
    initialName: string;
    initialPhone: string;
    email: string;
};

// ··· Valida que el teléfono sea un móvil colombiano: 10 dígitos comenzando por 3. ··· //
function isValidColombianPhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    return /^3\d{9}$/.test(digits);
}

// ··· Formatea visualmente mientras se escribe: 300 123 4567 ··· //
function formatColombianPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export function ProfileForm({
    initialName,
    initialPhone,
    email,
}: ProfileFormProps) {
    // ··· Sección 1: información personal (nombre y teléfono). ··· //
    const [fullName, setFullName] = useState(initialName);
    const [phone, setPhone] = useState(
        initialPhone ? formatColombianPhone(initialPhone) : ""
    );
    const [infoLoading, setInfoLoading] = useState(false);
    const [infoError, setInfoError] = useState("");
    const [infoSuccess, setInfoSuccess] = useState("");

    // ··· Sección 2: cambio de correo con confirmación. ··· //
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");

    const supabase = useMemo(() => createClient(), []);

    // ──────────────────────────────────────────────
    // Guardar nombre + teléfono
    // ──────────────────────────────────────────────
    const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInfoError("");
        setInfoSuccess("");
        setInfoLoading(true);

        const trimmedName = fullName.trim();
        const rawPhone = phone.replace(/\D/g, "");

        if (!trimmedName) {
            setInfoError("El nombre es obligatorio.");
            setInfoLoading(false);
            return;
        }

        if (phone && !isValidColombianPhone(rawPhone)) {
            setInfoError(
                "Introduce un número colombiano válido (10 dígitos, empieza por 3). Ej: 300 123 4567"
            );
            setInfoLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: trimmedName,
                phone: rawPhone ? `+57${rawPhone}` : "",
            },
        });

        if (error) {
            setInfoError(error.message);
        } else {
            setInfoSuccess("Información actualizada correctamente.");
        }
        setInfoLoading(false);
    };

    // ──────────────────────────────────────────────
    // Actualizar correo
    // ──────────────────────────────────────────────
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError("");
        setEmailSuccess("");
        setEmailLoading(true);

        const trimmedNew = newEmail.trim().toLowerCase();
        const trimmedConfirm = confirmEmail.trim().toLowerCase();

        if (!trimmedNew || !trimmedConfirm) {
            setEmailError("Debes rellenar ambos campos de correo.");
            setEmailLoading(false);
            return;
        }

        if (trimmedNew === email.toLowerCase()) {
            setEmailError("El nuevo correo es igual al actual.");
            setEmailLoading(false);
            return;
        }

        if (trimmedNew !== trimmedConfirm) {
            setEmailError("Los correos no coinciden.");
            setEmailLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ email: trimmedNew });

        if (error) {
            setEmailError(error.message);
        } else {
            setEmailSuccess(
                "Te hemos enviado un enlace de confirmación a tu nuevo correo. Revisa tu bandeja de entrada."
            );
            setNewEmail("");
            setConfirmEmail("");
        }
        setEmailLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                {/* Panel izquierdo: información de cuenta (solo lectura) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="glass flex flex-col gap-6 rounded-[28px] border-white/10 p-6 md:p-8"
                >
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/45">
                            Información de cuenta
                        </p>
                    </div>

                    {/* Avatar inicial */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5B04]/15">
                            <User className="size-7 text-[#FF5B04]" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-white">
                                {fullName || "Usuario"}
                            </p>
                            <p className="text-sm text-white/55">{email}</p>
                        </div>
                    </div>

                    {/* Datos actuales */}
                    <div className="space-y-3">
                        <div className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                            <Mail className="size-4 text-[#FF5B04]" />
                            <div>
                                <p className="text-xs text-white/45">Correo electrónico</p>
                                <p className="text-sm text-white/80">{email}</p>
                            </div>
                        </div>

                        <div className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                            <Phone className="size-4 text-[#FF5B04]" />
                            <div>
                                <p className="text-xs text-white/45">Teléfono</p>
                                <p className="text-sm text-white/80">
                                    {phone ? `+57 ${phone}` : "No registrado"}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Panel derecho: formulario datos personales */}
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                    className="glass rounded-[28px] border-white/10 p-6 md:p-8"
                >
                    <h2 className="text-2xl font-semibold text-white">
                        Datos personales
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                        Actualiza tu nombre y número de teléfono.
                    </p>

                    <form onSubmit={handleInfoSubmit} className="mt-8 space-y-5">
                        {/* Nombre */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.45 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="fullName" className="text-white/80">
                                Nombre completo
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Tu nombre completo"
                                disabled={infoLoading}
                                className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
                            />
                        </motion.div>

                        {/* Teléfono Colombia */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.45 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="phone" className="text-white/80">
                                Teléfono
                            </Label>
                            <div className="flex h-12 items-center rounded-xl border border-white/15 bg-white/6 focus-within:ring-2 focus-within:ring-[#FF5B04]">
                                {/* Prefijo fijo Colombia */}
                                <span className="flex h-full items-center rounded-l-xl border-r border-white/10 bg-white/5 px-3 text-sm text-white/60 select-none">
                                    +57
                                </span>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(formatColombianPhone(e.target.value))
                                    }
                                    placeholder="300 123 4567"
                                    disabled={infoLoading}
                                    className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <p className="text-xs text-white/40">
                                Número móvil colombiano: 10 dígitos empezando por 3.
                            </p>
                        </motion.div>

                        {/* Feedback info */}
                        {(infoError || infoSuccess) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`rounded-xl border px-4 py-3 text-sm ${infoError
                                        ? "border-red-400/20 bg-red-500/10 text-red-200"
                                        : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                                    }`}
                            >
                                {infoError || infoSuccess}
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.24, duration: 0.45 }}
                            className="pt-2"
                        >
                            <Button
                                type="submit"
                                disabled={infoLoading}
                                className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-[#FF5B04] text-base text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#e65000] hover:shadow-[0_0_22px_rgba(255,91,4,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Save className="size-4" />
                                    {infoLoading ? "Guardando..." : "Guardar cambios"}
                                </span>
                                <span className="absolute inset-0 z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.22)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>

            {/* Sección cambio de correo — ancho completo abajo */}
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
                className="glass rounded-[28px] border-white/10 p-6 md:p-8"
            >
                <h2 className="text-2xl font-semibold text-white">
                    Cambiar correo electrónico
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                    Introduce tu nuevo correo dos veces para confirmarlo. Te enviaremos
                    un enlace de verificación.
                </p>

                <form onSubmit={handleEmailSubmit} className="mt-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {/* Nuevo correo */}
                        <div className="space-y-2">
                            <Label htmlFor="newEmail" className="text-white/80">
                                Nuevo correo electrónico
                            </Label>
                            <Input
                                id="newEmail"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="nuevo@correo.com"
                                disabled={emailLoading}
                                className="h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35"
                            />
                        </div>

                        {/* Confirmar correo */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmEmail" className="text-white/80">
                                Confirmar nuevo correo
                            </Label>
                            <Input
                                id="confirmEmail"
                                type="email"
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                placeholder="nuevo@correo.com"
                                disabled={emailLoading}
                                className={`h-12 rounded-xl border-white/15 bg-white/6 text-white placeholder:text-white/35 ${confirmEmail && confirmEmail !== newEmail
                                        ? "border-red-400/40 focus:ring-red-400"
                                        : ""
                                    }`}
                            />
                            {/* Indicador en tiempo real de coincidencia */}
                            {confirmEmail && (
                                <p
                                    className={`text-xs ${confirmEmail === newEmail
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                        }`}
                                >
                                    {confirmEmail === newEmail
                                        ? "✓ Los correos coinciden"
                                        : "✗ Los correos no coinciden"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Feedback email */}
                    {(emailError || emailSuccess) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-5 rounded-xl border px-4 py-3 text-sm ${emailError
                                    ? "border-red-400/20 bg-red-500/10 text-red-200"
                                    : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                                }`}
                        >
                            {emailError || emailSuccess}
                        </motion.div>
                    )}

                    <div className="mt-5">
                        <Button
                            type="submit"
                            disabled={
                                emailLoading ||
                                !newEmail ||
                                !confirmEmail ||
                                newEmail !== confirmEmail
                            }
                            className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-white/10 text-base text-white transition-all duration-300 hover:scale-[1.01] hover:bg-white/15 hover:shadow-[0_0_22px_rgba(255,255,255,0.08)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Mail className="size-4" />
                                {emailLoading ? "Enviando..." : "Actualizar correo"}
                            </span>
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
