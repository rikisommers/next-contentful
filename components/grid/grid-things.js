import React from "react";
import { useThemeContext } from "../context/themeContext";
import { gridGaps, gridGapClasses } from "../../utils/theme";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";
import PostTileFunky from '../post/post-tile-funky';

/**
 * @component
 * @category grid
 * 
 * A gallery-style grid for showcasing visual content
 * Optimized for images and media with consistent aspect ratios
 * Features hover effects and smooth transitions
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display in the gallery
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * 
 * @example
 * <GridThings 
 *   items={[
 *     {
 *       title: "Digital Art Gallery",
 *       subtitle: "Contemporary digital artwork and installations",
 *       slug: "digital-art-gallery",
 *       color: "#7c2d12",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Digital art gallery"
 *       }
 *     },
 *     {
 *       title: "Product Design System",
 *       subtitle: "Comprehensive design tokens and components",
 *       slug: "product-design-system",
 *       color: "#1e40af",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Product design system"
 *       }
 *     },
 *     {
 *       title: "Gaming Platform UI",
 *       subtitle: "Interactive gaming interface and user experience",
 *       slug: "gaming-platform-ui",
 *       color: "#991b1b",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Gaming platform UI"
 *       }
 *     },
 *     {
 *       title: "SaaS Dashboard Design",
 *       subtitle: "Enterprise software interface and workflow",
 *       slug: "saas-dashboard-design",
 *       color: "#065f46",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "SaaS dashboard design"
 *       }
 *     },
 *     {
 *       title: "Non-Profit Campaign",
 *       subtitle: "Social impact website and donation platform",
 *       slug: "non-profit-campaign",
 *       color: "#7e22ce",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Non-profit campaign"
 *       }
 *     }
 *   ]}
 * />
 */
// export default function GridThings({ 
//   items = [], 
//   className = '', 
//   style = {},
//   ...props 
// }) {
//   return (
//     <div 
//       className={`grid-things ${className}`}
//       style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//         gap: '1.5rem',
//         width: '100%',
//         ...style
//       }}
//       {...props}
//     >
//       {items.map((item, index) => (
//         <div
//           key={index}
//           style={{
//             aspectRatio: '4/3',
//             borderRadius: '12px',
//             overflow: 'hidden',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             cursor: 'pointer',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'translateY(-4px)';
//             e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
//           }}
//         >
//           <PostTileFunky post={item} index={index} />
//         </div>
//       ))}
//     </div>
//   );
// }


export default function GridThings({
   data,
   className = '', 
   style = {},
   ...props 
}) {
  const { currentTheme } = useThemeContext();
  const gapClass = gridGapClasses[currentTheme.data.gridGap] || 'gap-4';
  const themeData = currentTheme.data;
  
  const colClasses = [
    themeData.gridColumnsSm && `grid-cols-${themeData.gridColumnsSm}`,
    themeData.gridColumnsMd && `md:grid-cols-${themeData.gridColumnsMd}`,
    themeData.gridColumnsLg && `lg:grid-cols-${themeData.gridColumnsLg}`,
    themeData.gridColumnsXl && `xl:grid-cols-${themeData.gridColumnsXl}`
  ].filter(Boolean).join(' ');

  return (
    <div className="@container"
          style={{
            ...style
          }}
          {...props}
    >
      <div className={`${currentTheme.data.gridGallery === "gallery1" ? "grid-gallery" : "grid-gallery2"} ${gapClass} ${colClasses}`}>
        {data.map((item, i) => (
            <div key={i} className="grid__item">
              {currentTheme.data.cardLayout === "formal" && (
                <PostTileCs post={item} />
              )}
              {currentTheme.data.cardLayout === "funky" && (
                <PostTileLg post={item} />
              )}
              {currentTheme.data.cardLayout === "reone" && (
                <PostTileRe post={item} layout="col" />
              )}
              {currentTheme.data.cardLayout === "img" && (
                <PostTileImg post={item} />
              )}
              {currentTheme.data.cardLayout === "monks" && (
                <PostTileMonks post={item} />
              )}
            </div>
        ))}
      </div>
    </div>
  );
}

const GridGroup = ({ items, templateSize, startIndex }) => {
    if (items.length === 0) return null;
  
    const { currentTheme } = useThemeContext();

    const groupItems = items.slice(0, templateSize);
    const remainingItems = items.slice(templateSize);
  
    // let nextTemplateSize;
    // if (templateSize === 6) nextTemplateSize = 4;
    // else if (templateSize === 4) nextTemplateSize = 4;
    // else if (templateSize === 2) nextTemplateSize = 2;
    // else nextTemplateSize = 6;
  
    return (
      <>
      <h1 className="text-amber-200">Things</h1>
        <div className={`grid-gallery`}>
          {groupItems.map((item, i) => (
            <div key={startIndex + i}>
              <AnimatedElement type={AnimStyleEl.FADEIN} delay={i * 0.1}>
                {currentTheme.data.cardLayout === 'formal' && <PostTileCs post={item} />}
                {currentTheme.data.cardLayout === 'funky' && <PostTileLg post={item} />}
                {currentTheme.data.cardLayout === 'reone' && <PostTileRe post={item} />}
                {currentTheme.data.cardLayout === 'monks' && <PostTileMonks post={item} />}
                {currentTheme.data.cardLayout === 'img' && <PostTileImg post={item} />}
              </AnimatedElement>
            </div>
          ))}
        </div>
        <GridGroup 
          items={remainingItems} 
        />
      </>
    );
  };
