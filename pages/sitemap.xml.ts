import type { GetServerSideProps } from 'next';
import { getSitemapEntries } from '../lib/contentful/api';
import { buildSitemap } from '../lib/seo-feeds';

export default function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { pages, articles } = await getSitemapEntries();
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildSitemap(pages, articles, process.env.SPACE));
  res.end();
  return { props: {} };
};
