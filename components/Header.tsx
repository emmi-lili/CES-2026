import { PersonIcon, SearchIcon } from "./icons";

/**
 * Top black bar. Centered two-line wordmark with "2026" in brand green,
 * person icon on the left and search icon on the right.
 */
export default function Header() {
  return (
    <header className="relative z-20 bg-black">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <button
          type="button"
          aria-label="Cuenta"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
        >
          <PersonIcon className="h-6 w-6" />
        </button>

        <div className="select-none text-center leading-tight">
          <span className="block text-[15px] font-bold tracking-wide text-white">
            Crypto Experience
          </span>
          <span className="block text-[15px] font-bold tracking-wide text-white">
            Summit <span className="text-brand-green">2026</span>
          </span>
        </div>

        <button
          type="button"
          aria-label="Buscar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
