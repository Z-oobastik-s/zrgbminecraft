/**
 * Canonical site origin (no trailing slash). Override via NEXT_PUBLIC_SITE_URL in CI.
 * Default matches production deploy at zoobastik.me.
 */
const DEFAULT_SITE_ORIGIN = 'https://zoobastik.me'

export function siteOrigin(): string {
  const v = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!v) return DEFAULT_SITE_ORIGIN
  return v.replace(/\/+$/, '')
}

/** basePath from Next (e.g. `/zrgb`), no trailing slash; empty at domain root. */
export function siteBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim().replace(/\/+$/, '')
}

/**
 * Absolute URL for a path under the deployed app (respects basePath).
 * @param path `/`, `/enchant`, `/sitemap.xml`, etc.
 */
export function absoluteUrl(path: string): string {
  const origin = siteOrigin()
  const base = siteBasePath()
  const normalized =
    path === '' || path === '/'
      ? '/'
      : path.startsWith('/')
        ? path
        : `/${path}`
  const prefix = base ? `${origin}${base}` : origin
  if (normalized === '/') return `${prefix}/`
  return `${prefix}${normalized}`
}
