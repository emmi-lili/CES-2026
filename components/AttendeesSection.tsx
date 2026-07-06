"use client";

import { useEffect, useMemo, useState } from "react";

import { LinkedInIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Ring = "green" | "violet";

type Attendee = {
  name: string;
  role: string;
  company: string;
  ring: Ring;
  initials: string;
  /** tailwind gradient classes for the avatar. */
  avatar: string;
  /** Filter categories this attendee belongs to. */
  categories: string[];
  /** Thematic pills shown on the card. */
  tags: string[];
  linkedin: string;
};

const CATEGORIES = ["Banca", "Compliance", "Fintech"] as const;

const ATTENDEES: Attendee[] = [
  {
    name: "Elena Ríos",
    role: "Founder",
    company: "DeFi Lab",
    ring: "green",
    initials: "ER",
    avatar: "from-emerald-400 to-teal-500",
    categories: ["Fintech"],
    tags: ["Fintech"],
    linkedin: "https://www.linkedin.com/in/elena-rios",
  },
  {
    name: "Marcus Chen",
    role: "Protocol Engineer",
    company: "Chainforge",
    ring: "violet",
    initials: "MC",
    avatar: "from-violet-400 to-brand-violet",
    categories: ["Fintech"],
    tags: ["Fintech"],
    linkedin: "https://www.linkedin.com/in/marcus-chen",
  },
  {
    name: "Priya Nair",
    role: "Partner",
    company: "Volt Capital",
    ring: "green",
    initials: "PN",
    avatar: "from-lime-400 to-brand-green",
    categories: ["Banca", "Fintech"],
    tags: ["Banca", "Fintech"],
    linkedin: "https://www.linkedin.com/in/priya-nair",
  },
  {
    name: "Diego Salas",
    role: "Smart Contract Dev",
    company: "Aleph",
    ring: "violet",
    initials: "DS",
    avatar: "from-purple-400 to-brand-violet",
    categories: ["Compliance"],
    tags: ["Compliance"],
    linkedin: "https://www.linkedin.com/in/diego-salas",
  },
  {
    name: "Sofia Klein",
    role: "Head of Growth",
    company: "Rain",
    ring: "green",
    initials: "SK",
    avatar: "from-emerald-400 to-green-500",
    categories: ["Banca", "Fintech"],
    tags: ["Banca", "Fintech"],
    linkedin: "https://www.linkedin.com/in/sofia-klein",
  },
  {
    name: "Tom Alvarez",
    role: "NFT Artist",
    company: "PixelForge",
    ring: "violet",
    initials: "TA",
    avatar: "from-fuchsia-400 to-brand-violet",
    categories: ["Fintech"],
    tags: ["Fintech"],
    linkedin: "https://www.linkedin.com/in/tom-alvarez",
  },
  {
    name: "Ana López",
    role: "General Partner",
    company: "Andes Ventures",
    ring: "green",
    initials: "AL",
    avatar: "from-teal-400 to-brand-green",
    categories: ["Banca", "Fintech"],
    tags: ["Banca", "Fintech"],
    linkedin: "https://www.linkedin.com/in/ana-lopez",
  },
  {
    name: "Ravi Gupta",
    role: "Core Dev",
    company: "Ethereum",
    ring: "violet",
    initials: "RG",
    avatar: "from-indigo-400 to-brand-violet",
    categories: ["Compliance"],
    tags: ["Compliance"],
    linkedin: "https://www.linkedin.com/in/ravi-gupta",
  },
  {
    name: "Camila Vega",
    role: "CEO",
    company: "Koibanx",
    ring: "green",
    initials: "CV",
    avatar: "from-emerald-400 to-teal-500",
    categories: ["Banca", "Fintech"],
    tags: ["Banca", "Fintech"],
    linkedin: "https://www.linkedin.com/in/camila-vega",
  },
  {
    name: "Lucas Moreno",
    role: "Founder",
    company: "Mint Labs",
    ring: "violet",
    initials: "LM",
    avatar: "from-violet-400 to-purple-500",
    categories: ["Fintech"],
    tags: ["Fintech"],
    linkedin: "https://www.linkedin.com/in/lucas-moreno",
  },
  {
    name: "Nadia Farah",
    role: "Research",
    company: "Paradigm",
    ring: "green",
    initials: "NF",
    avatar: "from-lime-400 to-brand-green",
    categories: ["Compliance", "Fintech"],
    tags: ["Compliance", "Fintech"],
    linkedin: "https://www.linkedin.com/in/nadia-farah",
  },
  {
    name: "Kenji Watanabe",
    role: "Security Lead",
    company: "BitGo",
    ring: "violet",
    initials: "KW",
    avatar: "from-purple-400 to-brand-violet",
    categories: ["Compliance", "Banca"],
    tags: ["Compliance", "Banca"],
    linkedin: "https://www.linkedin.com/in/kenji-watanabe",
  },
];

const PAGE_SIZE = 6;

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

const RING: Record<Ring, string> = {
  green: "ring-brand-green/70",
  violet: "ring-brand-violet/70",
};

function AttendeeCard({ attendee }: { attendee: Attendee }) {
  return (
    <article className="panel group flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:!border-brand-green/40 hover:shadow-[0_0_28px_-8px_rgba(61,240,122,0.5)]">
      {/* Avatar with colored ring */}
      <span
        className={`flex size-20 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-black ring-2 ring-offset-4 ring-offset-surface-card ${attendee.avatar} ${RING[attendee.ring]}`}
      >
        {attendee.initials}
      </span>

      <h3 className="mt-5 text-lg font-bold text-white">{attendee.name}</h3>
      <p className="mt-1 text-sm text-white/55">
        {attendee.role} @ {attendee.company}
      </p>

      {/* Thematic tags */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {attendee.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-green"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Connect button pinned to the bottom */}
      <a
        href={attendee.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-brand-green/40 hover:text-white"
      >
        <LinkedInIcon className="size-4" />
        Conectar por LinkedIn
      </a>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Directorio de asistentes / networking: chips de categoría y una grilla de
 * tarjetas de perfil con botón "Ver más". Grilla responsive (3 → 2 → 1
 * columnas); los chips se envuelven en mobile.
 */
export default function AttendeesSection() {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => ATTENDEES.filter((a) => a.categories.includes(category)),
    [category],
  );

  // Reset pagination whenever the filter changes.
  useEffect(() => setVisible(PAGE_SIZE), [category]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section className="relative overflow-hidden bg-black px-5 py-16 sm:px-8">
      {/* Subtle purple glow toward the top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading align="left" kicker="Networking">
          Conecta con el{" "}
          <span className="text-brand-green drop-shadow-[0_0_18px_rgba(61,240,122,0.5)]">
            Futuro
          </span>
        </SectionHeading>

        {/* Category chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = cat === category;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand-green/60 bg-brand-green/10 text-brand-green"
                    : "border-white/10 bg-surface-card text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {shown.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((attendee) => (
              <AttendeeCard key={attendee.linkedin} attendee={attendee} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-white/50">
            No hay asistentes en esta categoría.
          </p>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border border-white/15 bg-surface-card px-8 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-brand-green/50 hover:text-white"
            >
              Ver más asistentes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
