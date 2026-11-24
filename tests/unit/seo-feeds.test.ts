import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildJsonResume, buildLlmsTxt, buildRobots, buildRssFeed, buildSitemap, pagePath } from '../../lib/seo-feeds';
import { buildProfile } from '../../lib/profile';

const profile = buildProfile(
  { sitetitle: 'Riki Sommers', jobTitle: 'Design Systems Engineer', location: 'Christchurch, NZ', skills: ['Design tokens', 'React'], profileLinks: ['https://www.linkedin.com/in/example'], resume: { url: '//assets.ctfassets.net/cv.pdf' } },
  { socialCollection: { items: [{ url: 'github.com/example' }] } }
);

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
    expect(xml).toContain('/llms.txt');
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
    const rss = buildRssFeed(
      [{ slug: 'x', title: 'Tom & <Jerry>', subtitle: null, publishedAt: null, firstPublishedAt: '2026-03-01T00:00:00.000Z' }],
      profile
    );
    expect(rss).toContain('Tom &amp; &lt;Jerry&gt;');
    expect(rss).toContain('<pubDate>');
  });
});

const articles = [
  { slug: 'tokens', title: 'Tokens', subtitle: '##  One pipeline.', client: 'Acme', skills: ['Figma'], blog: false, publishedAt: null, firstPublishedAt: '2025-01-02T00:00:00Z', siteTags: ['portfolio'], blockCount: 8 },
  { slug: 'empty', title: 'Empty', subtitle: null, publishedAt: null, firstPublishedAt: null, siteTags: ['portfolio'], blockCount: 0 },
  { slug: 'house', title: 'House', subtitle: null, publishedAt: null, firstPublishedAt: null, siteTags: ['promotional'], blockCount: 5 },
  { slug: 'untagged', title: 'Untagged', subtitle: null, publishedAt: null, firstPublishedAt: null, siteTags: [], blockCount: 3 },
  { slug: 'post', title: 'A post', subtitle: null, blog: true, publishedAt: null, firstPublishedAt: null, siteTags: [], blockCount: 2 },
];

describe('case study visibility in feeds', () => {
  it('drops empty and other-site case studies from the sitemap, keeps untagged ones', () => {
    const xml = buildSitemap([], articles, 'portfolio');
    expect(xml).toContain('/articles/tokens');
    expect(xml).toContain('/articles/untagged');
    expect(xml).not.toContain('/articles/empty');
    expect(xml).not.toContain('/articles/house');
  });
});

describe('llms.txt', () => {
  const txt = buildLlmsTxt(profile, [{ slug: 'bio', title: 'About', updatedAt: null }], articles, 'portfolio');

  it('leads with the name, role and location from Contentful', () => {
    expect(txt.startsWith('# Riki Sommers\n\n> Design Systems Engineer, Christchurch, NZ')).toBe(true);
    expect(txt).toContain('Skills: Design tokens, React');
  });

  it('separates case studies from writing and lists links', () => {
    expect(txt).toContain('## Case studies');
    expect(txt).toContain('[Tokens](http://localhost:3000/articles/tokens): One pipeline. Client: Acme. Skills: Figma');
    expect(txt).toContain('## Writing');
    expect(txt).toContain('[A post]');
    expect(txt).not.toContain('Empty');
    expect(txt).toContain('https://www.linkedin.com/in/example');
    expect(txt).toContain('https://github.com/example');
    expect(txt).toContain('/resume)');
  });
});

describe('JSON Resume', () => {
  it('builds basics, skills and listed projects', () => {
    const resume = buildJsonResume(profile, articles, 'portfolio');
    expect(resume.basics.name).toBe('Riki Sommers');
    expect(resume.basics.label).toBe('Design Systems Engineer');
    expect(resume.basics.profiles.map((p) => p.network)).toEqual(['linkedin.com', 'github.com']);
    expect(resume.skills?.[0].keywords).toEqual(['Design tokens', 'React']);
    expect(resume.projects.map((p) => p.name)).toEqual(['Tokens', 'Untagged']);
  });
});
