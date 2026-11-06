/**
 * Site-wide identity and URL helpers used by SEO metadata, sitemap, robots and feeds.
 * Override the URL per environment with NEXT_PUBLIC_SITE_URL.
 */

export const SITE_NAME = 'Halcyon Works';
export const SITE_TAGLINE = 'Independent digital design and engineering studio';
export const SITE_DESCRIPTION =
  'Halcyon Works is an independent studio designing and building fast, accessible websites and interactive experiences for ambitious brands.';
export const SITE_LOCALE = 'en';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : 'http://localhost:3000');
  return url.replace(/\/+$/, '');
}

export const SITE_URL = resolveSiteUrl();

/** Public icon used as the organisation logo in structured data. */
export const SITE_LOGO_PATH = '/favicon/android-chrome-512x512.png';

/** Optional profile URLs for structured data. Leave empty until real ones exist. */
export const SOCIAL_PROFILES: string[] = [];

/** Build an absolute URL from a path. Absolute inputs are returned unchanged. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Default social preview image, rendered on demand by /api/og. */
export function ogImageUrl(title?: string): string {
  const query = title ? `?title=${encodeURIComponent(title.slice(0, 120))}` : '';
  return absoluteUrl(`/api/og${query}`);
}
