// TODO: Split into line and letter components
import React from "react";
import { motion } from "../utils/motion";
import PropTypes from "prop-types";

// Define the TextSize enum
const TextSize = {
  SMALL: "text-sm",
  MEDIUM: "text-base",
  LARGE: "text-lg",
  XLARGE: "text-xl",
  // Add other sizes as needed
};

// Define the AnimationType enum
const AnimationType = {
  LINEAR: "linear",
  RANDOM: "random",
  FADE_UP: "fade_up",
};

const TextAnimation = ({
  content,
  style,
  direction,
  size = TextSize.MEDIUM, // Default size
  color,
  animationType = AnimationType.RANDOM, // Default animation type
}) => {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
        staggerChildren: 0.123,
        duration: 0.1,
      },
    },
  };

  const opacity = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1.6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6, // custom duration for opacity property only
        },
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const position = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const randomOpacity = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: [0, 1],
      transition: {
        delay: Math.random() * 0.5,
        duration: 0.5,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const getAnimationVariant = (type) => {
    switch (type) {
      case AnimationType.RANDOM:
        return randomOpacity;
      case AnimationType.FADE_UP:
        return fadeUp;
      case AnimationType.LINEAR:
      default:
        return position;
    }
  };

  return (
    <motion.div variants={opacity} initial="hidden" animate="show" exit="exit">
      <motion.h1
        className="text-anim"
        key="text-wrapper"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delay: 2 }} // Add a delay to the start of the animation
      >
        {content &&
          content.split(" ").map((word, index) => (
            <motion.span
              variants={
                opacity
              }
              className={`text-anim-word overflow-hidden ${
                animationType === AnimationType.RANDOM ? "mask" : ""
              }`}
              key={index}
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  style={{color:'var(--heading-color)' }}
                  className={`text-anim-letter ${size}`}
                  variants={opacity}
                  key={letterIndex}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
      </motion.h1>
    </motion.div>
  );
};

// Define prop types
TextAnimation.propTypes = {
  content: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(TextSize)),
  animationType: PropTypes.oneOf(Object.values(AnimationType)),
};

export default TextAnimation;
export { TextSize, AnimationType };
