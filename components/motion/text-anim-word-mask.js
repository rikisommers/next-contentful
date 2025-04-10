"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { motion } from "framer-motion";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimWordMask = ({ 
  delay = 0, // Base delay
  content, 
  highlight,
  type = "text"
}) => {
  
console.log('conten -----', content)

  const segmentVariants = {
    hidden: { opacity: 1,
      x: '100%', 
  },
    visible: (i) => ({
      opacity: 1,
      x: 0, 
      transition: { delay: delay + i * 0.1, duration: 1, ease: "easeOut" },
    }),
  };

  const segmentVariantsPre = {
    hidden: {
       opacity: 0, 
       x: '0', 
      },
    visible: (i) => ({
      opacity: 1,
      x: '-100%', 
      transition: { delay: delay + i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };


  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");

    return (
      <motion.div
        key={lineIndex}
        className="flex items-center gap-2 leading-snug"
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

          // For non-highlighted segments, process italic text here
         
            // For highlighted segments, let HighlightedSegment handle the italic formatting
            return (
              <motion.div className="relative flex overflow-hidden word-mask-container"
              initial={{
                maskSize: "100% 100%",
                skewX:-10,
               maskImage: "radial-gradient(circle at center, black 0%, transparent 100%)",
              
              }}
              animate={{
                maskSize: "100% 100%",
                skewX:0,
               maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
              
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut" 
              }}
   key={segmentIndex + ''}
>

<motion.span
  className="relative word-mask-animation feathered-edge"
  data-content={segment}
  initial={{ 
    x: '200px', 
    skewY:0,
    skewX:0,
  }}
  animate={{ x: 0,
    skewY:0,
    skewX:0,
    rotateZ:0
   }}
  exit={{ x: -200 }}
  transition={{ 
    duration: 1, 
    ease: "easeOut" 
  }}
  style={{
     color: "var(--heading-color)" 
  }}
    >
        {segment}
</motion.span>
              </motion.div>
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
