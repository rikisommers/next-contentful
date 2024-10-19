import React from "react";
import { motion } from "framer-motion";
import Background from "../background/background";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import CanvasGradientBackground from "../background/canvasGradientBackground";
import { useThemeContext } from "../themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";





const getPositionClass = (position) => {
  switch (position) {
    case "center":
      return "text-center col-start-5 col-span-4 row-span-1 row-start-4";
    case "topLeft":
      return "col-start-2 col-span-4 row-span-1 row-start-2";
    case "bottomLeft":
      return "col-start-2 col-span-4 row-span-1 row-start-4";
    case "topRight":
      return "col-start-8 col-span-3 row-span-1 row-start-2";
    case "bottomRight":
      return "col-start-8 col-span-8 row-span-1 row-start-4";
    default:
      return ""; // Return an empty string if no match
  }
};

const DateAndLocation = ({ date }) => {
  return (
    <div className="absolute flex justify-between py-6 bottom-1">
      <div className="flex gap-1 p-2 text-xs ">
        <span className="uppercase">Location:</span>
        <a
          href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
          stlye={{ color: "var(--accent)" }}
        >
          @-43.5093881,172.6992615
        </a>
      </div>

      <div
        className="flex gap-1 p-2 text-xs"
        stlye={{ color: "var(--accent)" }}
      >
        <span className="uppercase">Last Updated:</span>
        <span>{date}</span>
      </div>
    </div>
  );
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
      {currentTheme.heroBackgroundStyle === "gradient" && (
        <CanvasGradientBackground />
      )}

      {currentTheme.heroBackgroundStyle === "video" && <Background />}

      {currentTheme.heroBackgroundStyle === "image" && (
        <BlendImage
          className="img-cover"
          alt={`Cover Image for ${image?.title}`}
          src={image.url}
        />
      )}
    </motion.div>
  );
};

export default function BlockHero({ intro, titlealt, date }) {
  const { currentTheme } = useThemeContext();

  return (
    <ClipContainer>
      <div className="relative left-0 top-0 w-screen h-screen z-50 px-3 pt-3 pb-16 grid grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12">
         <motion.div
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
        {currentTheme.heroBackgroundStyle === "gradient" && (
          <CanvasGradientBackground />
        )}

        {currentTheme.heroBackgroundStyle === "video" && <Background />}


      </motion.div>



      {date && <DateAndLocation date={date} />}
        {/* {currentTheme.heroBackgroundStyle === "image" && (
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        )} */}

          <motion.div
            className={`${getPositionClass(
              currentTheme.heroTextPosition
            )} `}
          >
            <h1
              className="text-3xl font-medium"
              style={{ fontFamily: "var(--font-family-primary)" }}
            >
              <AnimatedText
                type={currentTheme.textAnimation}
                highlight={currentTheme.textHighlight}
                content={titlealt}
                delay={AnimTextOrder.ONE}
              />
              {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
            </h1>
            <h2
              className="text-xl font-regular"
              style={{
                color: "var(--subtext-color)",
              }}
            >
              <AnimatedText
                type={currentTheme.textAnimation}
                content={intro}
                delay={AnimTextOrder.THREE}
              />
            </h2>
          </motion.div>
       
      </div>
    </ClipContainer>
  );
}
