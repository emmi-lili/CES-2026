"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  type AttendeeProfile,
  updateProfile,
  uploadPhoto,
} from "@/lib/networkingApi";

type ProfileEditorProps = {
  profile: AttendeeProfile;
  onUpdated: (profile: AttendeeProfile) => void;
};

function initialsFromName(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function ProfileEditor({ profile, onUpdated }: ProfileEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [jobTitle, setJobTitle] = useState(profile.job_title ?? "");
  const [workplace, setWorkplace] = useState(profile.workplace ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedin_url ?? "");
  const [photoPreview, setPhotoPreview] = useState(profile.photo_url);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setMessage(null);
    setUploading(true);

    try {
      const updated = await uploadPhoto(file);
      setPhotoPreview(updated.photo_url);
      onUpdated(updated);
      setMessage("Foto actualizada.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la foto.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const updated = await updateProfile({
        full_name: fullName.trim(),
        job_title: jobTitle.trim(),
        workplace: workplace.trim(),
        linkedin_url: linkedinUrl.trim(),
      });
      onUpdated(updated);
      setMessage("Perfil guardado.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-black px-5 py-12 sm:px-8">
      <div className="relative mx-auto max-w-3xl">
        <div className="panel rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-white">Tu perfil</h2>
          <p className="mt-2 text-sm text-white/55">
            Completa tu información para que otros asistentes puedan conectar contigo.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt={fullName || "Foto de perfil"}
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover ring-2 ring-brand-violet/60 ring-offset-4 ring-offset-surface-card"
                />
              ) : (
                <span className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-brand-violet text-2xl font-bold text-black ring-2 ring-brand-violet/60 ring-offset-4 ring-offset-surface-card">
                  {initialsFromName(fullName)}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 sm:items-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-full border border-white/15 bg-surface-card px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-brand-green/40 hover:text-white disabled:opacity-60"
              >
                {uploading ? "Subiendo..." : "Subir foto"}
              </button>
              <p className="text-xs text-white/45">JPG, PNG o WebP. Máx. 2 MB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Nombre completo
              </span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                placeholder="Tu nombre"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Puesto de trabajo
              </span>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                placeholder="Ej. Founder, Developer"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Lugar de trabajo
              </span>
              <input
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                placeholder="Empresa u organización"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                LinkedIn
              </span>
              <input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                type="url"
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-green/40"
                placeholder="https://www.linkedin.com/in/tu-perfil"
              />
            </label>

            {error && (
              <p className="sm:col-span-2 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="sm:col-span-2 text-sm text-brand-green" role="status">
                {message}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-green-bright disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar perfil"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
