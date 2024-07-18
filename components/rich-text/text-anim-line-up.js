"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';

export const TextAnimLineUp = ({ 
  content, 
  clipText = true, 
  animateWhenInView = false,
  repeatWhenInView = false
}) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: !repeatWhenInView, 
    amount: 0.5 
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = clipText
    ? {
        hidden: { y: "100%" },
        visible: { 
          y: 0,
          transition: {
            ease: [0.33, 1, 0.68, 1],
            duration: 1.2,
          }
        }
      }
    : {
        hidden: { opacity: 0, marginBottom: "1rem" },
        visible: { 
          opacity: 1, 
          marginBottom: 0,
          transition: {
            opacity: {
              ease: [0.33, 1, 0.68, 1],
              duration: 2.4,
            },
            marginBottom: {
              ease: [0.33, 1, 0.68, 1],
              duration: 1.2,
            }
          }
        }
      };

  const renderLine = (line, lineIndex) => {
    if (clipText) {
      return (
        <div
          key={lineIndex}
          style={{ 
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '0.25em'
          }}
        >
          <motion.div
            variants={lineVariants}
            style={{ 
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {line}
          </motion.div>
        </div>
      );
    } else {
      return (
        <motion.div
          key={lineIndex}
          variants={lineVariants}
          style={{ overflow: 'hidden' }}
        >
          {line}
        </motion.div>
      );
    }
  };

  const renderColoredText = (text, index) => {
    const lines = text.split('\n');
    return (
      <span
        style={{
          color: currentTheme?.textAccent,
          position: 'relative',
          display: 'block'
        }}
        key={index}
      >
        {lines.map((line, lineIndex) => renderLine(line, lineIndex))}
      </span>
    );
  };

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (text) {
      const boldSegments = text.split("__");
      return boldSegments.map((segment, index) => {
        if (index % 2 === 0) {
          const lines = segment.split('\n');
          return lines.map((line, lineIndex) => renderLine(line, lineIndex));
        } else {
          return renderColoredText(segment, index);
        }
      });
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-start"
      variants={containerVariants}
      initial="hidden"
      animate={animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"}
      key={isInView ? "inView" : "outOfView"}
    >
      <span
        style={{
          color: currentTheme?.headingColor,
          display: 'inline-block'
        }}
      >
        {renderTextWithBoldAndLineBreaks(content)}
      </span>
    </motion.div>
  );
}