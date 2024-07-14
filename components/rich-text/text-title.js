"use client";

import React, { useEffect, Children } from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';

export const TextTitle = ({ content, children }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  const renderCharacter = (char, index) => {
    const delay = Math.random() * 2; // Random delay between 0 and 2 seconds

    return (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {char}
      </motion.span>
    );
  };

  const renderColoredText = (text, index) => (
    <motion.span
      style={{
        color: currentTheme?.textAccent
      }}
      key={index}
    >
      {text.split('').map(renderCharacter)}
    </motion.span>
  );

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (text) {
      const boldSegments = text.split("__");
      return boldSegments.map((segment, index) => {
        if (index % 2 === 0) {
          const lines = segment.split("\n");
          return lines.map((line, lineIndex) => (
            <motion.span
              className={lineIndex === 0 ? "inline" : "block"}
              key={`${index}-${lineIndex}`}
            >
              {line.split('').map(renderCharacter)}
            </motion.span>
          ));
        } else {
          return renderColoredText(segment, index);
        }
      });
    }
  };

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        color: currentTheme?.headingColor
      }}
      className="text-5xl"
    >
      {renderTextWithBoldAndLineBreaks(content)}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {children}
      </motion.span>
    </motion.h1>
  );
}