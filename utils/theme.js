/**
 * Theme system barrel export
 *
 * All theme logic has been modularized into:
 *   - utils/themes/colors.js           -- Color palette definitions
 *   - utils/themes/config/options.js   -- Theme option enums
 *   - utils/themes/config/defaults.js  -- Default theme content values
 *   - utils/themes/config/tokens.js    -- Design tokens
 *   - utils/themes/registry.js         -- Theme definitions and utilities
 *
 * This file re-exports everything for backward compatibility.
 * New code should import directly from utils/themes/.
 *
 * @module utils/theme
 */

export { soundThemes, colorThemes } from './themes/colors';
export * from './themes/config/options';
export * from './themes/config/defaults';
export * from './themes/config/tokens';
export * from './themes/registry';
