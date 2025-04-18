"use client";

import React, { useRef } from "react";
import { motion, useInView } from "../../utils/motion";;
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";
export const TextAnimLineFadeIn = ({
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
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.8,  // Shorter duration for movement
        },
        opacity: {
          ease: "easeOut",
          duration: 3,  // Longer duration for opacity (almost 2x longer)
          delay: 0.1,     // Small delay for opacity to start after movement begins
        }
      }
    },
  };

  const renderWord = (word, wordIndex) => {
    // Check for image markdown syntax
    const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
    if (imageMatch) {
      const [_, altText, url] = imageMatch;
      const imageUrl = url.startsWith("//") ? `https:${url}` : url;
      return (
        <img
          key={wordIndex}
          src={imageUrl}
          alt={altText}
          className="w-[40px] h-0"
          style={{
            maxWidth: "40px",
            height: "auto",
            display: "inline-block",
          }}
        />
      );
    }

    // Check for bold text (wrapped with __)
    const boldMatch = word.match(/^__(.*)__$/);
    if (boldMatch) {
      // Extract the text inside the __ markers
      const boldText = boldMatch[1];
      return (
        <HighlightedSegment
          key={wordIndex}
          segment={boldText}
          highlight={highlight}
        />
      );
    }

    // Process the word for italic text
    const { processed: processedWord, hasItalic } = processItalicText(word);

    // If word has italic formatting, use dangerouslySetInnerHTML
    if (hasItalic) {
      return (
        <span 
          key={wordIndex}
          dangerouslySetInnerHTML={{ __html: processedWord }}
        />
      );
    } else {
      // If no italic formatting, use regular children
      return <span key={wordIndex}>{word}</span>;
    }
  };

  const renderLine = (line, lineIndex) => {
    // Split the line into words and filter out empty strings
    const words = line.split(" ").filter(word => word.trim() !== "");

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
          {words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              {renderWord(word, wordIndex)}
              {wordIndex < words.length - 1 && " "}
            </React.Fragment>
          ))}
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
