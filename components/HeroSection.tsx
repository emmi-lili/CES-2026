import EventCard from "./EventCard";
import NavBar from "./NavBar";
import SectionBackground from "./SectionBackground";
import { EncryptedText } from "./ui/encrypted-text";

/**
 * Full hero for the Crypto Experience Summit 2026 landing page.
 *
 * Composition:
 *   NavBar → cinematic neon backdrop with the centered "encrypted" headline and
 *   the two date badges.
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-x-clip bg-black">
      <NavBar />

      {/* Cinematic neon backdrop fills the remaining viewport height */}
      <div className="relative flex flex-1 flex-col">
        <SectionBackground />

        {/* Foreground content — centered within the full-height area */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-12 px-5 py-14 text-center">
          {/* Encrypted headline */}
          <h1>
            <EncryptedText
              text="El futuro ya comenzó"
              duration={6000}
              className="block font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.22)] sm:text-6xl md:text-7xl"
            />
          </h1>

          {/* Date badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
