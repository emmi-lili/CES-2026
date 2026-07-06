import Image from "next/image";

/**
 * Top black bar with the centered Crypto Experience Summit logo.
 */
export default function Header() {
  return (
    <header className="relative z-20 bg-black">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-5">
        <Image
          src="/CES MERU logo ok.png"
          alt="Crypto Experience Summit 2026"
          width={2756}
          height={1096}
          priority
          className="h-9 w-auto select-none sm:h-10"
        />
      </div>
    </header>
  );
}
