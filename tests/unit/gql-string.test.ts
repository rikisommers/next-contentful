import { describe, expect, it } from 'vitest';
import { buildSpaceFilter, gqlString } from '../../lib/contentful/client';

describe('gqlString', () => {
  it('quotes plain values', () => {
    expect(gqlString('home')).toBe('"home"');
  });

  it('escapes quotes so input cannot break out of the string literal', () => {
    const literal = gqlString('x" }) { __typename } #');
    expect(literal).toBe('"x\\" }) { __typename } #"');
  });

  it('treats null and undefined as an empty string', () => {
    expect(gqlString(undefined)).toBe('""');
  });
});

describe('buildSpaceFilter', () => {
  it('returns an empty clause without a space', () => {
    expect(buildSpaceFilter()).toBe('');
  });

  it('escapes the tag id', () => {
    expect(buildSpaceFilter('a"b')).toContain('["a\\"b"]');
  });
});
