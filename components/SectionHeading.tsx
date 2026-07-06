import type { ReactNode } from "react";

/**
 * Consistent section heading: a mono kicker with a rule, a display title, and
 * an optional subtitle. Centered by default; can be left-aligned.
 */
export default function SectionHeading({
  kicker,
  children,
  subtitle,
  align = "center",
  className,
}: {
  kicker: string;
  children: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"} ${className ?? ""}`}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-green/70" />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-green">
          {kicker}
        </span>
        {centered && (
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-green/70" />
        )}
      </div>

      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] text-white sm:text-5xl">
        {children}
      </h2>

      {subtitle ? (
        <p
          className={`mt-4 text-base text-white/55 sm:text-lg ${centered ? "max-w-2xl" : "max-w-md"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
