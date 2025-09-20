// Dynamic robots.txt generation for Next.js
// This file generates the robots.txt at runtime with proper domain

function RobotsTxt() {
  // getServerSideProps will handle the actual robots.txt generation
  return null;
}

export async function getServerSideProps({ res }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay for specific bots (optional)
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

# Block access to admin/private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important assets
Allow: /api/og
Allow: /_next/static/
Allow: /_next/image/

# Block sensitive files
Disallow: /*.json$
Disallow: /*.md$
Disallow: /.*
Disallow: /*?*

# Allow specific important files
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /favicon.ico
Allow: /manifest.json`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();

  return {
    props: {}
  };
}

export default RobotsTxt;