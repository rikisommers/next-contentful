"use client";

import { heroHeightThemes, heroBackgroundThemes, heroCssGradientThemes, heroCssGradientRadialPositionThemes, heroTextImageThemes, heroTextPositionThemes, textAlignThemes, textAnimationThemes } from './theme';

export const setStyleProperties = (theme) => {
  const root = document.documentElement;

  if (theme && theme.data) {
    // Color properties
    root.style.setProperty("--text-highlight", theme.data.textHighlight || "text");
    root.style.setProperty("--text-animation", theme.data.textAnimation || "linesup");
    root.style.setProperty("--text-animation-sec", theme.data.textAnimationSec || "linesup");
    root.style.setProperty("--page-transition", theme.data.pageTransition || "fade");
    root.style.setProperty("--page-width", theme.data.pageWidth || "large");

    // Non-color theme properties
    root.style.setProperty("--cursor", theme.data.cursor || "dot");

    root.style.setProperty("--font-family-primary", theme.data.fontFamilyPrimary || "sans-serif");
    root.style.setProperty("--font-family-secondary", theme.data.fontFamilySecondary || "sans-serif");

    root.style.setProperty("--font-scale", theme.data.fontScale || 'fluid');
    root.style.setProperty("--font-ratio-min", theme.data.fluidFontRatioMin || 1.2);
    root.style.setProperty("--font-ratio-max", theme.data.fluidFontRatioMax || 1.25);
    root.style.setProperty("--body-text-indent", theme.data.bodyTextIndent || "false");

    // Additional properties
    root.style.setProperty("--body-background-color", theme.data.bodyBackgroundColor || "#ffffff");
    root.style.setProperty("--background-color", theme.data.backgroundColor || "#ffffff");
    root.style.setProperty("--surface1", theme.data.surface1 || "#ffffff");
    root.style.setProperty("--surface2", theme.data.surface2 || "#ffffff");
    root.style.setProperty("--surface3", theme.data.surface3 || "#ffffff");
    root.style.setProperty("--surface-texture", theme.data.surfaceTexture || "color");

    root.style.setProperty("--heading-color", theme.data.headingColor || "#000000");
    root.style.setProperty("--text-color", theme.data.textColor || "#000000");
    root.style.setProperty("--text-accent", theme.data.textAccent || "#000000");

    root.style.setProperty("--subtext-color", theme.data.subtextColor || "#000000");
    root.style.setProperty("--text-color-inv", theme.data.textColorInv || "#000000");
    root.style.setProperty("--nav-bg", theme.data.navBg || "#ffffff");
    root.style.setProperty("--accent-pri", theme.data.accentPri || "#000000");
    root.style.setProperty("--accent-sec", theme.data.accentSec || "#000000");
    root.style.setProperty("--accent-image-bg", theme.data.accentImageBg || "#000000");
    
    root.style.setProperty("--grad-start", theme.data.gradStart || "#000000");
    root.style.setProperty("--grad-stop", theme.data.gradStop || "#000000");

    // Audio properties
    root.style.setProperty("--audio-enabled", theme.data.audioEnabled || "false");
    root.style.setProperty("--audio-volume", theme.data.audioVolume || 1);
    root.style.setProperty("--audio-init", theme.data.audioInit || "click");
    root.style.setProperty("--audio-internal-link-hover", theme.data.audioInternalLinkHover || "click");
    root.style.setProperty("--audio-primary-button", theme.data.audioPrimaryButton || "click");
    root.style.setProperty("--audio-secondary-button", theme.data.audioSecondaryButton || "click");
    root.style.setProperty("--audio-internal-link", theme.data.audioInternalLink || "click");
    root.style.setProperty("--audio-external-link", theme.data.audioExternalLink || "click");
    root.style.setProperty("--audio-page-transition-start", theme.data.audioPageTransitionStart || "click");
    root.style.setProperty("--audio-page-transition-end", theme.data.audioPageTransitionEnd || "click");
    root.style.setProperty("--audio-modal-open", theme.data.audioModalOpen || "click");
    root.style.setProperty("--audio-modal-close", theme.data.audioModalClose || "click");

    // Navigation properties
    root.style.setProperty("--nav-position", theme.data.navPosition || "topCenter");
    root.style.setProperty("--nav-style", theme.data.navStyle || "solid");
    root.style.setProperty("--nav-theme", theme.data.navTheme || "applause");
    root.style.setProperty("--nav-floating", theme.data.navFloating || "false");
    root.style.setProperty("--nav-fixed", theme.data.navFixed || "false");
    root.style.setProperty("--nav-border", theme.data.navBorder || "none");
    root.style.setProperty("--nav-shadow", theme.data.navShadow || "none");
    root.style.setProperty("--nav-shadow-color", theme.data.navShadowColor || "#000000");
    root.style.setProperty("--nav-shadow-size", theme.data.navShadowSize || "0px");
    root.style.setProperty("--nav-label-display", theme.data.navLabelDisplay || "icons");
    // Hero properties
    root.style.setProperty("--hero-height", theme.data.heroHeight || heroHeightThemes.full);
    root.style.setProperty("--hero-background", theme.data.heroBackground || heroBackgroundThemes.gradient);
    root.style.setProperty("--hero-css-gradient", theme.data.heroCssGradient || heroCssGradientThemes.linearVertical);
    root.style.setProperty("--hero-css-gradient-angle", theme.data.heroCssGradientAngle || '90');
    root.style.setProperty("--hero-css-gradient-radial-position", theme.data.heroCssGradientRadialPosition || heroCssGradientRadialPositionThemes.center);
    root.style.setProperty("--hero-grad-mid-point", theme.data.heroGradMidPoint || 0.5);
    root.style.setProperty("--hero-text-image", theme.data.heroTextImage || heroTextImageThemes.inline);
    root.style.setProperty("--hero-text-position", theme.data.heroTextPosition || heroTextPositionThemes[4]);
    root.style.setProperty("--hero-subtext-position", theme.data.heroSubTextPosition || heroTextPositionThemes[4]);
    root.style.setProperty("--hero-text-align", theme.data.heroTextAlign || textAlignThemes.center);
    root.style.setProperty("--hero-subtext-align", theme.data.heroSubTextAlign || textAlignThemes.center);
    root.style.setProperty("--text-animation", theme.data.textAnimation || textAnimationThemes.navigators);
    root.style.setProperty("--text-animation-sec", theme.data.textAnimation || textAnimationThemes.navigators);

    // Grid properties
    root.style.setProperty("--card-layout", theme.data.cardLayout || "default");
    root.style.setProperty("--card-aspect-ratio", theme.data.cardAspectRatio || "auto");
    root.style.setProperty("--card-hover", theme.data.cardHover || "none");
    root.style.setProperty("--grid-primary", theme.data.gridPrimary || "gridPrimary");
    root.style.setProperty("--grid-secondary", theme.data.gridSecondary || "gridSecondary");
    root.style.setProperty("--grid-columns-sm", theme.data.gridColumnsSm || 2);
    root.style.setProperty("--grid-columns-md", theme.data.gridColumnsMd || 3);
    root.style.setProperty("--grid-columns-lg", theme.data.gridColumnsLg || 4);
    root.style.setProperty("--grid-columns-xl", theme.data.gridColumnsXl || 6);
    root.style.setProperty("--grid-gap", theme.data.gridGap || "md");

    // Image properties
    root.style.setProperty("--image-parallax", theme.data.imageParallax || false);
    root.style.setProperty("--image-mix-blend-mode", theme.data.imageMixBlendMode || "normal");
    root.style.setProperty("--image-texture", theme.data.imageTexture || "none");
    root.style.setProperty("--image-texture-contrast", theme.data.imageTextureContrast || "100%");
    root.style.setProperty("--image-texture-brightness", theme.data.imageTextureBrightness || "100%");

    // Shader type property
    root.style.setProperty("--shader-type", theme.data.shaderType || "watercolor");
    root.style.setProperty("--shader-mesh", theme.data.shaderMesh || false);
    // Halftone effect properties
    root.style.setProperty("--halftone-size", theme.data.halftoneSize || 8.0);
    root.style.setProperty("--halftone-shape", theme.data.halftoneShape || "circle");
    root.style.setProperty("--halftone-invert", theme.data.halftoneInvert ? "true" : "false");
    root.style.setProperty("--dot-scale", theme.data.dotScale || 0.6);
  } else {
    console.warn("Theme is not defined. Exiting setStyleProperties.");
  }
};

/**
 * Utility function to get Tailwind justify classes based on text alignment
 * @param {string} align - Text alignment value ('left', 'center', 'right', 'split')
 * @returns {string} Corresponding Tailwind justify class
 */
export const getJustifyClass = (align) => {
  switch (align) {
    case "left":
      return "justify-start";
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    case "split":
      return "justify-between";
    default:
      return "justify-start";
  }
};

/**
 * Utility function to get Tailwind text alignment classes
 * @param {string} align - Text alignment value ('left', 'center', 'right')
 * @returns {string} Corresponding Tailwind text alignment class
 */
export const getTextAlignClass = (align) => {
  switch (align) {
    case "left":
      return "text-left";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

/**
 * Utility function to get Tailwind items alignment classes
 * @param {string} align - Items alignment value ('start', 'center', 'end', 'stretch')
 * @returns {string} Corresponding Tailwind items alignment class
 */
export const getItemsAlignClass = (align) => {
  switch (align) {
    case "start":
      return "items-start";
    case "center":
      return "items-center";
    case "end":
      return "items-end";
    case "stretch":
      return "items-stretch";
    default:
      return "items-start";
  }
};

/**
 * Utility function to get Tailwind grid position classes from position string
 * @param {string} position - Position string in format "row-col" (e.g., "1-2")
 * @param {Object} options - Additional options for responsive classes
 * @returns {string} Corresponding Tailwind grid position classes
 */
export const getGridPositionClass = (position, options = {}) => {
  // position is a string like '1-2'
  if (!position || typeof position !== "string" || !position.includes("-")) {
    return "";
  }
  
  const [row, col] = position.split("-").map(Number);
  if (isNaN(row) || isNaN(col)) return "";
  
  // Use predefined classes to ensure they're included in Tailwind build (up to 12)
  const rowClasses = {
    1: "row-start-1",
    2: "row-start-2", 
    3: "row-start-3",
    4: "row-start-4",
    5: "row-start-5",
    6: "row-start-6",
    7: "row-start-7",
    8: "row-start-8",
    9: "row-start-9",
    10: "row-start-10",
    11: "row-start-11",
    12: "row-start-12",
  };
  
  const colClasses = {
    1: "col-start-1",
    2: "col-start-2",
    3: "col-start-3", 
    4: "col-start-4",
    5: "col-start-5",
    6: "col-start-6",
    7: "col-start-7",
    8: "col-start-8",
    9: "col-start-9",
    10: "col-start-10",
    11: "col-start-11",
    12: "col-start-12",
  };
  // Support both 0-based ("0-0") and 1-based ("1-2") inputs
  const maxRows = Number.isFinite(options.maxRows) ? options.maxRows : 12;
  const maxCols = Number.isFinite(options.maxCols) ? options.maxCols : 12;
  const clampRow = (val) => Math.max(1, Math.min(maxRows, val));
  const clampCol = (val) => Math.max(1, Math.min(maxCols, val));
  const rowLine = clampRow(row >= 1 ? row : row + 1);
  const colLine = clampCol(col >= 1 ? col : col + 1);

  const rowClass = rowClasses[rowLine] || ``;
  const colClass = colClasses[colLine] || ``;

  // By default, avoid adding any col-span classes that can conflict with grid-cols count
  const responsiveClasses = options.responsive ?? ``;
  // Keep a sensible default alignment
  const alignment = options.alignment ?? "self-end";

  return `${rowClass} ${colClass} ${responsiveClasses} ${alignment}`.trim();
}; 