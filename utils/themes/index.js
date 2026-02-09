/**
 * Theme system barrel export
 *
 * Modular structure:
 *   - themes/colors.js           -- Color palette definitions (soundThemes, colorThemes)
 *   - themes/config/options.js   -- Theme option enums (layouts, animations, navigation, etc.)
 *   - themes/config/defaults.js  -- Default theme content values, sounds, shader effects
 *   - themes/config/tokens.js    -- Design tokens (fonts, spacing, colors, radii, shadows)
 *   - themes/registry.js         -- Theme definitions and utility functions
 *
 * @module utils/themes
 */

export { soundThemes, colorThemes } from './colors';
export * from './config/options';
export * from './config/defaults';
export * from './config/tokens';
export * from './registry';
