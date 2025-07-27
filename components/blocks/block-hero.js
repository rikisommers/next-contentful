import React, { useState, useEffect } from "react";
import { motion } from "../../utils/motion";
import CanvasGradientBackground from "../background/canvasGradientBackground";
import CanvasAnimatedGradient from "../background/canvasAnimatedGradient";
import CanvasImageComponent from "../background/canvasImageComponent";
import BackgroundCssGrad from "../background/bg-grad-css";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";
import { ScaleContainer } from "../motion/scale-container";
import PostIntro from "../post/post-intro";
import Background from "../background/background";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";

import CanvasShader from "../background/canvasShader";

const getPositionClass = (position) => {
  // position is a string like '1-2'
  if (!position || typeof position !== "string" || !position.includes("-")) {
    return "";
  }
  
  const [row, col] = position.split("-").map(Number);
  if (isNaN(row) || isNaN(col)) return "";
  
  // Add 1 to row/col for 1-based grid classes
  return `row-start-${row + 1} col-start-${col + 1} col-span-2`;
};

const getHeightClass = (height) => {
  switch (height) {
    case "full":
      return "h-screen";
    case "half":
      return "min-h-[50vh]";
    case "auto":
      return "min-h-fit";
    default:
      return "h-screen";
  }
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

const renderHeroBackground = (heroBackground, image) => {
  switch (heroBackground) {
    case "none":
      return <h1>NONE</h1>;
    case "canvasSphere":
      return <Background />;
    case "canvasGrad":
      return <CanvasGradientBackground />;
    case "canvasImage" || "canvasMesh":
      return (
        <div className="absolute w-screen h-screen">
            {/* <CanvasImageComponent src={image.url} /> */}
            {/* <NoiseDither/> */}
            {/* <OrderedDither/> */}
            {/* <BlueNoiseDither/> */}
            {/* <ColorQuantDither/> */}
            {/* <ColorQuantDither2/> */}
            {/* <Rect/> */}
            {/* <Dots/> */}
            {/* <Ascii/> */}
            {/* <Ascii2/> */}
            {/* <Luma/> */}
            {/* <Led/> */}
            {/* <Lego/> */}
            {/* <Progress/> */}
            <CanvasShader/>
        </div>
      );
    case "canvasGradient":
      return (
        <CanvasGradientBackground gradientType="conic" conicRotation={1} />
      );
    case "cssgradient":
      return <BackgroundCssGrad />;
    case "image":
      return image ? (
        <BlendImage
          className="absolute w-full h-full img-cover"
          alt={`Cover Image for ${image?.title}`}
          src={image.url}
        />
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

        {renderHeroBackground(currentTheme.data.heroBackground, image)}

        <div className="flex absolute right-4 top-20 flex-col gap-4">
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
        </div>
<ScaleContainer>

      <div
        className={`${getHeightClass(
          currentTheme.data.heroHeight
        )} relative grid grid-cols-3 grid-rows-3 justify-end left-0 top-0 z-50 w-full gap-0  px-16 py-16 pointer-events-none fluid-type`}
      >

        <div className={`${getPositionClass(currentTheme.data.heroTextPosition)}`}>
    
                  {tag && (
                    <div
                      className="inline-flex px-2 py-1 mb-8 ml-2 text-xs font-medium uppercase rounded-full pointer-events-auto"
                      style={{
                        color: "var(--text-color-inv)",
                        backgroundColor: "var(--accent-pri)",
                      }}
                    >
                      {tag}
                    </div>
                  )}
                  {title && (
                    <h1 className="text-4xl leading-normal pointer-events-auto text-balance">
                      <AnimatedText
                        content={title}
                        type={currentTheme.data.textAnimation}
                        delay={AnimTextOrder.ONE}
                      />
                    </h1>
                  )}
              </div>

              <div className={`${getPositionClass(currentTheme.data.heroSubTextPosition)}`}>
         
                <p
                  className="text-sm font-normal pointer-events-auto text-balance"
                  style={{
                    color: "var(--subtext-color)",
                    textAlign: "var(--hero-subtext-align)",
                  }}
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
