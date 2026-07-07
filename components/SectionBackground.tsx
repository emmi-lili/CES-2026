import { DotPattern } from "./ui/dot-pattern";

/**
 * Ambient section backdrop — pure CSS, no images.
 *
 * A cinematic deep-black layer with a subtle SVG dot pattern, soft neon-green
 * light blobs framing the top corners, matching purple (#5e3996) blobs on the
 * bottom-right, and an edge vignette. Meant to sit as the first child of a
 * `relative` section, behind text and cards; the center stays dark and clean.
 */
export default function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-surface-base">
      {/* Subtle dot pattern, faded toward the edges */}
      <DotPattern
        glow
        className="text-[#5e3996] [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
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

      {/* Purple light blobs (#5e3996) framing the bottom-right for balance */}
      <div
        className="absolute -bottom-[16%] -right-[10%] h-[55%] w-[50%]"
        style={{
          background:
            "radial-gradient(circle at 68% 70%, rgba(94,57,150,0.34), rgba(94,57,150,0.06) 45%, transparent 70%)",
          filter: "blur(46px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -bottom-[6%] right-[6%] h-[26%] w-[30%]"
        style={{
          background:
            "radial-gradient(circle, rgba(94,57,150,0.28), transparent 68%)",
          filter: "blur(34px)",
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
