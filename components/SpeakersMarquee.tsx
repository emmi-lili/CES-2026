import Image from "next/image";
import Link from "next/link";

import SectionHeading from "./SectionHeading";
import { SPEAKERS, type Speaker } from "./speakers-data";

/** Empresa del speaker (segunda línea del `role`), si existe. */
function company(role: string): string | undefined {
  return role.split("\n")[1];
}

/** Un tile cuadrado (esquinas redondeadas) dentro de la hilera. */
function SpeakerTile({
  speaker,
  hidden,
}: {
  speaker: Speaker;
  hidden?: boolean;
}) {
  const org = company(speaker.role);
  return (
    <Link
      href="/speakers/"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group flex w-40 shrink-0 flex-col items-center gap-3 px-3 text-center sm:w-44"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#4b5563] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-green/50 group-hover:shadow-[0_14px_36px_-12px_rgba(61,240,122,0.5)]">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          sizes="176px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          style={{ objectPosition: speaker.objectPosition ?? "center" }}
        />
        {/* Overlay "Conocer más" al pasar el cursor */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="m-2.5 inline-flex items-center gap-1 rounded-full bg-brand-green px-2.5 py-1 text-[11px] font-semibold text-black">
            Conocer más
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
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-white">
          {speaker.name}
        </span>
        {org ? (
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/45">
            {org}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

/**
 * Hilera continua de speakers (avatares circulares) para la home. Reutiliza la
 * animación `marquee-track` de los sponsors: la pista se duplica para hacer un
 * loop sin cortes, se pausa al pasar el cursor y respeta reduced-motion.
 */
export default function SpeakersMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#070610] via-[#0c0918] to-[#070610] py-16">
      <SectionHeading
        kicker="Lineup"
        subtitle="Líderes que están construyendo el futuro digital de la región"
        className="mx-auto mb-12 max-w-2xl px-5"
      >
        Nuestros Speakers
      </SectionHeading>

      {/* Degradados laterales para una aparición/desaparición suave */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0c0918] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0c0918] to-transparent sm:w-32" />

      {/* Pista duplicada para el loop seamless */}
      <div className="marquee-track flex w-max items-start">
        {[...SPEAKERS, ...SPEAKERS].map((speaker, i) => (
          <SpeakerTile
            key={`${speaker.name}-${i}`}
            speaker={speaker}
            hidden={i >= SPEAKERS.length}
          />
        ))}
      </div>

      {/* CTA a la página completa de speakers */}
      <div className="mt-12 flex justify-center px-5">
        <Link
          href="/speakers/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-green/50 hover:text-brand-green"
        >
          Ver todos los speakers
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
