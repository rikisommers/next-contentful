import type { GetServerSideProps } from 'next';
import { getLoading } from '../lib/contentful/api';
import { buildProfile } from '../lib/profile';

/** /resume redirects to the PDF CV uploaded in Contentful settings (404 if there is none). */
export default function Resume() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const profile = buildProfile(await getLoading(), null);
  if (!profile.resumeUrl) return { notFound: true };
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return { redirect: { destination: profile.resumeUrl, permanent: false } };
};
