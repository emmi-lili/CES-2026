"use client";

import { useEffect, useState } from "react";

import AttendeesSection from "@/components/AttendeesSection";
import NavBar from "@/components/NavBar";
import ProfileEditor from "@/components/networking/ProfileEditor";
import {
  type AttendeeProfile,
  fetchMe,
  hasStoredToken,
  login,
  logout,
  register,
} from "@/lib/networkingApi";

type AuthMode = "login" | "register";

export default function NetworkingGate() {
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<AttendeeProfile | null>(null);
  const [mode, setMode] = useState<AuthMode>("login");
  const [ticketNumber, setTicketNumber] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function bootstrap() {
      if (!hasStoredToken()) {
        setChecking(false);
        return;
      }

      try {
        const me = await fetchMe();
        setProfile(me);
      } catch {
        logout();
      } finally {
        setChecking(false);
      }
    }

    bootstrap();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const nextProfile =
        mode === "register"
          ? await register(ticketNumber, password)
          : await login(ticketNumber, password);
      setProfile(nextProfile);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    logout();
    setProfile(null);
    setTicketNumber("");
    setPassword("");
    setMode("login");
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-black">
        <NavBar />
        <div className="flex min-h-[60vh] items-center justify-center px-5">
          <p className="text-sm text-white/50">Verificando acceso...</p>
        </div>
      </main>
    );
  }

  if (profile) {
    return (
      <main className="min-h-screen bg-black">
        <NavBar />
        <div className="border-b border-white/10 bg-black px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              Sesión activa{profile.full_name ? `: ${profile.full_name}` : ""}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition-colors hover:border-brand-green/40 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <ProfileEditor profile={profile} onUpdated={setProfile} />
        <AttendeesSection />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(94,57,150,0.22),transparent_55%)]"
        />

        <div className="relative w-full max-w-md">
          <div className="panel rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c4b0e0]">
              Acceso exclusivo
            </p>
            <h1 className="mt-3 font-display text-2xl font-bold text-white">
              Esta página es exclusiva para los asistentes del Crypto Experience Summit
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Ingresa con tu número de ticket. Si es tu primera vez, configura tu
              contraseña para acceder al networking del evento.
            </p>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "login"
                    ? "border-brand-green/60 bg-brand-green/10 text-brand-green"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "register"
                    ? "border-brand-green/60 bg-brand-green/10 text-brand-green"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Primera vez
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Número de ticket
                </span>
                <input
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  required
                  autoComplete="username"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                  placeholder="Ej. CES-LP-001"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  {mode === "register" ? "Crear contraseña" : "Contraseña"}
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  minLength={8}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                  placeholder="Mínimo 8 caracteres"
                />
              </label>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-green-bright disabled:opacity-60"
              >
                {submitting
                  ? "Procesando..."
                  : mode === "register"
                    ? "Configurar acceso"
                    : "Entrar al networking"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
