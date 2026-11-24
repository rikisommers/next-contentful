/**
 * Single source of truth for theme defaults.
 *
 * Every theme key the app reads has a sensible value here, so a theme coming
 * from Contentful, localStorage or the editor can be partial (or empty) and the
 * site still renders well out of the box.
 * @module utils/themes/config/default-theme
 */

import { themes } from '../registry';

export type ThemeValue = string | number | boolean | null | undefined | Record<string, unknown>;

export interface ThemeData {
  key?: string;
  [key: string]: ThemeValue;
}

export interface Theme {
  name: string;
  data: ThemeData;
}

/**
 * Keys that exist in the CSS-variable mapping but were not part of any
 * bundled theme, so they previously depended on scattered inline fallbacks.
 */
const GAP_FILLERS: ThemeData = {
  surfaceTexture: 'color',
  navFloating: false,
  navFixed: false,
  gridPrimary: 'gridPrimary',
  gridSecondary: 'gridSecondary',
  shaderType: 'watercolor',
  shaderMesh: false,
  halftoneInvert: false,
  dotScale: 0.6,
  textColorInv: '#ffffff',
};

/**
 * Behavioural defaults that should be safe for every visitor:
 * no sound until the user opts in, no custom cursor, standard page width.
 */
const SAFE_BEHAVIOUR: ThemeData = {
  audioEnabled: false,
  cursor: 'none',
};

export const DEFAULT_THEME: Theme = {
  name: 'light',
  data: {
    ...GAP_FILLERS,
    ...(themes.light.data as ThemeData),
    ...SAFE_BEHAVIOUR,
    key: 'light',
  },
};

const isEmpty = (value: unknown): boolean =>
  value === undefined || value === null || value === '';

/** Drop null/undefined/empty values so they cannot overwrite a default. */
function definedOnly(data: ThemeData | undefined | null): ThemeData {
  const out: ThemeData = {};
  if (!data) return out;
  for (const [key, value] of Object.entries(data)) {
    if (!isEmpty(value)) out[key] = value;
  }
  return out;
}

/**
 * Merge a partial theme (or a theme key) over the defaults.
 * Accepts `{ name, data }`, a bare data object, a theme key string, or nothing.
 */
export function resolveTheme(input?: Partial<Theme> | ThemeData | string | null): Theme {
  if (typeof input === 'string') {
    const preset = (themes as Record<string, Theme>)[input];
    return preset ? resolveTheme(preset) : DEFAULT_THEME;
  }
  if (!input || typeof input !== 'object') return DEFAULT_THEME;

  const maybeTheme = input as Partial<Theme>;
  const data = (maybeTheme.data && typeof maybeTheme.data === 'object'
    ? maybeTheme.data
    : input) as ThemeData;
  const name = typeof maybeTheme.name === 'string' && maybeTheme.name ? maybeTheme.name : DEFAULT_THEME.name;

  return {
    name,
    data: { ...DEFAULT_THEME.data, ...definedOnly(data) },
  };
}
