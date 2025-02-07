import React, { useState, useEffect } from "react";
import { motion } from "../../utils/motion";;
import CanvasGradientBackground from "../background/canvasGradientBackground";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";

import PostIntro from "../post/post-intro";

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

const BackgroundElements = () => {
  return (
    <motion.div
      className="absolute flex items-center justify-end w-full h-full opacity-75 pointer-events-none z-1"
      initial={{ clipPath: "inset(1.0rem 1.0rem 1.0rem round 0.5rem)" }}
      animate={{
        backgroundColor: "var(--background-color)",
        clipPath: "inset( 1rem round 1rem )",
      }}
      exit={{ clipPath: "inset( 1.5rem 1.5rem 1.5rem 1.5rem round 1rem )" }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {currentTheme.data.heroBackgroundStyle === "gradient" && (
        <CanvasGradientBackground />
      )}

      {currentTheme.data.heroBackgroundStyle === "video" && <Background />}

      {currentTheme.data.heroBackgroundStyle === "image" && (
        <BlendImage
          className="img-cover"
          alt={`Cover Image for ${image?.title}`}
          src={image.url}
        />
      )}
    </motion.div>
  );
};

const FullPage = () => {
  <ClipContainer>
    {/*grid  grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12 */}
    <div className="relative top-0 left-0 z-50 w-screen h-screen p-3 ">
      <div
        className="absolute top-0 flex items-center justify-end w-full h-full pointer-events-none z-1"
        // initial={{ clipPath: "inset(1.0rem 1.0rem 1.0rem round 0.5rem)" }}
        // animate={{
        //   backgroundColor: "var(--background-color)",
        //   clipPath: "inset( 1rem round 1rem )",
        // }}
        // exit={{ clipPath: "inset( 1.5rem 1.5rem 1.5rem 1.5rem round 1rem )" }}
        // transition={{
        //   duration: 0.6,
        //   ease: [0.33, 1, 0.68, 1],
        // }}
      >
        {currentTheme.data.heroBackgroundStyle === "gradient" && (
          <CanvasGradientBackground />
        )}

      </div>
      <PostIntro title={titlealt} content={contentalt} />
    </div>
  </ClipContainer>;
};

export default function BlockHero({
  title,
  content,
  tag,
  image,
}) {
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
    //grid grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12
    <ClipContainer>
      <div
        className={`${getHeightClass(
          currentTheme.data.heroHeight
        )} relative flex flex-col justify-end left-0 top-0 z-50  w-full  gap-8 px-16 py-16 `}
      >
        <div
          className="absolute top-0 left-0 flex items-center justify-end w-full h-full pointer-events-none z-1"
        >
          {currentTheme.data.heroBackgroundStyle === "gradient" && (
            <CanvasGradientBackground />
          )}

          {currentTheme.data.heroBackgroundStyle === "video" && <Background />}

          {currentTheme.data.heroBackgroundStyle === "image" && image && (
          <BlendImage
            className="absolute w-full h-full img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        )}
        
        </div>



        <PostIntro title={title} content={content} tag={tag}/>
      </div>
    </ClipContainer>
  );
}
