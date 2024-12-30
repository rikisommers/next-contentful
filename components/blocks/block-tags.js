import React from "react";
import { useThemeContext } from "../context/themeContext";
import Button, { ButtonType } from "../base/button";
import { motion } from "framer-motion";

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

  return (
    <nav className="flex gap-1 mb-8">
      <motion.button
        onClick={() => handleTagClick(null)}
        className="relative flex items-center px-3 py-2 text-xs uppercase transition-colors border border-solid rounded-md cursor-pointer"
        style={getButtonStyle(
          selected === null ? ButtonType.ACTIVE : ButtonType.DEFAULT
        )}
      >
        All
      </motion.button>




      {data &&
        data
          .filter((tag) => tag !== null)
          .map((tag, index) => (
            <motion.button
              key={index}
              className="relative z-50 flex items-center px-3 py-2 text-xs uppercase transition-colors rounded-md cursor-pointer"
              style={getButtonStyle(
                selected === tag ? ButtonType.ACTIVE : ButtonType.DEFAULT
              )}
              onClick={() => handleTagClick(tag)}
            >
              {selected === tag && (
                <motion.div
                  layoutId="indicatorTag"
                  style={{
                    borderColor:`${
                      selected === tag
                    ? currentTheme.accentPri
                    : "transparent"
                }`,
                
                    // boxShadow: `0 10px 15px -3px ${currentTheme.navShadow}, 0 4px 49px -4px ${currentTheme.navShadow}`,
                  }}
                  className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 border border-solid rounded-md"
                ></motion.div>
              )}

              {tag}
            </motion.button>
          ))}
    </nav>
  );
};

export default BlockTags;
