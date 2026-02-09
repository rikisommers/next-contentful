"use client";

import { heroBackgroundThemes, heroCssGradientThemes, heroCssGradientRadialPositionThemes, heroTextImageThemes, heroTextPositionThemes, textAlignThemes, textAnimationThemes } from './theme';

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
    root.style.setProperty("--hero-height", theme.data.heroHeight || 80);
    root.style.setProperty("--hero-background", theme.data.heroBackground || heroBackgroundThemes.gradient);
    root.style.setProperty("--hero-css-gradient", theme.data.heroCssGradient || heroCssGradientThemes.linearVertical);
    root.style.setProperty("--hero-css-gradient-angle", theme.data.heroCssGradientAngle || '90');
    // Convert joystick x,y values to CSS percentage format
    const radialPosition = theme.data.heroCssGradientRadialPosition;
    let cssRadialPosition;
    if (radialPosition && typeof radialPosition === 'object' && radialPosition.x !== undefined && radialPosition.y !== undefined) {
      cssRadialPosition = `${radialPosition.x}% ${radialPosition.y}%`;
    } else {
      // Fallback to center for legacy values or missing data
      cssRadialPosition = '50% 50%';
    }
    root.style.setProperty("--hero-css-gradient-radial-position", cssRadialPosition);
    root.style.setProperty("--hero-grad-mid-point", theme.data.heroGradMidPoint || 0.5);
    root.style.setProperty("--hero-text-image", theme.data.heroTextImage || heroTextImageThemes.inline);
    // Hero Text Position - Responsive (parse row-col format)
    const parseHeroTextPosition = (position, defaultPos = heroTextPositionThemes[4]) => {
      const pos = position || defaultPos;
      if (!pos || !pos.includes('-')) return { row: 5, col: 5 };
      const [row, col] = pos.split('-').map(Number);
      return { row: (row || 0) + 1, col: (col || 0) + 1 }; // Convert to 1-based for CSS grid
    };

    const heroTextPosSm = parseHeroTextPosition(theme.data.heroTextPositionSm);
    const heroTextPosMd = parseHeroTextPosition(theme.data.heroTextPositionMd);
    const heroTextPosLg = parseHeroTextPosition(theme.data.heroTextPositionLg);
    const heroTextPosXl = parseHeroTextPosition(theme.data.heroTextPositionXl);

    // Grid column/row start positions
    root.style.setProperty("--hero-text-col-start-sm", heroTextPosSm.col);
    root.style.setProperty("--hero-text-col-start-md", heroTextPosMd.col);
    root.style.setProperty("--hero-text-col-start-lg", heroTextPosLg.col);
    root.style.setProperty("--hero-text-col-start-xl", heroTextPosXl.col);

    root.style.setProperty("--hero-text-row-start-sm", heroTextPosSm.row);
    root.style.setProperty("--hero-text-row-start-md", heroTextPosMd.row);
    root.style.setProperty("--hero-text-row-start-lg", heroTextPosLg.row);
    root.style.setProperty("--hero-text-row-start-xl", heroTextPosXl.row);

    // Hero Subtext Position - Responsive (parse row-col format)
    const heroSubTextPosSm = parseHeroTextPosition(theme.data.heroSubTextPositionSm);
    const heroSubTextPosMd = parseHeroTextPosition(theme.data.heroSubTextPositionMd);
    const heroSubTextPosLg = parseHeroTextPosition(theme.data.heroSubTextPositionLg);
    const heroSubTextPosXl = parseHeroTextPosition(theme.data.heroSubTextPositionXl);

    // Subtext grid column/row start positions
    root.style.setProperty("--hero-subtext-col-start-sm", heroSubTextPosSm.col);
    root.style.setProperty("--hero-subtext-col-start-md", heroSubTextPosMd.col);
    root.style.setProperty("--hero-subtext-col-start-lg", heroSubTextPosLg.col);
    root.style.setProperty("--hero-subtext-col-start-xl", heroSubTextPosXl.col);

    root.style.setProperty("--hero-subtext-row-start-sm", heroSubTextPosSm.row);
    root.style.setProperty("--hero-subtext-row-start-md", heroSubTextPosMd.row);
    root.style.setProperty("--hero-subtext-row-start-lg", heroSubTextPosLg.row);
    root.style.setProperty("--hero-subtext-row-start-xl", heroSubTextPosXl.row);
    // Hero Text Column Span - Responsive
    root.style.setProperty("--hero-text-col-span-sm", theme.data.heroTextColSpanSm || 4);
    root.style.setProperty("--hero-text-col-span-md", theme.data.heroTextColSpanMd || 4);
    root.style.setProperty("--hero-text-col-span-lg", theme.data.heroTextColSpanLg || 3);
    root.style.setProperty("--hero-text-col-span-xl", theme.data.heroTextColSpanXl || 3);

    // Hero Text Row Span - Responsive
    root.style.setProperty("--hero-text-row-span-sm", theme.data.heroTextRowSpanSm || 1);
    root.style.setProperty("--hero-text-row-span-md", theme.data.heroTextRowSpanMd || 1);
    root.style.setProperty("--hero-text-row-span-lg", theme.data.heroTextRowSpanLg || 1);
    root.style.setProperty("--hero-text-row-span-xl", theme.data.heroTextRowSpanXl || 1);

    // Hero Subtext Column Span - Responsive
    root.style.setProperty("--hero-subtext-col-span-sm", theme.data.heroSubTextColSpanSm || 4);
    root.style.setProperty("--hero-subtext-col-span-md", theme.data.heroSubTextColSpanMd || 4);
    root.style.setProperty("--hero-subtext-col-span-lg", theme.data.heroSubTextColSpanLg || 1);
    root.style.setProperty("--hero-subtext-col-span-xl", theme.data.heroSubTextColSpanXl || 1);

    // Hero Subtext Row Span - Responsive
    root.style.setProperty("--hero-subtext-row-span-sm", theme.data.heroSubTextRowSpanSm || 1);
    root.style.setProperty("--hero-subtext-row-span-md", theme.data.heroSubTextRowSpanMd || 1);
    root.style.setProperty("--hero-subtext-row-span-lg", theme.data.heroSubTextRowSpanLg || 1);
    root.style.setProperty("--hero-subtext-row-span-xl", theme.data.heroSubTextRowSpanXl || 1);

    // Hero Background Position - Responsive (parse row-col format)
    const heroBgPosSm = parseHeroTextPosition(theme.data.heroBgPositionSm, heroTextPositionThemes[0]);
    const heroBgPosMd = parseHeroTextPosition(theme.data.heroBgPositionMd, heroTextPositionThemes[0]);
    const heroBgPosLg = parseHeroTextPosition(theme.data.heroBgPositionLg, heroTextPositionThemes[0]);
    const heroBgPosXl = parseHeroTextPosition(theme.data.heroBgPositionXl, heroTextPositionThemes[0]);

    // Background grid column/row start positions
    root.style.setProperty("--hero-bg-col-start-sm", heroBgPosSm.col);
    root.style.setProperty("--hero-bg-col-start-md", heroBgPosMd.col);
    root.style.setProperty("--hero-bg-col-start-lg", heroBgPosLg.col);
    root.style.setProperty("--hero-bg-col-start-xl", heroBgPosXl.col);

    root.style.setProperty("--hero-bg-row-start-sm", heroBgPosSm.row);
    root.style.setProperty("--hero-bg-row-start-md", heroBgPosMd.row);
    root.style.setProperty("--hero-bg-row-start-lg", heroBgPosLg.row);
    root.style.setProperty("--hero-bg-row-start-xl", heroBgPosXl.row);

    // Hero Background Column Span - Responsive
    root.style.setProperty("--hero-bg-col-span-sm", theme.data.heroBgColSpanSm || 12);
    root.style.setProperty("--hero-bg-col-span-md", theme.data.heroBgColSpanMd || 12);
    root.style.setProperty("--hero-bg-col-span-lg", theme.data.heroBgColSpanLg || 12);
    root.style.setProperty("--hero-bg-col-span-xl", theme.data.heroBgColSpanXl || 12);

    // Hero Background Row Span - Responsive
    root.style.setProperty("--hero-bg-row-span-sm", theme.data.heroBgRowSpanSm || 5);
    root.style.setProperty("--hero-bg-row-span-md", theme.data.heroBgRowSpanMd || 5);
    root.style.setProperty("--hero-bg-row-span-lg", theme.data.heroBgRowSpanLg || 5);
    root.style.setProperty("--hero-bg-row-span-xl", theme.data.heroBgRowSpanXl || 5);
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
  
  // Use predefined classes with !important to override conflicting styles
  const rowClasses = {
    0: "!row-start-1",
    1: "!row-start-2",
    2: "!row-start-3", 
    3: "!row-start-4",
    4: "!row-start-5",
    5: "!row-start-6",
    6: "!row-start-7",
    7: "!row-start-8",
    8: "!row-start-9",
    9: "!row-start-10",
    10: "!row-start-11",
    11: "!row-start-12",
  };
  
  const colClasses = {
    0: "!col-start-1",
    1: "!col-start-2",
    2: "!col-start-3", 
    3: "!col-start-4",
    4: "!col-start-5",
    5: "!col-start-6",
    6: "!col-start-7",
    7: "!col-start-8",
    8: "!col-start-9",
    9: "!col-start-10",
    10: "!col-start-11",
    11: "!col-start-12",
  };

  // Column span classes
  const colSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };

  // Use consistent predefined classes - they should all exist in our mapping
  const rowClass = rowClasses[row] || '';
  const colClass = colClasses[col] || '';
  
  // If classes don't exist in mapping, log an error
  if (row >= 0 && row <= 11 && !rowClasses[row]) {
    console.error(`Missing row class for row ${row}`);
  }
  if (col >= 0 && col <= 11 && !colClasses[col]) {
    console.error(`Missing col class for col ${col}`);
  }

  // Add responsive column spans if provided
  let colSpanClass = "";
  if (options.colSpanDefault && colSpanClasses[options.colSpanDefault]) {
    colSpanClass += colSpanClasses[options.colSpanDefault];
  }
  if (options.colSpanLg && colSpanClasses[options.colSpanLg]) {
    if (colSpanClass) colSpanClass += " ";
    colSpanClass += `lg:col-span-${options.colSpanLg}`;
  }


  // By default, avoid adding any col-span classes that can conflict with grid-cols count
  const responsiveClasses = options.responsive ?? ``;
  // Keep a sensible default alignment
  const alignment = options.alignment ?? "self-end";

  const finalResult = `${rowClass} ${colClass} ${colSpanClass} ${responsiveClasses} ${alignment}`.trim();
  
  return finalResult;
};

/**
 * Enhanced responsive grid position class generator
 * Follows Tailwind's mobile-first approach: base classes for smallest screen, then responsive overrides
 * @param {Object} positions - Responsive position values { sm, md, lg, xl }
 * @param {Object} colSpans - Responsive column span values { sm, md, lg, xl }
 * @returns {string} Complete responsive grid classes
 */
export const getResponsiveGridPositionClass = (positions = {}, colSpans = {}) => {
  const rowClasses = {
    0: "row-start-1", 1: "row-start-2", 2: "row-start-3", 3: "row-start-4",
    4: "row-start-5", 5: "row-start-6", 6: "row-start-7", 7: "row-start-8",
    8: "row-start-9", 9: "row-start-10", 10: "row-start-11", 11: "row-start-12",
  };

  const colClasses = {
    0: "col-start-1", 1: "col-start-2", 2: "col-start-3", 3: "col-start-4",
    4: "col-start-5", 5: "col-start-6", 6: "col-start-7", 7: "col-start-8",
    8: "col-start-9", 9: "col-start-10", 10: "col-start-11", 11: "col-start-12",
  };

  const colSpanClasses = {
    1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4",
    5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8",
    9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12",
  };

  const parsePosition = (position) => {
    if (!position || typeof position !== "string" || !position.includes("-")) {
      return { row: 0, col: 0 };
    }
    const [row, col] = position.split("-").map(Number);
    return { row: row || 0, col: col || 0 };
  };

  const generateBreakpointClasses = (breakpoint, position, colSpan) => {
    if (!position && !colSpan) return [];

    const { row, col } = parsePosition(position);
    // Mobile-first: sm has no prefix (base classes), larger breakpoints get prefixes
    const prefix = breakpoint === 'sm' ? '' : `${breakpoint}:`;

    let classes = [];
    if (position && rowClasses[row]) classes.push(`${prefix}${rowClasses[row]}`);
    if (position && colClasses[col]) classes.push(`${prefix}${colClasses[col]}`);
    if (colSpan && colSpanClasses[colSpan]) classes.push(`${prefix}${colSpanClasses[colSpan]}`);

    return classes;
  };

  let allClasses = [];

  // Generate classes in mobile-first order: sm (base), then md, lg, xl (overrides)
  const breakpoints = ['sm', 'md', 'lg', 'xl'];
  breakpoints.forEach(bp => {
    const bpClasses = generateBreakpointClasses(bp, positions[bp], colSpans[bp]);
    allClasses.push(...bpClasses);
  });

  return allClasses.join(' ');
};

/**
 * Generate a unique CSS class name for responsive grid positioning
 * @param {string} elementType - Type of element ('text', 'subtext', 'bg')
 * @returns {string} CSS class name for responsive grid positioning
 */
export const getResponsiveGridCSSVars = (elementType) => {
  return `hero-${elementType}-responsive-grid`;
};

/**
 * Generate CSS styles for responsive grid positioning using CSS variables
 * @param {string} elementType - Type of element ('text', 'subtext', 'bg')
 * @returns {string} CSS styles for responsive grid positioning
 */
export const generateResponsiveGridCSS = (elementType) => {
  return `
    .hero-${elementType}-responsive-grid {
      grid-column-start: var(--hero-${elementType}-col-start-sm);
      grid-row-start: var(--hero-${elementType}-row-start-sm);
      grid-column-end: span var(--hero-${elementType}-col-span-sm);
      grid-row-end: span var(--hero-${elementType}-row-span-sm);
    }

    @media (min-width: 768px) {
      .hero-${elementType}-responsive-grid {
        grid-column-start: var(--hero-${elementType}-col-start-md);
        grid-row-start: var(--hero-${elementType}-row-start-md);
        grid-column-end: span var(--hero-${elementType}-col-span-md);
        grid-row-end: span var(--hero-${elementType}-row-span-md);
      }
    }

    @media (min-width: 1024px) {
      .hero-${elementType}-responsive-grid {
        grid-column-start: var(--hero-${elementType}-col-start-lg);
        grid-row-start: var(--hero-${elementType}-row-start-lg);
        grid-column-end: span var(--hero-${elementType}-col-span-lg);
        grid-row-end: span var(--hero-${elementType}-row-span-lg);
      }
    }

    @media (min-width: 1280px) {
      .hero-${elementType}-responsive-grid {
        grid-column-start: var(--hero-${elementType}-col-start-xl);
        grid-row-start: var(--hero-${elementType}-row-start-xl);
        grid-column-end: span var(--hero-${elementType}-col-span-xl);
        grid-row-end: span var(--hero-${elementType}-row-span-xl);
      }
    }
  `;
}; 