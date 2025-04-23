import React from "react";
import { useThemeContext } from "../context/themeContext";
import Button, { ButtonType } from "../base/button/button";
import { motion } from "../../utils/motion";

export const BlockTags = ({ data, selected, handleTagClick }) => {
  const { currentTheme } = useThemeContext();

  const getButtonStyle = (type) => {
    switch (type) {
      case ButtonType.DEFAULT:
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "var(--subtext-color)",
        };
      case ButtonType.ACTIVE:
        return {
          backgroundColor: "transparent",
          //borderColor: "var(--accent-pri)",
          color: "var(--accent-pri)",
        };
      default:
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "var(--subtext-color)",
        };
    }
  };

  const indicatorAnimate = {
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.05,
      },
    },
    initial: {
      opacity: 0.9,
      scale: 0.9,
    },
  };

  return (
    <nav className="relative flex gap-1 mb-8">
    {[null, ...data.filter((tag) => tag !== null)].map((tag, index) => (
      <motion.button
        key={index}
        className="relative z-50 flex items-center px-3 py-2 text-xs uppercase transition-colors rounded-md cursor-pointer"
        style={getButtonStyle(selected === tag ? ButtonType.ACTIVE : ButtonType.DEFAULT)}
        onClick={() => handleTagClick(tag)}
        layout
      >
        {selected === tag && (
          <motion.div
            layoutId="indicatorTag2"
            className="absolute top-0 left-0 w-full h-full border border-solid rounded-md"
            style={{ borderColor: currentTheme.data.accentPri }}
          />
        )}
        {tag === null ? "All" : tag}
      </motion.button>
    ))}
  </nav>
  );
};

export default BlockTags;
