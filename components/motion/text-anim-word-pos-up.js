"use client";

import React, { useRef } from "react";
import { motion, useInView } from "../../utils/motion";

/**
 * @component
 * @description Text that animates with words moving up. Simple version without formatting support.
 * @category animations
 * @param {string} content - The text content to animate.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @param {boolean} [animateWhenInView=false] - Whether to animate only when in view.
 * @param {boolean} [repeatWhenInView=false] - Whether to repeat animation when coming back into view.
 * @example
 * // Word Position Up Text Animation
 * <TextAnimWordPosUp 
 *   content="Simple text animation example"
 *   delay={0}
 *   animateWhenInView={true}
 * />
 */
export const TextAnimWordPosUp = ({
  content,
  delay = 0,
  animateWhenInView = false,
  repeatWhenInView = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.2,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 1.2,
      },
    },
  };

  const splitIntoWords = (text) => {
    if (!text || typeof text !== 'string') {
      return [];
    }
    return text.split(' ').filter(word => word && word.trim() !== '');
  };

  const words = splitIntoWords(content);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={
        animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"
      }
    >
      <span
        style={{
          color: "var(--heading-color)",
          display: "inline-block",
        }}
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span
              style={{
                overflow: 'hidden',
                position: 'relative',
                display: 'inline-block',
              }}
              className="block leading-snug"
            >
              <motion.span
                variants={wordVariants}
                style={{
                  fontFamily: "var(--font-family-primary)",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {word}
              </motion.span>
            </span>
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </span>
    </motion.div>
  );
};
