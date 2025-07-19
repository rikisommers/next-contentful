import React, { useState } from "react";
import { useThemeContext } from "../context/themeContext";
import { gridGaps, gridGapClasses } from "../../utils/theme";
import { listThemes } from "../../utils/theme";
import PostTileHovertext from "../tile/post-tile-hovertext";
import PostTileText from "../tile/post-tile-text";
import PostTileProjects from "../tile/post-tile-projects";
import CursorImage from "../cursor/cursor-image";
/**
 * @component
 * @category grid
 *
 * A vertical list-style grid layout
 * Optimized for content that should be displayed in a single column
 * Perfect for articles, blog posts, or sequential content
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the list
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 *
 * @example
 * <GridList
 *   data={[
 *     {
 *       title: "Photography Portfolio",
 *       subtitle: "Professional photography showcase and gallery",
 *       slug: "photography-portfolio",
 *       color: "#6b7280",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Photography portfolio"
 *       }
 *     },
 *     {
 *       title: "Architecture Studio",
 *       subtitle: "Modern architectural designs and concepts",
 *       slug: "architecture-studio",
 *       color: "#0f172a",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Architecture studio"
 *       }
 *     },
 *     {
 *       title: "Fashion Brand Website",
 *       subtitle: "Luxury fashion e-commerce and brand experience",
 *       slug: "fashion-brand-website",
 *       color: "#be185d",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Fashion brand website"
 *       }
 *     },
 *     {
 *       title: "Music Streaming App",
 *       subtitle: "Audio streaming platform with social features",
 *       slug: "music-streaming-app",
 *       color: "#1d4ed8",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Music streaming app"
 *       }
 *     },
 *     {
 *       title: "Travel Blog Platform",
 *       subtitle: "Adventure stories and destination guides",
 *       slug: "travel-blog-platform",
 *       color: "#059669",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Travel blog platform"
 *       }
 *     }
 *   ]}
 * />
 */
export default function GridList({
  data: items = [],
  className = "",
  style = {},
  ...props
}) {
  const { currentTheme } = useThemeContext();
  const gapClass = gridGapClasses[currentTheme.data.gridGap] || "gap-4";
  const [showCursor, setShowCursor] = useState(false);

  const getListType = (type, data) => {
    switch (type) {
        case listThemes.text:
            return <div className="flex flex-col gap-24 py-4 mx-auto max-w-screen-xl"><PostTileText post={data} /></div>;
        case listThemes.hovertext:
            return <PostTileProjects post={data} />;
        default:
            return <PostTileProjects post={data} />;
    }
};

  return (
    <>
      {showCursor && <CursorImage />}
      <div
        className={`grid grid-auto-rows-fr ${className}`}
      >
       
        {items.map((item, index) => (
          <div 
            className="relative"
            key={index}
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
          >
            {getListType(currentTheme.data.listLayout, item)}

          </div>
        ))}
      </div>
    </>
  );
}
