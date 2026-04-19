/** Static file URL with GitHub Pages basePath (see next.config BASE_PATH). */
export function assetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
