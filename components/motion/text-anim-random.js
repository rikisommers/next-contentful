"use client";

import React from "react";
import { motion } from "../../utils/motion";

// Global animation configuration variables
const ANIMATION_CONFIG = {
  // Character animation settings
  CHAR_DELAY_MAX: 0.8, // Maximum random delay for characters (in seconds)
  CHAR_DURATION: 0.3,  // Duration of character animation (in seconds)
  
  // Image animation settings
  IMG_DELAY_MAX: 0.8,  // Maximum random delay for images (in seconds)
  IMG_DURATION: 0.2,   // Duration of image animation (in seconds)
  
  // Container animation settings
  CONTAINER_DURATION: 0.3, // Duration of container animation (in seconds)
};

export const TextAnimRandom = ({ content }) => {

  const renderCharacter = (char, index) => {
    const delay = Math.random() * ANIMATION_CONFIG.CHAR_DELAY_MAX;

    return (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_CONFIG.CHAR_DURATION, delay }}
      >
        {char}
      </motion.span>
    );
  };

  const renderColoredText = (text, index) => {
    // Check for italic text within bold segments
    const italicParts = text.split(/(\*[^*]+\*)/g);
    
    if (italicParts.length > 1) {
      return (
        <motion.span
          style={{
            color: 'var(--text-accent)',
          }}
          key={index}
        >
          {italicParts.map((part, partIndex) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              // Remove asterisks and render as italic
              const italicText = part.substring(1, part.length - 1);
              return (
                <motion.span
                  style={{
                    fontStyle: 'italic',
                  }}
                  key={`italic-${index}-${partIndex}`}
                >
                  {italicText.split('').map(renderCharacter)}
                </motion.span>
              );
            } else {
              // Render as normal bold text
              return part.split('').map((char, charIndex) => 
                renderCharacter(char, `${index}-${partIndex}-${charIndex}`)
              );
            }
          })}
        </motion.span>
      );
    }
    
    // No italic text found, render as normal bold text
    return (
      <motion.span
        style={{
          color: 'var(--text-accent)',
        }}
        key={index}
      >
        {text.split('').map(renderCharacter)}
      </motion.span>
    );
  };

  const renderItalicText = (text, index) => (
    <motion.span
      style={{
        fontStyle: 'italic',
      }}
      key={`italic-${index}`}
    >
      {text.split('').map(renderCharacter)}
    </motion.span>
  );

  const renderImage = (altText, imageUrl, index) => {
    const delay = Math.random() * ANIMATION_CONFIG.IMG_DELAY_MAX;
    
    return (
      <motion.span
        key={`img-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_CONFIG.IMG_DURATION, delay }}
        className="inline-block px-2"
      >
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-[40px] h-auto inline-block"
        />
      </motion.span>
    );
  };

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (text) {
      const boldSegments = text.split("__");
      return boldSegments.map((segment, index) => {
        if (index % 2 === 0) {
          const lines = segment.split("\n");
          return lines.map((line, lineIndex) => {
            // Check for image markdown syntax
            const imageMatch = line.match(/!\[([^\]]*)\]\((.*?)\)/);
            
            if (imageMatch) {
              const [_, altText, url] = imageMatch;
              const imageUrl = url.startsWith("//") ? `https:${url}` : url;
              
              // Extract text before and after the image
              const beforeImage = line.substring(0, imageMatch.index).trim();
              const afterImage = line.substring(imageMatch.index + imageMatch[0].length).trim();
              
              return (
                <motion.span
                  className={lineIndex === 0 ? "inline" : "block"}
                  key={`${index}-${lineIndex}`}
                >
                  {beforeImage && beforeImage.split('').map(renderCharacter)}
                  {renderImage(altText, imageUrl, `${index}-${lineIndex}`)}
                  {afterImage && afterImage.split('').map(renderCharacter)}
                </motion.span>
              );
            }
            
            // Check for italic text (text enclosed in asterisks)
            const italicParts = line.split(/(\*[^*]+\*)/g);
            
            if (italicParts.length > 1) {
              return (
                <motion.span
                  className={lineIndex === 0 ? "inline" : "block"}
                  key={`${index}-${lineIndex}`}
                >
                  {italicParts.map((part, partIndex) => {
                    if (part.startsWith('*') && part.endsWith('*')) {
                      // Remove asterisks and render as italic
                      const italicText = part.substring(1, part.length - 1);
                      return renderItalicText(italicText, `${index}-${lineIndex}-${partIndex}`);
                    } else {
                      // Render as normal text
                      return part.split('').map((char, charIndex) => 
                        renderCharacter(char, `${index}-${lineIndex}-${partIndex}-${charIndex}`)
                      );
                    }
                  })}
                </motion.span>
              );
            }
            
            return (
              <motion.span
                className={lineIndex === 0 ? "inline" : "block"}
                key={`${index}-${lineIndex}`}
              >
                {line.split('').map(renderCharacter)}
              </motion.span>
            );
          });
        } else {
          return renderColoredText(segment, index);
        }
      });
    }
  };

  return (
    <motion.span
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION_CONFIG.CONTAINER_DURATION }}
      style={{
        color:  'var(--heading-color)',
      }}
     
    >
      {renderTextWithBoldAndLineBreaks(content)}
 
    </motion.span>
  );
}