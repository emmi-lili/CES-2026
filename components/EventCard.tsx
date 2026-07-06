import { MapPinIcon } from "./icons";

export type EventCardProps = {
  /** Big day number, e.g. "28". */
  day: string;
  /** City name, e.g. "La Paz". */
  city: string;
  /** Hotel name shown below the plate, e.g. "Hotel Casagrande". */
  hotel: string;
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
  month = "julio",
}: EventCardProps) {
  return (
    <div className="flex flex-col">
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
            <span className="text-sm font-semibold text-white/75">{month}</span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-white/60">{city}</p>
        </div>
      </div>

      {/* Hotel name — below the plate, outside */}
      <p className="mt-2 flex items-center gap-1.5 text-xs text-white/55">
        <MapPinIcon className="size-3.5 shrink-0 text-brand-green" />
        {hotel}
      </p>
    </div>
  );
}
