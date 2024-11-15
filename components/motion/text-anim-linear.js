"use client";

import React from "react";
import { motion } from "framer-motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimLinear = ({ content ,delay, highlight}) => {

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: {
        delay: index * 0.05,
      },
    }),
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Delay between lines
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
      style={{
        color: 'var(--text-accent)',
      }}
      key={index}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map(renderCharacter)}
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
          if (index % 2 === 0) {
            const lines = segment.split("\n");
            return lines.map((line, lineIndex) => (
              <motion.div
                className={lineIndex === 0 ? "inline" : "block"}
                key={`${index}-${lineIndex}`}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{
                  color: "var(--heading-color)",
                  display: "inline-block",
                }}
              >
                {line.split("").map(renderCharacter)}
              </motion.div>
            ));
          } else {
            return (
              <motion.span
                key={index}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                         style={{
            color: "var(--heading-color)",
            display: "inline-block",
          }}
              >
                <HighlightedSegment highlight={highlight}>
                  {segment.split("").map(renderCharacter)}
                </HighlightedSegment>
              </motion.span>
            );
          }
        }
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      FFd
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.div>
  );
};
