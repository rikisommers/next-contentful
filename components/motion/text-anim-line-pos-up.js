"use client";

import React, { useRef } from "react";
import { motion, useInView } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";
import { TextAnimImg } from "./text-anim-img";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";
/**
 * @component
 * @description Text that animates with lines moving up.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @example
 * // Line Position Up Text Animation
 * <TextAnimLinePosUp 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimLinePosUp = ({
  content,
  delay = 0,
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

  const renderWord = (word, wordIndex) => {
    // Check for image markdown syntax
    const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
    if (imageMatch) {
      const [_, altText, url] = imageMatch;
      const imageUrl = url.startsWith("//") ? `https:${url}` : url;
      return (
        <TextAnimImg
          key={wordIndex}
          imageUrl={imageUrl}
          altText={altText}
          index={wordIndex}
          delay={delay}
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

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }
    
    // First split by actual line breaks in the content
    const lines = text.split('\n').filter(line => line && line.trim() !== '');
    
    return lines.map((line, lineIndex) => {
      // Process each line for bold text
      const boldSegments = processTextWithBoldAndLineBreaks(line);
      
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
            {boldSegments.map((segmentData, segmentIndex) => {
              const segment = segmentData.content;
              const isBold = segmentData.isBold;
              
              if (isBold) {
                // Bold text
                return (
                  <HighlightedSegment
                    key={`bold-${segmentIndex}`}
                    segment={segment}
                    highlight={highlight}
                  />
                );
              } else {
                // Regular text - process words individually
                // Check for image markdown syntax first
                const imageMatch = segment.match(/!\[[^\]]*\]\((.*?)\)/);
                
                if (imageMatch) {
                  // Handle images in regular text
                  const beforeImage = segment.substring(0, imageMatch.index).trim();
                  const afterImage = segment.substring(imageMatch.index + imageMatch[0].length).trim();
                  
                  return (
                    <React.Fragment key={`img-${segmentIndex}`}>
                      {beforeImage && beforeImage.split(' ').map((word, wordIndex) => (
                        <React.Fragment key={`before-${wordIndex}`}>
                          {renderWord(word, wordIndex)}
                          {wordIndex < beforeImage.split(' ').length - 1 && " "}
                        </React.Fragment>
                      ))}
                      {afterImage && afterImage.split(' ').map((word, wordIndex) => (
                        <React.Fragment key={`after-${wordIndex}`}>
                          {renderWord(word, wordIndex)}
                          {wordIndex < afterImage.split(' ').length - 1 && " "}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                } else {
                  // Regular text processing
                  const words = segment.split(" ").filter(word => word && word.trim() !== "");
                  
                  return (
                    <React.Fragment key={`text-${segmentIndex}`}>
                      {words.map((word, wordIndex) => (
                        <React.Fragment key={wordIndex}>
                          {renderWord(word, wordIndex)}
                          {wordIndex < words.length - 1 && " "}
                        </React.Fragment>
                      ))}
                      {segmentIndex < boldSegments.length - 1 && " "}
                    </React.Fragment>
                  );
                }
              }
            })}
          </motion.div>
        </div>
      );
    });
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
        {renderTextWithBoldAndLineBreaks(content)}
      </span>
    </motion.div>
  );
};
