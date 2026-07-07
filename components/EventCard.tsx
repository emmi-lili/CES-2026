import { MapPinIcon } from "./icons";

export type EventCardProps = {
  /** Big day number, e.g. "28". */
  day: string;
  /** City name, e.g. "La Paz". */
  city: string;
  /** Hotel name shown below the plate, e.g. "Hotel Casagrande". */
  hotel: string;
  /** Google Maps URL opened when the hotel is clicked. */
  mapUrl: string;
  /** Month label, defaults to "julio". */
  month?: string;
};

/**
 * Glassmorphism date badge for the hero: a polished, silver-tinted glass plate
 * with the day + month bold on top and the city below, and the hotel name in
 * light gray just underneath the plate, preceded by a location pin.
 */
export default function EventCard({
  day,
  city,
  hotel,
  mapUrl,
  month = "julio",
}: EventCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Polished glass plate */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-white/[0.02] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_16px_40px_-16px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {/* Top glare reflection */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
        />

        <div className="relative">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold leading-none text-white sm:text-5xl">
              {day}
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-white/70">
              {month}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-white/60">{city}</p>
        </div>
      </div>

      {/* Hotel name — below the plate; opens its location on the map */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-2 inline-flex items-center gap-1.5 text-xs text-white/55 transition-colors hover:text-brand-green"
        title={`Ver ${hotel} en el mapa`}
      >
        <MapPinIcon className="size-3.5 shrink-0 text-brand-green" />
        <span className="underline-offset-2 group-hover:underline">{hotel}</span>
      </a>
    </div>
  );
}
