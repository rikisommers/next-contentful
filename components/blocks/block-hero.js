import React, { useState, useEffect } from "react";
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

const renderHeroBackground = (heroBackground, image, shaderEffect, theme) => {
  // Helper function to create effect object with theme-based sizing
  const createEffect = (effectType) => {
    const effect = { type: effectType };

    // Add size parameters based on effect type and theme values
    switch (effectType) {
      case "halftone-dots":
      case "halftone_dots":
      case "halftone-led":
      case "halftone_led":
      case "halftone-lego":
      case "halftone_lego":
      case "halftone-rect":
      case "halftone_rect":
        effect.pixelSize = theme?.data?.halftoneSize || 6.0;
        break;
      case "halftone-ascii":
      case "halftone_ascii":
        effect.pixelSize = theme?.data?.asciiSize || 12.0;
        break;
      case "dither-color-quant":
      case "dither_color_quant":
        effect.levels = theme?.data?.ditherLevels || 4;
        break;
      case "pixelation":
        effect.pixelSize = theme?.data?.pixelationSize || 8.0;
        break;
      case "noise":
        effect.intensity = theme?.data?.noiseIntensity || 0.1;
        break;
      case "dither-blue-noise":
      case "dither_blue_noise":
        effect.intensity = theme?.data?.noiseIntensity || 1.0;
        break;
      case "dither-ordered":
      case "dither_ordered":
        effect.intensity = theme?.data?.noiseIntensity || 1.0;
        effect.ditherSize = theme?.data?.ditherSize || 4;
        break;
    }

    return effect;
  };

  switch (heroBackground) {
    case "none":
      return null;
    case "canvasPlaneShader":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="water"
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
          />
        </React.Suspense>
      );
    case "canvasSphereShader":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="sphere"
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
          />
        </React.Suspense>
      );
    case "canvasPerlinBlob":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="perlinBlob"
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
          />
        </React.Suspense>
      );
    case "canvasExp":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="shader"
            shaderType="experience"
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
          />
        </React.Suspense>
      );
    case "canvasGradient":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="gradient"
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
          />
        </React.Suspense>
      );
    case "canvasImage":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas
            type="image"
            src={image?.url}
            effects={
              shaderEffect && shaderEffect !== "none"
                ? [createEffect(shaderEffect)]
                : []
            }
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
        currentTheme.data.heroShaderEffect,
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
