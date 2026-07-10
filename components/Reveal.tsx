"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper: fades its children in and lifts them up as they enter
 * the viewport (once). Respects `prefers-reduced-motion`.
 *
 * Uses a manual IntersectionObserver (instead of framer-motion's `whileInView`)
 * plus a safety timeout so the content ALWAYS becomes visible — even if the
 * observer never fires (a known issue when the element is already on screen at
 * mount in statically-exported pages).
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    // Safety net: never leave content hidden if the observer doesn't fire.
    const fallback = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      animate={
        reduceMotion || visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
