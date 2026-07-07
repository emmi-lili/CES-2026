import EventCard from "./EventCard";
import NavBar from "./NavBar";
import SectionBackground from "./SectionBackground";

/**
 * Full hero for the Crypto Experience Summit 2026 landing page.
 *
 * Composition:
 *   NavBar → cinematic neon backdrop with a date/location pill, the centered
 *   "encrypted" headline, a supporting paragraph, two CTAs, and the two date
 *   badges for La Paz & Santa Cruz.
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-x-clip bg-black">
      <NavBar />

      {/* Cinematic neon backdrop fills the remaining viewport height */}
      <div className="relative flex flex-1 flex-col">
        <SectionBackground />

        {/* Foreground content — centered within the full-height area */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 px-5 py-14 text-center">
          {/* Date / location pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5e3996]/50 bg-[#5e3996]/20 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c4b0e0] backdrop-blur-sm sm:text-xs">
            28 &amp; 30 Julio 2026 • La Paz &amp; Santa Cruz, Bolivia
          </span>

          {/* Headline */}
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.22)] sm:text-6xl md:text-7xl">
            El futuro digital ya comenzó
          </h1>

          {/* Supporting paragraph */}
          <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Reuniendo a los visionarios del mañana. Líderes de la industria,
            innovadores, desarrolladores, constructores y legisladores que dan
            forma al ecosistema Web3 en el Crypto Experience Summit 2026.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <a
              href="#tickets"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_20px_-10px_rgba(61,240,122,0.35)] transition-all hover:bg-brand-green-bright hover:shadow-[0_10px_24px_-10px_rgba(61,240,122,0.45)]"
            >
              Obtener entradas
              <svg
                className="size-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Date badges */}
          <div className="mt-2 flex flex-wrap justify-center gap-4 sm:gap-6">
            <EventCard
              day="28"
              city="La Paz"
              hotel="Hotel Casa Grande"
              mapUrl="https://www.google.com/maps/search/?api=1&query=Hotel+Casa+Grande+La+Paz+Bolivia"
            />
            <EventCard
              day="30"
              city="Santa Cruz"
              hotel="Hotel Marriott"
              mapUrl="https://www.google.com/maps/search/?api=1&query=Santa+Cruz+Marriott+Hotel+Bolivia"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
