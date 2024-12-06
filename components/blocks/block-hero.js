import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Background from "../background/background";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import CanvasGradientBackground from "../background/canvasGradientBackground";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";
import AnimatedElement, {
  AnimElOrder,
  AnimStyleEl,
} from "../motion/animated-element";
import PostIntro from "../post/post-intro";
import Button, { ButtonType } from "../base/button";

const getPositionClass = (position) => {
  switch (position) {
    case "left":
      return "col-start-2 col-span-8 row-span-3 row-start-3"
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
        {currentTheme.heroBackgroundStyle === "gradient" && (
          <CanvasGradientBackground />
        )}

        {currentTheme.heroBackgroundStyle === "video" && <Background />}
      </div>

      {/* {currentTheme.heroBackgroundStyle === "image" && (
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        )} */}

<PostIntro title={titlealt} content={contentalt}/>



      {/* <motion.div className={` ${getPositionClass(currentTheme.heroTextPosition)}`}>
        <h1
          className="text-4xl"
          style={{ fontFamily: "var(--font-family-primary)" }}
        >
          <AnimatedText
            type={currentTheme.textAnimation}
            highlight={currentTheme.textHighlight}
            content={titlealt}
            delay={AnimTextOrder.ONE}
          />
           <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> 
        </h1>
        <h2
          className="text-base"
          style={{
            color: "var(--accent",
          }}
        >
          <AnimatedText
            type={currentTheme.textAnimation}
            content={contentalt}
            delay={AnimTextOrder.THREE}
          />
        </h2>
        <Button label={"Click me"} type={ButtonType.PRIMARY}></Button>
      </motion.div> */}

      {/* {date && (
        <div className="z-50 flex justify-between col-span-12 col-start-1 row-span-1 row-start-7 py-6 bottom-1">
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
      )} */}
    </div>
  </ClipContainer>;
};

export default function BlockHero({ intro, titlealt, date, contentalt, image }) {
  const { currentTheme } = useThemeContext();
  const [position, setPosition] = useState(null); // Default value

  const full = false;

  useEffect(() => {
    // Set the style value when the component mounts
    const position = getPositionClass(currentTheme.heroTextPosition);
    setPosition(position); // Set to the desired integer value
  }, []);




  return (
  // TODO make clip path optional  
  //grid grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12
    <ClipContainer>
    <div className={`${getHeightClass(currentTheme.heroHeight)} relative flex flex-col justify-end left-0 top-0 z-50  w-full  gap-8 px-16 py-16 `}>
      



      <div
        className="absolute top-0 left-0 flex items-center justify-end w-full h-full pointer-events-none z-1"
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
      </div>

      {(currentTheme.heroBackgroundStyle === "image" && image) &&(

          <BlendImage
            className="absolute w-full h-full img-cover"
            alt={`Cover Image for ${image?.title}`}
            src={image.url}
          />
        )}




      {/* TODO: Replace with padding, this is only usefull if full height */}
      {/* <motion.div className={`${getPositionClass(currentTheme.heroTextPosition)}`}>
        <h1
          style={{ fontFamily: "var(--font-family-primary)" }}
        >
          <AnimatedText
            type={currentTheme.textAnimation}
            highlight={currentTheme.textHighlight}
            content={titlealt}
            delay={AnimTextOrder.ONE}
          />
        </h1>
        <h2
          className="text-base"
          style={{
            color: "var(--accent",
          }}
        >
          <AnimatedText
            type={currentTheme.textAnimation}
            content={contentalt}
            delay={AnimTextOrder.THREE}
          />
        </h2>
        <Button label={"Click me"} type={ButtonType.DEFAULT}></Button>
      </motion.div>
      <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}


      {/* {date && (
        <div className="z-50 flex justify-between col-span-12 col-start-1 row-span-1 row-start-7 py-6 bottom-1">
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
      )} */}
          <PostIntro title={titlealt} content={contentalt}/>

    </div>


s
  </ClipContainer>
  );
}
