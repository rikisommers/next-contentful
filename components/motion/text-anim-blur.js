"use client";

import React, { useEffect, useState } from "react";
import { motion } from "../../utils/motion";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";

/**
 * @component
 * @description Text that animates with a blur effect.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @param {string} [trigger=hover] - What triggers the animation: 'hover', 'inview', or 'custom'.
 * @param {Function} [onTrigger] - Custom function to trigger the animation (only used when trigger='custom').
 * @param {string} [key] - Key prop passed from parent to force re-render.
 * @example
 * // Blur Text Animation
 * <TextAnimBlur 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimBlur = ({
  content = '',
  delay = 0,
  highlight = "background",
  trigger = "hover",
  onTrigger,
  key
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isTriggered, setIsTriggered] = useState(true);
  
  // Calculate total characters for timing with null checks
  const totalChars = (typeof content === 'string' ? content : '').length;
  
  // Calculate completion time based on animation sequence
  const completionTime = totalChars * 20 + 300;

  const characterVariants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(10px)",
      scale: 0.5 
    },
    visible: (custom) => ({
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: custom * 0.02,
        duration: 0.5,
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

  // Handle hover trigger
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsTriggered(true);
    }
  };

  // Handle custom trigger
  useEffect(() => {
    if (trigger === "custom" && onTrigger) {
      const unsubscribe = onTrigger(setIsTriggered);
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [trigger, onTrigger]);

  // Reset animation when key changes (from parent)
  useEffect(() => {
    setIsComplete(false);
    setIsTriggered(true);
  }, [key]);

  useEffect(() => {
    if (isTriggered) {
      const timer = setTimeout(() => setIsComplete(true), completionTime);
      return () => clearTimeout(timer);
    }
  }, [isTriggered, completionTime, key]);

  const renderCharacter = (char, index) => (
    <motion.span
      key={index}
      custom={index}
      variants={characterVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
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
  
  // If no content, return null
  if (!content || typeof content !== 'string') {
    return null;
  }
  
  return (
    <motion.span
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        color: 'var(--heading-color)',
      }}
      onMouseEnter={handleMouseEnter}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.span>
  );
};
