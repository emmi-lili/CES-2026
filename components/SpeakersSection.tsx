"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedInIcon, XIcon } from "./icons";

type Speaker = {
  name: string;
  role: string;
  /** TODO: reemplazar por la foto real del speaker (en /public). */
  photo: string;
  linkedin: string;
  /** Perfil de Twitter/X (opcional). Si se define, aparece en el modal. */
  twitter?: string;
  /** Bio del speaker mostrada en el modal (opcional). */
  bio?: string;
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
    objectPosition: "center top",
    bio: "Más de 7 años de experiencia en las industrias de petróleo, energía y tecnologías Web3.\n\nSólido conocimiento del ecosistema blockchain y de sus potenciales aplicaciones en una amplia variedad de sectores e industrias.\n\nCompromiso con la implementación de tecnologías innovadoras para resolver problemas del mundo real y transformar la manera en que operan las empresas y los modelos de negocio.",
  },
  {
    name: "Carlos Neira",
    role: "CFO\nMERU",
    photo: "/CN.png",
    linkedin: "https://www.linkedin.com/in/carlos-neira-a1a44548/",
    objectPosition: "center top",
  },
  {
    name: "Carlos Olivera",
    role: "CTO\nPRESTA YA",
    photo: "/CO.png",
    linkedin: "https://www.linkedin.com/in/colivera/",
  },
  {
    name: "Emilia Aguilar",
    role: "CEO\nCAPA ZERO",
    photo: "/EA.png",
    linkedin: "https://www.linkedin.com/in/emmi-aguilar-rivero/",
    objectPosition: "center top",
    bio: "Ingeniera de Sistemas especializada en Blockchain y Privacy Engineer, con más de seis años de trayectoria en el ecosistema tech y cripto latinoamericano. Su trabajo se ha centrado en la integración e implementación de tecnología cripto y blockchain en empresas, así como en liderar iniciativas de innovación dentro del sector bancario y financiero, donde ha acompañado a instituciones en su acercamiento a nuevas tecnologías. Actualmente cofundadora de FortgateID, un sistema de verificación de identidad enfocada en privacidad y fundadora de Capa Zero, consultorías institucionales de tecnología avanzada.",
  },
  {
    name: "Fernando Arriola",
    role: "Director\nCÁMARA PARAGUAYA DE FINTECH",
    photo: "/FA.png",
    linkedin: "https://www.linkedin.com/in/fernando-arriola-arza-b5ba2730/",
  },
  {
    name: "Gonzalo Garrido",
    role: "Director de Desarrollo Empresarial y Marketing\nON CHAIN SCHOOL",
    photo: "/GG.png",
    linkedin: "https://www.linkedin.com/in/gonzalo-garrido-romerodecastilla/",
    objectPosition: "center top",
    bio: "Empresario con más de una década de experiencia en la creación, liderazgo y escalamiento de proyectos educativos y negocios digitales. Especializado en desarrollo comercial, ventas y formación de equipos de alto rendimiento, con experiencia en sectores como educación, blockchain y cripto, comercio electrónico, finanzas y bienes raíces. Conferencista nacional e internacional, enfocado en generar impacto a través de la educación, el desarrollo del talento y la creación de oportunidades en industrias emergentes.",
  },
  {
    name: "Jorge Cerda",
    role: "Experto en Blockchain",
    photo: "/JC.png",
    linkedin: "https://www.linkedin.com/in/jorgealbertocerda/",
    bio: "Profesional con más de 20 años de experiencia en consultorías de marketing y exportaciones principalmente de alimentos, elaboración de varios estudios de mercado, diseño e implementación de importantes proyectos de agronegocios. Especializado recientemente en aplicación de tecnología Blockchain para la trazabilidad en las cadenas de valor y suministro.",
  },
  {
    name: "Juan Carlos Reyes",
    role: "Presidente\nCOMISIÓN NACIONAL DE ACTIVOS DIGITALES EL SALVADOR",
    photo: "/JCR.png",
    linkedin: "https://www.linkedin.com/in/jcreyes/",
  },
  {
    name: "Jorge Eguino",
    role: "BD and Partnerships\nRAIN",
    photo: "/JE.png",
    linkedin: "https://www.linkedin.com/in/jorgejaviereguino/",
    objectPosition: "center top",
    bio: "Jorge Eguino es Business Development & Partnerships en Rain, una plataforma global de infraestructura para pagos y movimiento de dinero con stablecoins que trabaja con más de 200 socios a nivel mundial y procesa miles de millones de dólares en volumen transaccional. Cuenta con vasta experiencia en el ecosistema fintech, liderando iniciativas de crecimiento, alianzas estratégicas y transformación digital en empresas como Flourish Fi y FinConecta. Además, es profesor de tecnologías emergentes en la Universidad de Alcalá. Jorge es licenciado en Economía por la University of Arkansas y posee un Máster en Big Data y Business Analytics por IE University.",
  },
  {
    name: "Juan Pablo Velasco",
    role: "Gobernador\nSANTA CRUZ",
    photo: "/JPV.png",
    linkedin: "https://www.linkedin.com/in/juanvelasco2/",
    objectPosition: "center top",
  },
  {
    name: "Mario Patiño",
    role: "Gerente Mesa de Dinero y Tesoreria\nBANCO DE CRÉDITO S.A.",
    photo: "/Mario Patiño.png",
    linkedin: "https://www.linkedin.com/in/mariopatinoserrate/",
    objectPosition: "center top",
  },
  {
    name: "Maria Fernanda Juppet",
    role: "Co-Founder y Directora Académica\nDIGITAL ASSETS INSTITUTE",
    photo: "/MFJ.png",
    linkedin: "https://www.linkedin.com/in/mfjuppet/",
    objectPosition: "center top",
  },
  {
    name: "Martin Iturri",
    role: "Director\nITURRI & ASOCIADOS-FIRMA DE ABOGADOS",
    photo: "/MI.png",
    linkedin: "https://www.linkedin.com/in/mart%C3%ADn-iturri-194a252b/",
  },
  {
    name: "Patricia Tudisco",
    role: "Intendente de Supervisión Financiera\nBANCO CENTRAL DEL URUGUAY",
    photo: "/PT.png",
    linkedin: "https://www.linkedin.com/in/patricia-tudisco-848320142/",
    objectPosition: "center top",
  },
];

/** Separa el `role` ("Título\nEMPRESA") en sus dos partes. */
function parseRole(role: string): { title: string; company?: string } {
  const [title, company] = role.split("\n");
  return { title, company };
}

/** Texto para el badge tipo pill: "CEO @ MERU". */
function roleBadge(role: string): string {
  const { title, company } = parseRole(role);
  return company ? `${title} @ ${company}` : title;
}

/** A single speaker card. */
function SpeakerCard({
  speaker,
  onSelect,
}: {
  speaker: Speaker;
  onSelect: (speaker: Speaker) => void;
}) {
  const { name, role, photo, linkedin, objectPosition } = speaker;
  return (
    <article
      onClick={() => onSelect(speaker)}
      className="group cursor-pointer rounded-2xl border border-green-400 bg-white/5 p-3 shadow-[0_0_25px_-2px_rgba(74,222,128,0.5)] transition-all duration-300 hover:-translate-y-1"
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
            onClick={(e) => e.stopPropagation()}
            className="text-white/40 transition-colors hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Modal con el perfil detallado del speaker. */
function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);

  // Anima la entrada (fade + scale 95% -> 100%) tras el montaje.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cerrar con Escape + bloquear el scroll del body mientras está abierto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const { name, role, photo, linkedin, twitter, bio, objectPosition } = speaker;
  const bioText =
    bio ??
    `${name} es ${roleBadge(role)}, una de las voces que están impulsando la adopción de activos digitales en la región. Acompáñanos en el Crypto Experience Summit para conocer su visión sobre el futuro del ecosistema.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${name}`}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay: negro semitransparente + blur sutil */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-green-400/40 bg-[#0d0d0d] shadow-[0_0_40px_-5px_rgba(74,222,128,0.5)] transition-all duration-300 md:flex-row ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Columna izquierda: foto full-bleed con gradiente */}
        <div className="relative h-56 w-full shrink-0 md:h-auto md:w-2/5">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: objectPosition ?? "center" }}
          />
          {/* Gradiente: se funde hacia abajo en móvil, hacia la derecha en desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0d0d] md:bg-gradient-to-r" />
        </div>

        {/* Columna derecha: información */}
        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">{name}</h3>

          {/* Badge tipo pill */}
          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
            {roleBadge(role)}
          </span>

          {/* Bio con scroll interno + fade si es larga */}
          <div
            className="mt-5 overflow-y-auto pr-1 text-sm leading-relaxed text-white/60"
            style={{
              maskImage:
                "linear-gradient(to bottom, black calc(100% - 24px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black calc(100% - 24px), transparent)",
            }}
          >
            {bioText.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-3" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider + redes */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center gap-6">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              {twitter ? (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  const [selected, setSelected] = useState<Speaker | null>(null);

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
                <SpeakerCard speaker={speaker} onSelect={setSelected} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {selected ? (
        <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
