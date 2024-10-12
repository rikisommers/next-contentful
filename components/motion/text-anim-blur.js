"use client";

import React from "react";
import { motion } from "framer-motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimBlur = ({ content, delay, highlight }) => {
  const characterVariants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(10px)",
      scale: 0.5 
    },
    visible: (index) => ({
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: index * 0.03,
        duration: 0.5,
      },
    }),
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren:delay,
      },
    },
  };

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


  const renderColoredText = (text, index) => (
    <motion.span
      key={index}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      <HighlightedSegment
        segment={text}
        highlight={highlight}
      />
    </motion.span>
  );

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (text) {
      const boldSegments = text.split("__");
      return boldSegments.map((segment, index) => {
        const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/); // Check for image syntax
        if (imageMatch) {
          const altText = imageMatch[1]; // Get alt text
          const imageUrl = imageMatch[2].startsWith("//")
            ? `https:${imageMatch[2]}`
            : imageMatch[2]; // Ensure the URL is complete
          return (
            <motion.div
              key={index}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="relative inline-block rounded-full w-[30px] h-[30px] overflow-hidden mx-1 leading-normal bg-slate-300"
            >
              <img
                src={imageUrl}
                alt={altText}
                style={{
                  maxWidth: "60px",
                  height: "auto",
                  display: "inline-block",
                }} // Adjust styles as needed
              />
            </motion.div>
          );
        } else {
          const lines = segment.split("\n");
          return lines.map((line, lineIndex) => (
            <motion.div
              className={lineIndex === 0 ? "inline" : "block"}
              key={`${index}-${lineIndex}`}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              {line.split("").map(renderCharacter)}
            </motion.div>
          ));
        }
      });
    }
  };
  
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        color: 'var(--heading-color)',
      }}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.span>
  );
}
