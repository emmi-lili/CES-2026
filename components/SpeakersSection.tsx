import Image from "next/image";
import { LinkedInIcon, XIcon } from "./icons";

type Speaker = {
  name: string;
  role: string;
  /** TODO: reemplazar por la foto real del speaker (en /public). */
  photo: string;
  linkedin: string;
  x: string;
  /** Resalta la card con borde verde y glow. */
  featured?: boolean;
  /** Ajusta el encuadre de la foto (CSS object-position). Default: center. */
  objectPosition?: string;
};

const SPEAKERS: Speaker[] = [
  // TODO: reemplazar `name` y `role` por los datos reales de cada speaker.
  {
    name: "CN",
    role: "Speaker",
    photo: "/CN.png",
    linkedin: "#",
    x: "#",
    featured: true,
    objectPosition: "center top",
  },
  {
    name: "CO",
    role: "Speaker",
    photo: "/CO.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "EA",
    role: "Speaker",
    photo: "/EA.png",
    linkedin: "#",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "FA",
    role: "Speaker",
    photo: "/FA.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "GG",
    role: "Speaker",
    photo: "/GG.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "JC",
    role: "Speaker",
    photo: "/JC.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "JCR",
    role: "Speaker",
    photo: "/JCR.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "JE",
    role: "Speaker",
    photo: "/JE.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "JPV",
    role: "Speaker",
    photo: "/JPV.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Mario Patiño",
    role: "Speaker",
    photo: "/Mario Patiño.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "MFJ",
    role: "Speaker",
    photo: "/MFJ.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "MI",
    role: "Speaker",
    photo: "/MI.png",
    linkedin: "#",
    x: "#",
  },
  {
    name: "PT",
    role: "Speaker",
    photo: "/PT.png",
    linkedin: "#",
    x: "#",
  },
];

/** A single speaker card. */
function SpeakerCard({ name, role, photo, linkedin, x, featured, objectPosition }: Speaker) {
  return (
    <article
      className={`group rounded-2xl border bg-white/5 p-3 transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-green-400 shadow-[0_0_25px_-2px_rgba(74,222,128,0.5)]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: objectPosition ?? "center" }}
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-base font-bold text-white sm:text-lg">{name}</h3>
        <p className="text-sm text-white/60">{role}</p>

        {/* Social links */}
        <div className="mt-3 flex items-center gap-3">
          <a
            href={linkedin}
            aria-label={`LinkedIn de ${name}`}
            className="text-white/40 transition-colors hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={x}
            aria-label={`X de ${name}`}
            className="text-white/40 transition-colors hover:text-white"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * "Nuestros Speakers" — a responsive grid of speaker cards (4 cols desktop,
 * 2 tablet, 1 mobile) over a deep space-navy background.
 */
export default function SpeakersSection() {
  return (
    <section className="bg-[#05060f] px-4 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          Nuestros Speakers
        </h2>
        <p className="mt-3 text-base text-white/60 sm:text-lg">
          Líderes que están construyendo el futuro digital
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPEAKERS.map((speaker) => (
          <SpeakerCard key={speaker.name} {...speaker} />
        ))}
      </div>
    </section>
  );
}
