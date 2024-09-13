"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const TextAnimLinePosUp = ({
  delay,
  content,
  highlight,
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
        delayChildren:delay,
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

  const renderLine = (line, lineIndex) => {
    const segments = line.split("__");

    return (
      <div
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
            return <span key={segmentIndex}>{segment}</span>;
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
