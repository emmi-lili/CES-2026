import Image from "next/image";

import SocialLinks from "./SocialLinks";
import { asset } from "@/lib/assets";

/** Minimal footer — the "Alianza" logo and the event's social links. */
export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-black px-4 py-10">
      <Image
        src={asset("/Alianza.webp")}
        alt="Alianza"
        width={1080}
        height={1080}
        className="h-20 w-20 object-contain"
      />

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <span className="text-sm font-medium text-white/70">
          Síguenos en nuestras redes
        </span>
        <SocialLinks />
      </div>
    </footer>
  );
}
