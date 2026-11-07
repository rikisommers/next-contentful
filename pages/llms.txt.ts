import type { GetServerSideProps } from 'next';
import { getFooter, getLoading, getSitemapEntries } from '../lib/contentful/api';
import { buildLlmsTxt } from '../lib/seo-feeds';
import { buildProfile } from '../lib/profile';

/** /llms.txt: plain-Markdown profile and case study index for AI assistants and AI candidate search. */
export default function LlmsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [{ pages, articles }, settings, footer] = await Promise.all([getSitemapEntries(), getLoading(), getFooter()]);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildLlmsTxt(buildProfile(settings, footer), pages, articles, process.env.SPACE));
  res.end();
  return { props: {} };
};
