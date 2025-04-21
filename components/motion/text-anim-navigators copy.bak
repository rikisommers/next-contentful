"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimNavigators = ({
  delay = 0,
  content,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.2,
  });

  // Calculate line delays based on previous line word counts
  const lineDelays = useMemo(() => {
    if (!content) return [];
    
    const lines = content.split("\n");
    const delays = [delay]; // First line starts with base delay
    
    for (let i = 1; i < lines.length; i++) {
      // Count words in previous line (splitting by __ for segments)
      const prevLineSegments = lines[i-1].split("__");
      const prevLineWordCount = prevLineSegments.length;
      
      // Add delay based on previous line's word count
      // Each word takes 0.1s to animate, plus a small buffer
      const prevLineDelay = delays[i-1] + (prevLineWordCount * 0.6) + 0.6;
      delays.push(prevLineDelay);
    }
    
    return delays;
  }, [content, delay]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: delay,
        backgroundColor: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.8,  // Shorter duration for movement
        },
        color: {
          ease: "easeOut",
          duration: 3,  // Longer duration for opacity (almost 2x longer)
          delay: 0.3,     // Small delay for opacity to start after movement begins
        }
      }
    },
  };

  const wordVariants = {
    hidden: {
      backgroundColor: 'red',
      color: 'transparent'
    },
    visible: {
      backgroundColor: 'blue',
      color: 'white',
      transition: {
        backgroundColor: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.8,  // Shorter duration for movement
        },
        color: {
          ease: "easeOut",
          duration: 3,  // Longer duration for opacity (almost 2x longer)
          delay: 0.3,     // Small delay for opacity to start after movement begins
        }
      }
    },
  };

  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");
    const lineDelay = lineDelays[lineIndex] || delay;

    return (
      <div
        key={lineIndex}
        style={{ 
          overflow: 'hidden',
          position: 'relative',
        }}
        className="block leading-snug"
      >
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                delay: lineDelay,
                staggerChildren: 0.1,
                delayChildren: 0
              }
            }
          }}
          style={{
            fontFamily: "var(--font-family-primary)",
            position: "relative",
            display: "inline-block",
          }}
        >
          {segments.map((segment, segmentIndex) => {
            const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
            if (imageMatch) {
              const [_, altText, url] = imageMatch;
              const imageUrl = url.startsWith("//") ? `https:${url}` : url;
              return (
                <img
                  key={segmentIndex}
                  src={imageUrl}
                  alt={altText}
                  className="absolute w-[40px] h-0"
                  style={{
                    maxWidth: "40px",
                    height: "auto",
                    display: "inline-block",
                  }}
                />
              );
            }

            // Process the segment for italic text
            const { processed: processedSegment, hasItalic } = processItalicText(segment);

            if (hasItalic) {
              // If segment has italic formatting, use dangerouslySetInnerHTML
              return (
                <motion.span
                  className="inline-flex px-4 py-0 rounded-xl"
                  key={segmentIndex}
                  variants={wordVariants}
                  custom={segmentIndex}
                  dangerouslySetInnerHTML={{ __html: processedSegment }}
                />
              );
            } else {
              // If no italic formatting, use regular children
              return (
                <motion.span
                  className="inline-flex px-4 py-0 rounded-xl"
                  variants={wordVariants}
                  key={segmentIndex}
                  custom={segmentIndex}
                >
                  {segment}
                </motion.span>
              );
            }
          })}
        </motion.div>
      </div>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split("\n");
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={
        animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"
      }
    >
      <span
        style={{
          color: "var(--heading-color)",
          display: "inline-block",
        }}
      >
        {renderContent(content)}
      </span>
    </motion.div>
  );
};
