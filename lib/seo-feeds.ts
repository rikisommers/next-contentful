import { absoluteUrl } from './site';
import { isCaseStudyListed } from './case-study-visibility';
import { profileDescription, type Profile } from './profile';
import { toPlainText } from '../components/utils/plain-text';

/** CMS text as one clean sentence fragment: no markup, headings or trailing full stop. */
const fragment = (text?: string | null) =>
  toPlainText((text ?? '').replace(/^\s*#+\s*/gm, '')).replace(/[.\s]+$/, '');

export interface SitemapPage {
  slug: string;
  title?: string | null;
  updatedAt: string | null;
}

export interface FeedArticle {
  slug: string;
  title: string | null;
  subtitle: string | null;
  client?: string | null;
  skills?: string[];
  blog?: boolean;
  publishedAt: string | null;
  firstPublishedAt: string | null;
  siteTags?: string[];
  blockCount?: number;
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

/** Case studies that belong to this site and have content. Entries without visibility data are kept. */
export function listedArticles(articles: FeedArticle[], space?: string): FeedArticle[] {
  return articles.filter((a) =>
    a.blockCount === undefined ? true : isCaseStudyListed({ blockCount: a.blockCount, tags: a.siteTags }, space)
  );
}

export function buildSitemap(pages: SitemapPage[], articles: FeedArticle[], space?: string): string {
  const entries = [
    ...pages.map((p) => ({ path: pagePath(p.slug), lastmod: p.updatedAt })),
    ...listedArticles(articles, space).map((a) => ({ path: `/articles/${a.slug}`, lastmod: a.publishedAt })),
    { path: '/llms.txt', lastmod: null },
  ];

  const urls = entries
    .map(({ path, lastmod }) => {
      const lastmodTag = lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : '';
      return `<url><loc>${escapeXml(absoluteUrl(path))}</loc>${lastmodTag}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

/** Block indexing on preview deployments; allow everything (including AI crawlers) in production. */
export function buildRobots(): string {
  const vercelEnv = process.env.VERCEL_ENV;
  const isIndexable = !vercelEnv || vercelEnv === 'production';

  if (!isIndexable) return 'User-agent: *\nDisallow: /\n';

  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join('\n');
}

export function buildRssFeed(articles: FeedArticle[], profile: Profile, space?: string): string {
  const items = listedArticles(articles, space)
    .map((a) => {
      const link = absoluteUrl(`/articles/${a.slug}`);
      const pubDate = a.firstPublishedAt || a.publishedAt;
      return `<item><title>${escapeXml(a.title || a.slug)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid>${
        a.subtitle ? `<description>${escapeXml(a.subtitle)}</description>` : ''
      }${pubDate ? `<pubDate>${new Date(pubDate).toUTCString()}</pubDate>` : ''}</item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(
    profile.name
  )}</title><link>${escapeXml(absoluteUrl('/'))}</link><description>${escapeXml(
    profileDescription(profile)
  )}</description><atom:link href="${escapeXml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}

/**
 * /llms.txt (llmstxt.org): a plain-Markdown summary of the person and their work for
 * AI assistants and AI-driven candidate search.
 */
export function buildLlmsTxt(profile: Profile, pages: SitemapPage[], articles: FeedArticle[], space?: string): string {
  const lines: string[] = [`# ${profile.name}`, ''];
  const intro = [profile.jobTitle, profile.location].filter(Boolean).join(', ');
  lines.push(`> ${[intro, profile.headline].filter(Boolean).join('. ') || profileDescription(profile)}`, '');
  if (profile.summary) lines.push(profile.summary, '');
  if (profile.skills.length) lines.push(`Skills: ${profile.skills.join(', ')}`, '');
  if (profile.openToWork) lines.push(`Availability: open to work${profile.availability ? ` (${profile.availability})` : ''}`, '');

  const listed = listedArticles(articles, space);
  const work = listed.filter((a) => !a.blog);
  const writing = listed.filter((a) => a.blog);
  const entry = (a: FeedArticle) => {
    const skills = (a.skills ?? []).map((s) => s.trim()).filter(Boolean);
    const details = [fragment(a.subtitle), a.client && `Client: ${fragment(a.client)}`, skills.length && `Skills: ${skills.join(', ')}`]
      .filter(Boolean)
      .join('. ');
    return `- [${fragment(a.title) || a.slug}](${absoluteUrl(`/articles/${a.slug}`)})${details ? `: ${details}` : ''}`;
  };

  if (work.length) lines.push('## Case studies', '', ...work.map(entry), '');
  if (writing.length) lines.push('## Writing', '', ...writing.map(entry), '');

  const links = [
    ...pages.map((p) => `- [${p.title || p.slug}](${absoluteUrl(pagePath(p.slug))})`),
    `- [Résumé (JSON Resume)](${absoluteUrl('/resume.json')})`,
    ...(profile.resumeUrl ? [`- [Résumé (PDF)](${absoluteUrl('/resume')})`] : []),
    ...profile.sameAs.map((url) => `- [${new URL(url).hostname.replace(/^www\./, '')}](${url})`),
  ];
  lines.push('## Links', '', ...links, '');
  return lines.join('\n');
}

/** JSON Resume (jsonresume.org) built from Contentful: basics, skills and projects. */
export function buildJsonResume(profile: Profile, articles: FeedArticle[], space?: string) {
  const projects = listedArticles(articles, space)
    .filter((a) => !a.blog)
    .map((a) => ({
      name: a.title || a.slug,
      ...(a.subtitle ? { description: fragment(a.subtitle) } : {}),
      url: absoluteUrl(`/articles/${a.slug}`),
      ...(a.client ? { entity: a.client } : {}),
      ...(a.skills?.length ? { keywords: a.skills } : {}),
      ...(a.firstPublishedAt ? { startDate: a.firstPublishedAt.slice(0, 10) } : {}),
    }));

  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: profile.name,
      ...(profile.jobTitle ? { label: profile.jobTitle } : {}),
      url: absoluteUrl('/'),
      ...(profile.summary || profile.headline ? { summary: profile.summary ?? profile.headline } : {}),
      ...(profile.location ? { location: { city: profile.location } } : {}),
      profiles: profile.sameAs.map((url) => ({ network: new URL(url).hostname.replace(/^www\./, ''), url })),
    },
    ...(profile.skills.length ? { skills: [{ name: 'Skills', keywords: profile.skills }] } : {}),
    projects,
    meta: { canonical: absoluteUrl('/resume.json'), lastModified: new Date().toISOString() },
  };
}
