"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedInIcon, XIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { SPEAKERS, type Speaker } from "./speakers-data";

/** Separa el `role` ("Título\nEMPRESA") en sus dos partes. */
function parseRole(role: string): { title: string; company?: string } {
  const [title, company] = role.split("\n");
  return { title, company };
}

/** Texto para el badge tipo pill: "CEO @ MERU". */
function roleBadge(role: string): string {
  const { title, company } = parseRole(role);
  return company ? `${title} @ ${company}` : title;
}

/** A single speaker card. */
function SpeakerCard({
  speaker,
  onSelect,
  priority = false,
}: {
  speaker: Speaker;
  onSelect: (speaker: Speaker) => void;
  /** Precarga la foto (sin lazy) para las cards visibles al inicio. */
  priority?: boolean;
}) {
  const { name, role, photo, linkedin, objectPosition } = speaker;
  const { title, company } = parseRole(role);
  return (
    <article
      onClick={() => onSelect(speaker)}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/60 hover:bg-white/[0.05] hover:shadow-[0_14px_40px_-12px_rgba(61,240,122,0.45)]"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#4b5563]">
        <Image
          src={photo}
          alt={name}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          style={{ objectPosition: objectPosition ?? "center" }}
        />
        {/* Overlay "Ver perfil" al pasar el cursor */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="m-3 inline-flex items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-black">
            Ver perfil
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="text-base font-bold text-white sm:text-lg">{name}</h3>
        <p className="mt-0.5 whitespace-pre-line text-sm leading-snug text-white/55">
          {title}
          {company ? (
            <>
              {"\n"}
              <span className="font-bold text-white/85">{company}</span>
            </>
          ) : null}
        </p>

        {/* Social links pinned to bottom */}
        <div className="mt-auto flex items-center gap-3 pt-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${name}`}
            onClick={(e) => e.stopPropagation()}
            className="text-white/40 transition-colors hover:text-brand-green"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Modal con el perfil detallado del speaker. */
function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);

  // Anima la entrada (fade + scale 95% -> 100%) tras el montaje.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cerrar con Escape + bloquear el scroll del body mientras está abierto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const { name, role, photo, linkedin, twitter, bio, objectPosition } = speaker;
  const bioText =
    bio ??
    `${name} es ${roleBadge(role)}, una de las voces que están impulsando la adopción de activos digitales en la región. Acompáñanos en el Crypto Experience Summit para conocer su visión sobre el futuro del ecosistema.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${name}`}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay: negro semitransparente + blur sutil */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-brand-green/40 bg-[#0d0d0d] shadow-[0_0_40px_-5px_rgba(61,240,122,0.5)] transition-all duration-300 md:flex-row ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Columna izquierda: foto full-bleed con gradiente */}
        <div className="relative h-56 w-full shrink-0 md:h-auto md:w-2/5">
          <Image
            src={photo}
            alt={name}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: objectPosition ?? "center" }}
          />
          {/* Gradiente: se funde hacia abajo en móvil, hacia la derecha en desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0d0d] md:bg-gradient-to-r" />
        </div>

        {/* Columna derecha: información */}
        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">{name}</h3>

          {/* Badge tipo pill */}
          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-green/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-brand-green">
            {roleBadge(role)}
          </span>

          {/* Bio con scroll interno + fade si es larga */}
          <div className="mt-5 overflow-y-auto pr-2 pb-1 text-sm leading-relaxed text-white/60">
            {bioText.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-3" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider + redes */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center gap-6">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              {twitter ? (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reparte `n` speakers en filas de 4 y 3, priorizando filas de 4 y evitando
 * filas sueltas de 1 o 2 (p. ej. 18 -> [4,4,4,3,3], 14 -> [4,4,3,3]).
 */
function computeRowSizes(n: number): number[] {
  if (n <= 4) return n > 0 ? [n] : [];

  const fours = Math.floor(n / 4);
  const remainder = n % 4;

  if (remainder === 0) return Array(fours).fill(4);
  if (remainder === 3) return [...Array(fours).fill(4), 3];
  if (remainder === 2 && fours >= 1)
    return [...Array(fours - 1).fill(4), 3, 3];
  if (remainder === 1 && fours >= 2)
    return [...Array(fours - 2).fill(4), 3, 3, 3];

  // Fallback para casos pequeños poco comunes (n = 5).
  return [...Array(fours).fill(4), remainder];
}

/** Divide la lista de speakers en filas uniformes de 4 y 3. */
function chunkSpeakers(speakers: Speaker[]): Speaker[][] {
  const rows: Speaker[][] = [];
  let i = 0;
  for (const size of computeRowSizes(speakers.length)) {
    rows.push(speakers.slice(i, i + size));
    i += size;
  }
  return rows;
}

/**
 * "Nuestros Speakers" — speakers en orden alfabético, repartidos en filas
 * uniformes de 4 y 3 (centradas), sobre un fondo space-navy.
 */
export default function SpeakersSection() {
  const [selected, setSelected] = useState<Speaker | null>(null);

  const speakers = [...SPEAKERS].sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" })
  );
  const rows = chunkSpeakers(speakers);

  return (
    <section className="bg-gradient-to-b from-[#070610] via-[#0c0918] to-[#070610] px-4 py-16">
      {/* Heading */}
      <SectionHeading
        kicker="Lineup"
        subtitle="Líderes que están construyendo el futuro digital"
        className="mx-auto max-w-2xl"
      >
        Nuestros Speakers
      </SectionHeading>

      {/* Filas uniformes (4 y 3) centradas, con tarjetas de igual altura */}
      <div className="mx-auto mt-12 max-w-6xl space-y-6">
        {(() => {
          let globalIndex = 0;
          return rows.map((row, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.08}
              className="flex flex-wrap justify-center gap-6"
            >
              {row.map((speaker) => {
                // Las primeras 8 fotos (arriba del fold) se precargan sin lazy.
                const priority = globalIndex < 8;
                globalIndex += 1;
                return (
                  <div
                    key={speaker.name}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                  >
                    <SpeakerCard
                      speaker={speaker}
                      onSelect={setSelected}
                      priority={priority}
                    />
                  </div>
                );
              })}
            </Reveal>
          ));
        })()}
      </div>

      {/* Cierre / call-out */}
      <p className="mx-auto mt-16 max-w-3xl text-center text-2xl font-semibold text-white sm:text-3xl">
        No te pierdas de este evento internacional que llega a{" "}
        <span className="text-brand-green">Bolivia</span>
      </p>

      {selected ? (
        <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
