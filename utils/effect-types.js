/**
 * Effect Types and Configuration Maps
 * Centralizes all effect type definitions and theme mappings
 */

// Effect Type Categories
export const EFFECT_TYPES = {
  NONE: 'none',
  PRESET: 'preset',
  CUSTOM: 'custom',
  LEGACY: 'legacy'
};

// Effect Categories by Content Type
export const EFFECT_CATEGORIES = {
  ASCII: 'ascii',
  DITHER: 'dither',
  HALFTONE: 'halftone',
  LEGACY: 'legacy'
};

// Complete Effect Variant Maps (matching heroShaderEffectThemes)
export const EFFECT_VARIANTS = {
  // None
  NONE: 'none',

  // ASCII Effects
  ASCII_STANDARD: 'ascii-standard',
  ASCII_DENSE: 'ascii-dense',
  ASCII_MINIMAL: 'ascii-minimal',
  ASCII_BLOCKS: 'ascii-blocks',
  ASCII_BRAILLE: 'ascii-braille',
  ASCII_TECHNICAL: 'ascii-technical',
  ASCII_MATRIX: 'ascii-matrix',
  ASCII_HATCHING: 'ascii-hatching',

  // Dither Effects
  DITHER_BLUE_NOISE: 'dither-blue-noise',
  DITHER_ORDERED: 'dither-ordered',
  DITHER_COLOR_QUANT: 'dither-color-quant',
  DITHER_FLOYD_STEINBERG: 'dither-floyd-steinberg',
  DITHER_ATKINSON: 'dither-atkinson',
  DITHER_JARVIS_JUDICE_NINKE: 'dither-jarvis-judice-ninke',
  DITHER_STUCKI: 'dither-stucki',
  DITHER_BURKES: 'dither-burkes',
  DITHER_SIERRA: 'dither-sierra',
  DITHER_SIERRA2: 'dither-sierra2',
  DITHER_SIERRA_LITE: 'dither-sierra-lite',

  // Halftone Effects
  HALFTONE_DOTS: 'halftone-dots',
  HALFTONE_ASCII: 'halftone-ascii',
  HALFTONE_LED: 'halftone-led',
  HALFTONE_LEGO: 'halftone-lego',
  HALFTONE_RECT: 'halftone-rect',
  HALFTONE_DOTS_NEW: 'halftone-dots-new',
  HALFTONE_CIRCLES: 'halftone-circles',
  HALFTONE_SQUARES: 'halftone-squares',
  HALFTONE_LINES: 'halftone-lines',
  HALFTONE_CROSSHATCH: 'halftone-crosshatch',
  HALFTONE_NEWSPAPER: 'halftone-newspaper',

  // Legacy Effects
  NOISE: 'noise',
  PIXELATION: 'pixelation'
};

// Legacy mapping for backwards compatibility
export const LEGACY_EFFECT_MAP = {
  blueNoise: EFFECT_VARIANTS.DITHER_BLUE_NOISE,
  noiseDither: EFFECT_VARIANTS.NOISE,
  orderedDither: EFFECT_VARIANTS.DITHER_ORDERED,
  colorQuant: EFFECT_VARIANTS.DITHER_COLOR_QUANT,
  colorQuant2: EFFECT_VARIANTS.DITHER_COLOR_QUANT,
  rect: EFFECT_VARIANTS.HALFTONE_RECT,
  dots: EFFECT_VARIANTS.HALFTONE_DOTS,
  ascii: EFFECT_VARIANTS.HALFTONE_ASCII,
  ascii2: EFFECT_VARIANTS.HALFTONE_ASCII,
  luma: EFFECT_VARIANTS.HALFTONE_RECT,
  led: EFFECT_VARIANTS.HALFTONE_LED,
  lego: EFFECT_VARIANTS.HALFTONE_LEGO,
  progress: EFFECT_VARIANTS.HALFTONE_RECT
};

// ASCII Character Sets Map
export const ASCII_CHARACTER_SETS = {
  [EFFECT_VARIANTS.ASCII_STANDARD]: ' .:-=+*#%@',
  // Dense set from EFECTO_EFFECTS_README.md (kept as a single string for texture atlas generation)
  [EFFECT_VARIANTS.ASCII_DENSE]: " .'`^\\\",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  // Minimal set from EFECTO_EFFECTS_README.md
  [EFFECT_VARIANTS.ASCII_MINIMAL]: ' .o0@',
  // Block drawing characters from EFECTO_EFFECTS_README.md
  [EFFECT_VARIANTS.ASCII_BLOCKS]: ' ░▒▓█',
  // Braille patterns (optional — shader is procedural, but we keep for consistency)
  [EFFECT_VARIANTS.ASCII_BRAILLE]: ' ⠁⠃⠇⠏⠟⠿⣿',
  // Hex/terminal aesthetic
  [EFFECT_VARIANTS.ASCII_TECHNICAL]: '0123456789ABCDEF',
  // Matrix/hatching are procedural in our shaders; provide optional hints
  [EFFECT_VARIANTS.ASCII_MATRIX]: null,
  [EFFECT_VARIANTS.ASCII_HATCHING]: null
};

// Effect Options Configuration Maps
export const EFFECT_OPTIONS = {
  [EFFECT_CATEGORIES.ASCII]: {
    pixelSize: { default: 12, min: 4, max: 32, step: 2 },
    showBackground: { default: false },
    contrast: { default: 100, min: 0, max: 200, step: 10 }
  },

  [EFFECT_CATEGORIES.DITHER]: {
    colorLevels: { default: 4, min: 2, max: 16, step: 1 },
    paperColor: { default: '#ffffff' },
    inkColor: { default: '#000000' },
    inverted: { default: false },
    ditherSize: { default: 4, min: 2, max: 16, step: 1 }
  },

  [EFFECT_CATEGORIES.HALFTONE]: {
    pixelSize: { default: 8, min: 2, max: 32, step: 2 },
    angle: { default: 45, min: 0, max: 360, step: 15 },
    contrast: { default: 100, min: 0, max: 200, step: 10 },
    spread: { default: 50, min: 0, max: 100, step: 5 },
    shape: { default: 'circle', options: ['circle', 'square', 'line'] },
    paperColor: { default: '#ffffff' },
    inkColor: { default: '#000000' },
    colorMode: { default: 'mono', options: ['mono', 'color'] },
    inverted: { default: false }
  },

  [EFFECT_CATEGORIES.LEGACY]: {
    pixelationSize: { default: 8.0, min: 2, max: 32, step: 2 },
    noiseIntensity: { default: 0.1, min: 0, max: 1, step: 0.05 }
  }
};

// Theme Parameter Mapping
export const THEME_PARAMETER_MAP = {
  [EFFECT_CATEGORIES.ASCII]: {
    custom: {
      pixelSize: 'asciiSize',
      showBackground: null,
      contrast: null
    },
    preset: {
      pixelSize: 'asciiPixelSize',
      showBackground: 'asciiShowBackground',
      contrast: 'asciiContrast'
    }
  },

  [EFFECT_CATEGORIES.DITHER]: {
    custom: {
      colorLevels: 'ditherLevels',
      paperColor: 'backgroundColor',
      inkColor: 'textColor',
      inverted: null
    },
    preset: {
      colorLevels: 'ditherColorLevels',
      paperColor: 'ditherPaperColor',
      inkColor: 'ditherInkColor',
      inverted: 'ditherInverted'
    }
  },

  [EFFECT_CATEGORIES.HALFTONE]: {
    custom: {
      pixelSize: 'halftoneSize',
      angle: null,
      contrast: null,
      spread: null,
      shape: null,
      paperColor: 'backgroundColor',
      inkColor: 'textColor',
      colorMode: null,
      inverted: null
    },
    preset: {
      pixelSize: 'halftoneDotSize',
      angle: 'halftoneAngle',
      contrast: 'halftoneContrast',
      spread: 'halftoneSpread',
      shape: 'halftoneShape',
      paperColor: 'halftonePaperColor',
      inkColor: 'halftoneInkColor',
      colorMode: 'halftoneColorMode',
      inverted: 'halftoneInverted'
    }
  }
};

/**
 * Determines the category of an effect
 * @param {string} effectType - The normalized effect type
 * @returns {string} - The effect category
 */
export function getEffectCategory(effectType) {
  if (effectType?.startsWith('ascii')) return EFFECT_CATEGORIES.ASCII;
  if (effectType?.startsWith('dither')) return EFFECT_CATEGORIES.DITHER;
  if (effectType?.startsWith('halftone')) return EFFECT_CATEGORIES.HALFTONE;
  return EFFECT_CATEGORIES.LEGACY;
}

/**
 * Normalizes effect variant using legacy mapping and theme data
 * @param {string} effectVariant - Raw effect variant from theme
 * @param {Object} heroShaderEffectThemes - Theme effect mappings
 * @returns {string} - Normalized effect type
 */
export function normalizeEffectType(effectVariant, heroShaderEffectThemes) {
  if (!effectVariant || effectVariant === 'none') return null;

  const mappedFromKey = heroShaderEffectThemes?.[effectVariant];
  const legacyMapped = LEGACY_EFFECT_MAP[effectVariant];
  return legacyMapped || mappedFromKey || effectVariant;
}

/**
 * Gets effect parameters based on effect type and theme data
 * @param {string} normalizedVariant - Normalized effect variant
 * @param {string} effectType - Effect type (custom/preset)
 * @param {Object} themeData - Theme configuration object
 * @returns {Object} - Effect parameters object
 */
export function getEffectParameters(normalizedVariant, effectType, themeData) {
  const category = getEffectCategory(normalizedVariant);
  const isCustomCategory = effectType === EFFECT_TYPES.CUSTOM;
  const parameterType = isCustomCategory ? 'custom' : 'preset';

  const categoryOptions = EFFECT_OPTIONS[category];
  const parameterMap = THEME_PARAMETER_MAP[category]?.[parameterType];

  if (!categoryOptions || !parameterMap) return {};

  const parameters = {};

  Object.keys(categoryOptions).forEach(key => {
    const themeKey = parameterMap[key];
    const defaultValue = categoryOptions[key].default;

    if (themeKey && themeData?.[themeKey] !== undefined) {
      parameters[key] = themeData[themeKey];
    } else if (themeKey === null && isCustomCategory) {
      // Custom category with null mapping uses defaults
      parameters[key] = defaultValue;
    } else if (themeKey && !isCustomCategory) {
      // Preset category with fallback to default
      parameters[key] = themeData?.[themeKey] || defaultValue;
    } else {
      parameters[key] = defaultValue;
    }
  });

  return parameters;
}