"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const TextAnimLinePosUp = ({
  delay,
  content,
  highlight,
  theme,
  animateWhenInView = false,
  repeatWhenInView = false,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6,
        },
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 1.2,
        },
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: .2,
      scale: .6,
    },
    transition: {
      delay:1,
      ease: [0.33, 1, 0.68, 1],
      duration: 0.6,
    },
  };

  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");

    return (
      <span
        key={lineIndex}
        style={{
          position: "relative",
          marginBottom: "0.25em",
        }}
      >
        <motion.div
          variants={lineVariants}
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {segments.map((segment, segmentIndex) => {
            const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
            if (theme.heroTextImageStyle !== "none") {
              if (imageMatch) {
                const altText = imageMatch[1]; // Get alt text
                const imageUrl = imageMatch[2].startsWith("//")
                  ? `https:${imageMatch[2]}`
                  : imageMatch[2]; // Ensure the URL is complete
                return (
                  <motion.div
                  
                  variants={imageVariants}
                  initial="hidden"
                  animate={
                    animateWhenInView ? (isInView ? "visible" : "hidden") : "hidden"
                  }
                  className="relative inline-block w-[30px] h-[30px] overflow-hidden m-3 leading-normal bg-slate-300">
                    {/* <img
                      key={segmentIndex}
                      src={imageUrl}
                      alt={altText}
                      style={{
                        maxWidth: "60px",
                        height: "auto",
                        display: "inline-block",
                      }} // Adjust styles as needed
                    /> */}
                  </motion.div>
                );
              }
            }

            return <span key={segmentIndex}>{segment}</span>;
          })}
        </motion.div>
      </span>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split("\n");
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
    return null;
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
          display: "inline-block",
        }}
      >
        {renderContent(content)}
      </span>
    </motion.div>
  );
};
