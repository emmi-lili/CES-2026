import { InstagramIcon, LinkedInIcon } from "./icons";

/** Redes oficiales del Crypto Experience Summit. */
export const SOCIALS = [
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

/**
 * Fila de enlaces a redes sociales con el mismo botón circular usado en el
 * footer. Se reutiliza en el hero y en el footer para mantener consistencia.
 */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Crypto Experience Summit en ${label}`}
          className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-sm transition-colors hover:border-brand-green/50 hover:text-brand-green"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
