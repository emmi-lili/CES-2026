"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Agenda", href: "/agenda" },
  { label: "Networking", href: "/networking" },
  { label: "Speakers", href: "/speakers" },
] as const;

function NavLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative inline-block whitespace-nowrap py-1 text-white/90 transition-colors hover:text-white"
    >
      {label}
      {active && (
        <span className="absolute -bottom-[3px] left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-brand-green" />
      )}
    </Link>
  );
}

/**
 * Top navigation: two links, the centered CES logo, then two links. The logo
 * stays centered on every breakpoint; sizes shrink on mobile to keep one row.
 */
export default function NavBar() {
  const pathname = usePathname();
  const left = NAV_ITEMS.slice(0, 2);
  const right = NAV_ITEMS.slice(2);

  return (
    <nav className="relative z-20 border-b border-white/5 bg-black">
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-2.5 px-3 py-2.5 text-[11px] font-medium sm:gap-8 sm:px-5 sm:py-3 sm:text-[13px]">
        {left.map((item) => (
          <NavLink
            key={item.label}
            {...item}
            active={pathname === item.href}
          />
        ))}

        <Link
          href="/"
          aria-label="Inicio"
          className="mx-1 shrink-0 sm:mx-4"
        >
          <Image
            src="/CES MERU logo ok.png"
            alt="Crypto Experience Summit 2026"
            width={2756}
            height={1096}
            priority
            className="h-9 w-auto select-none sm:h-14"
          />
        </Link>

        {right.map((item) => (
          <NavLink
            key={item.label}
            {...item}
            active={pathname === item.href}
          />
        ))}
      </div>
    </nav>
  );
}
