/**
 * Pure-CSS / SVG hero backdrop — no images.
 *
 * Layer order (bottom → top):
 *   1. near-black base fill
 *   2. deep dark-green PCB circuit trace pattern (SVG)
 *   3. green neon diagonal streaks from the top-left
 *   4. purple/violet neon rays from the bottom-right
 *   5. subtle vignette to deepen the edges
 */
export default function CircuitBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-surface-base">
      {/* 2. Circuit board PCB traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pcb"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="#0E5A33"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M0 16 H24 L32 24 V64" />
              <path d="M64 12 H44 L36 20 V64" />
              <path d="M0 48 H16 L24 40 H64" />
              <path d="M48 0 V20 L40 28 H0" />
              <path d="M32 0 V8" />
            </g>
            <g fill="#11713F">
              <circle cx="24" cy="16" r="2.2" />
              <circle cx="44" cy="12" r="2.2" />
              <circle cx="16" cy="48" r="2.2" />
              <circle cx="48" cy="0" r="2.2" />
              <circle cx="36" cy="20" r="1.8" />
              <circle cx="32" cy="24" r="1.8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb)" />
      </svg>

      {/* 3. Green neon diagonal streaks from top-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(61,240,122,0.55) 0%, rgba(61,240,122,0.12) 14%, rgba(61,240,122,0) 34%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -left-[10%] -top-[30%] h-[120%] w-[70%] rotate-[18deg]"
        style={{
          background:
            "linear-gradient(90deg, rgba(91,255,143,0) 0%, rgba(91,255,143,0.35) 45%, rgba(91,255,143,0) 60%)",
          filter: "blur(36px)",
          mixBlendMode: "screen",
        }}
      />

      {/* 4. Purple/violet neon rays from bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 100%, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0.12) 28%, rgba(139,92,246,0) 52%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -bottom-[25%] -right-[10%] h-[110%] w-[65%] -rotate-[18deg]"
        style={{
          background:
            "linear-gradient(90deg, rgba(168,85,247,0) 0%, rgba(168,85,247,0.30) 50%, rgba(168,85,247,0) 65%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      {/* 5. Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 40%, rgba(5,7,10,0) 45%, rgba(5,7,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
