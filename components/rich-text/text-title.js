import React, { Children } from "react";
import { motion } from "framer-motion";
import FadeInWhenVisible from "../utils/fade-in-visible";

export const TextTitle = ({ content, color, children }) => {
  
  
  const container = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
        staggerChildren: 0.123,
        duration: 0.3,
      },
    },
  };

  const lines = {
    initial: {
      opacity: 0,
      rotateX: 0,
      y: "30px",
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        // delay: 0.5, // Add a delay to the start of the animation
        ease: [0.33, 1, 0.68, 1],
        duration: 1.2,
      },
    },
  };

  const test = {
    initial: {
      opacity: 0,
      rotateX: 0,
      y: "30px",
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        // delay: 0.5, // Add a delay to the start of the animation
        ease: [0.33, 1, 0.68, 1],
        duration: 1.2,
      },
    },
  };
  
  // Function to render bold text
  const renderColoredText = (text, index) => (
    <motion.span
          className={color}
            // variants={test} 
            key={index}>{text}</motion.span>
  );



  // Function to render text with bold elements and line breaks
  const renderTextWithBoldAndLineBreaks = (text) => {
    const boldSegments = text.split("__"); // Split text by bold elements
    return boldSegments.map((segment, index) => {
      if (index % 2 === 0) {
        // Non-bold segment: check for line breaks
        const lines = segment.split("\n"); // Split segment by line breaks
        return lines.map((line, lineIndex) => (
          <motion.span
            className="inline"
            // variants={test}
            key={`${index}-${lineIndex}`}
          >
            {lineIndex === 0 ? 
            <motion.span 
            className="inline"
            // variants={test}  
            >
              {line}
              </motion.span> 
              : 
              <motion.span 
              className="block"
              // variants={test}
              >
                {line}
                </motion.span>
                }
          </motion.span>
        ));
      } else {
        // Bold segment: render as bold text
        return renderColoredText(segment, index);
      }
    });
  };
  

  return (
    <motion.h1 
    initial={{
      opacity:0
    }}
    animate={{
      opacity:1
    }}
    // variants={container}
    // initial="initial"
    // animate="animate"
    className="text-5xl">
      {renderTextWithBoldAndLineBreaks(content)}
      <motion.span
             className="block"
            // variants={test}
            transition={{
              delay:1.2
            }}>
      {children}
      </motion.span>
    </motion.h1>
  );
};
