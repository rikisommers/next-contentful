"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimLinePosUp = ({
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
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 1.2,
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

            if (segmentIndex % 2 === 0) {
              return <span key={segmentIndex}>{segment}</span>;
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
