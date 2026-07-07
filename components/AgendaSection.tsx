"use client";

import { useState } from "react";

import {
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  MusicNoteIcon,
  WineIcon,
} from "./icons";

/* -------------------------------------------------------------------------- */
/*  Types + helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Convert "HH:MM" to minutes since midnight. */
const t = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Format minutes since midnight back to "HH:MM". */
const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Vertical density of the timeline. */
const PX_PER_MIN = 2.6;

type Accent = "green" | "violet" | "amber";

type Speaker = {
  name: string;
  role?: string;
  initials: string;
  /** tailwind gradient classes for the avatar. */
  avatar: string;
};

type Session = {
  start: string;
  end: string;
  title: string;
  /** Small badge (country / format). Optional. */
  stage?: string;
  accent: Accent;
  speaker?: Speaker;
  /** Extra muted line, e.g. panel participants. */
  note?: string;
  /** Break card (coffee / lunch) — neutral styling, no speaker. */
  isBreak?: boolean;
  /** Networking-style card: translucent green gradient + themed icons. */
  networking?: boolean;
};

type Agenda = {
  id: string;
  city: string;
  dateLabel: string;
  dayLabel: string;
  venue: string;
  subtitle: string;
  /** Illustrative "happening now" time (minutes), or null. */
  now: number | null;
  capacity: number;
  /** Day of July 2026 highlighted in the mini calendar. */
  calendarDay: number;
  sessions: Session[];
};

/* -------------------------------------------------------------------------- */
/*  Agenda data — one entry per city                                          */
/* -------------------------------------------------------------------------- */

const AGENDAS: Agenda[] = [
  {
    id: "lapaz",
    city: "La Paz",
    dateLabel: "28 de Julio",
    dayLabel: "DÍA 1 DE 2",
    venue: "LA PAZ · CASAGRANDE",
    subtitle:
      "Un día enfocado en el futuro de la privacidad, stablecoins y la nueva economía on-chain.",
    now: null,
    capacity: 85,
    calendarDay: 28,
    sessions: [
      {
        start: "08:30",
        end: "09:00",
        title: "Apertura",
        stage: "CES",
        accent: "green",
        speaker: {
          name: "Crypto Experience Summit",
          initials: "CES",
          avatar: "from-emerald-400 to-brand-green",
        },
      },
      {
        start: "09:00",
        end: "09:30",
        title: "Carlos Neira",
        stage: "Colombia",
        accent: "green",
        speaker: {
          name: "Meru",
          initials: "CN",
          avatar: "from-emerald-400 to-teal-500",
        },
      },
      {
        start: "09:30",
        end: "10:00",
        title: "Jorge Eguino",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Rain",
          initials: "JE",
          avatar: "from-lime-400 to-brand-green",
        },
      },
      {
        start: "10:00",
        end: "10:30",
        title: "Juan Carlos Reyes",
        stage: "El Salvador",
        accent: "green",
        speaker: {
          name: "CNAD",
          initials: "JR",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "10:30",
        end: "11:00",
        title: "Andrés Kim",
        stage: "Venezuela",
        accent: "green",
        speaker: {
          name: "Tether",
          initials: "AK",
          avatar: "from-teal-400 to-brand-green",
        },
      },
      {
        start: "11:00",
        end: "11:30",
        title: "Mario Patiño",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "BCP",
          initials: "MP",
          avatar: "from-emerald-400 to-teal-500",
        },
      },
      {
        start: "11:30",
        end: "12:00",
        title: "Conversatorio Toyosa · Crown",
        stage: "Conversatorio",
        accent: "violet",
        note: "Edwin Saavedra, Andrés Kim, Álvaro Olivares",
      },
      {
        start: "12:00",
        end: "12:30",
        title: "Coffee Break",
        stage: "30 min",
        accent: "amber",
        isBreak: true,
      },
      {
        start: "12:30",
        end: "13:00",
        title: "Emmi Aguilar",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Capa Zero",
          initials: "EA",
          avatar: "from-lime-400 to-brand-green",
        },
      },
      {
        start: "13:00",
        end: "13:30",
        title: "Kublai Gómez",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Prisma Solutions",
          initials: "KG",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "13:30",
        end: "14:00",
        title: "Patricia Tudisco",
        stage: "Uruguay",
        accent: "green",
        speaker: {
          name: "Banco Central del Uruguay",
          initials: "PT",
          avatar: "from-teal-400 to-brand-green",
        },
      },
      {
        start: "14:00",
        end: "14:30",
        title: "Fernando Arriola",
        stage: "Paraguay",
        accent: "green",
        speaker: {
          name: "Paraguay Blockchain Summit",
          initials: "FA",
          avatar: "from-emerald-400 to-teal-500",
        },
      },
      {
        start: "14:30",
        end: "15:00",
        title: "Panel: Regulación de Activos Digitales",
        stage: "Panel",
        accent: "violet",
        note: "Fernanda Juppet, Juan Carlos Reyes, Patricia Tudisco, ASFI",
      },
      {
        start: "15:00",
        end: "16:00",
        title: "Almuerzo",
        stage: "1 h",
        accent: "amber",
        isBreak: true,
      },
      {
        start: "16:00",
        end: "16:30",
        title: "Kublai Gómez",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Prisma Solutions",
          initials: "KG",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "16:30",
        end: "17:00",
        title: "Martín Iturri",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Iturri & Asociados",
          initials: "MI",
          avatar: "from-lime-400 to-brand-green",
        },
      },
      {
        start: "17:00",
        end: "17:30",
        title: "Charla por confirmar",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Cristal",
          initials: "C",
          avatar: "from-teal-400 to-brand-green",
        },
      },
      {
        start: "17:30",
        end: "18:00",
        title: "Fernanda Juppet",
        stage: "Chile",
        accent: "green",
        speaker: {
          name: "Digital Assets Institute",
          initials: "FJ",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "18:00",
        end: "18:30",
        title: "Gonzalo Garrido",
        stage: "España",
        accent: "green",
        speaker: {
          name: "Onchain School",
          initials: "GG",
          avatar: "from-teal-400 to-brand-green",
        },
      },
      {
        start: "18:30",
        end: "19:00",
        title: "Coffee Break",
        stage: "30 min",
        accent: "amber",
        isBreak: true,
      },
      {
        start: "19:00",
        end: "19:30",
        title: "Panel: Tokenización",
        stage: "Panel",
        accent: "violet",
        note: "Modera: Jorge Alberto Cerda",
      },
      {
        start: "19:30",
        end: "20:00",
        title: "Jorge Alberto Cerda",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Veridex Alethia",
          initials: "JC",
          avatar: "from-emerald-400 to-teal-500",
        },
      },
      {
        start: "20:00",
        end: "20:30",
        title: "Carlos Fernández Massi",
        stage: "Suiza",
        accent: "green",
        speaker: {
          name: "Finka Token",
          initials: "CF",
          avatar: "from-lime-400 to-brand-green",
        },
      },
      {
        start: "20:30",
        end: "21:00",
        title: "Carlos Olivera",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Identity Me",
          initials: "CO",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "21:00",
        end: "21:30",
        title: "Brissia Benavente",
        stage: "Bolivia",
        accent: "green",
        speaker: {
          name: "Ciudata.io",
          initials: "BB",
          avatar: "from-teal-400 to-brand-green",
        },
      },
    ],
  },
  {
    id: "santacruz",
    city: "Santa Cruz",
    dateLabel: "30 de Julio",
    dayLabel: "DÍA 2 DE 2",
    venue: "SANTA CRUZ · MARRIOTT",
    subtitle:
      "El cierre del summit en Santa Cruz: adopción, remesas y el ecosistema fintech boliviano.",
    now: t("11:30"),
    capacity: 72,
    calendarDay: 30,
    sessions: [
      {
        start: "08:30",
        end: "09:30",
        title: "Registro & networking matutino",
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
        start: "09:30",
        end: "10:30",
        title: "Keynote: Adopción cripto en Bolivia",
        stage: "MAIN STAGE",
        accent: "green",
        speaker: {
          name: "Camila Vargas",
          role: "CEO · Koibanx",
          initials: "CV",
          avatar: "from-emerald-400 to-teal-500",
        },
      },
      {
        start: "11:00",
        end: "12:00",
        title: "Workshop: Stablecoins para remesas",
        stage: "WORKSHOP A",
        accent: "violet",
        speaker: {
          name: "Luis Fernández",
          role: "Lead · MERU",
          initials: "LF",
          avatar: "from-violet-400 to-brand-violet",
        },
      },
      {
        start: "12:30",
        end: "13:30",
        title: "Panel: Bancos tradicionales y Web3",
        stage: "MAIN STAGE",
        accent: "green",
        speaker: {
          name: "Ricardo Paz",
          role: "Head Digital · BCP",
          initials: "RP",
          avatar: "from-lime-400 to-brand-green",
        },
      },
      {
        start: "15:00",
        end: "16:00",
        title: "Workshop: Trading on-chain seguro",
        stage: "WORKSHOP B",
        accent: "violet",
        speaker: {
          name: "Marina López",
          role: "Quant · Tether",
          initials: "ML",
          avatar: "from-purple-400 to-brand-violet",
        },
      },
      {
        start: "16:30",
        end: "17:30",
        title: "Fireside: El futuro del dinero en LATAM",
        stage: "MAIN STAGE",
        accent: "green",
        speaker: {
          name: "Andrés Soto",
          role: "Founder · Rain",
          initials: "AS",
          avatar: "from-emerald-400 to-green-500",
        },
      },
      {
        start: "19:30",
        end: "21:30",
        title: "Networking & Cóctel de cierre",
        stage: "ROOFTOP",
        accent: "green",
        networking: true,
        speaker: {
          name: "Todos los asistentes",
          role: "DJ en vivo",
          initials: "★",
          avatar: "from-emerald-400 to-brand-green",
        },
      },
    ],
  },
];

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
  amber: {
    bar: "bg-amber-400/80",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
};

function SessionCard({
  session,
  top,
  height,
  isNow,
}: {
  session: Session;
  top: number;
  height: number;
  isNow: boolean;
}) {
  const accent = ACCENT[session.accent];

  return (
    <article
      style={{ top, height }}
      className={[
        "absolute left-[60px] right-0 overflow-hidden rounded-2xl border p-4 transition-colors",
        session.networking
          ? "border-brand-green/30 bg-gradient-to-br from-brand-green/20 via-brand-green/5 to-transparent"
          : session.isBreak
            ? "border-amber-400/15 bg-amber-400/[0.04]"
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
          isNow
            ? "bg-brand-violet shadow-[0_0_16px_2px_rgba(139,92,246,0.8)]"
            : accent.bar
        }`}
      />

      {/* Stage / format badge */}
      {session.stage && (
        <span
          className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
            session.networking
              ? "border-brand-green/30 bg-black/40 text-brand-green"
              : accent.badge
          }`}
        >
          {session.stage}
        </span>
      )}

      <div className={session.stage ? "pl-2 pr-24" : "pl-2 pr-3"}>
        {isNow && (
          <span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-violet">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-violet opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-violet" />
            </span>
            Happening now
          </span>
        )}

        <h3
          className={`text-sm font-semibold leading-snug ${
            session.networking
              ? "text-brand-green"
              : session.isBreak
                ? "text-amber-200/90"
                : "text-white"
          }`}
        >
          {session.title}
        </h3>

        {session.speaker && (
          <div className="mt-2 flex items-center gap-2">
            <Avatar speaker={session.speaker} />
            <p className="min-w-0 truncate text-xs text-white/60">
              <span className="font-medium text-white/80">
                {session.speaker.name}
              </span>
              {session.speaker.role ? ` · ${session.speaker.role}` : ""}
            </p>
          </div>
        )}

        {session.note && (
          <p className="mt-1.5 text-xs leading-snug text-white/45">
            {session.note}
          </p>
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

function Timeline({ agenda }: { agenda: Agenda }) {
  const starts = agenda.sessions.map((s) => t(s.start));
  const ends = agenda.sessions.map((s) => t(s.end));
  const startMin = Math.floor(Math.min(...starts) / 60) * 60;
  const endMin = Math.ceil(Math.max(...ends) / 60) * 60;

  const y = (min: number) => (min - startMin) * PX_PER_MIN;
  const hours = Array.from(
    { length: endMin / 60 - startMin / 60 + 1 },
    (_, i) => startMin / 60 + i,
  );

  const nowIndex =
    agenda.now === null
      ? -1
      : agenda.sessions.findIndex(
          (s) => agenda.now! >= t(s.start) && agenda.now! < t(s.end),
        );

  return (
    <div className="relative" style={{ height: y(endMin) + 4 }}>
      {/* Vertical rail line */}
      <div className="absolute bottom-2 left-[52px] top-2 w-px bg-white/10" />

      {/* Hour labels */}
      {hours.map((h) => (
        <div
          key={h}
          style={{ top: y(h * 60) }}
          className="absolute left-0 -translate-y-1/2 text-xs font-medium tabular-nums text-white/35"
        >
          {String(h).padStart(2, "0")}:00
        </div>
      ))}

      {/* "Now" indicator: animated dot on the rail + bright green time badge */}
      {agenda.now !== null && (
        <>
          <div
            style={{ top: y(agenda.now) }}
            className="absolute left-[52px] z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-brand-green ring-2 ring-black" />
            </span>
          </div>
          <span
            style={{ top: y(agenda.now) }}
            className="absolute left-0 z-10 -translate-y-1/2 rounded-full bg-brand-green px-2 py-0.5 font-mono text-[10px] font-bold text-black shadow-[0_0_14px_rgba(61,240,122,0.7)]"
          >
            {fmt(agenda.now)} NOW
          </span>
        </>
      )}

      {/* Session cards */}
      {agenda.sessions.map((session, i) => {
        const top = y(t(session.start));
        const height = y(t(session.end)) - top - 8; // 8px gap between cards
        return (
          <SessionCard
            key={session.title}
            session={session}
            top={top}
            height={height}
            isNow={i === nowIndex}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar modules                                                           */
/* -------------------------------------------------------------------------- */

function NextUpCard({ agenda }: { agenda: Agenda }) {
  const next =
    agenda.sessions.find((s) => t(s.start) > (agenda.now ?? -1)) ??
    agenda.sessions[0];
  if (!next) return null;

  return (
    <div className="panel rounded-2xl p-5">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-violet">
        Next up
      </span>
      <h4 className="mt-2 text-base font-semibold leading-snug text-white">
        {next.title}
      </h4>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
        <ClockIcon className="size-4 text-white/40" />
        {next.start} · {next.stage}
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
// July 2026 starts on a Wednesday → 2 leading blanks (Mon, Tue).
const JULY_2026_LEADING_BLANKS = 2;
const JULY_2026_DAYS = 31;

function MiniCalendar({ eventDay }: { eventDay: number }) {
  const cells: (number | null)[] = [
    ...Array(JULY_2026_LEADING_BLANKS).fill(null),
    ...Array.from({ length: JULY_2026_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="panel rounded-2xl p-5">
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
          const isEvent = day === eventDay;
          return (
            <span
              key={day}
              className={`relative flex h-7 items-center justify-center rounded-lg text-xs ${
                isEvent ? "bg-brand-green font-bold text-black" : "text-white/70"
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

function CapacityCard({ capacity }: { capacity: number }) {
  return (
    <div className="panel rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-white/50">
          Capacity
        </span>
        <span className="font-mono text-sm font-bold text-brand-green">
          {capacity}% Full
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          style={{ width: `${capacity}%` }}
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
 * Agenda / cronograma con tabs por ciudad (La Paz · 28 Jul y Santa Cruz ·
 * 30 Jul). Cada tab tiene su header, timeline vertical y sidebar (Next Up ·
 * calendario · capacidad). Responsive: el sidebar baja bajo el timeline.
 */
export default function AgendaSection() {
  const [activeId, setActiveId] = useState(AGENDAS[0].id);
  const agenda = AGENDAS.find((a) => a.id === activeId) ?? AGENDAS[0];

  return (
    <section className="bg-black px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* City tabs */}
        <div
          role="tablist"
          aria-label="Sedes del evento"
          className="mb-8 inline-flex rounded-full border border-white/10 bg-surface-card p-1"
        >
          {AGENDAS.map((a) => {
            const selected = a.id === activeId;
            return (
              <button
                key={a.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActiveId(a.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-brand-green text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <MapPinIcon className="size-4" />
                {a.city}
                <span
                  className={selected ? "text-black/60" : "text-white/35"}
                >
                  · {a.calendarDay} Jul
                </span>
              </button>
            );
          })}
        </div>

        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-green">
              Cronograma
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white drop-shadow-[0_0_18px_rgba(61,240,122,0.45)] sm:text-4xl">
              Agenda: {agenda.dateLabel}
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/55 sm:text-base">
              {agenda.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card px-3 py-1.5 text-xs font-semibold text-white/80">
              <MapPinIcon className="size-4 text-brand-green" />
              {agenda.venue}
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-[70%]">
            <Timeline agenda={agenda} />
          </div>

          <aside className="flex flex-col gap-4 lg:w-[30%]">
            <NextUpCard agenda={agenda} />
            <MiniCalendar eventDay={agenda.calendarDay} />
            <CapacityCard capacity={agenda.capacity} />
          </aside>
        </div>
      </div>
    </section>
  );
}
