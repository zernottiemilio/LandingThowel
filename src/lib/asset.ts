/**
 * Encodea rutas de assets con caracteres unicode o espacios.
 * Muchos folders del proyecto original tienen tildes (`telescópica`, `estándar`)
 * y espacios; el atributo `src` no los codifica automáticamente y el dev server
 * responde 000/404.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  return encodeURI(path);
}
