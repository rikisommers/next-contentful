import type { GetServerSideProps } from 'next';
import { getFooter, getLoading, getSitemapEntries } from '../lib/contentful/api';
import { buildRssFeed } from '../lib/seo-feeds';
import { buildProfile } from '../lib/profile';

export default function FeedXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [{ articles }, settings, footer] = await Promise.all([getSitemapEntries(), getLoading(), getFooter()]);
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildRssFeed(articles, buildProfile(settings, footer), process.env.SPACE));
  res.end();
  return { props: {} };
};
