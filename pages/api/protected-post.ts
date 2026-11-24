import type { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from '../../lib/api';
import { hasAccess } from '../../lib/case-study-access';

/** Returns the content blocks of a protected case study to visitors with the access cookie. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'private, no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
  if (!hasAccess(req)) {
    return res.status(401).json({ message: 'Password required' });
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';
  const post = slug ? (await getPost(slug))?.[0] : null;
  if (!post?.protected) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json({ csblocksCollection: post.csblocksCollection ?? null });
}
