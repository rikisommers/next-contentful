import React from "react";
import { useThemeContext } from "../context/themeContext";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";

/**
 * @component
 * @category grid
 * 
 * A responsive basic grid component with container queries
 * Uses CSS container queries to adapt layout based on container width
 * Provides consistent spacing and alignment across different screen sizes
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the grid
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * 
 * @example
 * <GridBasic 
 *   data={[
 *     {
 *       title: "Interactive Web App",
 *       subtitle: "Modern React application with seamless user experience",
 *       slug: "interactive-web-app",
 *       color: "#6366f1",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Interactive web application"
 *       }
 *     },
 *     {
 *       title: "E-commerce Platform",
 *       subtitle: "Full-stack shopping experience with modern design",
 *       slug: "ecommerce-platform",
 *       color: "#f59e0b",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "E-commerce platform"
 *       }
 *     },
 *     {
 *       title: "Brand Identity System",
 *       subtitle: "Complete visual identity and brand guidelines",
 *       slug: "brand-identity-system",
 *       color: "#ec4899",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Brand identity system"
 *       }
 *     },
 *     {
 *       title: "Mobile App Design",
 *       subtitle: "Native iOS and Android application interface",
 *       slug: "mobile-app-design",
 *       color: "#10b981",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Mobile app design"
 *       }
 *     },
 *     {
 *       title: "Dashboard Analytics",
 *       subtitle: "Data visualization and business intelligence tool",
 *       slug: "dashboard-analytics",
 *       color: "#8b5cf6",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Dashboard analytics"
 *       }
 *     }
 *   ]}
 * />
 */
export default function GridBasic({ 
  data: items = [], 
  className = '', 
  style = {},
  ...props 
}) {
  const { currentTheme } = useThemeContext();

  return (
    <div 
      className={`grid-basic ${className}`}
      style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        containerType: 'inline-size',
        width: '100%',
        ...style
      }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            minHeight: '400px',
            transition: 'transform 0.3s ease',
          }}
        >
               {currentTheme.data.cardLayout === 'formal' && <PostTileCs post={item} />}
                {currentTheme.data.cardLayout === 'funky' && <PostTileLg post={item} />}
                {currentTheme.data.cardLayout === 'reone' && <PostTileRe post={item} />}
                {currentTheme.data.cardLayout === 'monks' && <PostTileMonks post={item} />}
                {currentTheme.data.cardLayout === 'img' && <PostTileImg post={item} />}        </div>
      ))}
    </div>
  );
}
