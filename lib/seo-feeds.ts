import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from './site';

export interface SitemapPage {
  slug: string;
  updatedAt: string | null;
}

export interface FeedArticle {
  slug: string;
  title: string | null;
  subtitle: string | null;
  publishedAt: string | null;
  firstPublishedAt: string | null;
}

const escapeXml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** `home` is served at `/`, so `/home` must not appear as a second URL. */
export const pagePath = (slug: string) => (slug === 'home' ? '/' : `/${slug}`);

export function buildSitemap(pages: SitemapPage[], articles: FeedArticle[]): string {
  const entries = [
    ...pages.map((p) => ({ path: pagePath(p.slug), lastmod: p.updatedAt })),
    ...articles.map((a) => ({ path: `/articles/${a.slug}`, lastmod: a.publishedAt })),
  ];

  const urls = entries
    .map(({ path, lastmod }) => {
      const lastmodTag = lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : '';
      return `<url><loc>${escapeXml(absoluteUrl(path))}</loc>${lastmodTag}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

/** Block indexing on preview deployments; allow everything in production and local dev. */
export function buildRobots(): string {
  const vercelEnv = process.env.VERCEL_ENV;
  const isIndexable = !vercelEnv || vercelEnv === 'production';

  if (!isIndexable) return 'User-agent: *\nDisallow: /\n';

  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join('\n');
}

export function buildRssFeed(articles: FeedArticle[]): string {
  const items = articles
    .map((a) => {
      const link = absoluteUrl(`/articles/${a.slug}`);
      const pubDate = a.firstPublishedAt || a.publishedAt;
      return `<item><title>${escapeXml(a.title || a.slug)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid>${
        a.subtitle ? `<description>${escapeXml(a.subtitle)}</description>` : ''
      }${pubDate ? `<pubDate>${new Date(pubDate).toUTCString()}</pubDate>` : ''}</item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(
    SITE_NAME
  )}</title><link>${escapeXml(absoluteUrl('/'))}</link><description>${escapeXml(
    SITE_DESCRIPTION
  )}</description><atom:link href="${escapeXml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}
