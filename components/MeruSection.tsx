import type { COBEOptions } from "cobe";
import { Globe, type GlobeLabel } from "./magicui/globe";

/**
 * Dark-themed globe: charcoal landmasses with a green brand glow. Country pins
 * are HTML/SVG callouts (see {@link Globe}), so cobe's on-sphere markers are
 * left empty here.
 */
const MERU_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  // ≈327° — orients the globe so all destinations (Americas + Europe) face the
  // viewer on load, then it slowly rotates from there.
  phi: 5.71,
  theta: 0.2,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 3.2,
  baseColor: [0.28, 0.32, 0.3],
  markerColor: [61 / 255, 240 / 255, 122 / 255],
  glowColor: [0.09, 0.35, 0.18],
  markers: [],
};

/** Destination countries, pinned at their real coordinates. */
const COUNTRY_LABELS: GlobeLabel[] = [
  { name: "Estados Unidos", flag: "🇺🇸", location: [39.0, -98.0] },
  { name: "Europa", flag: "🇪🇺", location: [48.85, 2.35] },
  { name: "Venezuela", flag: "🇻🇪", location: [10.48, -66.9] },
  { name: "Colombia", flag: "🇨🇴", location: [4.71, -74.07] },
  { name: "Bolivia", flag: "🇧🇴", location: [-16.5, -68.15] },
  { name: "Paraguay", flag: "🇵🇾", location: [-25.28, -57.63] },
];

/**
 * Big, slowly-rotating 3D globe. Each destination has a live dot on its real
 * location; a short radial leader line carries an orbiting flag + name tag just
 * outside the globe, fading in as that country rotates to the front.
 */
export function MeruCard() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-2xl">
      <Globe config={MERU_GLOBE_CONFIG} speed={0.0015} labels={COUNTRY_LABELS} />

      {/* Accessible, static equivalent for screen readers. */}
      <ul className="sr-only">
        {COUNTRY_LABELS.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
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
