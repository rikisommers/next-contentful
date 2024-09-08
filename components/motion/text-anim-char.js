import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TextAnimationChar = ({ content, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {content &&
        content.split(" ").map((word, index) => (
          <motion.span key={index} style={{ display: "inline-block" }}>
            {word.split("").map((letter, letterIndex) => (
              <motion.span variants={character} key={letterIndex} style={{ display: "inline-block" }}>
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
