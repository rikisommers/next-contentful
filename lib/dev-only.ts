import type { NextApiHandler } from 'next';

/**
 * Wrap an API route so it only exists in development.
 * The theme editor routes use the Contentful *management* token and are
 * unauthenticated, so they must never be reachable on a deployed site.
 */
export function devOnly(handler: NextApiHandler): NextApiHandler {
  return (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    return handler(req, res);
  };
}
