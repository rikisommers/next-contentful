"use client";

import React from "react";
import { motion } from "../../utils/motion";

/**
 * @component
 * @description Text that animates character by character with a typing effect.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} [delay=0] - The delay in seconds before the animation starts.
 * @example
 * // Character Text Animation
 * <TextAnimChar 
 *   content="A __modular__, __themable__ website template for __Designers__, __Developers__ and __Agencies__."
 *   delay={0}
 * />
 */
export const TextAnimChar = ({ content, delay = 0 }) => {
  const characters = content.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: i * delay },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ marginRight: char === " " ? "0.25rem" : "0" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
