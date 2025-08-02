import React from "react";
import { useThemeContext } from "../context/themeContext";
import PostTileText from "../tile/post-tile-text";

/**
 * @component
 * @category grid
 *
 * A vertical text-based list layout
 * Optimized for content that should be displayed in a single column with text focus
 * Perfect for articles, blog posts, or text-heavy content
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the list
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export default function ListText({
  data: items = [],
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={`grid grid-auto-rows-fr ${className}`}
      style={style}
      {...props}
    >
      <div className="flex flex-col gap-24 py-4 mx-auto max-w-screen-xl">
        {items.map((item, index) => (
          <PostTileText key={index} post={item} />
        ))}
      </div>
    </div>
  );
}