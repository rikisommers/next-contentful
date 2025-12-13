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
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[var(--background-color)]">
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

export default function BlockHero({ title, content, tag, image }) {
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

      {/* <div className="flex absolute right-4 top-20 flex-col gap-4">
          <div className="max-w-[200px] bg-[var(--background-color)] rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">Hello this is anbasiz shader examples from <a className="text-[var(--text-accent)]" href="https://threejs-journey.com/" target="_blank" rel="noopener noreferrer">threejs journey</a> tou should check it out. <a className="text-[var(--text-accent)]" href="https://threejs-journey.com/lessons/1" target="_blank" rel="noopener noreferrer">Tweak params here</a> Mmmkaayy</p>
          <button className="text-[var(--text-color)] text-xs">Cool man</button>
          </div>
          <div className="max-w-[200px] bg-[var(--background-color)] rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">This is a tex animntion variant insired by <a className="text-[var(--text-accent)]" href="https://www.youtube.com/watch?v=0fKg7e37JgU" target="_blank" rel="noopener noreferrer">this video</a> Mmmkaayy </p>
          <button className="text-[var(--text-color)] text-xs">Cool man</button>
          </div>
          <div className="max-w-[200px] bg-[var(--background-color)] rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">This site is a ongoing collection of components. Mess with the theme and save you own. Content and themes are saved in local storage and CMS. Get you own <a className="text-[var(--text-accent)]" href="https://www.youtube.com/watch?v=0fKg7e37JgU" target="_blank" rel="noopener noreferrer">this video</a> Mmmkaayy </p>
          <button className="text-[var(--text-color)] text-xs">Cool man</button>
          </div>
        </div> */}
      <ScaleContainer>
        {/* Debug panel for responsive values */}
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 text-xs font-mono z-[9999] rounded max-w-lg">
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
          {/* Test responsive classes - this should show different colors at different breakpoints */}
          <div className="mt-1 w-4 h-4 bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-purple-500"></div>
        </div>

        {/* Hidden div to force Tailwind to include responsive grid classes */}
        {/* <div className="hidden">
          <div className="row-start-1 row-start-2 row-start-3 row-start-4 row-start-5 row-start-6 row-start-7 row-start-8 row-start-9 row-start-10 row-start-11 row-start-12"></div>
          <div className="col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7 col-start-8 col-start-9 col-start-10 col-start-11 col-start-12"></div>
          <div className="col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12"></div>
          <div className="md:row-start-1 md:row-start-2 md:row-start-3 md:row-start-4 md:row-start-5 md:row-start-6 md:row-start-7 md:row-start-8 md:row-start-9 md:row-start-10 md:row-start-11 md:row-start-12"></div>
          <div className="md:col-start-1 md:col-start-2 md:col-start-3 md:col-start-4 md:col-start-5 md:col-start-6 md:col-start-7 md:col-start-8 md:col-start-9 md:col-start-10 md:col-start-11 md:col-start-12"></div>
          <div className="md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12"></div>
          <div className="lg:row-start-1 lg:row-start-2 lg:row-start-3 lg:row-start-4 lg:row-start-5 lg:row-start-6 lg:row-start-7 lg:row-start-8 lg:row-start-9 lg:row-start-10 lg:row-start-11 lg:row-start-12"></div>
          <div className="lg:col-start-1 lg:col-start-2 lg:col-start-3 lg:col-start-4 lg:col-start-5 lg:col-start-6 lg:col-start-7 lg:col-start-8 lg:col-start-9 lg:col-start-10 lg:col-start-11 lg:col-start-12"></div>
          <div className="lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12"></div>
          <div className="xl:row-start-1 xl:row-start-2 xl:row-start-3 xl:row-start-4 xl:row-start-5 xl:row-start-6 xl:row-start-7 xl:row-start-8 xl:row-start-9 xl:row-start-10 xl:row-start-11 xl:row-start-12"></div>
          <div className="xl:col-start-1 xl:col-start-2 xl:col-start-3 xl:col-start-4 xl:col-start-5 xl:col-start-6 xl:col-start-7 xl:col-start-8 xl:col-start-9 xl:col-start-10 xl:col-start-11 xl:col-start-12"></div>
          <div className="xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6 xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12"></div>
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
            {title && (
              <h1
                className={`text-4xl !text-[var(--text-color-inv)] leading-normal pointer-events-auto text-balance`}
                tabIndex="0"
                aria-describedby={content ? "hero-content" : undefined}
              >
                <AnimatedText
                  align={currentTheme.data.heroTextAlign}
                  content={title}
                  type={currentTheme.data.textAnimation}
                  delay={AnimTextOrder.ONE}
                />
              </h1>
            )}
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
          </div>
        </div>
      </ScaleContainer>
    </ClipContainer>
  );
}
