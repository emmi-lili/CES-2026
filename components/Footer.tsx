import Image from "next/image";

/** Minimal footer — just the "Alianza" logo, centered and small. */
export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-black px-4 py-10">
      <Image
        src="/Alianza.png"
        alt="Alianza"
        width={1080}
        height={1080}
        className="h-20 w-20 object-contain"
      />
    </footer>
  );
}
