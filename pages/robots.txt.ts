import type { GetServerSideProps } from 'next';
import { buildRobots } from '../lib/seo-feeds';

export default function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildRobots());
  res.end();
  return { props: {} };
};
