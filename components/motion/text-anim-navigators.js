"use client";

import React, { useRef } from "react";
import { motion, useInView, useTransform } from "../../utils/motion";;
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";
import { TextAnimImg } from "./text-anim-img";

/**
 * @component
 * @description Text that animates with a navigator-like effect.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @example
 * // Navigators Text Animation
 * <TextAnimNavigators 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimNavigators = ({
  content,
  delay,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
}) => {
  const ref = useRef(null);
  const [textAnimationState, setTextAnimationState] = React.useState("visible");
  const gap = 0.03;
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.4,
  });

  const words = content.split(" ");
  const wordsLength = content.split(" ").length;
  const internalDelay = 1;
  const totalDuration = wordsLength * gap;
  const textDuration = totalDuration + internalDelay;

  // Calculate text timing values (monotonically increasing)
  const t1 = Math.min(gap / textDuration, 1);
  const t2 = Math.min((textDuration - internalDelay) / textDuration, 1);
  const t3 = Math.min((totalDuration + gap) / totalDuration, 1);
  const t4 = 1;

  const textTimes = [t1, t2, t3, t4];

  // Calculate preview timing values (monotonically increasing)
  const p1 = 0;
  const p2 = Math.min(gap / totalDuration, 1);
  const p3 = Math.min((totalDuration - gap) / totalDuration, 1);
  const p4 = 1;

  const previewTimes = [p1, p2, p3, p4];

  const handleContainerAnimationComplete = () => {
  //  console.log("Container animation completed, triggering text fade out");
    setTextAnimationState("fadeOut");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: gap,
        delayChildren: delay || 0,
      },
    },
    fadeOut:{
      opacity: 1,
      transition: {
        staggerChildren: gap,
        delayChildren: delay || 0,
      },
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: [0, 0, 1, 1],
      transition: {
        ease: "easeOut",
        duration: textDuration,
        times: textTimes
      },
    },
    fadeOut: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };

  const previewVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: [0, 1, 1, 0],
      transition: {
        ease: "easeOut",
        duration: totalDuration,
        times: previewTimes
      },
    },
    fadeOut: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };

  const renderWord = (word, wordIndex) => {
    // Check if the word contains an image markdown syntax
    const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
    
    if (imageMatch) {
      const [_, altText, url] = imageMatch;
      const imageUrl = url.startsWith("//") ? `https:${url}` : url;
      
      return (
        <div className="inline-block relative mr-2" key={wordIndex}>
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
                <TextAnimImg
                key={wordIndex}
                imageUrl={imageUrl}
                altText={altText}
                index={wordIndex}
                delay={delay}
              />
          </motion.span>
          <motion.span
            variants={previewVariants}
            className="absolute left-0 inline-flex items-center justify-center w-full h-[90%] top-[5%] px-2 rounded-xl bg-slate-200/10"
          >
          </motion.span>
        </div>
      );
    }
    
    // Check for bold segments indicated by __
    const segments = word.split("__");
    
    if (segments.length > 1) {
      // Word contains bold segments
      return (
        <div className="inline-block relative mr-2" key={wordIndex}>
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {segments.map((segment, segmentIndex) => (
              <React.Fragment key={segmentIndex}>
                {segmentIndex % 2 === 0 ? (
                  <span>{segment}</span>
                ) : (
                  <HighlightedSegment
                    key={segmentIndex}
                    segment={segment}
                    highlight={highlight}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.span>
          <motion.span
            variants={previewVariants}
            className="absolute left-0 inline-flex items-center justify-center w-full h-[90%] top-[5%] px-2 rounded-xl bg-slate-200/10"
          >
          </motion.span>
        </div>
      );
    }
    
    return (
      <div className="inline-block relative mr-2" key={wordIndex}>
        <motion.span
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
        <motion.span
          variants={previewVariants}
          className="absolute left-0 inline-flex items-center justify-center w-full h-[90%] top-[5%] px-2 rounded-xl bg-slate-200/10"
        >
        </motion.span>
      </div>
    );
  };

  const renderContent = (text) => {
    if (!text) return null;
    const words = text.split(" ");
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={textAnimationState}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => renderWord(word, wordIndex))}
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      className="flex flex-wrap"
      style={{
        color: 'var(--heading-color)'
      }}
      initial="hidden"
      animate={
        animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"
      }
    >   
        {renderContent(content)}
    </motion.div>
  );
};
