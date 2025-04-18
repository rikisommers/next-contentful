"use client";

import React, { useEffect, useState } from "react";
import { motion } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimLinear = ({ content, delay, highlight }) => {
  const [isComplete, setIsComplete] = useState(false);
  
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

  const renderLine = (line, lineIndex) => {
    // Calculate the starting index for this line's characters
    const startIndex = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.length, 0);
    
    return (
      <div 
        key={lineIndex} 
        className={lineIndex === 0 ? "inline" : "block"}
        style={{
          color: "var(--heading-color)",
        }}
      >
        {line.split("").map((char, charIndex) => (
          <motion.span
            key={charIndex}
            custom={startIndex + charIndex}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {lines.map((line, lineIndex) => renderLine(line, lineIndex))}
    </motion.div>
  );
};
