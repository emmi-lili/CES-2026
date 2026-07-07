"use client";

import { useEffect, useMemo, useState } from "react";

import {
  CheckIcon,
  DownloadIcon,
  GoogleIcon,
  MapPinIcon,
  MusicNoteIcon,
  PlusIcon,
  TrashIcon,
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

/** Vertical density of the timeline (px per minute). */
const PX_PER_MIN = 2.1;
/** Left gutter reserved for the hour labels. */
const GUTTER = 54;

type Category = "charla" | "panel" | "workshop" | "networking" | "break";

type Session = {
  start: string;
  end: string;
  title: string;
  category: Category;
  /** Company / project the speaker represents. */
  org?: string;
  /** Country badge. */
  country?: string;
  /** Extra muted line, e.g. panel participants. */
  note?: string;
  /** Speaker still to be announced. */
  tbc?: boolean;
};

type Agenda = {
  id: string;
  city: string;
  /** ISO date, used to build the .ics / Google Calendar events. */
  date: string;
  dateLabel: string;
  dayLabel: string;
  venue: string;
  subtitle: string;
  sessions: Session[];
};

/* -------------------------------------------------------------------------- */
/*  Agenda data — one entry per city                                          */
/* -------------------------------------------------------------------------- */

const AGENDAS: Agenda[] = [
  {
    id: "lapaz",
    city: "La Paz",
    date: "2026-07-28",
    dateLabel: "28 de Julio",
    dayLabel: "DÍA 1 DE 2",
    venue: "La Paz · Casagrande",
    subtitle:
      "Un día enfocado en el futuro de la privacidad, stablecoins y la nueva economía on-chain.",
    sessions: [
      { start: "08:30", end: "09:00", title: "Apertura", category: "charla", org: "Crypto Experience Summit" },
      { start: "09:00", end: "09:30", title: "Carlos Neira", category: "charla", org: "Meru", country: "Colombia" },
      { start: "09:30", end: "10:00", title: "Jorge Eguino", category: "charla", org: "Rain", country: "Bolivia" },
      { start: "10:00", end: "10:30", title: "Juan Carlos Reyes", category: "charla", org: "CNAD", country: "El Salvador" },
      { start: "10:30", end: "11:00", title: "Andrés Kim", category: "charla", org: "Tether", country: "Venezuela" },
      { start: "11:00", end: "11:30", title: "Mario Patiño", category: "charla", org: "BCP", country: "Bolivia" },
      {
        start: "11:30",
        end: "12:00",
        title: "Conversatorio Toyosa · Crown",
        category: "panel",
        note: "Edwin Saavedra, Andrés Kim, Álvaro Olivares",
      },
      { start: "12:00", end: "12:30", title: "Coffee Break", category: "break" },
      { start: "12:30", end: "13:00", title: "Emmi Aguilar", category: "charla", org: "Capa Zero", country: "Bolivia" },
      { start: "13:00", end: "13:30", title: "Kublai Gómez", category: "charla", org: "Prisma Solutions", country: "Bolivia" },
      { start: "13:30", end: "14:00", title: "Patricia Tudisco", category: "charla", org: "Banco Central del Uruguay", country: "Uruguay" },
      { start: "14:00", end: "14:30", title: "Fernando Arriola", category: "charla", org: "Paraguay Blockchain Summit", country: "Paraguay" },
      {
        start: "14:30",
        end: "15:00",
        title: "Panel: Regulación de Activos Digitales",
        category: "panel",
        note: "Fernanda Juppet, Juan Carlos Reyes, Patricia Tudisco, ASFI",
      },
      { start: "15:00", end: "16:00", title: "Almuerzo", category: "break" },
      { start: "16:00", end: "16:30", title: "Kublai Gómez", category: "charla", org: "Prisma Solutions", country: "Bolivia" },
      { start: "16:30", end: "17:00", title: "Martín Iturri", category: "charla", org: "Iturri & Asociados", country: "Bolivia" },
      { start: "17:00", end: "17:30", title: "Charla por confirmar", category: "charla", org: "Cristal", country: "Bolivia", tbc: true },
      { start: "17:30", end: "18:00", title: "Fernanda Juppet", category: "charla", org: "Digital Assets Institute", country: "Chile" },
      { start: "18:00", end: "18:30", title: "Gonzalo Garrido", category: "charla", org: "Onchain School", country: "España" },
      { start: "18:30", end: "19:00", title: "Coffee Break", category: "break" },
      { start: "19:00", end: "19:30", title: "Panel: Tokenización", category: "panel", note: "Modera: Jorge Alberto Cerda" },
      { start: "19:30", end: "20:00", title: "Jorge Alberto Cerda", category: "charla", org: "Veridex Alethia", country: "Bolivia" },
      { start: "20:00", end: "20:30", title: "Carlos Fernández Massi", category: "charla", org: "Finka Token", country: "Suiza" },
      { start: "20:30", end: "21:00", title: "Carlos Olivera", category: "charla", org: "Identity Me", country: "Bolivia" },
      { start: "21:00", end: "21:30", title: "Brissia Benavente", category: "charla", org: "Ciudata.io", country: "Bolivia" },
    ],
  },
  {
    id: "santacruz",
    city: "Santa Cruz",
    date: "2026-07-30",
    dateLabel: "30 de Julio",
    dayLabel: "DÍA 2 DE 2",
    venue: "Santa Cruz · Marriott",
    subtitle:
      "El cierre del summit en Santa Cruz: adopción, remesas y el ecosistema fintech boliviano.",
    sessions: [
      { start: "08:30", end: "09:30", title: "Registro & networking matutino", category: "networking", note: "Bienvenida del equipo CES" },
      { start: "09:30", end: "10:30", title: "Keynote: Adopción cripto en Bolivia", category: "charla", tbc: true },
      { start: "11:00", end: "12:00", title: "Workshop: Stablecoins para remesas", category: "workshop", tbc: true },
      { start: "12:30", end: "13:30", title: "Panel: Bancos tradicionales y Web3", category: "panel", tbc: true },
      { start: "15:00", end: "16:00", title: "Workshop: Trading on-chain seguro", category: "workshop", tbc: true },
      { start: "16:30", end: "17:30", title: "Fireside: El futuro del dinero en LATAM", category: "charla", tbc: true },
      { start: "19:30", end: "21:30", title: "Networking & Cóctel de cierre", category: "networking", note: "DJ en vivo · Rooftop" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Category theming (Apple Calendar style: soft translucent fills)          */
/* -------------------------------------------------------------------------- */

const CATEGORY: Record<
  Category,
  { label: string; dot: string; text: string; fill: string; border: string; chip: string }
> = {
  charla: {
    label: "Charla",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    fill: "bg-emerald-500/[0.09]",
    border: "border-l-emerald-400",
    chip: "bg-emerald-500/15 text-emerald-200",
  },
  panel: {
    label: "Panel",
    dot: "bg-violet-400",
    text: "text-violet-300",
    fill: "bg-violet-500/[0.11]",
    border: "border-l-violet-400",
    chip: "bg-violet-500/15 text-violet-200",
  },
  workshop: {
    label: "Workshop",
    dot: "bg-amber-400",
    text: "text-amber-300",
    fill: "bg-amber-500/[0.09]",
    border: "border-l-amber-400",
    chip: "bg-amber-500/15 text-amber-200",
  },
  networking: {
    label: "Networking",
    dot: "bg-teal-400",
    text: "text-teal-300",
    fill: "bg-teal-500/[0.09]",
    border: "border-l-teal-400",
    chip: "bg-teal-500/15 text-teal-200",
  },
  break: {
    label: "Descanso",
    dot: "bg-white/30",
    text: "text-white/45",
    fill: "bg-white/[0.03]",
    border: "border-l-white/20",
    chip: "bg-white/10 text-white/50",
  },
};

/* -------------------------------------------------------------------------- */
/*  Calendar helpers (stable id, .ics + Google Calendar)                     */
/* -------------------------------------------------------------------------- */

/** Stable id for a session, used for bookmarks + calendar UIDs. */
const sid = (agendaId: string, s: Session) => `${agendaId}::${s.start}::${s.title}`;

/** Bolivia has no DST (UTC-4). Build a UTC stamp "YYYYMMDDTHHMMSSZ". */
const toUTCStamp = (date: string, time: string) =>
  new Date(`${date}T${time}:00-04:00`)
    .toISOString()
    .replace(/[-:.]/g, "")
    .slice(0, 15) + "Z";

/** Escape text per RFC 5545. */
const icsEscape = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

type CalEvent = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  venue: string;
  description: string;
};

function sessionToEvent(agenda: Agenda, s: Session): CalEvent {
  const parts = [
    CATEGORY[s.category].label,
    "Crypto Experience Summit",
    s.org,
    s.tbc ? "Ponente por confirmar" : undefined,
    s.note,
  ].filter(Boolean);
  return {
    id: sid(agenda.id, s),
    title: s.title,
    date: agenda.date,
    start: s.start,
    end: s.end,
    venue: agenda.venue,
    description: parts.join(" · "),
  };
}

function buildICS(events: CalEvent[]): string {
  const stamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Crypto Experience Summit//Agenda 2026//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.id.replace(/[^a-zA-Z0-9]/g, "-")}@crypto-experience-summit`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUTCStamp(e.date, e.start)}`,
      `DTEND:${toUTCStamp(e.date, e.end)}`,
      `SUMMARY:${icsEscape(e.title)}`,
      `LOCATION:${icsEscape(e.venue)}`,
      `DESCRIPTION:${icsEscape(e.description)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadICS(events: CalEvent[], filename: string) {
  const blob = new Blob([buildICS(events)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function googleUrl(e: CalEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${toUTCStamp(e.date, e.start)}/${toUTCStamp(e.date, e.end)}`,
    details: e.description,
    location: e.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Current minutes-since-midnight if today matches the ISO date, else null. */
function nowForDate(dateISO: string): number | null {
  const now = new Date();
  const [y, m, d] = dateISO.split("-").map(Number);
  if (now.getFullYear() === y && now.getMonth() + 1 === m && now.getDate() === d) {
    return now.getHours() * 60 + now.getMinutes();
  }
  return null;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /[a-zA-ZÀ-ÿ0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */

function BookmarkButton({
  saved,
  onClick,
  theme,
}: {
  saved: boolean;
  onClick: () => void;
  theme: (typeof CATEGORY)[Category];
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Quitar de mi agenda" : "Agendar esta charla"}
      className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
        saved
          ? `${theme.border.replace("border-l-", "border-")} ${theme.chip}`
          : "border-white/15 text-white/40 hover:border-white/50 hover:text-white"
      }`}
    >
      {saved ? <CheckIcon className="size-3.5" /> : <PlusIcon className="size-3.5" />}
    </button>
  );
}

function EventBlock({
  session,
  top,
  height,
  saved,
  onToggle,
  isNow,
}: {
  session: Session;
  top: number;
  height: number;
  saved: boolean;
  onToggle: () => void;
  isNow: boolean;
}) {
  const c = CATEGORY[session.category];
  const canSave = session.category !== "break";
  const roomy = height > 58;

  return (
    <article
      style={{ top, height, left: GUTTER }}
      className={`absolute right-1 flex flex-col overflow-hidden rounded-lg border-l-[3px] px-3 py-1.5 ${c.fill} ${c.border} ${
        isNow ? "ring-1 ring-inset ring-white/25" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`font-mono text-[11px] tabular-nums ${c.text}`}>
          {session.start}–{session.end}
        </span>
        {canSave && <BookmarkButton saved={saved} onClick={onToggle} theme={c} />}
      </div>

      <h3
        className={`mt-0.5 truncate text-sm font-semibold leading-tight ${
          session.category === "break" ? "text-white/55" : "text-white"
        }`}
      >
        {session.title}
      </h3>

      {roomy && (session.org || session.country || session.tbc) && (
        <p className="mt-0.5 truncate text-xs text-white/50">
          {session.tbc ? (
            <span className="text-white/40">Ponente por confirmar</span>
          ) : (
            [session.org, session.country].filter(Boolean).join(" · ")
          )}
        </p>
      )}

      {roomy && session.note && (
        <p className="mt-auto truncate text-xs text-white/40">{session.note}</p>
      )}

      {session.category === "networking" && height > 80 && (
        <div className="mt-1 flex items-center gap-3 text-teal-300/70">
          <WineIcon className="size-4" />
          <MusicNoteIcon className="size-4" />
        </div>
      )}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                  */
/* -------------------------------------------------------------------------- */

function Timeline({
  agenda,
  sessions,
  isSaved,
  onToggle,
}: {
  agenda: Agenda;
  sessions: Session[];
  isSaved: (s: Session) => boolean;
  onToggle: (s: Session) => void;
}) {
  const now = nowForDate(agenda.date);
  const startMin = Math.floor(Math.min(...sessions.map((s) => t(s.start))) / 60) * 60;
  const endMin = Math.ceil(Math.max(...sessions.map((s) => t(s.end))) / 60) * 60;
  const y = (min: number) => (min - startMin) * PX_PER_MIN;
  const hours = Array.from(
    { length: endMin / 60 - startMin / 60 + 1 },
    (_, i) => startMin / 60 + i,
  );

  const nowIndex =
    now === null
      ? -1
      : sessions.findIndex((s) => now >= t(s.start) && now < t(s.end));

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141416]"
      style={{ height: y(endMin) + 24 }}
    >
      {/* Hour hairlines + labels */}
      {hours.map((h) => (
        <div
          key={h}
          style={{ top: y(h * 60) + 12 }}
          className="absolute inset-x-0 border-t border-white/[0.05]"
        >
          <span className="absolute -top-2 left-3 font-mono text-[11px] tabular-nums text-white/30">
            {String(h).padStart(2, "0")}:00
          </span>
        </div>
      ))}

      {/* Current-time indicator (only on the real event day) */}
      {now !== null && now >= startMin && now <= endMin && (
        <div
          style={{ top: y(now) + 12 }}
          className="absolute inset-x-0 z-20 flex items-center"
        >
          <span className="ml-[46px] size-2 rounded-full bg-red-500" />
          <span className="h-px flex-1 bg-red-500/80" />
        </div>
      )}

      {/* Event blocks */}
      <div className="absolute inset-0" style={{ top: 12 }}>
        {sessions.map((session, i) => {
          const top = y(t(session.start));
          const height = y(t(session.end)) - top - 6;
          return (
            <EventBlock
              key={sid(agenda.id, session)}
              session={session}
              top={top}
              height={height}
              saved={isSaved(session)}
              onToggle={() => onToggle(session)}
              isNow={i === nowIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar: Mi Agenda                                                        */
/* -------------------------------------------------------------------------- */

type SavedItem = { agenda: Agenda; session: Session };

function MyAgendaCard({
  items,
  onRemove,
}: {
  items: SavedItem[];
  onRemove: (agendaId: string, s: Session) => void;
}) {
  return (
    <div className="panel rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">Mi Agenda</h4>
        <span className="rounded-full bg-brand-green/15 px-2 py-0.5 font-mono text-xs font-bold text-brand-green">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-white/45">
          Toca el{" "}
          <span className="mx-0.5 inline-flex size-4 items-center justify-center rounded-full border border-white/30 align-middle text-white/60">
            <PlusIcon className="size-2.5" />
          </span>{" "}
          en cualquier charla para agendarla y llevarla a tu calendario.
        </p>
      ) : (
        <>
          <ul className="mt-3 flex flex-col gap-2">
            {items.map(({ agenda, session }) => {
              const c = CATEGORY[session.category];
              const event = sessionToEvent(agenda, session);
              return (
                <li
                  key={sid(agenda.id, session)}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                >
                  <div className="flex items-start gap-2">
                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${c.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {session.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] tabular-nums text-white/45">
                        {agenda.city} · {session.start}–{session.end}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(agenda.id, session)}
                      aria-label="Quitar de mi agenda"
                      className="text-white/30 transition-colors hover:text-red-400"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={googleUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.06]"
                    >
                      <GoogleIcon className="size-3.5" />
                      Google
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        downloadICS([event], `${session.title}.ics`)
                      }
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.06]"
                    >
                      <DownloadIcon className="size-3.5" />
                      .ics
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() =>
              downloadICS(
                items.map(({ agenda, session }) => sessionToEvent(agenda, session)),
                "mi-agenda-ces-2026.ics",
              )
            }
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green py-2.5 text-sm font-bold text-black transition-colors hover:bg-brand-green-bright"
          >
            <DownloadIcon className="size-4" />
            Añadir todo a mi calendario
          </button>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar: mini calendar + summary                                          */
/* -------------------------------------------------------------------------- */

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
// July 2026 starts on a Wednesday → 2 leading blanks (Mon, Tue).
const JULY_2026_LEADING_BLANKS = 2;
const JULY_2026_DAYS = 31;
const EVENT_DAYS = [28, 30];

function MiniCalendar({ activeDay }: { activeDay: number }) {
  const cells: (number | null)[] = [
    ...Array(JULY_2026_LEADING_BLANKS).fill(null),
    ...Array.from({ length: JULY_2026_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="panel rounded-2xl p-5">
      <span className="text-sm font-semibold text-white">Julio 2026</span>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-white/30">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`b-${i}`} />;
          const isEvent = EVENT_DAYS.includes(day);
          const isActive = day === activeDay;
          return (
            <span
              key={day}
              className={`relative flex h-7 items-center justify-center rounded-lg text-xs ${
                isActive
                  ? "bg-brand-green font-bold text-black"
                  : isEvent
                    ? "bg-brand-green/15 font-semibold text-brand-green"
                    : "text-white/60"
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ sessions }: { sessions: Session[] }) {
  const count = (cat: Category) => sessions.filter((s) => s.category === cat).length;
  const rows = (
    [
      { cat: "charla", value: count("charla") },
      { cat: "panel", value: count("panel") },
      { cat: "workshop", value: count("workshop") },
      { cat: "networking", value: count("networking") },
    ] as { cat: Category; value: number }[]
  ).filter((r) => r.value > 0);

  return (
    <div className="panel rounded-2xl p-5">
      <span className="font-mono text-xs uppercase tracking-wider text-white/50">
        Resumen del día
      </span>
      <ul className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.cat} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <span className={`size-2 rounded-full ${CATEGORY[r.cat].dot}`} />
              {CATEGORY[r.cat].label}
            </span>
            <span className="font-mono font-semibold text-white">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Legend                                                                    */
/* -------------------------------------------------------------------------- */

function Legend() {
  const cats: Category[] = ["charla", "panel", "workshop", "networking", "break"];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {cats.map((cat) => (
        <span key={cat} className="flex items-center gap-1.5 text-xs text-white/50">
          <span className={`size-2 rounded-full ${CATEGORY[cat].dot}`} />
          {CATEGORY[cat].label}
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "ces-2026-mi-agenda";

export default function AgendaSection() {
  const [activeId, setActiveId] = useState(AGENDAS[0].id);
  const [view, setView] = useState<"all" | "mine">("all");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  const agenda = AGENDAS.find((a) => a.id === activeId) ?? AGENDAS[0];

  // Load persisted bookmarks after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
  }, [saved, mounted]);

  const toggle = (s: Session) => {
    const id = sid(agenda.id, s);
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const removeById = (agendaId: string, s: Session) => {
    const id = sid(agendaId, s);
    setSaved((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const isSaved = (s: Session) => saved.has(sid(agenda.id, s));

  // Flat list of every saved session across all days, in chronological order.
  const savedItems: SavedItem[] = useMemo(() => {
    const items: SavedItem[] = [];
    for (const a of AGENDAS) {
      for (const s of a.sessions) {
        if (saved.has(sid(a.id, s))) items.push({ agenda: a, session: s });
      }
    }
    return items.sort((x, y) =>
      x.agenda.date === y.agenda.date
        ? t(x.session.start) - t(y.session.start)
        : x.agenda.date.localeCompare(y.agenda.date),
    );
  }, [saved]);

  const visibleSessions =
    view === "mine" ? agenda.sessions.filter(isSaved) : agenda.sessions;

  const activeDay = Number(agenda.date.split("-")[2]);

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
                <span className={selected ? "text-black/60" : "text-white/35"}>
                  · {Number(a.date.split("-")[2])} Jul
                </span>
              </button>
            );
          })}
        </div>

        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-green">
              Cronograma · {agenda.dayLabel}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">
              Agenda · {agenda.dateLabel}
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/55 sm:text-base">
              {agenda.subtitle}
            </p>
          </div>

          <span className="inline-flex h-fit items-center gap-2 rounded-full border border-white/10 bg-surface-card px-3 py-1.5 text-xs font-semibold text-white/80">
            <MapPinIcon className="size-4 text-brand-green" />
            {agenda.venue}
          </span>
        </header>

        {/* Controls: legend + view toggle */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Legend />
          <div className="inline-flex rounded-full border border-white/10 bg-surface-card p-1 text-sm">
            <button
              type="button"
              onClick={() => setView("all")}
              className={`rounded-full px-4 py-1.5 font-semibold transition-colors ${
                view === "all" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setView("mine")}
              className={`rounded-full px-4 py-1.5 font-semibold transition-colors ${
                view === "mine" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              Mi agenda
              {savedItems.length > 0 && (
                <span className="ml-1.5 font-mono text-xs text-brand-green">
                  {savedItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-[68%]">
            {visibleSessions.length > 0 ? (
              <Timeline
                agenda={agenda}
                sessions={visibleSessions}
                isSaved={isSaved}
                onToggle={toggle}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#141416] px-6 py-20 text-center">
                <div className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white/40">
                  <PlusIcon className="size-6" />
                </div>
                <p className="mt-4 text-sm font-medium text-white">
                  No agendaste nada en {agenda.city} todavía
                </p>
                <p className="mt-1 max-w-xs text-sm text-white/45">
                  Cambia a “Todas” y toca el + en las charlas que te interesen.
                </p>
                <button
                  type="button"
                  onClick={() => setView("all")}
                  className="mt-4 rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5"
                >
                  Ver todas las charlas
                </button>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-4 lg:w-[32%]">
            <MyAgendaCard items={savedItems} onRemove={removeById} />
            <MiniCalendar activeDay={activeDay} />
            <SummaryCard sessions={agenda.sessions} />
          </aside>
        </div>
      </div>
    </section>
  );
}
