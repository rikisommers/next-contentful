"use client";

import React, { useEffect, useState } from "react";
import { motion } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";

/**
 * @component
 * @description Text that animates character by character in a linear fashion.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} delay - The delay in seconds before the animation starts.
 * @param {string} highlight - The highlight style to apply to emphasized text.
 * @example
 * // Linear Text Animation
 * <TextAnimLinear 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimLinear = ({ content, delay, highlight }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Calculate total characters for timing
  const totalChars = (typeof content === 'string' ? content : '').length;
  
  // Calculate completion time based on animation sequence
  const completionTime = totalChars * 20 + 300;

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.02,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsComplete(true), completionTime);
    return () => clearTimeout(timer);
  }, [completionTime]);

  const renderCharacter = (char, index) => (
    <motion.span
      key={index}
      custom={index}
      variants={characterVariants}
      initial="hidden"
      animate="visible"
    >
      {char}
    </motion.span>
  );

  const renderColoredText = (text, index) => {
    let charIndex = index;
    return (
      <motion.span
        style={{
          color: 'var(--text-accent)',
        }}
        key={index}
      >
        {text.split('').map((char, localIndex) => {
          const renderedChar = renderCharacter(char, charIndex);
          charIndex++;
          return renderedChar;
        })}
      </motion.span>
    );
  };

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }
    
    const boldSegments = processTextWithBoldAndLineBreaks(text);
    let globalCharIndex = 0;
    
    return boldSegments.map((segmentData, index) => {
      const segment = segmentData.content;
      const isBold = segmentData.isBold;
      
      if (isBold) {
        // Bold text with highlighting - each character animates individually
        const coloredText = renderColoredText(segment, globalCharIndex);
        globalCharIndex += segment.length;
        return coloredText;
      } else {
        // Regular text - each character animates individually
        const lines = segment.split("\\n");
        return lines.map((line, lineIndex) => (
          <motion.span
            className={lineIndex === 0 ? "inline" : "block"}
            key={`${index}-${lineIndex}`}
            style={{
              color: 'var(--heading-color)',
            }}
          >
            {line.split('').map((char, charIndex) => {
              const renderedChar = renderCharacter(char, globalCharIndex);
              globalCharIndex++;
              return renderedChar;
            })}
          </motion.span>
        ));
      }
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.div>
  );
};
