import Image from "next/image";

import SectionHeading from "./SectionHeading";

type Sponsor = {
  name: string;
  /** Logo en /public. Si no se define, se muestra el nombre como placeholder. */
  logo?: string;
  /** Línea descriptiva (solo se usa en el main sponsor). */
  description?: string;
};

// TODO: reemplazar por los sponsors reales y sus logos (en /public).
const MAIN_SPONSORS: Sponsor[] = [
  {
    name: "Tether",
    logo: "/TETHER.png",
    description: "La stablecoin líder a nivel mundial",
  },
];

const PLATINUM_SPONSORS: Sponsor[] = [
  { name: "BitGo", logo: "/BITGO.png" },
  { name: "Meru", logo: "/meru.png" },
  { name: "BCP", logo: "/BCP.png" },
];

const GOLD_SPONSORS: Sponsor[] = [
  { name: "Toyosa" },
  { name: "Prisma Payments" },
  { name: "Iturri y Asociados", logo: "/ITURRI.png" },
  { name: "Rain", logo: "/RAIN.png" },
];

/** Logo del sponsor, o su nombre como placeholder si aún no hay imagen. */
function SponsorLogo({
  sponsor,
  size,
}: {
  sponsor: Sponsor;
  size: number;
}) {
  if (sponsor.logo) {
    return (
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={size}
        height={size}
        className="h-auto w-auto object-contain"
        style={{ maxHeight: size }}
      />
    );
  }
  // Reserved-slot placeholder (until the real logo is added).
  return (
    <div className="flex flex-col items-center gap-2 text-white/30 transition-colors duration-300 group-hover:text-white/45">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" strokeDasharray="3 3" />
        <path d="M12 9v6M9 12h6" />
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
        Disponible
      </span>
    </div>
  );
}

/** Etiqueta de nivel: mayúsculas, letter-spacing amplio, tamaño pequeño. */
function TierLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/**
 * "Nuestros Sponsors" — tres niveles jerárquicos (Main, Platinum, Gold)
 * sobre un fondo negro profundo con degradados sutiles en púrpura.
 */
export default function SponsorsSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20">
      {/* Degradados sutiles púrpura en las esquinas */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-violet/15 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-violet/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Encabezado */}
        <SectionHeading
          kicker="Partners"
          subtitle="Las marcas que impulsan el futuro digital y la infraestructura de la próxima economía web3."
          className="mx-auto max-w-3xl"
        >
          Nuestros Sponsors
        </SectionHeading>

        {/* MAIN SPONSORS */}
        <div className="mt-16">
          <TierLabel className="text-brand-green">
            {MAIN_SPONSORS.length > 1 ? "Main Sponsors" : "Main Sponsor"}
          </TierLabel>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-6 sm:flex-row">
            {MAIN_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="panel group flex w-full flex-col items-center rounded-3xl p-8 text-center transition-colors duration-300 hover:!border-brand-green/50 sm:w-1/2 sm:p-10 lg:w-2/5"
              >
                <div className="flex h-24 items-center justify-center">
                  <SponsorLogo sponsor={sponsor} size={96} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">
                  {sponsor.name}
                </h3>
                {sponsor.description ? (
                  <p className="mt-2 text-sm text-white/50">
                    {sponsor.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* PLATINUM SPONSORS */}
        <div className="mt-16">
          <TierLabel className="text-brand-violet">Platinum Sponsors</TierLabel>
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLATINUM_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="panel group flex h-32 items-center justify-center rounded-2xl p-6 transition-colors duration-300 hover:!border-brand-violet/50"
              >
                <SponsorLogo sponsor={sponsor} size={72} />
              </div>
            ))}
          </div>
        </div>

        {/* GOLD SPONSORS */}
        <div className="mt-16">
          <TierLabel className="text-white/70">Gold Sponsors</TierLabel>
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {GOLD_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="panel group flex h-24 items-center justify-center rounded-xl p-4 transition-colors duration-300 hover:!border-white/30"
              >
                <SponsorLogo sponsor={sponsor} size={56} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
