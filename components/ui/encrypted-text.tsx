"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/?=+";

/**
 * "Encrypted text" — the phrase materialises out of scrambled characters that
 * lock into place one by one (decryption effect). Plays on mount and replays on
 * hover. The real text is exposed via aria-label for accessibility/SEO.
 */
export function EncryptedText({
  text,
  className,
  duration = 1500,
  charset = DEFAULT_CHARS,
}: {
  text: string;
  className?: string;
  duration?: number;
  charset?: string;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  const run = useCallback(() => {
    // Each character locks in at a random point within the first ~70%.
    const settle = text.split("").map(() => Math.random() * 0.7);
    let startTime: number | null = null;
    let lastUpdate = 0;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const p = Math.min(1, (now - startTime) / duration);

      // Throttle the scramble so it reads as a calm decrypt, not a flicker.
      if (now - lastUpdate >= 70 || p >= 1) {
        lastUpdate = now;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || ch === "\n") {
            out += ch;
          } else if (p >= 1 || p >= settle[i] + 0.05) {
            out += ch;
          } else {
            out += charset[Math.floor(Math.random() * charset.length)];
          }
        }
        setDisplay(out);
      }

      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }, [text, duration, charset]);

  useEffect(() => {
    run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run]);

  return (
    <span
      className={className}
      aria-label={text}
      onMouseEnter={run}
      style={{ fontVariantLigatures: "none" }}
    >
      {display}
    </span>
  );
}
