import { describe, expect, it } from 'vitest';
import { linkProps, pagePathFromSlug, toHref } from '../../components/utils/links';

describe('toHref', () => {
  it('keeps absolute, mailto, tel, anchors and paths', () => {
    for (const url of ['https://github.com/x', 'mailto:a@b.c', 'tel:+6412', '#top', '/work']) {
      expect(toHref(url)).toBe(url);
    }
  });

  it('turns bare domains into https URLs instead of site routes', () => {
    expect(toHref('bluesky.com')).toBe('https://bluesky.com');
    expect(toHref('codepen.com/me')).toBe('https://codepen.com/me');
  });

  it('treats single words as site paths', () => {
    expect(toHref('work')).toBe('/work');
  });

  it('returns null for empty input', () => {
    expect(toHref('')).toBeNull();
    expect(toHref(undefined)).toBeNull();
  });
});

describe('linkProps', () => {
  it('opens external links in a new tab without opener access', () => {
    expect(linkProps('github.com')).toEqual({ href: 'https://github.com', target: '_blank', rel: 'noopener noreferrer' });
  });

  it('keeps internal links in the same tab', () => {
    expect(linkProps('/bio')).toEqual({ href: '/bio' });
  });
});

describe('pagePathFromSlug', () => {
  it('serves home at /', () => {
    expect(pagePathFromSlug('home')).toBe('/');
    expect(pagePathFromSlug('work')).toBe('/work');
  });
});
