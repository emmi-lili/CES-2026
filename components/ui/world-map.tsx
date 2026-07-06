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
};

const TAG_TRANSFORM: Record<Placement, string> = {
  top: "translate(-50%, calc(-100% - 8px))",
  bottom: "translate(-50%, 8px)",
  left: "translate(calc(-100% - 8px), -50%)",
  right: "translate(8px, -50%)",
};

interface MapProps {
  dots?: Array<{ start: Point; end: Point }>;
  lineColor?: string;
}

/**
 * Aceternity "World Map" — a dotted world map (via `dotted-map`) with animated
 * curved connection arcs drawn on top with `motion`. Adapted for this dark-only
 * site: the theme is fixed to dark and the map background is transparent so it
 * blends into the section behind it.
 */
export function WorldMap({ dots = [], lineColor = "#3DF07A" }: MapProps) {
  // Building the dotted map is expensive — do it once.
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Unique, labelled points to tag with a flag + name (de-duped, e.g. the
  // shared start city is only tagged once).
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

        {/* Animated arcs */}
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

        {/* Endpoint pins with a pulsing halo */}
        {dots.map((dot, i) => {
          const points = [
            projectPoint(dot.start.lat, dot.start.lng),
            projectPoint(dot.end.lat, dot.end.lng),
          ];
          return (
            <g key={`points-${i}`}>
              {points.map((p, j) => (
                <g key={`point-${i}-${j}`}>
                  <circle cx={p.x} cy={p.y} r="2" fill={lineColor} />
                  <circle cx={p.x} cy={p.y} r="2" fill={lineColor} opacity="0.5">
                    <animate
                      attributeName="r"
                      from="2"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Flag + name tags anchored to each bullet */}
      {labels.map((p, i) => {
        const { x, y } = projectPoint(p.lat, p.lng);
        return (
          <div
            key={`label-${i}`}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${(x / 800) * 100}%`,
              top: `${(y / 400) * 100}%`,
              transform: TAG_TRANSFORM[p.place ?? "top"],
            }}
          >
            <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-brand-green/30 bg-black/85 px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              {p.flag && <span className="leading-none">{p.flag}</span>}
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
