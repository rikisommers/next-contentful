import type { GetServerSideProps } from 'next';
import { getFooter, getLoading, getSitemapEntries } from '../lib/contentful/api';
import { buildJsonResume } from '../lib/seo-feeds';
import { buildProfile } from '../lib/profile';

/** /resume.json in the JSON Resume format, generated from Contentful. */
export default function ResumeJson() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [{ articles }, settings, footer] = await Promise.all([getSitemapEntries(), getLoading(), getFooter()]);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(JSON.stringify(buildJsonResume(buildProfile(settings, footer), articles, process.env.SPACE), null, 2));
  res.end();
  return { props: {} };
};
