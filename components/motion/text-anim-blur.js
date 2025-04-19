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
  content, 
  delay = 0, 
  highlight = "background",
  trigger = "hover",
  onTrigger,
  key
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isTriggered, setIsTriggered] = useState(true); // Always start triggered
  
  // Clean the content by removing formatting
  const cleanContent = content
    .replace(/__([^_]+)__/g, '$1') // Remove bold formatting
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
    .replace(/!\[([^\]]*)\]\((.*?)\)/g, ''); // Remove image markdown
  
  const lines = cleanContent.split('\n');
  
  // Calculate total characters for timing
  const totalChars = lines.reduce((acc, line) => {
    return acc + line.length;
  }, 0);
  
  // Calculate completion time based on animation sequence
  const completionTime = totalChars * 20 + // Character delays
                        300; // Buffer for final character settling

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
    // Calculate the starting index for this line's characters
    const startIndex = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.length, 0);
    
    return (
      <div 
        key={lineIndex} 
        className={lineIndex === 0 ? "inline" : "block"}
      >
        {line.split("").map((char, charIndex) => (
          <motion.span
            key={charIndex}
            custom={startIndex + charIndex}
            variants={characterVariants}
            initial="hidden"
            animate={isTriggered ? "visible" : "hidden"}
          >
            {char}
          </motion.span>
        ))}

      </div>
    );
  };
  
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
}
