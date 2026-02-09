/**
 * Design tokens -- font sizes, families, weights, spacing, colors, radii, shadows
 * @module utils/themes/config/tokens
 */

import { gridLayoutThemes, listLayoutThemes, imageTextureThemes } from './options';

export const fontSizes = {
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  32: "32px",
  48: "48px",
  64: "64px",
};

export const fontFamilies = {
  primary: "sans-serif",
  secondary: "serif",
  mono: "monospace",
};

export const fontWeights = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  loose: 1.8,
};

export const letterSpacings = {
  tight: "-0.05em",
  normal: "0",
  wide: "0.05em",
};

export const colors = {
  primary: "#0070f3",
  secondary: "#ff4081",
  background: "#ffffff",
  text: "#333333",
  black: "#000000",
  white: "#ffffff",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "64px",
};

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  md: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  lg: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
};

export const defaultTheme = {
  data: {
    baseFontSize: fontSizes[16],
    fontFamily: fontFamilies.primary,
    h1: {
      fontSize: fontSizes[32],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h2: {
      fontSize: fontSizes[24],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h3: {
      fontSize: fontSizes[20],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    body: {
      fontSize: fontSizes[16],
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacings.normal,
    },
    caption: {
      fontSize: fontSizes[12],
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacings.normal,
    },
    colors: {
      background: colors.white,
      text: colors.black,
      primary: colors.primary,
      accent: colors.secondary,
    },
    spacing: spacing.md,
    radii: radii.md,
    shadows: shadows.md,
    cardLayout: "formal",
    gridType: gridLayoutThemes.gridBasic,
    listType: listLayoutThemes.textList,
    gridColumns: { sm: 2, md: 3, lg: 4, xl: 4 },
    gridGap: "md",
    imageParallax: false,
    imageTexture: imageTextureThemes.noise,
      buttonStyle: "default",
      buttonType: "primary",
      buttonSound: "click",
  },
};

// Theme attribute configuration for intent-based selection
export const themeAttributesConfig = {
  mood: {
    calm: 0,
    energetic: 0,
    warm: 0,
    cool: 0,
    neutral: 0,
    playful: 0,
    professional: 0,
    retro: 0,
    modern: 0,
    pastel: 0,
    duotone: 0,
    dark: 0,
    light: 0,
    vibrant: 0,
    muted: 0,
    earthy: 0,
    futuristic: 0,
    minimal: 0,
    maximal: 0,
    elegant: 0,
    bold: 0,
    soft: 0,
    highContrast: 0,
    lowContrast: 0,
  },
  // High-level intent attributes
  baseColor: {
    blue: 0,
    green: 0,
    red: 0,
    yellow: 0,
    orange: 0,
    purple: 0,
    pink: 0,
    brown: 0,
    gray: 0,
    black: 0,
    white: 0,
    beige: 0,
    teal: 0,
    cyan: 0,
    gold: 0,
    // Add more as needed
  },
  lightOrDark: {
    light: 0,
    dark: 0,
    balanced: 0, // for mid-tone or flexible themes
  },
  contrast: {
    high: 0,
    medium: 0,
    low: 0,
  },
  // Add more high-level intent categories as needed
};// Theme attribute configuration for intent-based selection
