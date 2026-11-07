import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

/**
 * Social preview card, 1200x630: /api/og?title=...&name=...&subtitle=...
 * Name and role come from Contentful via SEOMeta; nothing identifying is hard-coded.
 */
export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || '').slice(0, 120);
  const name = (searchParams.get('name') || '').slice(0, 60);
  const subtitle = (searchParams.get('subtitle') || '').slice(0, 80);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0f1719',
          color: '#e4ecec',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: 'uppercase', color: '#5fc4cc' }}>{name}</div>
        <div style={{ fontSize: 76, lineHeight: 1.1, fontWeight: 700, maxWidth: 980 }}>{title || name}</div>
        <div style={{ fontSize: 28, color: '#94a7aa' }}>{subtitle}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' },
    }
  );
}
