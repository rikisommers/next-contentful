import React from "react";
import PropTypes from "prop-types";
import { useThemeContext } from "../context/themeContext";
import Button, { ButtonType } from "../base/button/button";
import { motion } from "../../utils/motion";

/**
 * Tag filter navigation component that displays a row of selectable tag buttons
 * with animated active indicator. Used to filter articles or content by tag.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {string[]} props.data - Array of tag strings to display as filter buttons
 * @param {string|null} props.selected - Currently selected tag, or null for "All"
 * @param {Function} props.handleTagClick - Callback fired when a tag is clicked, receives the tag string or null
 * @example
 * // Tag filter with a selection
 * <BlockTags
 *   data={["React", "Design", "JavaScript"]}
 *   selected="React"
 *   handleTagClick={(tag) => console.log("Selected:", tag)}
 * />
 * @example
 * // Tag filter with no selection (shows "All" as active)
 * <BlockTags
 *   data={["Frontend", "Backend", "DevOps"]}
 *   selected={null}
 *   handleTagClick={(tag) => setSelectedTag(tag)}
 * />
 */
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
    <nav className="flex relative flex-wrap gap-1 ">
    {[null, ...data.filter((tag) => tag !== null)].map((tag, index) => (
      <motion.button
        key={index}
        className="flex relative z-50 items-center px-3 py-2 text-xs  rounded-md transition-colors cursor-pointer"
        style={getButtonStyle(selected === tag ? ButtonType.ACTIVE : ButtonType.DEFAULT)}
        onClick={() => handleTagClick(tag)}
        layout
      >
        {selected === tag && (
          <motion.div
            layoutid="indicatorTag2"
            className="absolute top-0 left-0 w-full h-full rounded-md border border-solid"
            style={{ borderColor: currentTheme.data.accentPri }}
          />
        )}
        {tag === null ? "All" : tag}
      </motion.button>
    ))}
  </nav>
  );
};

BlockTags.propTypes = {
  /** Array of tag strings to display as filter buttons */
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Currently selected tag, or null for "All" */
  selected: PropTypes.string,
  /** Callback fired when a tag is clicked */
  handleTagClick: PropTypes.func.isRequired,
};

export default BlockTags;
