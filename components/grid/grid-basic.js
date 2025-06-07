import React from "react";
import { useThemeContext } from "../context/themeContext";
import { gridGapClasses } from "../../utils/theme";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";
import classNames from 'classnames';

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
}) {
  const { currentTheme } = useThemeContext();
  const gapClass = gridGapClasses[currentTheme.data.gridGap] || 'gap-4';

  const gridColsSm = {
    1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
    4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6',
  };

  const gridColsMd = {
    1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
    4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6',
  };

  const gridColsLg = {
    1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6',
  };

  const gridColsXl = {
    1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4', 5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6',
  };

  const gridClassName = classNames(
    'grid',
    gapClass,
    gridColsSm[currentTheme.data.gridColumnsSm],
    gridColsMd[currentTheme.data.gridColumnsMd],
    gridColsLg[currentTheme.data.gridColumnsLg],
    gridColsXl[currentTheme.data.gridColumnsXl],
  );

  return (
    <div className={gridClassName}>
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
          {currentTheme.data.cardLayout === 'img' && <PostTileImg post={item} />}
        </div>
      ))}
    </div>
  );
}
