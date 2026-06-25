import { MapPinIcon } from "./icons";

export type EventCardProps = {
  /** Big day number, e.g. "28". */
  day: string;
  /** City name, e.g. "La Paz". */
  city: string;
  /** Venue / hotel name, e.g. "Hotel Casagrande". */
  venue: string;
  /** Month label rendered as superscript, defaults to "julio". */
  month?: string;
};

/**
 * Dark semi-transparent glass card used in the hero for each summit date.
 */
export default function EventCard({
  day,
  city,
  venue,
  month = "julio",
}: EventCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-surface-card/55 px-3 py-2.5 backdrop-blur-md">
      <div className="flex items-start gap-1">
        <span className="text-2xl font-bold leading-none text-white">
          {day}
        </span>
        <span className="mt-[1px] text-[9px] font-medium text-white/70">
          {month}
        </span>
        <MapPinIcon className="ml-auto mt-[1px] h-3.5 w-3.5 shrink-0 text-brand-green" />
      </div>
      <p className="mt-2 truncate text-[13px] font-bold text-white">{city}</p>
      <p className="truncate text-[10px] text-white/55">{venue}</p>
    </div>
  );
}
