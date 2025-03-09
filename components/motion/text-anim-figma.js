"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { motion } from "framer-motion";

export const TextAnimFigma = ({ 
  delay = 0, // Base delay
  content, 
  highlight,
  type = "text"
}) => {
  
  const segmentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: delay + i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");
    const italicSegments = line.split("*");

    return (
      <motion.div
        key={lineIndex}
        className="inline-flex items-center gap-2 leading-snug"
        initial="hidden"
        animate="visible"
      >
        {segments.map((segment, segmentIndex) => {
          const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
          if (imageMatch) {
            const altText = imageMatch[1]; 
            const imageUrl = imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2]; 
            return (
              <motion.img
                key={segmentIndex}
                className="inline h-[1em]"
                src={imageUrl}
                alt={altText}
                variants={segmentVariants}
                custom={segmentIndex}
              />
            );
          }

          return (
            <motion.span 
              key={segmentIndex}
              variants={segmentVariants}
              custom={segmentIndex}
            >
              {segmentIndex % 2 === 0 ? segment : <HighlightedSegment segment={segment} highlight={highlight} />}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split("\n");
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
    <motion.span
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      className="flex flex-col gap-3"
      style={{ color: "var(--heading-color)" }}
    >
      {renderContent(content)}
    </motion.span>
  );
};
