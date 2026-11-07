import { describe, expect, it } from 'vitest';
import { toVideoEmbedUrl, toEmbedSrc } from '../../components/utils/embed-urls';

describe('toVideoEmbedUrl', () => {
  it('converts YouTube watch, short and youtu.be links', () => {
    expect(toVideoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
    expect(toVideoEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
    expect(toVideoEmbedUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  });

  it('converts Vimeo links', () => {
    expect(toVideoEmbedUrl('https://vimeo.com/123456789')).toBe('https://player.vimeo.com/video/123456789?dnt=1');
  });

  it('ignores other URLs', () => {
    expect(toVideoEmbedUrl('https://example.com/clip.mp4')).toBeNull();
  });
});

describe('toEmbedSrc', () => {
  it('wraps Figma design and prototype links in the Figma embed endpoint', () => {
    const src = toEmbedSrc('https://www.figma.com/proto/abc123/Flow?node-id=1-2');
    expect(src.startsWith('https://www.figma.com/embed?embed_host=share&url=')).toBe(true);
    expect(decodeURIComponent(src.split('url=')[1])).toBe('https://www.figma.com/proto/abc123/Flow?node-id=1-2');
  });

  it('passes other embeds through', () => {
    expect(toEmbedSrc('https://codepen.io/me/embed/xyz')).toBe('https://codepen.io/me/embed/xyz');
  });
});
