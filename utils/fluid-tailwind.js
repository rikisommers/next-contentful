/**
 * Fluid Tailwind Utility
 * 
 * This file provides a simplified version of the fluid-tailwind functionality
 * that was previously provided by the fluid-tailwind package.
 */

// Default breakpoints
const defaultScreens = {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1440px',
  '3xl': '1600px',
  '4xl': '1920px',
};

/**
 * Extract values from a theme object
 * @param {Object} theme - The theme object
 * @returns {Object} - The extracted values
 */
const extract = (theme) => {
  return theme;
};

/**
 * Get the screens configuration
 * @param {Object} options - Options for the screens configuration
 * @returns {Object} - The screens configuration
 */
const screens = (options = {}) => {
  return {
    ...defaultScreens,
    ...options,
  };
};

module.exports = {
  extract,
  screens,
}; 