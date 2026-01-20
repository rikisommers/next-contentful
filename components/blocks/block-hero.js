import React, { useState, useEffect } from "react";
import { heroShaderEffectThemes } from "../../utils/theme";
import { motion } from "../../utils/motion";
import BackgroundCssGrad from "../background/bg-grad-css";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";
import { ScaleContainer } from "../motion/scale-container";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import {
  getGridPositionClass,
  getResponsiveGridPositionClass,
  getTextAlignClass,
} from "../../utils/styleUtils";
import Message, { MessageType } from "../base/message/message";
// Lazy imports for heavy components - only load when needed
const UnifiedCanvas = React.lazy(() => import("../background/unified-canvas"));

const getHeightClass = (heightVh) => {
  return `h-[${heightVh}vh]`;
};

/**
 * Renders the appropriate background component based on the heroBackground
 * @param {string} heroBackground - The style of the hero background
 * @param {Object} image - The image object for image background
 * @returns {JSX.Element|null} - The rendered background component or null
 */

// export const heroBackgroundThemes = {
//   none: 'none',
//   video: 'video',
//   canvas: 'canvas',
//   image: 'image',
//   gradient: 'gradient',
//   cssgradient: 'cssgradient',
//   animatedGradient: 'animated-gradient',
// };

const renderHeroBackground = (heroBackground, image, theme) => {
  // Helper function to create effect object with all theme-based parameters
  const createEffect = (effectVariant, effectType, themeData) => {
    if (!effectVariant || effectVariant === 'none') return null;
    
    const legacyMap = {
      blueNoise: 'dither-blue-noise',
      noiseDither: 'noise',
      orderedDither: 'dither-ordered',
      colorQuant: 'dither-color-quant',
      colorQuant2: 'dither-color-quant',
      rect: 'halftone-rect',
      dots: 'halftone-dots',
      ascii: 'halftone-ascii',
      ascii2: 'halftone-ascii',
      luma: 'halftone-rect',
      led: 'halftone-led',
      lego: 'halftone-lego',
      progress: 'halftone-rect',
    };

    const mappedFromKey = heroShaderEffectThemes[effectVariant];
    const normalizedVariant = legacyMap[effectVariant] || mappedFromKey || effectVariant;
    const isCustomCategory = effectType === 'custom';
    const effect = { type: normalizedVariant };

    // Map effect-specific parameters based on effect type
    // ASCII effects
    if (normalizedVariant.startsWith('ascii')) {
      effect.pixelSize = isCustomCategory
        ? themeData?.asciiSize || 12
        : themeData?.asciiPixelSize || 12;
      effect.showBackground = isCustomCategory
        ? false
        : themeData?.asciiShowBackground || false;
      effect.contrast = isCustomCategory
        ? 100
        : themeData?.asciiContrast || 100;
      
      // Map to specific ASCII character sets (these will be handled in EffectRouter)
      switch (normalizedVariant) {
        case 'ascii-standard':
        case 'ascii_standard':
          effect.asciiChars = ' .:-=+*#%@'; // Standard ASCII ramp
          break;
        case 'ascii-dense':
        case 'ascii_dense':
          effect.asciiChars = ' ░▒▓█'; // Dense blocks
          break;
        case 'ascii-minimal':
        case 'ascii_minimal':
          effect.asciiChars = ' .-:=+#%'; // Minimal set
          break;
        case 'ascii-blocks':
        case 'ascii_blocks':
          effect.asciiChars = ' ▁▂▃▄▅▆▇█'; // Block progression
          break;
        case 'ascii-braille':
        case 'ascii_braille':
          effect.asciiChars = ' ⠁⠃⠇⠏⠟⠿⣿'; // Braille patterns
          break;
        case 'ascii-technical':
        case 'ascii_technical':
          effect.asciiChars = ' ·:∴∷≡≣▓'; // Technical symbols
          break;
        case 'ascii-matrix':
        case 'ascii_matrix':
          effect.asciiChars = ' ｡ﾟ+*ﾟ｡+｡ﾟ'; // Matrix-style
          break;
        case 'ascii-hatching':
        case 'ascii_hatching':
          effect.asciiChars = ' /\\|#'; // Hatching patterns
          break;
      }
    }
    // Dithering effects
    else if (normalizedVariant.startsWith('dither')) {
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

      if (
        normalizedVariant === 'dither-ordered' ||
        normalizedVariant === 'dither_ordered'
      ) {
        effect.ditherSize = themeData?.ditherSize || 4;
      }
    }
    // Halftone effects
    else if (normalizedVariant.startsWith('halftone')) {
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
    else if (normalizedVariant === 'pixelation') {
      effect.pixelSize = themeData?.pixelationSize || 8.0;
    }
    else if (normalizedVariant === 'noise') {
      effect.intensity = themeData?.noiseIntensity || 0.1;
    }

    return effect;
  };

  // Get effect variant from theme (fallback to legacy heroShaderEffect)
  const effectVariant =
    theme?.data?.effectVariant ?? theme?.data?.heroShaderEffect;
  const effectType = theme?.data?.effectType;
  const effectsList = effectVariant && effectVariant !== 'none' 
    ? [createEffect(effectVariant, effectType, theme?.data)] 
    : [];

  switch (heroBackground) {
    case "none":
      return null;
    case "canvasPlaneShader":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="water"
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "canvasSphereShader":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="sphere"
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "canvasPerlinBlob":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="perlinBlob"
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "canvasExp":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="experience"
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "canvasGradient":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="gradient"
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "canvasImage":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="image"
            src={image?.url}
            effects={effectsList}
          />
        </React.Suspense>
      );
    case "cssgradient":
      return <BackgroundCssGrad />;
    case "image":
      return image ? (
        <div className="absolute top-0 left-0 w-1/2 h-full z-10 bg-[var(--background-color)]">
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        </div>
      ) : null;

    default:
      return <BackgroundCssGrad />;
  }
};

export default function BlockHero({ title, content, tag, image, infoMessage}) {
  const { currentTheme } = useThemeContext();
  const full = false;

  return (
    // TODO make clip path optional
    // grid grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12
    <ClipContainer>
      {renderHeroBackground(
        currentTheme.data.heroBackground,
        image,
        currentTheme
      )}
     
      <ScaleContainer>
        {/* Debug panel for responsive values */}
        {/* <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 text-xs font-mono z-[9999] rounded max-w-lg">
          <div>Text: SM:{currentTheme.data.heroTextPositionSm || 'unset'} MD:{currentTheme.data.heroTextPositionMd || 'unset'} LG:{currentTheme.data.heroTextPositionLg || 'unset'}</div>
          <div>Span: SM:{currentTheme.data.heroTextColSpanSm || 'unset'} MD:{currentTheme.data.heroTextColSpanMd || 'unset'} LG:{currentTheme.data.heroTextColSpanLg || 'unset'}</div>
          <div className="pt-1 mt-1 border-t border-gray-500">
            Classes: {(() => {
              if (typeof window !== 'undefined' && window.debugGridClasses?.text) {
                return window.debugGridClasses.text;
              }
              return 'loading...';
            })()}
          </div>
          <div className="mt-1 w-4 h-4 bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-purple-500"></div>
        </div> */}

     

        <div
          className={`o-edit-outline ${getHeightClass(
            currentTheme.data.heroHeight
          )}  ${
            currentTheme.data.fontScale === "fluid" ? "fluid-type" : ""
          } relative grid grid-highlight grid-cols-12 grid-rows-12 justify-end left-0 top-0 z-50 w-full gap-0 pointer-events-none `}
        >
          <div
            className={`o-edit-outline flex h-fit flex-col items-${
              currentTheme.data.heroTextAlign
            } ${(() => {
              const positions = {
                sm: currentTheme.data.heroTextPositionSm || currentTheme.data.heroTextPosition || '2-1',
                md: currentTheme.data.heroTextPositionMd || currentTheme.data.heroTextPosition || '2-1',
                lg: currentTheme.data.heroTextPositionLg || currentTheme.data.heroTextPosition || '2-1',
                xl: currentTheme.data.heroTextPositionXl || currentTheme.data.heroTextPosition || '2-1',
              };
              const colSpans = {
                sm: currentTheme.data.heroTextColSpanSm || currentTheme.data.heroTextColSpanDefault || 6,
                md: currentTheme.data.heroTextColSpanMd || currentTheme.data.heroTextColSpanDefault || 6,
                lg: currentTheme.data.heroTextColSpanLg || 4,
                xl: currentTheme.data.heroTextColSpanXl || 4,
              };
              const gridClasses = getResponsiveGridPositionClass(positions, colSpans);
              console.log('Hero Text Grid Debug:', { positions, colSpans, gridClasses, themeData: currentTheme.data });

              // Add classes to debug panel
              if (typeof window !== 'undefined') {
                window.debugGridClasses = { text: gridClasses };
              }

              return gridClasses;
            })()} `}
          >
            {tag && (
              <div
                className="block px-2 py-1 mb-8 ml-2 text-xs font-medium uppercase rounded-full pointer-events-auto w-fit"
                style={{
                  color: "var(--text-color-inv)",
                  backgroundColor: "var(--accent-pri)",
                }}
                role="banner"
                aria-label={`Page category: ${tag}`}
              >
                {tag}
              </div>
            )}
         
              <h1
                className={`text-4xl !text-[var(--text-color-inv)] leading-normal pointer-events-auto text-balance`}
                tabIndex="0"
                aria-describedby={content ? "hero-content" : undefined}
              >
                   {/* {title && (
                <AnimatedText
                  align={currentTheme.data.heroTextAlign}
                  content={title}
                  type={currentTheme.data.textAnimation}
                  delay={AnimTextOrder.ONE}
                />
              )} */}
              </h1>
            
          </div>

          <div
            className={`o-edit-outline h-fit ${(() => {
              const positions = {
                sm: currentTheme.data.heroSubTextPositionSm || currentTheme.data.heroSubTextPosition || '4-1',
                md: currentTheme.data.heroSubTextPositionMd || currentTheme.data.heroSubTextPosition || '4-1',
                lg: currentTheme.data.heroSubTextPositionLg || currentTheme.data.heroSubTextPosition || '4-1',
                xl: currentTheme.data.heroSubTextPositionXl || currentTheme.data.heroSubTextPosition || '4-1',
              };
              const colSpans = {
                sm: currentTheme.data.heroSubTextColSpanSm || currentTheme.data.heroSubTextColSpanDefault || 8,
                md: currentTheme.data.heroSubTextColSpanMd || currentTheme.data.heroSubTextColSpanDefault || 8,
                lg: currentTheme.data.heroSubTextColSpanLg || 6,
                xl: currentTheme.data.heroSubTextColSpanXl || 6,
              };
              console.log('Hero Subtext Grid Debug:', { positions, colSpans });
              return getResponsiveGridPositionClass(positions, colSpans);
            })()}`}
          >
            {/* <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">{data.title}</p>
          </figcaption> */}
            <p
              id="hero-content"
              className={`text-${currentTheme.data.heroSubTextAlign} text-sm font-normal pointer-events-auto text-balance text-[var(--subtext-color)]`}
              role="doc-subtitle"
              aria-label="Hero section description"
            >
              {content && (

                <AnimatedText
                  type={currentTheme.data.textAnimationSec}
                  content={content}
                  delay={AnimTextOrder.THREE}
                />
              )}
            </p>
           
            
            {infoMessage && (
            <div class="absolute bottom-0 right-0">
  <Message             
    type={MessageType.DEFAULT}                                                                              
    title={infoMessage.title}     
    content={infoMessage.content}                                                                             
            dismiss={infoMessage.dismiss}
  />             
              </div>
            )}



          </div>
        </div>
      </ScaleContainer>
    </ClipContainer>
  );
}
