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

interface MapProps {
  dots?: Array<{ start: Point; end: Point }>;
  lineColor?: string;
}

const TAG_TRANSFORM: Record<Placement, string> = {
  top: "translate(-50%, calc(-100% - 6px))",
  bottom: "translate(-50%, 6px)",
  left: "translate(calc(-100% - 6px), -50%)",
  right: "translate(6px, -50%)",
};

/**
 * Aceternity "World Map" — a dotted map (via `dotted-map`) with animated curved
 * connection arcs drawn on top with `motion`. Adapted for this dark-only site:
 * transparent background, brand-green arcs, and a flag + name tag on every
 * bullet. The map auto-frames (close-up) to the bounding box of the given
 * points so the countries and their tags have room to breathe.
 */
export function WorldMap({ dots = [], lineColor = "#3DF07A" }: MapProps) {
  const { svgMap, width, height, project } = useMemo(() => {
    const pts = dots.flatMap((d) => [d.start, d.end]);
    const lats = pts.map((p) => p.lat);
    const lngs = pts.map((p) => p.lng);

    // Close-up region around the points (with padding). Extra headroom on top
    // for the tags that sit above the northern bullets.
    const region = pts.length
      ? {
          lat: { min: Math.min(...lats) - 8, max: Math.max(...lats) + 6 },
          lng: { min: Math.min(...lngs) - 12, max: Math.max(...lngs) + 12 },
        }
      : undefined;

    const map = new DottedMap({ height: 60, grid: "diagonal", region });
    const svg = map.getSVG({
      radius: 0.28,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "transparent",
    });

    const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const width = vb ? parseFloat(vb[1]) : 100;
    const height = vb ? parseFloat(vb[2]) : 60;

    // dotted-map's own (proj4) projection → coordinates in the SVG viewBox.
    const project = (lat: number, lng: number) => {
      const pin = map.getPin({ lat, lng });
      return { x: pin?.x ?? 0, y: pin?.y ?? 0 };
    };

    return { svgMap: svg, width, height, project };
  }, [dots]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const dr = Math.hypot(end.x - start.x, end.y - start.y);
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - dr * 0.2;
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

  // Stroke widths / radii are relative to the (small) viewBox.
  const unit = Math.max(width, height) / 100;

  return (
    <div className="relative w-full font-sans" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)]"
        alt="world map"
        draggable={false}
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
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
          const start = project(dot.start.lat, dot.start.lng);
          const end = project(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#world-map-line)"
              strokeWidth={unit * 0.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 * i, ease: "easeOut" }}
            />
          );
        })}

        {labels.map((p, i) => {
          const { x, y } = project(p.lat, p.lng);
          return (
            <g key={`pin-${i}`}>
              <circle cx={x} cy={y} r={unit * 1.2} fill={lineColor} />
              <circle cx={x} cy={y} r={unit * 1.2} fill={lineColor} opacity="0.5">
                <animate
                  attributeName="r"
                  from={unit * 1.2}
                  to={unit * 4.5}
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
        const { x, y } = project(p.lat, p.lng);
        return (
          <div
            key={`label-${i}`}
            className="pointer-events-none absolute z-10"
            style={{
              left: `${(x / width) * 100}%`,
              top: `${(y / height) * 100}%`,
              transform: TAG_TRANSFORM[p.place ?? "top"],
            }}
          >
            <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-brand-green/30 bg-black/85 px-2 py-0.5 text-[11px] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              {p.flag && <span className="leading-none">{p.flag}</span>}
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
