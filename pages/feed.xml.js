// Dynamic RSS feed generation for Next.js
// This file generates the feed.xml at runtime

import { generateRSSFeed } from '../lib/sitemap-generator';

function FeedXml() {
  // getServerSideProps will handle the actual RSS feed generation
  return null;
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch data from your CMS/API
    // For now using empty arrays - you would replace with actual data fetching
    const posts = []; // await fetchAllPosts();
    const caseStudies = []; // await fetchAllCaseStudies();
    
    const rssFeed = await generateRSSFeed(posts, caseStudies);
    
    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(rssFeed);
    res.end();
    
    return {
      props: {}
    };
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.statusCode = 500;
    res.end();
    
    return {
      props: {}
    };
  }
}

export default FeedXml;