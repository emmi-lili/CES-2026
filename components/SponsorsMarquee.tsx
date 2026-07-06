import Image from "next/image";

import SectionHeading from "./SectionHeading";

type Logo = {
  name: string;
  src: string;
};

// TODO: agregar/quitar logos aquí (archivos en /public).
const LOGOS: Logo[] = [
  { name: "Banco de Crédito", src: "/BCP.png" },
  { name: "BitGo", src: "/BITGO.png" },
  { name: "Iturri & Asociados", src: "/ITURRI.png" },
  { name: "Rain", src: "/RAIN.png" },
  { name: "Tether", src: "/TETHER.png" },
];

/**
 * Carrusel infinito de logos de sponsors. La pista se duplica para que el
 * desplazamiento continuo (derecha → izquierda) haga loop sin cortes.
 * Se pausa al pasar el cursor y respeta `prefers-reduced-motion`.
 */
export default function SponsorsMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-12">
      {/* Título */}
      <SectionHeading kicker="Aliados" className="mb-10 px-5">
        Nuestros Sponsors
      </SectionHeading>

      {/* Degradados en los extremos: aparición/desaparición suave */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-32" />

      {/* Pista con la secuencia DUPLICADA para el loop seamless */}
      <div className="marquee-track flex w-max items-center">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="shrink-0 px-4 sm:px-6"
            aria-hidden={i >= LOGOS.length ? true : undefined}
          >
            <div className="group flex h-28 w-44 items-center justify-center p-5 sm:h-32 sm:w-52 sm:p-6">
              <div className="relative h-full w-full">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="208px"
                  className="object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:[filter:drop-shadow(0_0_10px_rgba(61,240,122,0.7))]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
