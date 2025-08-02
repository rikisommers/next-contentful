import React, { useState } from "react";
import PostTileProjects from "../tile/post-tile-projects";
import CursorImage from "../cursor/cursor-image";
import { motion } from "../../utils/motion"
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
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <>
      {showCursor && <CursorImage img={items[hoveredIndex].img} />}
      <div
        className={`grid grid-auto-rows-fr ${className}`}
        style={style}
        {...props}
      >
        {items.map((item, index) => (
          <div 
            className="relative"
            key={index}
            onMouseEnter={() => {
              setShowCursor(true);
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setShowCursor(false)}
          >

            {/* <motion.div className="absolute w-full h-full inset-0 z-10 bg-[var(--accent-pri)]" /> */}
            
            <PostTileProjects post={item} />
          </div>
        ))}
      </div>
    </>
  );
}