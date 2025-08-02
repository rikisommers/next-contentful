import React, { useState } from "react";
import PostTileProjects from "../tile/post-tile-projects";
import CursorImage from "../cursor/cursor-image";

/**
 * @component
 * @category grid
 *
 * A vertical list with hover effects and custom cursor
 * Optimized for interactive content with hover states
 * Perfect for project showcases or interactive galleries
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the list
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export default function ListTextHover({
  data: items = [],
  className = "",
  style = {},
  ...props
}) {
  const [showCursor, setShowCursor] = useState(false);

  return (
    <>
      {showCursor && <CursorImage />}
      <div
        className={`grid grid-auto-rows-fr ${className}`}
        style={style}
        {...props}
      >
        {items.map((item, index) => (
          <div 
            className="relative"
            key={index}
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
          >
            <PostTileProjects post={item} />
          </div>
        ))}
      </div>
    </>
  );
}