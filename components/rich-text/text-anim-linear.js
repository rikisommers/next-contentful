"use client";

import React from "react";
import { motion } from "framer-motion";

export const TextAnimLinear = ({ content }) => {

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
        if (index % 2 === 0) {
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
        } else {
          return renderColoredText(segment, index);
        }
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        color:  'var(--heading-accent)',
      }}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.div>
  );
};
