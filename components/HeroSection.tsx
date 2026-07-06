import EventCard from "./EventCard";
import Header from "./Header";
import NavBar from "./NavBar";
import SectionBackground from "./SectionBackground";
import { WorldMap } from "./ui/world-map";

/** Meru remittance corridors radiating from La Paz to the destinations. */
const LA_PAZ = {
  lat: -16.5,
  lng: -68.15,
  label: "La Paz",
  flag: "🇧🇴",
  place: "bottom" as const,
  offset: { x: -28 },
};
const MAP_CONNECTIONS = [
  { start: LA_PAZ, end: { lat: 25.76, lng: -80.19, label: "Estados Unidos", flag: "🇺🇸" } },
  { start: LA_PAZ, end: { lat: 40.42, lng: -3.7, label: "Europa", flag: "🇪🇺" } },
  { start: LA_PAZ, end: { lat: 10.48, lng: -66.9, label: "Venezuela", flag: "🇻🇪", place: "right" as const } },
  { start: LA_PAZ, end: { lat: 4.71, lng: -74.07, label: "Colombia", flag: "🇨🇴", place: "left" as const } },
  { start: LA_PAZ, end: { lat: -25.28, lng: -57.63, label: "Paraguay", flag: "🇵🇾", place: "bottom" as const, offset: { x: 34 } } },
];

/**
 * Full hero for the Crypto Experience Summit 2026 landing page.
 *
 * Composition:
 *   Header (black bar) → NavBar (green-tinted) → cinematic city/neon hero with
 *   the headline and date cards.
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-x-clip bg-black">
      <Header />
      <NavBar />

      {/* Cinematic skyline + neon backdrop fills the remaining viewport height */}
      <div className="relative flex flex-1 flex-col">
        <SectionBackground />

        {/* Foreground content — vertically centered within the full-height area */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-14">
          {/* Headline + date badges — stacked on mobile, side by side on desktop */}
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
            <h1 className="min-w-0 tracking-tight">
              <span className="block text-2xl font-extrabold text-white/90 sm:text-4xl">
                El futuro digital
              </span>
              <span className="mt-1 block text-5xl font-black leading-[0.95] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.28)] sm:text-7xl">
                Ya comenzó
              </span>
            </h1>

            <div className="flex shrink-0 flex-wrap gap-4 sm:gap-5">
              <EventCard day="28" city="La Paz" hotel="Hotel Casa Grande" />
              <EventCard day="30" city="Santa Cruz" hotel="Hotel Marriott" />
            </div>
          </div>

          {/* World map with animated remittance corridors from La Paz */}
          <div className="mt-12 w-full">
            <WorldMap dots={MAP_CONNECTIONS} lineColor="#3DF07A" />
          </div>
        </div>
      </div>
    </section>
  );
}
