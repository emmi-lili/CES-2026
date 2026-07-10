/**
 * Versión global de los assets estáticos de /public.
 *
 * Sube este número cada vez que reemplaces una imagen en /public para forzar a
 * los navegadores a re-descargarla (cache-busting). Evita que sirvan una
 * versión vieja o rota desde su caché — p. ej. respuestas HTML del firewall
 * cacheadas como si fueran imágenes, con `cache-control: max-age=604800`.
 */
export const ASSET_VERSION = "2";

/** Agrega la versión a una ruta de /public para cache-busting. */
export function asset(path: string): string {
  return path.includes("?") ? path : `${path}?v=${ASSET_VERSION}`;
}
