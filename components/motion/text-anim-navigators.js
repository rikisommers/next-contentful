"use client";

import React, { useRef } from "react";
import { motion, useInView } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimNavigators = ({
  delay = 1,
  content,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.2,
  });

  // Global delay variable for animations
  const animationDelay = 1; // 1 second default

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: delay,
      }
    },
  };

  // Define a sequence of animation states
  const wordVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.2,
        delay: i * 0.2 + animationDelay, // Use global delay variable
      }
    })
  };

  // Define loading animation using keyframes
  const loadingVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: [0, 1, 0], // Keyframes: start at 0, go to 1, then back to 0
      transition: {
        duration: animationDelay, // Use global delay variable for duration
        times: [0, 0.5, 1], // Timing for each keyframe
        ease: "easeInOut",
        delay: i * 0.2, // Stagger based on index
      }
    })
  };

  const renderContent = (text) => {
    if (text) {
      // First, strip out all image markdown patterns
      const textWithoutImages = text.replace(/!\[([^\]]*)\]\((.*?)\)/g, '');
      
      // Split content into words
      const words = textWithoutImages.split(/\s+/).filter(word => word.length > 0);
      
      return (
        <>
          {words.map((word, index) => (
            <span className="relative" key={index} data-index={index}>
              <motion.span
                className="absolute top-0 left-0 z-[-1] inline-flex w-full h-full px-4 py-0 bg-purple-200 rounded-xl"
                custom={index}
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
              ></motion.span>
              <motion.span
                className="z-50 inline-flex px-4 py-0 rounded-xl"
                custom={index}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </>
      );
    }
  };

  return (
    <motion.div
      className="contents"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={
        animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"
      }
    >
      {renderContent(content)}
    </motion.div>
  );
};
