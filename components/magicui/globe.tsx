"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Higher = the globe reacts less to dragging. */
const MOVEMENT_DAMPING = 3200;
/** Auto-rotation applied per frame when idle. Lower = slower. */
const DEFAULT_SPEED = 0.005;

/** Fraction of the container the globe canvas fills, leaving a ring for tags. */
const GLOBE_SCALE = 0.72;
/** Radii as a fraction from the container center (0.5 = container edge). */
const R_LINE_END = 0.42; // where the leader line stops (just inside the tag)
const R_TAG = 0.46; // tag center — parked just outside the globe
/** Below this distance-from-center the radial direction is unstable, so hold. */
const CENTER_EPS = 0.03;

/** cobe marker radius (ee = 0.8); keeps overlay dots on the sphere surface. */
const MARKER_RADIUS = 0.8;

/** A country pin: a live dot on the globe with an orbiting flag + name tag. */
export type GlobeLabel = {
  /** [latitude, longitude] in degrees. */
  location: [number, number];
  name: string;
  flag?: string;
};

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [],
};

/** Smooth 0→1 ramp between two edges (Hermite), used to fade callouts in. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Project a lat/long onto the canvas exactly the way cobe does internally
 * (its `U` ∘ `O`), so overlays line up with the rendered texture. Returns
 * canvas-normalized [0..1] coords and a signed depth (>0 ⇒ front hemisphere).
 */
function project(lat: number, long: number, phi: number, theta: number) {
  const latR = (lat * Math.PI) / 180;
  const longR = (long * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latR);

  const x = -cosLat * Math.cos(longR) * MARKER_RADIUS;
  const y = Math.sin(latR) * MARKER_RADIUS;
  const z = cosLat * Math.sin(longR) * MARKER_RADIUS;

  const ct = Math.cos(theta);
  const cp = Math.cos(phi);
  const st = Math.sin(theta);
  const sp = Math.sin(phi);

  const c = cp * x + sp * z;
  const s = sp * st * x + ct * y - cp * st * z;
  const depth = -sp * ct * x + st * y + cp * ct * z;

  return { nx: (c + 1) / 2, ny: (-s + 1) / 2, depth };
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  speed = DEFAULT_SPEED,
  labels = [],
}: {
  className?: string;
  config?: COBEOptions;
  /** Auto-rotation step per frame. Lower = slower. */
  speed?: number;
  /** Country callouts overlaid on the globe. */
  labels?: GlobeLabel[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  const dotRefs = useRef<Array<SVGGElement | null>>([]);
  const tagRefs = useRef<Array<HTMLDivElement | null>>([]);

  const pointerInteracting = useRef<number | null>(null);
  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  useEffect(() => {
    // Start from the configured orientation so the first paint can be aimed at
    // the region that actually holds the pins.
    let phi = config.phi ?? 0;
    let width = 0;
    let frameId = 0;
    const theta = config.theta ?? 0;
    // Persisted radial direction per label, so tags don't snap when a country
    // crosses the globe center (where the direction is undefined).
    const dirs = labels.map(() => ({ x: 0, y: -1 }));

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.offsetWidth;
      const rootW = width / GLOBE_SCALE;
      if (rootW > 0) {
        svgRef.current?.setAttribute("viewBox", `0 0 ${rootW} ${rootW}`);
      }
    };

    // ResizeObserver keeps the globe + overlays correct through late layout,
    // font loads and container resizes — not just window resizes.
    const observer = new ResizeObserver(measure);
    if (canvasRef.current) observer.observe(canvasRef.current);
    measure();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    // cobe v2 dropped the onRender callback — drive rotation ourselves and lay
    // out the HTML/SVG callouts in lockstep with the globe.
    const render = () => {
      if (!pointerInteracting.current && !reduceMotion) phi += speed;
      const currentPhi = phi + rs.get();

      globe.update({
        phi: currentPhi,
        width: width * 2,
        height: width * 2,
      });

      const rootW = width / GLOBE_SCALE;

      // Before layout settles the canvas can measure 0; don't pile callouts at
      // the origin — keep them hidden until we have a real size.
      if (rootW <= 0) {
        for (let i = 0; i < labels.length; i++) {
          if (lineRefs.current[i]) lineRefs.current[i]!.style.opacity = "0";
          if (dotRefs.current[i]) dotRefs.current[i]!.style.opacity = "0";
          if (tagRefs.current[i]) tagRefs.current[i]!.style.opacity = "0";
        }
        frameId = requestAnimationFrame(render);
        return;
      }

      for (let i = 0; i < labels.length; i++) {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        const tag = tagRefs.current[i];
        if (!line || !dot || !tag) continue;

        const { nx, ny, depth } = project(
          labels[i].location[0],
          labels[i].location[1],
          currentPhi,
          theta,
        );

        // Dot: the live country position, mapped into container pixels.
        const dnx = 0.5 + (nx - 0.5) * GLOBE_SCALE;
        const dny = 0.5 + (ny - 0.5) * GLOBE_SCALE;
        const dotX = dnx * rootW;
        const dotY = dny * rootW;

        // Radial direction from center → dot; hold last value near the center.
        let ux = dnx - 0.5;
        let uy = dny - 0.5;
        const mag = Math.hypot(ux, uy);
        if (mag > CENTER_EPS) {
          ux /= mag;
          uy /= mag;
          dirs[i].x = ux;
          dirs[i].y = uy;
        } else {
          ux = dirs[i].x;
          uy = dirs[i].y;
        }

        // Leader line and tag ride straight out along that radial direction, so
        // pins never cross each other and each tag hugs its own country.
        const endX = (0.5 + ux * R_LINE_END) * rootW;
        const endY = (0.5 + uy * R_LINE_END) * rootW;
        const tagX = (0.5 + ux * R_TAG) * rootW;
        const tagY = (0.5 + uy * R_TAG) * rootW;

        const opacity = smoothstep(0.05, 0.35, depth);

        line.setAttribute("x1", String(dotX));
        line.setAttribute("y1", String(dotY));
        line.setAttribute("x2", String(endX));
        line.setAttribute("y2", String(endY));
        line.style.opacity = String(opacity);

        dot.setAttribute("transform", `translate(${dotX} ${dotY})`);
        dot.style.opacity = String(opacity);

        tag.style.transform = `translate(${tagX}px, ${tagY}px) translate(-50%, -50%)`;
        tag.style.opacity = String(opacity);
      }

      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    const revealId = window.setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(revealId);
      observer.disconnect();
      globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rs, config, speed, labels]);

  const setCursor = (grabbing: boolean) => {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = grabbing ? "grabbing" : "grab";
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-visible", className)}>
      {/* Globe canvas — centered and scaled down to leave a ring for tags. */}
      <div
        className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{ width: `${GLOBE_SCALE * 100}%` }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className="size-full cursor-grab touch-none opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            e.currentTarget.setPointerCapture(e.pointerId);
            setCursor(true);
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current === null) return;
            const delta = e.clientX - pointerInteracting.current;
            pointerInteracting.current = e.clientX;
            r.set(r.get() + delta / MOVEMENT_DAMPING);
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            setCursor(false);
          }}
          onPointerCancel={() => {
            pointerInteracting.current = null;
            setCursor(false);
          }}
        />
      </div>

      {/* Leader lines + pulsing dots (positioned every frame by the loop). */}
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <filter id="globe-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {labels.map((label, i) => (
          <line
            key={`line-${label.name}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            stroke="#3DF07A"
            strokeWidth={1.5}
            strokeLinecap="round"
            filter="url(#globe-glow)"
            style={{ opacity: 0 }}
          />
        ))}

        {labels.map((label, i) => (
          <g
            key={`dot-${label.name}`}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            filter="url(#globe-glow)"
            style={{ opacity: 0 }}
          >
            <circle r={4} fill="none" stroke="#3DF07A" strokeWidth={1.5}>
              <animate
                attributeName="r"
                values="4;13"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r={4.5} fill="#3DF07A" />
            <circle r={1.8} fill="#ffffff" opacity={0.9} />
          </g>
        ))}
      </svg>

      {/* Orbiting tags (always horizontal, fade with the front hemisphere). */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {labels.map((label, i) => (
          <div
            key={`tag-${label.name}`}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-green/30 bg-black/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.55)] backdrop-blur-sm will-change-transform"
            style={{ opacity: 0 }}
          >
            {label.flag && (
              <span className="text-sm leading-none">{label.flag}</span>
            )}
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
}
