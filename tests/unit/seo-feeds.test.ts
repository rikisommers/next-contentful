import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildRobots, buildRssFeed, buildSitemap, pagePath } from '../../lib/seo-feeds';

describe('sitemap', () => {
  const xml = buildSitemap(
    [
      { slug: 'home', updatedAt: '2026-01-01T00:00:00.000Z' },
      { slug: 'work', updatedAt: null },
    ],
    [{ slug: 'case-a', title: 'A & B', subtitle: null, publishedAt: '2026-02-01T00:00:00.000Z', firstPublishedAt: null }]
  );

  it('serves the home slug at / and not /home', () => {
    expect(pagePath('home')).toBe('/');
    expect(xml).not.toContain('/home<');
  });

  it('lists pages and articles with absolute URLs', () => {
    expect(xml).toContain('<loc>http://localhost:3000/work</loc>');
    expect(xml).toContain('<loc>http://localhost:3000/articles/case-a</loc>');
  });

  it('only emits lastmod when a date is known', () => {
    expect(xml).toContain('<lastmod>2026-01-01T00:00:00.000Z</lastmod>');
    expect(xml.match(/<lastmod>/g)).toHaveLength(2);
  });
});

describe('robots', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('allows crawling and does not block /_next/', () => {
    const robots = buildRobots();
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: ');
    expect(robots).not.toContain('/_next/');
  });

  it('blocks preview deployments', () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(buildRobots()).toContain('Disallow: /\n');
  });
});

describe('rss', () => {
  it('escapes XML special characters', () => {
    const rss = buildRssFeed([
      { slug: 'x', title: 'Tom & <Jerry>', subtitle: null, publishedAt: null, firstPublishedAt: '2026-03-01T00:00:00.000Z' },
    ]);
    expect(rss).toContain('Tom &amp; &lt;Jerry&gt;');
    expect(rss).toContain('<pubDate>');
  });
});
