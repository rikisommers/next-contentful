// Dynamic sitemap generation for Next.js
// This file generates the sitemap.xml at build time and runtime

import { generateSitemap } from '../lib/sitemap-generator';

function SitemapXml() {
  // getServerSideProps will handle the actual sitemap generation
  return null;
}

export async function getServerSideProps({ res }) {
  // Fetch data from your CMS/API
  const posts = []; // Fetch from your API or CMS
  const caseStudies = []; // Fetch from your API or CMS
  
  try {
    // You would fetch your actual data here
    // const posts = await fetchAllPosts();
    // const caseStudies = await fetchAllCaseStudies();
    
    const sitemap = await generateSitemap([], posts, caseStudies);
    
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();
    
    return {
      props: {}
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
    
    return {
      props: {}
    };
  }
}

export default SitemapXml;