"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Agenda", href: "/agenda" },
  { label: "Networking", href: "/networking" },
] as const;

/**
 * Dark green-tinted navigation bar. The item matching the current route carries
 * a brand-green underline.
 */
export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 border-b border-white/5 bg-surface-nav/90 backdrop-blur-sm">
      <ul className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-4 px-4 py-3 text-[13px] font-medium sm:gap-9 sm:px-5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="relative inline-block py-1 text-white/90 transition-colors hover:text-white"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-[2px] left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-brand-green" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
