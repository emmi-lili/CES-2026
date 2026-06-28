import CircuitBackground from "./CircuitBackground";
import EventCard from "./EventCard";
import Header from "./Header";
import { MeruCard } from "./MeruSection";
import NavBar from "./NavBar";

/**
 * Full hero for the Crypto Experience Summit 2026 landing page.
 *
 * Composition:
 *   Header (black bar) → NavBar (green-tinted) → neon/circuit hero with the
 *   headline and date cards.
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-x-clip bg-black">
      <Header />
      <NavBar />

      {/* Neon/circuit backdrop fills the remaining viewport height */}
      <div className="relative flex flex-1 flex-col">
        <CircuitBackground />

        {/* Foreground content — vertically centered within the full-height area */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-14">
          {/* Headline + date cards — side by side */}
          <div className="flex flex-row items-center justify-between gap-3">
            <h1 className="min-w-0 flex-1 text-[22px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
              El futuro digital
              <br />
              Ya comenzó
            </h1>

            <div className="flex w-[152px] shrink-0 gap-2 sm:w-[340px] sm:gap-4">
              <EventCard day="28" city="La Paz" venue="Hotel Casagrande" />
              <EventCard day="30" city="Santa Cruz" venue="Hotel Marriott" />
            </div>
          </div>

          {/* Top 7 destinos card — centered in the middle of the hero */}
          <div className="mt-12 flex justify-center">
            <MeruCard />
          </div>
        </div>
      </div>
    </section>
  );
}
