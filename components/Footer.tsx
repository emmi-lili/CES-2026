import Image from "next/image";

import { InstagramIcon, LinkedInIcon } from "./icons";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cryptoexperience.bo/",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cryptoexperience-bo/posts/?feedView=all",
    Icon: LinkedInIcon,
  },
];

/** Minimal footer — the "Alianza" logo and the event's social links. */
export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-black px-4 py-10">
      <Image
        src="/Alianza.png"
        alt="Alianza"
        width={1080}
        height={1080}
        className="h-20 w-20 object-contain"
      />

      <div className="flex items-center gap-4">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Crypto Experience Summit en ${label}`}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand-green/50 hover:text-brand-green"
          >
            <Icon className="size-5" />
          </a>
        ))}
      </div>
    </footer>
  );
}
