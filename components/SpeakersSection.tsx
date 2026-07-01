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
    name: "Andrés Kim",
    role: "Regional Expansion Lead\nTETHER",
    photo: "/AK.png",
    linkedin: "https://www.linkedin.com/in/andres-gk/",
    x: "",
    objectPosition: "center top",
  },
  {
    name: "Carlos Neira",
    role: "CFO\nMERU",
    photo: "/CN.png",
    linkedin: "https://www.linkedin.com/in/carlos-neira-a1a44548/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Carlos Olivera",
    role: "CTO\nPRESTA YA",
    photo: "/CO.png",
    linkedin: "https://www.linkedin.com/in/colivera/",
    x: "#",
  },
  {
    name: "Emilia Aguilar",
    role: "CEO\nCAPA ZERO",
    photo: "/EA.png",
    linkedin: "https://www.linkedin.com/in/emmi-aguilar-rivero/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Fernando Arriola",
    role: "Director\nCÁMARA PARAGUAYA DE FINTECH",
    photo: "/FA.png",
    linkedin: "https://www.linkedin.com/in/fernando-arriola-arza-b5ba2730/",
    x: "#",
  },
  {
    name: "Gonzalo Garrido",
    role: "Director de Desarrollo Empresarial y Marketing\nON CHAIN SCHOOL",
    photo: "/GG.png",
    linkedin: "https://www.linkedin.com/in/gonzalo-garrido-romerodecastilla/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Jorge Cerda",
    role: "Experto en Blockchain",
    photo: "/JC.png",
    linkedin: "https://www.linkedin.com/in/jorgealbertocerda/",
    x: "#",
  },
  {
    name: "Juan Carlos Reyes",
    role: "Presidente\nCOMISIÓN NACIONAL DE ACTIVOS DIGITALES EL SALVADOR",
    photo: "/JCR.png",
    linkedin: "https://www.linkedin.com/in/jcreyes/",
    x: "#",
  },
  {
    name: "Jorge Eguino",
    role: "BD and Partnerships\nRAIN",
    photo: "/JE.png",
    linkedin: "https://www.linkedin.com/in/jorgejaviereguino/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Juan Pablo Velasco",
    role: "Gobernador\nSANTA CRUZ",
    photo: "/JPV.png",
    linkedin: "https://www.linkedin.com/in/juanvelasco2/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Mario Patiño",
    role: "Gerente Mesa de Dinero y Tesoreria\nBANCO DE CRÉDITO S.A.",
    photo: "/Mario Patiño.png",
    linkedin: "https://www.linkedin.com/in/mariopatinoserrate/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Maria Fernanda Juppet",
    role: "Co-Founder y Directora Académica\nDIGITAL ASSETS INSTITUTE",
    photo: "/MFJ.png",
    linkedin: "https://www.linkedin.com/in/mfjuppet/",
    x: "#",
    objectPosition: "center top",
  },
  {
    name: "Martin Iturri",
    role: "Director\nITURRI & ASOCIADOS-FIRMA DE ABOGADOS",
    photo: "/MI.png",
    linkedin: "https://www.linkedin.com/in/mart%C3%ADn-iturri-194a252b/",
    x: "#",
  },
  {
    name: "Patricia Tudisco",
    role: "Intendente de Supervisión Financiera\nBANCO CENTRAL DEL URUGUAY",
    photo: "/PT.png",
    linkedin: "https://www.linkedin.com/in/patricia-tudisco-848320142/",
    x: "#",
    objectPosition: "center top",
  },
];

/** A single speaker card. */
function SpeakerCard({ name, role, photo, linkedin, x, objectPosition }: Speaker) {
  return (
    <article
      className="group rounded-2xl border border-green-400 bg-white/5 p-3 shadow-[0_0_25px_-2px_rgba(74,222,128,0.5)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#4b5563]">
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
        <p className="whitespace-pre-line text-sm text-white/60">{role}</p>

        {/* Social links */}
        <div className="mt-3 flex items-center gap-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${name}`}
            className="text-white/40 transition-colors hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          {x ? (
            <a
              href={x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`X de ${name}`}
              className="text-white/40 transition-colors hover:text-white"
            >
              <XIcon className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Cantidad de speakers por fila (de arriba hacia abajo). */
const ROW_SIZES = [4, 4, 3, 3];

/** Divide la lista de speakers en filas según ROW_SIZES. */
function chunkSpeakers(speakers: Speaker[]): Speaker[][] {
  const rows: Speaker[][] = [];
  let i = 0;
  for (const size of ROW_SIZES) {
    if (i >= speakers.length) break;
    rows.push(speakers.slice(i, i + size));
    i += size;
  }
  // Cualquier sobrante va en una última fila.
  if (i < speakers.length) rows.push(speakers.slice(i));
  return rows;
}

/**
 * "Nuestros Speakers" — speakers en orden alfabético, mostrados en filas
 * de 4, 3, 3 y 3 (centradas), sobre un fondo space-navy.
 */
export default function SpeakersSection() {
  const speakers = [...SPEAKERS].sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" })
  );
  const rows = chunkSpeakers(speakers);

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

      {/* Filas (4, 3, 3, 3) centradas */}
      <div className="mx-auto mt-12 max-w-6xl space-y-6">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-center gap-6"
          >
            {row.map((speaker) => (
              <div
                key={speaker.name}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <SpeakerCard {...speaker} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
