import type { MetadataRoute } from "next";

// El sitio se sirve bajo /crypto-experience-summit, así que las rutas dentro
// del manifest (JSON, que el script de subcarpeta NO reescribe) deben llevar
// el basePath ya incluido.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crypto Experience Summit 2026",
    short_name: "Crypto Summit",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: `${basePath}/Salida-Pers3.png`,
        sizes: "1080x1080",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/Salida-Pers3.png`,
        sizes: "1080x1080",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
