import type { GetServerSideProps } from 'next';
import { getSitemapEntries } from '../lib/contentful/api';
import { buildRssFeed } from '../lib/seo-feeds';

export default function FeedXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { articles } = await getSitemapEntries();
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildRssFeed(articles));
  res.end();
  return { props: {} };
};
