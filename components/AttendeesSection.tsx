"use client";

import { useEffect, useMemo, useState } from "react";

import { EnvelopeIcon, SearchIcon } from "./icons";

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
  email: string;
};

const CATEGORIES = [
  "All",
  "DeFi",
  "Web3",
  "Investors",
  "Developers",
  "NFTs",
] as const;

const ATTENDEES: Attendee[] = [
  {
    name: "Elena Ríos",
    role: "Founder",
    company: "DeFi Lab",
    ring: "green",
    initials: "ER",
    avatar: "from-emerald-400 to-teal-500",
    categories: ["DeFi"],
    tags: ["Smart Contracts", "Governance", "DAO"],
    email: "elena@defilab.xyz",
  },
  {
    name: "Marcus Chen",
    role: "Protocol Engineer",
    company: "Chainforge",
    ring: "violet",
    initials: "MC",
    avatar: "from-violet-400 to-brand-violet",
    categories: ["Developers", "Web3"],
    tags: ["Solidity", "ZK", "Rollups"],
    email: "marcus@chainforge.io",
  },
  {
    name: "Priya Nair",
    role: "Partner",
    company: "Volt Capital",
    ring: "green",
    initials: "PN",
    avatar: "from-lime-400 to-brand-green",
    categories: ["Investors"],
    tags: ["Seed", "Thesis", "LATAM"],
    email: "priya@volt.vc",
  },
  {
    name: "Diego Salas",
    role: "Smart Contract Dev",
    company: "Aleph",
    ring: "violet",
    initials: "DS",
    avatar: "from-purple-400 to-brand-violet",
    categories: ["Developers", "DeFi"],
    tags: ["Audits", "EVM", "DeFi"],
    email: "diego@aleph.dev",
  },
  {
    name: "Sofia Klein",
    role: "Head of Growth",
    company: "Rain",
    ring: "green",
    initials: "SK",
    avatar: "from-emerald-400 to-green-500",
    categories: ["Web3"],
    tags: ["Stablecoins", "Payments", "GTM"],
    email: "sofia@rain.xyz",
  },
  {
    name: "Tom Alvarez",
    role: "NFT Artist",
    company: "PixelForge",
    ring: "violet",
    initials: "TA",
    avatar: "from-fuchsia-400 to-brand-violet",
    categories: ["NFTs"],
    tags: ["Generative", "Minting", "Art"],
    email: "tom@pixelforge.art",
  },
  {
    name: "Ana López",
    role: "General Partner",
    company: "Andes Ventures",
    ring: "green",
    initials: "AL",
    avatar: "from-teal-400 to-brand-green",
    categories: ["Investors"],
    tags: ["Fund II", "Web3", "Fintech"],
    email: "ana@andes.vc",
  },
  {
    name: "Ravi Gupta",
    role: "Core Dev",
    company: "Ethereum",
    ring: "violet",
    initials: "RG",
    avatar: "from-indigo-400 to-brand-violet",
    categories: ["Developers"],
    tags: ["Consensus", "EIPs", "Clients"],
    email: "ravi@ethereum.org",
  },
  {
    name: "Camila Vega",
    role: "CEO",
    company: "Koibanx",
    ring: "green",
    initials: "CV",
    avatar: "from-emerald-400 to-teal-500",
    categories: ["Web3", "DeFi"],
    tags: ["Tokenization", "Rails", "LATAM"],
    email: "camila@koibanx.com",
  },
  {
    name: "Lucas Moreno",
    role: "Founder",
    company: "Mint Labs",
    ring: "violet",
    initials: "LM",
    avatar: "from-violet-400 to-purple-500",
    categories: ["NFTs", "Web3"],
    tags: ["Marketplace", "Royalties", "DAO"],
    email: "lucas@mintlabs.io",
  },
  {
    name: "Nadia Farah",
    role: "Research",
    company: "Paradigm",
    ring: "green",
    initials: "NF",
    avatar: "from-lime-400 to-brand-green",
    categories: ["Investors", "DeFi"],
    tags: ["MEV", "AMM", "Research"],
    email: "nadia@paradigm.xyz",
  },
  {
    name: "Kenji Watanabe",
    role: "Security Lead",
    company: "BitGo",
    ring: "violet",
    initials: "KW",
    avatar: "from-purple-400 to-brand-violet",
    categories: ["Developers"],
    tags: ["Custody", "Keys", "Audits"],
    email: "kenji@bitgo.com",
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
    <article className="group flex flex-col items-center rounded-2xl border border-white/8 bg-surface-card p-6 text-center transition-all duration-300 hover:border-brand-green/40 hover:shadow-[0_0_28px_-8px_rgba(61,240,122,0.5)]">
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

      {/* Contact button pinned to the bottom */}
      <a
        href={`mailto:${attendee.email}`}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white"
      >
        <EnvelopeIcon className="size-4" />
        Contactar por Email
      </a>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Directorio de asistentes / networking: buscador + chips de categoría y una
 * grilla de tarjetas de perfil con botón "Load More". Grilla responsive
 * (3 → 2 → 1 columnas) y controles que se apilan en mobile.
 */
export default function AttendeesSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ATTENDEES.filter((a) => {
      const matchesCategory =
        category === "All" || a.categories.includes(category);
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  // Reset pagination whenever the filters change.
  useEffect(() => setVisible(PAGE_SIZE), [query, category]);

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
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Connect with the{" "}
          <span className="text-brand-green drop-shadow-[0_0_18px_rgba(61,240,122,0.5)]">
            Future
          </span>
        </h2>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role or company..."
              aria-label="Buscar asistentes"
              className="w-full rounded-xl border border-white/10 bg-surface-card py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-brand-green/50 focus:outline-none"
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 lg:ml-auto">
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
        </div>

        {/* Grid */}
        {shown.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((attendee) => (
              <AttendeeCard key={attendee.email} attendee={attendee} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-white/50">
            No hay asistentes que coincidan con tu búsqueda.
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
              Load More Attendees
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
