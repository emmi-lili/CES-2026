/**
 * Versión global de los assets estáticos de /public.
 *
 * Sube este número cada vez que reemplaces una imagen en /public para forzar a
 * los navegadores a re-descargarla (cache-busting). Evita que sirvan una
 * versión vieja o rota desde su caché — p. ej. respuestas HTML del firewall
 * cacheadas como si fueran imágenes, con `cache-control: max-age=604800`.
 */
export const ASSET_VERSION = "2";

/**
 * basePath del deploy (p. ej. "/crypto-experience-summit" en producción, ""
 * en local). Next NO prefija automáticamente las imágenes de /public que se
 * cargan con <img src="/..."> ni las que se renderizan en cliente, así que hay
 * que anteponerlo aquí para que resuelvan bien cuando el sitio vive en un
 * subfolder. Al ser NEXT_PUBLIC_* queda inlineado en el bundle del cliente,
 * evitando el mismatch de hidratación que dejaba las imágenes rotas.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Antepone el basePath y agrega la versión a una ruta de /public. */
export function asset(path: string): string {
  const full = path.startsWith("/") ? `${BASE_PATH}${path}` : path;
  return full.includes("?") ? full : `${full}?v=${ASSET_VERSION}`;
}
