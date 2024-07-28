import React from "react";
import { motion } from "framer-motion";

const TextAnimationChar = ({ content }) => {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delay: 0, // Delay before starting the animation
        staggerChildren: 0.1, // Delay between each character's animation
      },
    },
  };

  const character = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6, // Duration for each character's opacity transition
        ease: [0.33, 1, 0.68, 1], // Custom easing function for the opacity transition
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.span variants={container} initial="hidden" animate="show" exit="exit">
      {content &&
        content.split(" ").map((word, index) => (
          <motion.span key={index}>
            {word.split("").map((letter, letterIndex) => (
              <motion.span variants={character} key={letterIndex}>
                {letter}
              </motion.span>
            ))}
            &nbsp;
          </motion.span>
        ))}
    </motion.span>
  );
};

export default TextAnimationChar;
