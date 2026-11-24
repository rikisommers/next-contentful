import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextApiRequest } from 'next';

/**
 * Access to protected case studies (Contentful `protected` field).
 *
 * The password is checked by `/api/route`, which sets an httpOnly cookie holding an HMAC
 * of the password. Changing `PAGE_PASSWORD` therefore signs everyone out. Protected
 * content is never in the static page; it is fetched from `/api/protected-post` once the
 * cookie checks out.
 */

const DEFAULT_COOKIE = 'case_study_access';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function accessCookieName(): string {
  return process.env.PASSWORD_COOKIE_NAME || DEFAULT_COOKIE;
}

/** Cookie value for the current password, or null when protection isn't configured. */
export function accessToken(password = process.env.PAGE_PASSWORD): string | null {
  if (!password) return null;
  return createHmac('sha256', password).update('case-study-access').digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isCorrectPassword(submitted: unknown, password = process.env.PAGE_PASSWORD): boolean {
  return typeof password === 'string' && password !== '' && typeof submitted === 'string' && safeEqual(submitted, password);
}

export function hasAccess(req: Pick<NextApiRequest, 'cookies'>, password = process.env.PAGE_PASSWORD): boolean {
  const expected = accessToken(password);
  const cookie = req.cookies?.[accessCookieName()];
  return !!expected && typeof cookie === 'string' && safeEqual(cookie, expected);
}

export function accessCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_SECONDS,
  };
}
