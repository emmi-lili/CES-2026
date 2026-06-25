import Image from "next/image";

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
    iconClassName: "h-12 w-16 sm:h-14 sm:w-20",
  },
];

/** A single glassy quick-access card. */
function QuickAccessCard({ icon, iconSize, title, description, iconClassName }: QuickAccessItem) {
  return (
    <button
      type="button"
      className="group flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border border-white/15 bg-[#1a1a1a] px-3 py-6 text-center shadow-[0_0_25px_rgba(255,255,255,0.05),0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-105 sm:px-5"
    >
      {/* Icon / badge */}
      <span className="flex h-20 items-center justify-center">
        <Image
          src={icon}
          alt={title}
          width={iconSize}
          height={iconSize}
          className={`object-contain ${iconClassName ?? "h-12 w-12 sm:h-16 sm:w-16"}`}
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
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-6">
        {ITEMS.map((item) => (
          <QuickAccessCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
