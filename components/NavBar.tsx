const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio", active: true },
  { label: "Agenda", href: "#agenda", active: false },
  { label: "Networking", href: "#networking", active: false },
  { label: "Explorar", href: "#explorar", active: false },
  { label: "Menú", href: "#menu", active: false },
] as const;

/**
 * Dark green-tinted navigation bar. The active item ("Inicio") carries a
 * brand-green underline.
 */
export default function NavBar() {
  return (
    <nav className="relative z-20 border-b border-white/5 bg-surface-nav/90 backdrop-blur-sm">
      <ul className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-4 px-4 py-3 text-[13px] font-medium sm:gap-9 sm:px-5">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="relative inline-block py-1 text-white/90 transition-colors hover:text-white"
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-[2px] left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-brand-green" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
