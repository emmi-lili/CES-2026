type Country = {
  flag: string;
  name: string;
};

const COUNTRIES: Country[] = [
  { flag: "🇺🇸", name: "Estados Unidos" },
  { flag: "🇧🇴", name: "Bolivia" },
  { flag: "🇪🇺", name: "Europa" },
  { flag: "🇻🇪", name: "Venezuela" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇵🇾", name: "Paraguay" },
];

/** Per-row fill duration; six rows × 1.5s = the 9s loop in globals.css. */
const STEP_SECONDS = 2;

/**
 * Faint world-map watermark — a dotted hemisphere grid in dark gray. Purely
 * decorative; sits behind the card content at low opacity.
 */
function WorldMapWatermark() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="meru-dots"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill="#9CA3AF" />
        </pattern>
        <radialGradient id="meru-globe" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="meru-mask">
          <rect width="100%" height="100%" fill="url(#meru-globe)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#meru-dots)"
        mask="url(#meru-mask)"
      />
    </svg>
  );
}

/**
 * "Top 7 destinos de envío de dinero con Meru" card — rebuilt in markup with
 * animated, sequentially-filling progress bars behind each country pill.
 *
 * Exported on its own so it can be dropped anywhere (e.g. centered inside the
 * hero) without the surrounding <section> wrapper.
 */
export function MeruCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[24px] border border-white/5 bg-surface-card px-6 py-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
        <WorldMapWatermark />

        {/* Title block */}
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-extrabold leading-tight text-white">
            Top 7 destinos
          </h2>
          <p className="mt-0.5 text-base font-medium text-white/70">
            de envío de dinero
          </p>
          <span className="mt-3 inline-block rounded-full bg-black px-4 py-1 text-xs font-semibold text-white shadow-sm">
            con Meru
          </span>
        </div>

        {/* Country list with sequential loading bars */}
        <ul className="relative z-10 mt-6 flex flex-col gap-2.5">
          {COUNTRIES.map((country, i) => (
            <li
              key={country.name}
              className="relative flex items-center gap-3 overflow-hidden rounded-full bg-white/10 px-2 py-1.5"
            >
              {/* Animated progress fill (behind the text) */}
              <span
                aria-hidden="true"
                className="meru-fill absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/70 to-emerald-400/40"
                style={{ animationDelay: `${i * STEP_SECONDS}s` }}
              />

              {/* Flag, circle-clipped */}
              <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-base leading-none">
                {country.flag}
              </span>

              {/* Country name */}
              <span className="relative z-10 text-sm font-bold text-white">
                {country.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="relative z-10 mt-7 text-center">
          <p className="text-base font-bold text-white">Meru</p>
          <a
            href="#"
            className="mt-1 inline-block text-sm text-white/55 transition-colors hover:text-white/80"
          >
            Más información →
          </a>
        </div>
    </div>
  );
}

/** Standalone section wrapper around {@link MeruCard}. */
export default function MeruSection() {
  return (
    <section className="bg-black px-5 py-10">
      <MeruCard />
    </section>
  );
}
