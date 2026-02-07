import React from "react";
import { heroShaderEffectThemes } from "../../utils/theme";
import {
  normalizeEffectType,
  getEffectCategory,
  ASCII_CHARACTER_SETS,
  EFFECT_TYPES,
  EFFECT_CATEGORIES
} from "../../utils/effect-types";
import BackgroundCssGrad from "./bg-grad-css";
import BlendImage from "../image/blend-image";

// Lazy imports for heavy components - only load when needed
const UnifiedCanvas = React.lazy(() => import("./unified-canvas"));

/**
 * Creates a normalized effect configuration object from theme data.
 * Pure function - uses only its arguments and module-level imports.
 *
 * @param {string} effectVariant - Raw effect variant from theme
 * @param {string} effectType - Effect type category (custom/preset/ascii/etc.)
 * @param {Object} themeData - Theme configuration data
 * @returns {Object|null} Effect configuration object or null
 */
function createEffect(effectVariant, effectType, themeData) {
  if (!effectVariant || effectVariant === 'none') return null;

  const normalizedVariant = normalizeEffectType(effectVariant, heroShaderEffectThemes);
  if (!normalizedVariant) return null;

  const category = getEffectCategory(normalizedVariant);
  const isCustomCategory = effectType === EFFECT_TYPES.CUSTOM;
  const effect = { type: normalizedVariant };

  // Map effect-specific parameters based on effect category
  if (category === EFFECT_CATEGORIES.ASCII) {
    effect.pixelSize = isCustomCategory
      ? themeData?.asciiSize || 12
      : themeData?.asciiPixelSize || 12;
    effect.showBackground = isCustomCategory
      ? false
      : themeData?.asciiShowBackground || false;
    effect.contrast = isCustomCategory
      ? 100
      : themeData?.asciiContrast || 100;

    // Add ASCII character sets
    const asciiChars = ASCII_CHARACTER_SETS[normalizedVariant];
    if (asciiChars) {
      effect.asciiChars = asciiChars;
    }
  }
  // Dithering effects
  else if (category === EFFECT_CATEGORIES.DITHER) {
    effect.colorLevels = isCustomCategory
      ? themeData?.ditherLevels || 4
      : themeData?.ditherColorLevels || 4;
    effect.paperColor = isCustomCategory
      ? themeData?.backgroundColor || '#ffffff'
      : themeData?.ditherPaperColor || themeData?.backgroundColor || '#ffffff';
    effect.inkColor = isCustomCategory
      ? themeData?.textColor || '#000000'
      : themeData?.ditherInkColor || themeData?.textColor || '#000000';
    effect.inverted = isCustomCategory
      ? false
      : themeData?.ditherInverted || false;

    if (normalizedVariant === 'dither-ordered' || normalizedVariant === 'dither_ordered') {
      effect.ditherSize = themeData?.ditherSize || 4;
    }
  }
  // Halftone effects
  else if (category === EFFECT_CATEGORIES.HALFTONE) {
    effect.pixelSize = isCustomCategory
      ? themeData?.halftoneSize || 8
      : themeData?.halftoneDotSize || 8;
    effect.angle = isCustomCategory
      ? 45
      : themeData?.halftoneAngle || 45;
    effect.contrast = isCustomCategory
      ? 100
      : themeData?.halftoneContrast || 100;
    effect.spread = isCustomCategory
      ? 50
      : themeData?.halftoneSpread || 50;
    effect.shape = isCustomCategory
      ? 'circle'
      : themeData?.halftoneShape || 'circle';
    effect.paperColor = isCustomCategory
      ? themeData?.backgroundColor || '#ffffff'
      : themeData?.halftonePaperColor || themeData?.backgroundColor || '#ffffff';
    effect.inkColor = isCustomCategory
      ? themeData?.textColor || '#000000'
      : themeData?.halftoneInkColor || themeData?.textColor || '#000000';
    effect.colorMode = isCustomCategory
      ? 'mono'
      : themeData?.halftoneColorMode || 'mono';
    effect.inverted = isCustomCategory
      ? false
      : themeData?.halftoneInverted || false;
  }
  // Legacy effects
  else if (category === EFFECT_CATEGORIES.LEGACY) {
    if (normalizedVariant === 'pixelation') {
      effect.pixelSize = themeData?.pixelationSize || 8.0;
    } else if (normalizedVariant === 'noise') {
      effect.intensity = themeData?.noiseIntensity || 0.1;
    }
  }

  return effect;
}

/**
 * Hero Background Component - Handles all canvas and background rendering for hero sections
 *
 * @param {string} heroBackground - The style of the hero background
 * @param {Object} image - The image object for image background
 * @param {Object} theme - Theme object containing background and effect settings
 * @returns {JSX.Element|null} - The rendered background component or null
 */
export default function HeroBackground({ heroBackground, image, theme }) {
  // Get effect variant from theme (fallback to legacy heroShaderEffect)
  const effectVariant =
    theme?.data?.effectVariant ?? theme?.data?.heroShaderEffect;
  const effectType = theme?.data?.effectType;

  // Build effects list, filtering out null entries from createEffect
  const effectsList = React.useMemo(() => {
    if (!effectVariant || effectVariant === 'none') return [];
    const effect = createEffect(effectVariant, effectType, theme?.data);
    return effect ? [effect] : [];
  }, [effectVariant, effectType, theme?.data]);

  // Factory function to create background renderer based on type
  const createBackgroundRenderer = (backgroundType) => {
    const renderers = {
      none: () => null,

      canvasPlaneShader: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="shader" shaderType="water" effects={effectsList} />
        </React.Suspense>
      ),

      canvasSphereShader: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="shader" shaderType="sphere" effects={effectsList} />
        </React.Suspense>
      ),

      canvasPerlinBlob: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="shader" shaderType="perlinBlob" effects={effectsList} />
        </React.Suspense>
      ),

      canvasExp: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="shader" shaderType="experience" effects={effectsList} />
        </React.Suspense>
      ),

      canvasGradient: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="gradient" effects={effectsList} />
        </React.Suspense>
      ),

      canvasImage: () => (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas type="image" src={image?.url} effects={effectsList} />
        </React.Suspense>
      ),

      cssgradient: () => <BackgroundCssGrad />,

      image: () => image ? (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-[var(--background-color)]">
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        </div>
      ) : null,
    };

    return renderers[backgroundType] || (() => <BackgroundCssGrad />);
  };

  return createBackgroundRenderer(heroBackground)();
}