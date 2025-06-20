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


const getPositionClass = (position) => {
  switch (position) {
    case "left":
      return "col-start-2 col-span-8 row-span-3 row-start-3";
    case "center":
      return "text-center col-start-3 col-span-8 row-span-1 row-start-4";
    case "topLeft":
      return "col-start-2 col-span-8 row-span-1 row-start-3";
    case "bottomLeft":
      return "col-start-2 col-span-8 row-span-1 row-start-5";
    case "topRight":
      return "col-start-6 col-span-5 row-span-1 row-start-2";
    case "bottomRight":
      return "col-start-6 col-span-6 row-span-1 row-start-4";
    default:
      return ""; // Return an empty string if no match
  }
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
    case "canvasImage":
      return <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-1/2 h-1/2 rounded-xl border-2 border-red-500">
          <CanvasImageComponent src={image.url} /></div>
          </div>;
    case "canvasGradient":
      return <CanvasGradientBackground gradientType="conic" conicRotation={1} />;
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

export default function BlockHero({ title, content, tag, image}) {
  const { currentTheme } = useThemeContext();
  const [position, setPosition] = useState(null); // Default value

  const full = false;

  useEffect(() => {
    // Set the style value when the component mounts
    const position = getPositionClass(currentTheme.data.heroTextPosition);
    setPosition(position); // Set to the desired integer value
  }, []);

  return (
    // TODO make clip path optional
    // grid grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12
    <ClipContainer>
      <div
        className={`${getHeightClass(
          currentTheme.data.heroHeight
        )} relative flex flex-col justify-end left-0 top-0 z-50 w-full gap-8 px-16 py-16`}
      >
        {/* <h1>NO {clip ? "YES" : "NO"}</h1> */}
        {renderHeroBackground(currentTheme.data.heroBackground, image)}

        <ScaleContainer>
          <PostIntro title={title} content={content} tag={tag} />
        </ScaleContainer>
      </div>
    </ClipContainer>
  );
}
