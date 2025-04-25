"use client";

import React, { useRef } from "react";
import { motion, useInView } from "../../utils/motion";;
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimLineUp = ({
  delay,
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      y: "100%", 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.8,
        },
        opacity: {
          ease: "easeOut",
          duration: 1.5, // Longer duration for opacity
          delay: 0.1, // Small delay for opacity to start after movement begins
        }
      },
    },
  };

  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");

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
          variants={lineVariants}

          style={{
            fontFamily:"var(--font-family-primary)",
            position: "relative",
            display: "inline-block",
          }}
        >
          {segments.map((segment, segmentIndex) => {
            const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
            if (imageMatch) {
              const altText = imageMatch[1]; // Get alt text
              const imageUrl = imageMatch[2].startsWith("//")
                ? `https:${imageMatch[2]}`
                : imageMatch[2]; // Ensure the URL is complete
              return (
                <img
                  className="absolute w-[40px] h-0"
                  key={segmentIndex}
                  src={imageUrl}
                  alt={altText}
                  style={{
                    maxWidth: "40px",
                    height: "auto",
                    display: "inline-block",
                  }} // Adjust styles as needed
                />
              );
            }

            if (segmentIndex % 2 === 0) {
              // Process the segment for italic text
              const { processed: processedSegment, hasItalic } = processItalicText(segment);

              // If segment has italic formatting, use dangerouslySetInnerHTML
              if (hasItalic) {
                return (
                  <span 
                    key={segmentIndex}
                    dangerouslySetInnerHTML={{ __html: processedSegment }}
                  />
                );
              } else {
                // If no italic formatting, use regular children
                return <span key={segmentIndex}>{segment}</span>;
              }
            } else {
              return (
                <HighlightedSegment
                  key={segmentIndex}
                  segment={segment}
                  highlight={highlight}
                />
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
