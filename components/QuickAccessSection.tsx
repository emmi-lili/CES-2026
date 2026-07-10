import Image from "next/image";

import SectionHeading from "./SectionHeading";

type QuickAccessItem = {
  /** Path under /public for the pre-rendered icon/badge asset. */
  icon: string;
  /** Intrinsic square size of the asset, used by next/image. */
  iconSize: number;
  title: string;
  description: string;
  /** External URL opened in a new tab when the card is clicked. */
  href: string;
  /** Extra sizing for the badge-style asset (TodoTix is wider visually). */
  iconClassName?: string;
};

const ITEMS: QuickAccessItem[] = [
  {
    icon: "/ticket-lpz.webp",
    iconSize: 1024,
    title: "Tickets La Paz",
    description:
      "Reserva tu lugar para el evento del 28 de julio en La Paz — Hotel Casa Grande.",
    href: "https://todotix.com/ticket/cryptolp",
  },
  {
    icon: "/ticket-scz.webp",
    iconSize: 1024,
    title: "Ticket Santa Cruz",
    description:
      "Reserva tu lugar para el evento del 30 de julio en Santa Cruz — Hotel Marriott.",
    href: "https://todotix.com/ticket/cryptosc",
  },
];

/** A single glassy quick-access card. */
function QuickAccessCard({ icon, iconSize, title, description, href, iconClassName }: QuickAccessItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="panel group flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] px-3 py-6 text-center shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:scale-[1.03] hover:!border-brand-green/40 sm:px-5"
    >
      {/* Icon / badge */}
      <span className="flex h-28 items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={iconSize}
          height={iconSize}
          className={`object-contain ${iconClassName ?? "h-20 w-20 sm:h-24 sm:w-24"}`}
        />
      </span>

      {/* Title + separator + description */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-[13px] font-bold text-white sm:text-base">{title}</h3>
        <span className="h-px w-10 bg-white/25" />
        <p className="text-[10px] leading-snug text-white/55 sm:text-xs">
          {description}
        </p>
      </div>
    </a>
  );
}

/**
 * Three glassy, clickable quick-access cards (Actividades · Mi Ticket ·
 * Todo Tix) in a centered horizontal row.
 */
export default function QuickAccessSection() {
  return (
    <section id="tickets" className="scroll-mt-24 bg-[#05060f] px-4 py-12">
      <SectionHeading kicker="Explora" className="mb-10 px-5">
        Todo en un solo lugar
      </SectionHeading>
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:gap-6">
        {ITEMS.map((item) => (
          <QuickAccessCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
