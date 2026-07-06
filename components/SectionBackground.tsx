/**
 * Ambient section backdrop — pure CSS/SVG, no images.
 *
 * A cinematic deep-black layer with a blurred, low-contrast urban skyline
 * melting into the black on the right, and soft neon-green light blobs framing
 * the top corners. Meant to sit as the first child of a `relative` section,
 * behind text and cards; the center stays dark and clean for legibility.
 *
 * Responsive: on mobile the skyline shrinks and centers so it doesn't compete
 * with the content, while the dark gradient and green accents are preserved.
 */

/** Buildings as [x, topY, width]; all rise to the baseline (y = 340). */
const BUILDINGS: Array<[number, number, number]> = [
  [116, 196, 30],
  [148, 96, 32],
  [184, 150, 26],
  [214, 44, 40],
  [258, 118, 24],
  [286, 28, 34],
  [324, 132, 26],
  [352, 70, 30],
  [386, 110, 40],
];

/** A few brighter "lit window" glints [x, y]. */
const WARM_GLINTS: Array<[number, number]> = [
  [156, 118],
  [160, 150],
  [224, 66],
  [230, 108],
  [294, 52],
  [298, 96],
  [360, 92],
  [396, 132],
];

const GREEN_GLINTS: Array<[number, number]> = [
  [220, 58],
  [290, 40],
  [124, 210],
];

export default function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-surface-base">
      {/* Skyline — anchored right on desktop, centered/smaller on mobile */}
      <div className="absolute inset-y-0 right-0 left-[12%] opacity-55 sm:left-auto sm:w-[64%] lg:w-[54%]">
        <svg
          viewBox="0 0 420 340"
          preserveAspectRatio="xMaxYMax slice"
          className="h-full w-full [filter:blur(2.6px)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sb-bld" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e161d" />
              <stop offset="1" stopColor="#06090d" />
            </linearGradient>
            <pattern
              id="sb-win"
              width="8"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="1.8"
                y="2.2"
                width="2.4"
                height="3.2"
                fill="#9fc7b0"
                fillOpacity="0.1"
              />
            </pattern>
          </defs>

          {/* Building masses + faint window grid */}
          {BUILDINGS.map(([x, y, w]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width={w} height={340 - y} fill="url(#sb-bld)" />
              <rect x={x} y={y} width={w} height={340 - y} fill="url(#sb-win)" />
            </g>
          ))}

          {/* Warm night-city glints */}
          <g fill="#e2f0e8" fillOpacity="0.5">
            {WARM_GLINTS.map(([x, y]) => (
              <rect key={`w${x}-${y}`} x={x} y={y} width="2.4" height="3.2" />
            ))}
          </g>
          {/* A couple of green accent windows */}
          <g fill="#5BFF8F" fillOpacity="0.55">
            {GREEN_GLINTS.map(([x, y]) => (
              <rect key={`g${x}-${y}`} x={x} y={y} width="2.4" height="3.2" />
            ))}
          </g>
        </svg>
      </div>

      {/* Haze that melts the tower tops into the black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #05070A 0%, rgba(5,7,10,0.4) 22%, rgba(5,7,10,0) 46%)",
        }}
      />

      {/* Fade the skyline into the black — from the left and along the bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #05070A 0%, rgba(5,7,10,0.55) 38%, rgba(5,7,10,0) 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #05070A 0%, rgba(5,7,10,0) 42%)",
        }}
      />

      {/* Soft neon-green light blobs framing the top corners (left-heavy) */}
      <div
        className="absolute -left-[10%] -top-[16%] h-[55%] w-[50%]"
        style={{
          background:
            "radial-gradient(circle at 32% 30%, rgba(61,240,122,0.34), rgba(61,240,122,0.06) 45%, transparent 70%)",
          filter: "blur(46px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute left-[8%] top-0 h-[26%] w-[30%]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,255,143,0.28), transparent 68%)",
          filter: "blur(34px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -right-[8%] -top-[18%] h-[42%] w-[40%]"
        style={{
          background:
            "radial-gradient(circle at 70% 28%, rgba(61,240,122,0.2), transparent 66%)",
          filter: "blur(52px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Edge vignette to deepen the frame and keep the center clean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 100% at 50% 42%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
