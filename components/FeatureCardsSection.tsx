import Image from "next/image";
import Link from "next/link";

type FeatureCard = {
  /** TODO: reemplazar por la imagen real de cada card (en /public). */
  image: string;
  title: string;
  subtitle: string;
  /** Si existe, la card navega a esta ruta al hacer click. */
  href?: string;
};

const CARDS: FeatureCard[] = [
  {
    image: "/Speakers.jpeg",
    title: "Speakers",
    subtitle: "Futuro e innovación",
    href: "/speakers",
  },
  {
    image: "/networking.jpeg",
    title: "Networking",
    subtitle: "Espacios de conversatorios",
  },
  {
    image: "/sponsors.jpeg",
    title: "Sponsors",
    subtitle: "Las marcas más TOP junto a nosotros",
  },
];

/** A single image-backed feature card. */
function FeatureCardItem({ image, title, subtitle, href }: FeatureCard) {
  const Wrapper = href ? Link : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="group relative block aspect-[4/3] overflow-hidden rounded-3xl"
    >
      {/* Background image — covers the whole card, gentle zoom on hover */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark bottom-to-top gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Text, bottom-left */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="flex items-center gap-2 text-4xl font-bold text-white">
          {title}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </h3>
        <p className="mt-1 text-sm text-white/70">{subtitle}</p>
      </div>
    </Wrapper>
  );
}

/**
 * Three image-backed feature cards (Speakers · Networking · Sponsors) in a
 * responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile.
 */
export default function FeatureCardsSection() {
  return (
    <section className="bg-[#0a0a0a] px-4 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <FeatureCardItem key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
