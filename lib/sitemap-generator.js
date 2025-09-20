// Sitemap generation utility for SEO
// This generates XML sitemaps for search engines

import { SITE_URL } from './constants';

// Priority levels for different page types
const PRIORITIES = {
  homepage: '1.0',
  mainPages: '0.9',
  caseStudies: '0.8',
  articles: '0.7',
  tags: '0.6',
  archive: '0.5'
};

// Change frequency for different content types
const CHANGE_FREQUENCIES = {
  homepage: 'weekly',
  dynamic: 'weekly',
  static: 'monthly',
  archive: 'yearly'
};

// Generate sitemap entry
const generateSitemapEntry = (url, lastModified = null, priority = '0.5', changeFreq = 'monthly') => {
  const lastMod = lastModified 
    ? new Date(lastModified).toISOString() 
    : new Date().toISOString();
    
  return `
  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Generate complete sitemap XML
export const generateSitemap = async (pages = [], posts = [], caseStudies = []) => {
  const staticPages = [
    {
      url: '/',
      priority: PRIORITIES.homepage,
      changeFreq: CHANGE_FREQUENCIES.homepage
    },
    {
      url: '/work',
      priority: PRIORITIES.mainPages,
      changeFreq: CHANGE_FREQUENCIES.static
    },
    {
      url: '/process',
      priority: PRIORITIES.mainPages,
      changeFreq: CHANGE_FREQUENCIES.static
    },
    {
      url: '/studio',
      priority: PRIORITIES.mainPages,
      changeFreq: CHANGE_FREQUENCIES.static
    }
  ];

  const dynamicPages = [
    // Case studies
    ...caseStudies.map(study => ({
      url: `/${study.slug}`,
      lastModified: study.sys?.publishedAt || study.sys?.createdAt,
      priority: PRIORITIES.caseStudies,
      changeFreq: CHANGE_FREQUENCIES.dynamic
    })),
    
    // Blog posts/articles  
    ...posts.map(post => ({
      url: `/articles/${post.slug}`,
      lastModified: post.sys?.publishedAt || post.sys?.createdAt,
      priority: PRIORITIES.articles,
      changeFreq: CHANGE_FREQUENCIES.dynamic
    }))
  ];

  const allPages = [...staticPages, ...dynamicPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => 
  generateSitemapEntry(
    page.url, 
    page.lastModified, 
    page.priority, 
    page.changeFreq
  )
).join('')}
</urlset>`;

  return sitemap.trim();
};

// Generate sitemap index for large sites
export const generateSitemapIndex = (sitemaps = []) => {
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `
  <sitemap>
    <loc>${SITE_URL}/sitemaps/${sitemap}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
`).join('')}
</sitemapindex>`.trim();
};

// Generate RSS feed for content
export const generateRSSFeed = async (posts = [], caseStudies = []) => {
  const items = [
    ...posts.map(post => ({
      title: post.title,
      description: post.excerpt || post.content?.slice(0, 200),
      url: `/articles/${post.slug}`,
      date: post.sys?.publishedAt || post.sys?.createdAt,
      category: 'Article'
    })),
    ...caseStudies.map(study => ({
      title: study.title,
      description: study.subtitle || study.description,
      url: `/${study.slug}`,
      date: study.sys?.publishedAt || study.sys?.createdAt,
      category: 'Case Study'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 20);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Award-Winning Digital Studio</title>
    <description>Latest work and insights from our creative studio</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hello@yourstudio.com</managingEditor>
    <webMaster>hello@yourstudio.com</webMaster>
    ${items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${SITE_URL}${item.url}</link>
      <guid isPermaLink="true">${SITE_URL}${item.url}</guid>
      <category>${item.category}</category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`.trim();
};