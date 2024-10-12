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

  const imageMatch = content.match(/!\[([^\]]*)\]\((.*?)\)/); // Check for image syntax
  if (imageMatch) {
    const altText = imageMatch[1]; // Get alt text
    const imageUrl = imageMatch[2].startsWith("//")
      ? `https:${imageMatch[2]}`
      : imageMatch[2]; // Ensure the URL is complete
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="relative inline-block rounded-full w-[30px] h-[30px] overflow-hidden mx-1 leading-normal bg-slate-300"
      >
        <img
          src={imageUrl}
          alt={altText}
          style={{
            maxWidth: "60px",
            height: "auto",
            display: "inline-block",
          }} // Adjust styles as needed
        />
      </motion.div>
    );
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      JJ
      {content &&
        content.split(" ").map((word, index) => (
          <motion.span key={index} 
          style={{
            color: "var(--heading-color)",
            display: "inline-block",
          }}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
               variants={character} 
               key={letterIndex} 
               style={{ display: "inline-block" }}>
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
