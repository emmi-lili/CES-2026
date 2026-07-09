"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedInIcon, XIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

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
    name: "Brissia Benavente",
    role: "Head of Growth\nCIUDATTA",
    photo: "/Brissia Benavente.png",
    linkedin: "https://www.linkedin.com/in/brissiabenavente/",
    objectPosition: "center top",
    bio: "Brissia es una nómada digital boliviana y actualmente se desempeña como Head of Growth & Strategy en Ciudata. A lo largo de su trayectoria ha mentorado a más de 100 startups de Bolivia, Latinoamérica y Europa, acompañándolas en el diseño de estrategias para acelerar su crecimiento.\n\nSu propósito es formar a la siguiente generación de líderes capaces de construir soluciones con impacto. A través de LinkedIn divulga contenido sobre nuevas tecnologías, inteligencia artificial, el futuro del trabajo, Business Science y el estilo de vida de los nómadas digitales, inspirando profesionales a prepararse para una economía cada vez más global, descentralizada y digital.",
  },
  {
    name: "Carlos H. Fernandez Mazzi",
    role: "CEO\nFINKA TOKEN",
    photo: "/Carlos H. Fernandez Mazzi.png",
    linkedin: "https://www.linkedin.com/in/carlosfernandezmazzi/",
    objectPosition: "center top",
    bio: "Carlos Fernandez Mazzi aporta más de 35 años de experiencia en negocios internacionales, banca de inversión e inversión de impacto.\n\nEs socio fundador de Finka GmbH, la empresa detrás de Finka Token, el primer instrumento suizo de reparto de ingresos basado en blockchain respaldado por activos tangibles en Bolivia.",
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
    name: "Edwin Saavedra",
    role: "CEO\nKAIZEN MOTORS",
    photo: "/Edwin Saavedra.png",
    linkedin: "https://www.linkedin.com/in/edwinsaavedra/",
    objectPosition: "center top",
    bio: "En Kaizen Motors, los principios de lean management y la analítica de negocios son el núcleo de nuestro enfoque para impulsar la innovación y la eficiencia. Nuestro equipo, bajo mi liderazgo, está comprometido con implementar mejoras continuas en los procesos, asegurando que cada decisión esté basada en datos y centrada en el cliente. Con una sólida experiencia en implementación de ERP y analítica de posventa, hemos integrado con éxito sistemas avanzados para repuestos, servicio, CRM y finanzas, mejorando significativamente los flujos de trabajo operativos. Adoptando la filosofía Kaizen, buscamos constantemente oportunidades para optimizar el desempeño y entregar un valor excepcional a nuestros clientes.",
  },
  {
    name: "Emilia Aguilar",
    role: "CEO\nFORTGATE",
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
    bio: "Especialista certificado en prevención de delitos financieros con criptoactivos y fundador de Efficiency.ca. Cuenta con más de 20 años de experiencia en los sectores de tecnología, energía y blockchain, con enfoque en gobernanza, estrategia e innovación. Posee una Maestría en Gestión y Finanzas por Harvard y fue reconocido como uno de los 20 hispanos más influyentes de Canadá.",
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
    name: "Kublai Gómez",
    role: "Cofundador y CTO\nPRISMAPAY",
    photo: "/Kumblai Gomez.png",
    linkedin: "https://www.linkedin.com/in/kublai/",
    objectPosition: "center top",
    bio: "Kublai Gómez es cofundador y CTO de Prismapay, la primera plataforma boliviana de gestión de tesorería y pagos internacionales de grado institucional, construida sobre infraestructura bancaria y tecnología de activos digitales.\n\nCon más de 25 años de experiencia en ingeniería de software en Estados Unidos, Rusia, España y Suecia, lidera desde Bolivia el desarrollo tecnológico de Prismapay junto a un equipo local de ingenieros.\n\nEs Ingeniero Electrónico, cuenta con un M.S. en Ciberseguridad y certificaciones en SAP, uno de los sistemas ERP empresariales más utilizados a nivel global.",
  },
  {
    name: "Juan Pablo Velasco",
    role: "Gobernador\nSANTA CRUZ",
    photo: "/JPV.png",
    linkedin: "https://www.linkedin.com/in/juanvelasco2/",
    objectPosition: "center top",
    bio: "Emprendedor tecnológico con más de 10 años de experiencia en la industria. Cofundador de la primera plataforma de delivery online de Bolivia, posteriormente adquirida por PedidosYa, en la mayor adquisición de la historia del comercio electrónico boliviano. Ha liderado el crecimiento y expansión de empresas tecnológicas en los sectores de movilidad, fintech y energía, participando en la creación de startups de alto impacto en Latinoamérica.",
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
  const { title, company } = parseRole(role);
  return (
    <article
      onClick={() => onSelect(speaker)}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/60 hover:bg-white/[0.05] hover:shadow-[0_14px_40px_-12px_rgba(61,240,122,0.45)]"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#4b5563]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          style={{ objectPosition: objectPosition ?? "center" }}
        />
        {/* Overlay "Ver perfil" al pasar el cursor */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="m-3 inline-flex items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-black">
            Ver perfil
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="text-base font-bold text-white sm:text-lg">{name}</h3>
        <p className="mt-0.5 whitespace-pre-line text-sm leading-snug text-white/55">
          {title}
          {company ? (
            <>
              {"\n"}
              <span className="font-bold text-white/85">{company}</span>
            </>
          ) : null}
        </p>

        {/* Social links pinned to bottom */}
        <div className="mt-auto flex items-center gap-3 pt-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${name}`}
            onClick={(e) => e.stopPropagation()}
            className="text-white/40 transition-colors hover:text-brand-green"
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
        className={`relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-brand-green/40 bg-[#0d0d0d] shadow-[0_0_40px_-5px_rgba(61,240,122,0.5)] transition-all duration-300 md:flex-row ${
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
          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand-green/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-brand-green">
            {roleBadge(role)}
          </span>

          {/* Bio con scroll interno + fade si es larga */}
          <div className="mt-5 overflow-y-auto pr-2 pb-1 text-sm leading-relaxed text-white/60">
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

/**
 * Reparte `n` speakers en filas de 4 y 3, priorizando filas de 4 y evitando
 * filas sueltas de 1 o 2 (p. ej. 18 -> [4,4,4,3,3], 14 -> [4,4,3,3]).
 */
function computeRowSizes(n: number): number[] {
  if (n <= 4) return n > 0 ? [n] : [];

  const fours = Math.floor(n / 4);
  const remainder = n % 4;

  if (remainder === 0) return Array(fours).fill(4);
  if (remainder === 3) return [...Array(fours).fill(4), 3];
  if (remainder === 2 && fours >= 1)
    return [...Array(fours - 1).fill(4), 3, 3];
  if (remainder === 1 && fours >= 2)
    return [...Array(fours - 2).fill(4), 3, 3, 3];

  // Fallback para casos pequeños poco comunes (n = 5).
  return [...Array(fours).fill(4), remainder];
}

/** Divide la lista de speakers en filas uniformes de 4 y 3. */
function chunkSpeakers(speakers: Speaker[]): Speaker[][] {
  const rows: Speaker[][] = [];
  let i = 0;
  for (const size of computeRowSizes(speakers.length)) {
    rows.push(speakers.slice(i, i + size));
    i += size;
  }
  return rows;
}

/**
 * "Nuestros Speakers" — speakers en orden alfabético, repartidos en filas
 * uniformes de 4 y 3 (centradas), sobre un fondo space-navy.
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
      <SectionHeading
        kicker="Lineup"
        subtitle="Líderes que están construyendo el futuro digital"
        className="mx-auto max-w-2xl"
      >
        Nuestros Speakers
      </SectionHeading>

      {/* Filas uniformes (4 y 3) centradas, con tarjetas de igual altura */}
      <div className="mx-auto mt-12 max-w-6xl space-y-6">
        {rows.map((row, idx) => (
          <Reveal
            key={idx}
            delay={idx * 0.08}
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
          </Reveal>
        ))}
      </div>

      {/* Cierre / call-out */}
      <p className="mx-auto mt-16 max-w-3xl text-center text-2xl font-semibold text-white sm:text-3xl">
        No te pierdas de este evento internacional que llega a{" "}
        <span className="text-brand-green">Bolivia</span>
      </p>

      {selected ? (
        <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
