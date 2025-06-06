"use client";

import React, { useRef } from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { motion, useInView } from "../../utils/motion";
import { processItalicText } from "../utils/textFormatting";

/**
 * @component
 * @description Text that animates with a word mask effect.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @example
 * // Word Mask Text Animation
 * <TextAnimWordMask 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimWordMask = ({
  content,
  delay = 0,
  highlight,
  animateWhenInView = false,
}) => {
  const ref = useRef(null);

  // Animation variants
  const segmentVariants = {
    hidden: { 
      opacity: 1,
      x: '100%', 
    },
    visible: (i) => ({
      opacity: 1,
      x: 0, 
      transition: { 
        delay: delay + i * 0.1, 
        duration: 1, 
        ease: "easeOut" 
      },
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
      transition: { 
        delay: delay + i * 0.1, 
        duration: 0.3, 
        ease: "easeOut" 
      },
    }),
  };

  /**
   * Renders a single line of text with animation
   * 
   * @param {string} line - Line of text to render
   * @param {number} lineIndex - Index of the line
   * @returns {JSX.Element}
   */
  const renderLine = (line, lineIndex) => {
    // Split the line by double underscores to separate bold and non-bold text
    const segments = line.split("__");

    return (
      <motion.div
        key={lineIndex}
        className="flex items-center gap-2 leading-snug"
        initial="hidden"
        animate="visible"
      >
        {segments.map((segment, segmentIndex) => {
          // Skip empty segments
          if (!segment) return null;
          
          // Check for image markdown
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

          // Process italic text within the segment
          const italicParts = segment.split(/(\*[^*]+\*)/g);
          
          // If there's no italic text, render the segment directly
          if (italicParts.length === 1) {
            return (
              <motion.div 
                className="relative flex overflow-hidden word-mask-container"
                initial={{
                  maskSize: "100% 100%",
                  skewX: -10,
                  maskImage: "radial-gradient(circle at center, black 0%, transparent 100%)",
                }}
                animate={{
                  maskSize: "100% 100%",
                  skewX: 0,
                  maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
                }}
                transition={{ 
                  duration: 1, 
                  ease: "easeOut" 
                }}
                key={segmentIndex}
              >
                <motion.span
                  className="relative word-mask-animation feathered-edge"
                  data-content={segment}
                  initial={{ 
                    x: '200px', 
                    skewY: 0,
                    skewX: 0,
                  }}
                  animate={{ 
                    x: 0,
                    skewY: 0,
                    skewX: 0,
                    rotateZ: 0
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
          }
          
          // Handle segments with italic text
          return (
            <motion.div 
              className="relative flex overflow-hidden word-mask-container"
              initial={{
                maskSize: "100% 100%",
                skewX: -10,
                maskImage: "radial-gradient(circle at center, black 0%, transparent 100%)",
              }}
              animate={{
                maskSize: "100% 100%",
                skewX: 0,
                maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
              }}
              transition={{ 
                duration: 1, 
                ease: "easeOut" 
              }}
              key={segmentIndex}
            >
              <motion.span
                className="relative word-mask-animation feathered-edge"
                data-content={segment}
                initial={{ 
                  x: '200px', 
                  skewY: 0,
                  skewX: 0,
                }}
                animate={{ 
                  x: 0,
                  skewY: 0,
                  skewX: 0,
                  rotateZ: 0
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
                {italicParts.map((part, partIndex) => {
                  // Check if this part is italic text
                  if (part.startsWith('*') && part.endsWith('*')) {
                    const italicText = part.slice(1, -1);
                    return (
                      <span key={partIndex} style={{ fontStyle: 'italic' }}>
                        {italicText}
                      </span>
                    );
                  }
                  // Regular text
                  return <span key={partIndex}>{part}</span>;
                })}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  /**
   * Renders the entire content with line breaks
   * 
   * @param {string} text - Text content to render
   * @returns {JSX.Element[]}
   */
  const renderContent = (text) => {
    if (!text) return null;
    
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => renderLine(line, lineIndex));
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
