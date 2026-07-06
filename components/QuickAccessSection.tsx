import Image from "next/image";

import SectionHeading from "./SectionHeading";

type QuickAccessItem = {
  /** Path under /public for the pre-rendered icon/badge asset. */
  icon: string;
  /** Intrinsic square size of the asset, used by next/image. */
  iconSize: number;
  title: string;
  description: string;
  /** Extra sizing for the badge-style asset (TodoTix is wider visually). */
  iconClassName?: string;
};

const ITEMS: QuickAccessItem[] = [
  {
    icon: "/Alert.png",
    iconSize: 166,
    title: "Actividades",
    description: "Nuestro cronograma de eventos, horarios, etc.",
  },
  {
    icon: "/Mi-ticket.png",
    iconSize: 176,
    title: "Mi Ticket",
    description:
      "Reserva ya tu lugar en nuestro evento y sé el primero/a en entrar y ver el futuro digital.",
  },
  {
    icon: "/TodoTix.png",
    iconSize: 227,
    title: "Todo Tix",
    description:
      "Reserva ya tu lugar en nuestro evento y sé el primero/a en entrar y ver el futuro digital.",
    iconClassName: "h-16 w-24 sm:h-20 sm:w-32",
  },
];

/** A single glassy quick-access card. */
function QuickAccessCard({ icon, iconSize, title, description, iconClassName }: QuickAccessItem) {
  return (
    <button
      type="button"
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
    </button>
  );
}

/**
 * Three glassy, clickable quick-access cards (Actividades · Mi Ticket ·
 * Todo Tix) in a centered horizontal row.
 */
export default function QuickAccessSection() {
  return (
    <section className="bg-black px-4 py-12">
      <SectionHeading kicker="Explora" className="mb-10 px-5">
        Todo en un solo lugar
      </SectionHeading>
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-6">
        {ITEMS.map((item) => (
          <QuickAccessCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
