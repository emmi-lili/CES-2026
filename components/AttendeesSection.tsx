"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { LinkedInIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import { type AttendeeProfile, listAttendees } from "@/lib/networkingApi";

const PAGE_SIZE = 6;

function initialsFromName(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function AttendeeCard({ attendee }: { attendee: AttendeeProfile }) {
  const roleLine = [attendee.job_title, attendee.workplace].filter(Boolean).join(" @ ");

  return (
    <article className="panel group flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:!border-brand-green/40 hover:shadow-[0_0_28px_-8px_rgba(61,240,122,0.5)]">
      {attendee.photo_url ? (
        <Image
          src={attendee.photo_url}
          alt={attendee.full_name ?? "Asistente"}
          width={80}
          height={80}
          // Estas tarjetas se montan tras un fetch async, ya dentro del
          // viewport; el lazy por defecto de next/image no dispara y la foto
          // queda en blanco hasta refrescar. `eager` fuerza la carga inmediata.
          loading="eager"
          className="size-20 rounded-full object-cover ring-2 ring-brand-violet/70 ring-offset-4 ring-offset-surface-card"
        />
      ) : (
        <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-brand-violet text-xl font-bold text-black ring-2 ring-brand-violet/70 ring-offset-4 ring-offset-surface-card">
          {initialsFromName(attendee.full_name)}
        </span>
      )}

      <h3 className="mt-5 text-lg font-bold text-white">{attendee.full_name}</h3>
      {roleLine && (
        <p className="mt-1 text-sm text-white/55">{roleLine}</p>
      )}

      {attendee.linkedin_url ? (
        <a
          href={attendee.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-brand-green/40 hover:text-white"
        >
          <LinkedInIcon className="size-4" />
          Conectar por LinkedIn
        </a>
      ) : (
        <p className="mt-auto pt-4 text-xs text-white/40">Sin LinkedIn registrado</p>
      )}
    </article>
  );
}

/**
 * Directorio de asistentes / networking: grilla de perfiles con enlace a LinkedIn.
 */
export default function AttendeesSection() {
  const [attendees, setAttendees] = useState<AttendeeProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    async function load() {
      try {
        const data = await listAttendees();
        setAttendees(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "No se pudo cargar el directorio.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const shown = attendees.slice(0, visible);
  const hasMore = visible < attendees.length;

  return (
    <section className="relative overflow-hidden bg-black px-5 py-16 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading align="left" kicker="Networking">
          Conecta con el{" "}
          <span className="text-brand-green drop-shadow-[0_0_18px_rgba(61,240,122,0.5)]">
            Futuro
          </span>
        </SectionHeading>

        {loading && (
          <p className="mt-16 text-center text-white/50">Cargando asistentes...</p>
        )}

        {error && (
          <p className="mt-16 text-center text-red-400" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && shown.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((attendee) => (
              <AttendeeCard key={attendee.id} attendee={attendee} />
            ))}
          </div>
        )}

        {!loading && !error && attendees.length === 0 && (
          <p className="mt-16 text-center text-white/50">
            Aún no hay perfiles publicados. Completa el tuyo para aparecer aquí.
          </p>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border border-white/15 bg-surface-card px-8 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-brand-green/50 hover:text-white"
            >
              Ver más asistentes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
