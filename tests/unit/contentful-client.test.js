import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGraphQL, buildSpaceFilter } from '../../lib/contentful/client';

describe('buildSpaceFilter', () => {
  it('returns filter string when space is provided', () => {
    const result = buildSpaceFilter('test-space');
    expect(result).toContain('test-space');
    expect(result).toContain('id_contains_some');
  });

  it('returns empty string when space is undefined', () => {
    const result = buildSpaceFilter();
    expect(result).toBe('');
  });

  it('returns empty string when space is empty string', () => {
    const result = buildSpaceFilter('');
    expect(result).toBe('');
  });
});

describe('fetchGraphQL', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data null on non-200 response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await fetchGraphQL('{ test }', false);
    expect(result).toEqual({ data: null });
    consoleSpy.mockRestore();
  });

  it('returns parsed json on successful response', async () => {
    const mockData = { data: { page: { title: 'Test' } } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchGraphQL('{ page { title } }', false);
    expect(result.data.page.title).toBe('Test');
  });

  it('logs errors but returns data when GraphQL errors present', async () => {
    const mockData = { data: { page: null }, errors: [{ message: 'Field not found' }] };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await fetchGraphQL('{ invalid }', false);
    expect(consoleSpy).toHaveBeenCalledWith('Contentful GraphQL errors:', mockData.errors);
    expect(result.data.page).toBeNull();
    consoleSpy.mockRestore();
  });
});
