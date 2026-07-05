import Image from "next/image";

export type Sponsor = {
  name: string;
  /** Logo en /public. Si no se define, se muestra el nombre como placeholder. */
  logo?: string;
  /** Línea descriptiva (solo se usa en el main sponsor). */
  description?: string;
};

// TODO: reemplazar por los sponsors reales y sus logos (en /public).
export const MAIN_SPONSOR: Sponsor = {
  name: "Meru Pay",
  logo: "/meru.png",
  description: "Liderando el envío de dinero digital",
};

export const PLATINUM_SPONSORS: Sponsor[] = [
  { name: "Sponsor 1" },
  { name: "Sponsor 2" },
  { name: "Sponsor 3" },
];

export const GOLD_SPONSORS: Sponsor[] = [
  { name: "Sponsor 1" },
  { name: "Sponsor 2" },
  { name: "Sponsor 3" },
  { name: "Sponsor 4" },
  { name: "Sponsor 5" },
  { name: "Sponsor 6" },
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
  return (
    <span className="text-center text-sm font-semibold text-white/70">
      {sponsor.name}
    </span>
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
      className={`text-center text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm ${className ?? ""}`}
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
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Nuestros Sponsors
          </h2>
          <p className="mt-3 text-base text-white/60 sm:text-lg">
            Las marcas que impulsan el futuro digital y la infraestructura de la
            próxima economía web3.
          </p>
        </div>

        {/* MAIN SPONSOR */}
        <div className="mt-16">
          <TierLabel className="text-brand-green">Main Sponsor</TierLabel>
          <div className="mt-6 flex justify-center">
            <div className="group flex w-full flex-col items-center rounded-3xl border border-white/10 bg-[#0d0d0d] p-8 text-center transition-colors duration-300 hover:border-brand-green/50 sm:w-4/5 sm:p-10 lg:w-1/2">
              <div className="flex h-24 items-center justify-center">
                <SponsorLogo sponsor={MAIN_SPONSOR} size={96} />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">
                {MAIN_SPONSOR.name}
              </h3>
              {MAIN_SPONSOR.description ? (
                <p className="mt-2 text-sm text-white/50">
                  {MAIN_SPONSOR.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* PLATINUM SPONSORS */}
        <div className="mt-16">
          <TierLabel className="text-brand-violet">Platinum Sponsors</TierLabel>
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLATINUM_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-brand-violet/50"
              >
                <SponsorLogo sponsor={sponsor} size={72} />
              </div>
            ))}
          </div>
        </div>

        {/* GOLD SPONSORS */}
        <div className="mt-16">
          <TierLabel className="text-white/70">Gold Sponsors</TierLabel>
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {GOLD_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-[#0d0d0d] p-4 transition-colors duration-300 hover:border-white/30"
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
