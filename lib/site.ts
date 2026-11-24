/**
 * URL helpers for SEO metadata, sitemap, robots and feeds.
 * Identity (name, job title, description, profiles) comes from Contentful: see lib/profile.ts.
 * Override the URL per environment with NEXT_PUBLIC_SITE_URL.
 */

export const SITE_LOCALE = 'en';

/** Used only when Contentful has no site title. */
export const FALLBACK_SITE_NAME = 'Portfolio';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : 'http://localhost:3000');
  return url.replace(/\/+$/, '');
}

export const SITE_URL = resolveSiteUrl();

/** Build an absolute URL from a path. Absolute inputs are returned unchanged. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Social preview image rendered on demand by /api/og. */
export function ogImageUrl(title?: string, name?: string, subtitle?: string): string {
  const params = new URLSearchParams();
  if (title) params.set('title', title.slice(0, 120));
  if (name) params.set('name', name.slice(0, 60));
  if (subtitle) params.set('subtitle', subtitle.slice(0, 80));
  const query = params.toString();
  return absoluteUrl(`/api/og${query ? `?${query}` : ''}`);
}
