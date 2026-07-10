import { MapPinIcon } from "./icons";

const TICKETS = [
  {
    city: "La Paz",
    day: "28 julio",
    href: "https://todotix.com/ticket/cryptolp",
  },
  {
    city: "Santa Cruz",
    day: "30 julio",
    href: "https://todotix.com/ticket/cryptosc",
  },
];

/**
 * Banner de cierre antes del footer: un llamado final a comprar entradas para
 * cualquiera de las dos sedes, con el glow verde de la marca.
 */
export default function FinalCtaSection() {
  return (
    <section className="bg-black px-4 py-20">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-brand-green/25 bg-gradient-to-b from-brand-green/[0.08] to-transparent px-6 py-14 text-center shadow-[0_0_60px_-20px_rgba(61,240,122,0.4)] sm:px-12">
        {/* Halo verde de fondo */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-[120px]"
        />

        <div className="relative flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
            Entradas disponibles
          </span>

          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl">
            Sé parte del evento cripto más grande de{" "}
            <span className="text-brand-green">Bolivia</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            La Paz y Santa Cruz te esperan este julio de 2026. Asegura tu lugar
            antes de que se agoten las entradas.
          </p>

          {/* Botones por sede */}
          <div className="mt-2 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            {TICKETS.map(({ city, day, href }) => (
              <a
                key={city}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_20px_-10px_rgba(61,240,122,0.35)] transition-all hover:bg-brand-green-bright hover:shadow-[0_10px_24px_-10px_rgba(61,240,122,0.45)]"
              >
                <MapPinIcon className="size-4" />
                Entradas {city}
                <span className="font-mono text-xs font-normal text-black/60">
                  {day}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
