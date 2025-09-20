import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useThemeContext } from "../context/themeContext";
import PostTile from "../tile/post-tile";
import PostTileListImg from "../tile/post-tile-list-img";

/**
 * Individual article item component with scroll-based animations
 */
function ArticleStackItem({ item, index, totalItems }) {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start start", "end start"] // Animation starts when top hits viewport top, ends when bottom hits viewport top
  });

  // Transform scroll progress to opacity
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  // Z-index: sticky items should be behind (lower z-index) active items
  const zIndex = useTransform(scrollYProgress, (progress) => {
    // When progress > 0, item is sticky, so use negative z-index (behind)
    // When progress = 0, item is active, so use positive z-index (in front)
    return progress > 0 ? -index : totalItems - index;
  });

  return (
    <div
      ref={itemRef}
      style={{
        position: 'sticky',
        top: 80,
        zIndex,
      }}
    >
      <motion.div 
        style={{
          opacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PostTileListImg post={item} />
      </motion.div>
    </div>
  );
}

/**
 * @component
 * @category grid
 *
 * A vertical stack layout with sticky positioning and scroll animations
 * Uses Framer Motion's useScroll and useTransform for smooth animations
 * Cards stick to the top of viewport with opacity and scale animations
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the stack
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
export default function ArticlesListStack({
  data: items = [],
  className = "",
  style = {},
  ...props
}) {

  return (
    <div
      className={`articles-list-stack ${className}`}
      style={{
        ...style,
        // Force a new stacking context that allows sticky positioning
        position: 'relative',
        height: 'auto',
        overflow: 'visible',
        transform: 'none',
        display: 'block', // Change from flex to block to avoid flex container issues
      }}
      {...props}
    >
      {items.map((item, index) => (
        <ArticleStackItem 
          key={item.sys?.id || index}
          item={item}
          index={index}
          totalItems={items.length}
        />
      ))}
    </div>
  );
}