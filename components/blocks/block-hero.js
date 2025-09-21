import React, { useState, useEffect } from "react";
import { motion } from "../../utils/motion";
import BackgroundCssGrad from "../background/bg-grad-css";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";
import { ScaleContainer } from "../motion/scale-container";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import { getGridPositionClass } from "../../utils/styleUtils";
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
      case 'halftone-dots':
      case 'halftone_dots':
      case 'halftone-led':
      case 'halftone_led':
      case 'halftone-lego':
      case 'halftone_lego':
      case 'halftone-rect':
      case 'halftone_rect':
        effect.pixelSize = theme?.data?.halftoneSize || 6.0;
        break;
      case 'halftone-ascii':
      case 'halftone_ascii':
        effect.pixelSize = theme?.data?.asciiSize || 12.0;
        break;
      case 'dither-color-quant':
      case 'dither_color_quant':
        effect.levels = theme?.data?.ditherLevels || 4;
        break;
      case 'pixelation':
        effect.pixelSize = theme?.data?.pixelationSize || 8.0;
        break;
      case 'noise':
        effect.intensity = theme?.data?.noiseIntensity || 0.1;
        break;
      case 'dither-blue-noise':
      case 'dither_blue_noise':
        effect.intensity = theme?.data?.noiseIntensity || 1.0;
        break;
      case 'dither-ordered':
      case 'dither_ordered':
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
            effects={shaderEffect && shaderEffect !== 'none' ? [createEffect(shaderEffect)] : []}
          />
        </React.Suspense>
      );
    case "canvasImage":
      return (
        <React.Suspense fallback={<BackgroundCssGrad />}>
          <UnifiedCanvas 
            type="image" 
            src={image?.url}
            effects={shaderEffect && shaderEffect !== 'none' ? [createEffect(shaderEffect)] : []}
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
      <main id="main-content" role="main" aria-label="Hero section">

        {renderHeroBackground(currentTheme.data.heroBackground, image, currentTheme.data.heroShaderEffect, currentTheme)}

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
{/* <ScaleContainer> */}

      <div
        className={`${getHeightClass(currentTheme.data.heroHeight)} relative grid grid-highlight grid-cols-12 grid-rows-12 justify-end left-0 top-0 z-50 w-full gap-0 px-8 mt-16 pointer-events-none fluid-type`}
      >

        <div className={`justify-${currentTheme.data.heroTextAlign} ${getGridPositionClass(currentTheme.data.heroTextPosition, {
          colSpanDefault: currentTheme.data.heroTextColSpanDefault,
          colSpanLg: currentTheme.data.heroTextColSpanLg
        })} `}>
    
                  {tag && (
                    <div
                      className="inline-flex px-2 py-1 mb-8 ml-2 text-xs font-medium uppercase rounded-full pointer-events-auto"
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

              <div className={`${getGridPositionClass(currentTheme.data.heroSubTextPosition, {
                colSpanDefault: currentTheme.data.heroSubTextColSpanDefault,
                colSpanLg: currentTheme.data.heroSubTextColSpanLg
              })}`}>
              {/* <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">{data.title}</p>
          </figcaption> */}

                <p
                  id="hero-content"
                  className=" text-sm font-normal pointer-events-auto text-balance text-[var(--subtext-color)]"
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
      {/* </ScaleContainer> */}
      </main>
    </ClipContainer>
  );
}
