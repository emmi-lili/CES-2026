import {
  BellIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  MusicNoteIcon,
  WineIcon,
} from "./icons";

/* -------------------------------------------------------------------------- */
/*  Timeline data                                                             */
/* -------------------------------------------------------------------------- */

/** Convert "HH:MM" to minutes since midnight. */
const t = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const DAY_START = t("08:00");
const DAY_END = t("21:00");
/** Vertical density of the timeline. */
const PX_PER_MIN = 1.8;
/** Current time — drives the "happening now" treatment. */
const NOW = t("10:45");

/** Y offset (px) of a given minute within the timeline. */
const y = (min: number) => (min - DAY_START) * PX_PER_MIN;

type Accent = "green" | "violet";

type Speaker = {
  name: string;
  role: string;
  initials: string;
  /** tailwind gradient classes for the avatar. */
  avatar: string;
};

type Session = {
  start: string;
  end: string;
  title: string;
  stage: string;
  accent: Accent;
  speaker?: Speaker;
  /** Networking-style card: translucent green gradient + themed icons. */
  networking?: boolean;
};

const SESSIONS: Session[] = [
  {
    start: "08:00",
    end: "09:00",
    title: "Registro y café de bienvenida",
    stage: "LOBBY",
    accent: "green",
    speaker: {
      name: "Equipo CES",
      role: "Bienvenida",
      initials: "CE",
      avatar: "from-emerald-400 to-brand-green",
    },
  },
  {
    start: "09:00",
    end: "10:00",
    title: "Keynote: El futuro digital ya comenzó",
    stage: "MAIN STAGE",
    accent: "green",
    speaker: {
      name: "Mateo Rivera",
      role: "Founder MERU",
      initials: "MR",
      avatar: "from-emerald-400 to-teal-500",
    },
  },
  {
    start: "10:30",
    end: "11:30",
    title: "Workshop: Construyendo en Web3",
    stage: "WORKSHOP A",
    accent: "violet",
    speaker: {
      name: "Sofía Herrera",
      role: "Lead Dev · Aleph",
      initials: "SH",
      avatar: "from-violet-400 to-brand-violet",
    },
  },
  {
    start: "12:00",
    end: "13:00",
    title: "Panel: Regulación y stablecoins en LATAM",
    stage: "MAIN STAGE",
    accent: "green",
    speaker: {
      name: "Ana Torres",
      role: "Policy Lead · Rain",
      initials: "AT",
      avatar: "from-lime-400 to-brand-green",
    },
  },
  {
    start: "14:30",
    end: "15:30",
    title: "Workshop B: Seguridad on-chain",
    stage: "WORKSHOP B",
    accent: "violet",
    speaker: {
      name: "Diego Núñez",
      role: "Security · BitGo",
      initials: "DN",
      avatar: "from-purple-400 to-brand-violet",
    },
  },
  {
    start: "16:00",
    end: "17:00",
    title: "Fireside: Escalando fintech en LATAM",
    stage: "MAIN STAGE",
    accent: "green",
    speaker: {
      name: "Valentina Cruz",
      role: "CEO · Kravata",
      initials: "VC",
      avatar: "from-emerald-400 to-green-500",
    },
  },
  {
    start: "19:00",
    end: "21:00",
    title: "Networking & Cóctel de cierre",
    stage: "ROOFTOP",
    accent: "green",
    networking: true,
    speaker: {
      name: "Todos los asistentes",
      role: "Música en vivo",
      initials: "★",
      avatar: "from-emerald-400 to-brand-green",
    },
  },
];

/** Whole hours rendered on the left rail. */
const HOURS = Array.from(
  { length: DAY_END / 60 - DAY_START / 60 + 1 },
  (_, i) => DAY_START / 60 + i,
);

/** Index of the session currently happening. */
const NOW_INDEX = SESSIONS.findIndex(
  (s) => NOW >= t(s.start) && NOW < t(s.end),
);
/** Next session that hasn't started yet. */
const NEXT_SESSION = SESSIONS.find((s) => t(s.start) > NOW);

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Avatar({ speaker }: { speaker: Speaker }) {
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${speaker.avatar} text-[10px] font-bold text-black`}
    >
      {speaker.initials}
    </span>
  );
}

const ACCENT: Record<Accent, { bar: string; badge: string }> = {
  green: {
    bar: "bg-brand-green",
    badge: "border-brand-green/30 bg-brand-green/10 text-brand-green",
  },
  violet: {
    bar: "bg-brand-violet",
    badge: "border-brand-violet/40 bg-brand-violet/15 text-violet-300",
  },
};

function SessionCard({ session, isNow }: { session: Session; isNow: boolean }) {
  const top = y(t(session.start));
  const height = y(t(session.end)) - top - 8; // 8px gap between cards
  const accent = ACCENT[session.accent];

  return (
    <article
      style={{ top, height }}
      className={[
        "absolute left-[60px] right-0 overflow-hidden rounded-2xl border p-4 transition-colors",
        session.networking
          ? "border-brand-green/30 bg-gradient-to-br from-brand-green/20 via-brand-green/5 to-transparent"
          : "border-white/8 bg-surface-card hover:border-white/15",
        isNow &&
          "border-brand-violet/60 shadow-[0_0_30px_-6px_rgba(139,92,246,0.6)]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left accent bar */}
      <span
        className={`absolute inset-y-0 left-0 w-1.5 ${
          isNow ? "bg-brand-violet shadow-[0_0_16px_2px_rgba(139,92,246,0.8)]" : accent.bar
        }`}
      />

      {/* Stage / format badge */}
      <span
        className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
          session.networking
            ? "border-brand-green/30 bg-black/40 text-brand-green"
            : accent.badge
        }`}
      >
        {session.stage}
      </span>

      <div className="pl-2 pr-20">
        {isNow && (
          <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-violet">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-violet opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-violet" />
            </span>
            Happening now
          </span>
        )}

        <h3
          className={`text-sm font-semibold leading-snug ${
            session.networking ? "text-brand-green" : "text-white"
          }`}
        >
          {session.title}
        </h3>

        {session.speaker && (
          <div className="mt-2 flex items-center gap-2">
            <Avatar speaker={session.speaker} />
            <p className="truncate text-xs text-white/60">
              <span className="font-medium text-white/80">
                {session.speaker.name}
              </span>{" "}
              · {session.speaker.role}
            </p>
          </div>
        )}

        {session.networking && (
          <div className="mt-2 flex items-center gap-3 text-brand-green/80">
            <WineIcon className="size-4" />
            <MusicNoteIcon className="size-4" />
          </div>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                  */
/* -------------------------------------------------------------------------- */

function Timeline() {
  const totalHeight = y(DAY_END) + 4;

  return (
    <div className="relative" style={{ height: totalHeight }}>
      {/* Vertical rail line */}
      <div className="absolute bottom-2 left-[52px] top-2 w-px bg-white/10" />

      {/* Hour labels */}
      {HOURS.map((h) => (
        <div
          key={h}
          style={{ top: y(h * 60) }}
          className="absolute left-0 -translate-y-1/2 text-xs font-medium tabular-nums text-white/35"
        >
          {String(h).padStart(2, "0")}:00
        </div>
      ))}

      {/* "Now" indicator: animated dot on the rail + bright green time badge */}
      <div
        style={{ top: y(NOW) }}
        className="absolute left-[52px] z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-brand-green ring-2 ring-black" />
        </span>
      </div>
      <span
        style={{ top: y(NOW) }}
        className="absolute left-0 z-10 -translate-y-1/2 rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-bold text-black shadow-[0_0_14px_rgba(61,240,122,0.7)]"
      >
        10:45 NOW
      </span>

      {/* Session cards */}
      {SESSIONS.map((session, i) => (
        <SessionCard
          key={session.title}
          session={session}
          isNow={i === NOW_INDEX}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar modules                                                           */
/* -------------------------------------------------------------------------- */

function NextUpCard() {
  if (!NEXT_SESSION) return null;
  return (
    <div className="rounded-2xl border border-white/8 bg-surface-card p-5">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
        Next up
      </span>
      <h4 className="mt-2 text-base font-semibold leading-snug text-white">
        {NEXT_SESSION.title}
      </h4>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
        <ClockIcon className="size-4 text-white/40" />
        {NEXT_SESSION.start} · {NEXT_SESSION.stage}
      </p>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-violet/40 bg-brand-violet/10 py-2.5 text-sm font-semibold text-violet-200 transition-colors hover:bg-brand-violet/20"
      >
        <BellIcon className="size-4" />
        Set Reminder
      </button>
    </div>
  );
}

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const EVENT_DAY = 28;
// July 2026 starts on a Wednesday → 2 leading blanks (Mon, Tue).
const JULY_2026_LEADING_BLANKS = 2;
const JULY_2026_DAYS = 31;

function MiniCalendar() {
  const cells: (number | null)[] = [
    ...Array(JULY_2026_LEADING_BLANKS).fill(null),
    ...Array.from({ length: JULY_2026_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-2xl border border-white/8 bg-surface-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Julio 2026</span>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Mes anterior"
            className="rounded-lg border border-white/10 p-1 text-white/50 transition-colors hover:text-white"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            className="rounded-lg border border-white/10 p-1 text-white/50 transition-colors hover:text-white"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-white/30">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`b-${i}`} />;
          const isEvent = day === EVENT_DAY;
          return (
            <span
              key={day}
              className={`relative flex h-7 items-center justify-center rounded-lg text-xs ${
                isEvent
                  ? "bg-brand-green font-bold text-black"
                  : "text-white/70"
              }`}
            >
              {day}
              {isEvent && (
                <span className="absolute -bottom-1 size-1 rounded-full bg-brand-green" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const CAPACITY = 85;

function CapacityCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">Capacity</span>
        <span className="text-sm font-bold text-brand-green">
          {CAPACITY}% Full
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          style={{ width: `${CAPACITY}%` }}
          className="h-full rounded-full bg-brand-green shadow-[0_0_12px_rgba(61,240,122,0.7)]"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Agenda / cronograma del día: header con título neón + badges, un timeline
 * vertical de sesiones a la izquierda y un sidebar (Next Up · calendario ·
 * capacidad) a la derecha. Responsive: el sidebar baja bajo el timeline en
 * mobile.
 */
export default function AgendaSection() {
  return (
    <section className="bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_18px_rgba(61,240,122,0.45)] sm:text-4xl">
              Agenda: 28 de Julio
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/55 sm:text-base">
              Un día enfocado en el futuro de los pagos digitales, stablecoins y
              la nueva economía on-chain.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card px-3 py-1.5 text-xs font-semibold text-white/80">
              <CalendarIcon className="size-4 text-brand-green" />
              DÍA 1 DE 2
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card px-3 py-1.5 text-xs font-semibold text-white/80">
              <MapPinIcon className="size-4 text-brand-green" />
              LA PAZ · CASAGRANDE
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-[70%]">
            <Timeline />
          </div>

          <aside className="flex flex-col gap-4 lg:w-[30%]">
            <NextUpCard />
            <MiniCalendar />
            <CapacityCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
