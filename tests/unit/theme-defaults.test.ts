import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, resolveTheme } from '../../utils/themes/config/default-theme';
import { getThemeCssVars, getThemeCssText } from '../../utils/styleUtils';
import { themes } from '../../utils/themes/registry';

describe('resolveTheme', () => {
  it('returns the defaults for empty input', () => {
    expect(resolveTheme(undefined)).toEqual(DEFAULT_THEME);
    expect(resolveTheme(null)).toEqual(DEFAULT_THEME);
    expect(resolveTheme({})).toMatchObject({ name: DEFAULT_THEME.name });
  });

  it('keeps CMS overrides but fills the gaps', () => {
    const theme = resolveTheme({ name: 'brand', data: { accentPri: '#ff0066' } });
    expect(theme.name).toBe('brand');
    expect(theme.data.accentPri).toBe('#ff0066');
    expect(theme.data.textColor).toBe(DEFAULT_THEME.data.textColor);
  });

  it('does not let null or empty CMS values erase defaults', () => {
    const theme = resolveTheme({ data: { textColor: null, backgroundColor: '' } });
    expect(theme.data.textColor).toBe(DEFAULT_THEME.data.textColor);
    expect(theme.data.backgroundColor).toBe(DEFAULT_THEME.data.backgroundColor);
  });

  it('resolves preset keys and falls back for unknown ones', () => {
    expect(resolveTheme('dark').data.key).toBe('dark');
    expect(resolveTheme('does-not-exist')).toEqual(DEFAULT_THEME);
  });

  it('is quiet by default: no sound until the visitor opts in', () => {
    expect(DEFAULT_THEME.data.audioEnabled).toBe(false);
  });
});

describe('theme CSS variables', () => {
  it('produces every variable for an empty theme', () => {
    const vars = getThemeCssVars(undefined);
    expect(Object.keys(vars).length).toBeGreaterThan(100);
    expect(vars['--text-color']).toBe(DEFAULT_THEME.data.textColor);
    expect(Object.values(vars).every((v) => v !== 'undefined' && v !== '')).toBe(true);
  });

  it('serialises to a :root rule without breaking out of the style tag', () => {
    const css = getThemeCssText({ name: 'x', data: { fontFamilyPrimary: 'a</style><script>' } });
    expect(css.startsWith(':root{')).toBe(true);
    expect(css).not.toContain('</style>');
  });
});

describe('bundled presets', () => {
  it.each(Object.keys(themes))('%s resolves to a complete set of CSS variables', (key) => {
    const vars = getThemeCssVars((themes as Record<string, unknown>)[key]);
    const broken = Object.entries(vars).filter(([, v]) => v === 'undefined' || v === '' || v === 'null');
    expect(broken).toEqual([]);
  });
});
