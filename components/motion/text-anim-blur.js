"use client";

import React, { useEffect, useState } from "react";
import { motion } from "../../utils/motion";

/**
 * Text animation component with blur effect
 * @param {Object} props - Component props
 * @param {string} props.content - The text content to animate
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {string} props.highlight - Highlight style for the text
 * @param {string} props.trigger - What triggers the animation: 'hover', 'inview', or 'custom'
 * @param {Function} props.onTrigger - Custom function to trigger the animation (only used when trigger='custom')
 * @param {string} props.key - Key prop passed from parent to force re-render
 */
export const TextAnimBlur = ({ 
  content = '', // Provide default empty string
  delay = 0, 
  highlight = "background",
  trigger = "hover",
  onTrigger,
  key
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isTriggered, setIsTriggered] = useState(true);
  
  // Ensure content is a string and clean it
  const cleanContent = (typeof content === 'string' ? content : '')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/!\[([^\]]*)\]\((.*?)\)/g, '');
  
  const lines = cleanContent.split('\n').filter(line => line !== null && line !== undefined);
  
  // Calculate total characters for timing with null checks
  const totalChars = lines.reduce((acc, line) => {
    return acc + (line && typeof line === 'string' ? line.length : 0);
  }, 0);
  
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

  const renderLine = (line, lineIndex) => {
    // Calculate the starting index for this line's characters with null checks
    const startIndex = lines.slice(0, lineIndex).reduce((acc, l) => {
      return acc + (l && typeof l === 'string' ? l.length : 0);
    }, 0);
    
    return (
      <div 
        key={lineIndex} 
        className={lineIndex === 0 ? "inline" : "block"}
      >
        {line && typeof line === 'string' ? line.split("").map((char, charIndex) => (
          <motion.span
            key={charIndex}
            custom={startIndex + charIndex}
            variants={characterVariants}
            initial="hidden"
            animate={isTriggered ? "visible" : "hidden"}
          >
            {char}
          </motion.span>
        )) : null}
      </div>
    );
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
      {lines.map((line, lineIndex) => renderLine(line, lineIndex))}
    </motion.span>
  );
};
