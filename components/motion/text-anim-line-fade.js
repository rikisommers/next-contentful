import React from "react";
import { motion } from "framer-motion";

export const TextAnimLineFadeIn = ({ content }) => {

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

  const line = {
    initial: {
      opacity: 0,
      rotateX: 0,
      y: "300px",
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

  const renderNewLine = (text, index) => (
    <motion.span
      key={index}
      variants={line}
      className={`inline`}
    >
      {text}
    </motion.span>
  );

  const renderTextAsLines = (text) => {
    if(text){
    const segments = text.split("\n");
    return segments.map((segment, index) => {
      return renderNewLine(segment, index);
    });
  }
  };

  return (

    <motion.span

         variants={container}
         initial="initial"
         animate="animate"
         style={{
          color: 'var(--subtext-color)',
        }}

         >
          {renderTextAsLines(content)}
    </motion.span>
  );
};
