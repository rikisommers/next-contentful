"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { motion } from "framer-motion";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimFigma = ({ 
  delay = 0,
  content = '', // Add default empty string
  highlight,
  type = "text"
}) => {
  // Early return if content is invalid
  if (!content || typeof content !== 'string') {
    return null;
  }
  
  const segmentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: delay + i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const renderWord = (word, wordIndex) => {
    if (!word || typeof word !== 'string') {
      return null;
    }

    // Check for image markdown syntax
    const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
    if (imageMatch) {
      const altText = imageMatch[1]; 
      const imageUrl = imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2]; 
      return (
        <motion.img
          key={wordIndex}
          className="inline h-[1em]"
          src={imageUrl}
          alt={altText}
          variants={segmentVariants}
          custom={wordIndex}
        />
      );
    }

    // Check for bold text (wrapped with __)
    const boldMatch = word.match(/^__(.*)__$/);
    if (boldMatch) {
      // Extract the text inside the __ markers
      const boldText = boldMatch[1];
      return (
        <motion.span 
          key={wordIndex}
          variants={segmentVariants}
          custom={wordIndex}
        >
          <HighlightedSegment segment={boldText} highlight={highlight} />
        </motion.span>
      );
    }

    // Process the word for italic text
    const { processed: processedWord, hasItalic } = processItalicText(word);

    // If word has italic formatting, use dangerouslySetInnerHTML
    if (hasItalic) {
      return (
        <motion.span 
          key={wordIndex}
          variants={segmentVariants}
          custom={wordIndex}
          dangerouslySetInnerHTML={{ __html: processedWord }}
        />
      );
    } else {
      // If no italic formatting, use regular children
      return (
        <motion.span 
          key={wordIndex}
          variants={segmentVariants}
          custom={wordIndex}
        >
          {word}
        </motion.span>
      );
    }
  };

  const renderLine = (line, lineIndex) => {
    if (!line || typeof line !== 'string') {
      return null;
    }

    // Split the line into words and filter out empty strings
    const words = line.split(" ").filter(word => word && word.trim() !== "");

    return (
      <motion.div
        key={lineIndex}
        className="inline-flex items-center gap-2 leading-snug"
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            {renderWord(word, wordIndex)}
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.div>
    );
  };

  const renderContent = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }

    const lines = text.split("\n").filter(line => line && line.trim() !== "");
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
