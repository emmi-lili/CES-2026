"use client";

import DottedMap from "dotted-map";
import { motion } from "motion/react";
import { useMemo } from "react";

type Placement = "top" | "bottom" | "left" | "right";
type Point = {
  lat: number;
  lng: number;
  label?: string;
  flag?: string;
  /** Where the tag sits relative to its bullet (default "top"). */
  place?: Placement;
  /** Extra pixel nudge for fine-tuning crowded tags. */
  offset?: { x?: number; y?: number };
};

interface MapProps {
  dots?: Array<{ start: Point; end: Point }>;
  lineColor?: string;
}

const TAG_TRANSFORM: Record<Placement, string> = {
  top: "translate(-50%, calc(-100% - 8px))",
  bottom: "translate(-50%, 8px)",
  left: "translate(calc(-100% - 10px), -50%)",
  right: "translate(10px, -50%)",
};

/**
 * Aceternity "World Map" — a dotted world map (via `dotted-map`) with animated
 * curved connection arcs drawn on top with `motion`. Adapted for this dark-only
 * site: transparent background, brand-green arcs and a flag + name tag on every
 * bullet.
 */
export function WorldMap({ dots = [], lineColor = "#3DF07A" }: MapProps) {
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Unique, labelled points to tag (de-duped, e.g. a shared start city once).
  const labels = useMemo(() => {
    const seen = new Set<string>();
    const out: Point[] = [];
    for (const { start, end } of dots) {
      for (const p of [start, end]) {
        const key = `${p.lat},${p.lng}`;
        if (p.label && !seen.has(key)) {
          seen.add(key);
          out.push(p);
        }
      }
    }
    return out;
  }, [dots]);

  return (
    <div className="relative aspect-[2/1] w-full font-sans">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        draggable={false}
      />

      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="world-map-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#world-map-line)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 * i, ease: "easeOut" }}
            />
          );
        })}

        {labels.map((p, i) => {
          const { x, y } = projectPoint(p.lat, p.lng);
          return (
            <g key={`pin-${i}`}>
              <circle cx={x} cy={y} r="2" fill={lineColor} />
              <circle cx={x} cy={y} r="2" fill={lineColor} opacity="0.5">
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Flag + name tag on every bullet */}
      {labels.map((p, i) => {
        const { x, y } = projectPoint(p.lat, p.lng);
        return (
          <div
            key={`label-${i}`}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${(x / 800) * 100}%`,
              top: `${(y / 400) * 100}%`,
              transform: `${TAG_TRANSFORM[p.place ?? "top"]} translate(${p.offset?.x ?? 0}px, ${p.offset?.y ?? 0}px)`,
            }}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-green/30 bg-black/85 px-3 py-1 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              {p.flag && <span className="text-base leading-none">{p.flag}</span>}
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
