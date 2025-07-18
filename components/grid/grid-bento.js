import React from "react";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from '../context/themeContext';
import PostTileCs from "../tile/post-tile-cs";
import PostTileLg from "../tile/post-tile-funky";
import PostTileImg from "../tile/post-tile-img";
import PostTileRe from "../tile/post-tile-reone";
import PostTileMonks from "../tile/post-tile-monks";
import PostTileFunky from '../tile/post-tile-funky';
import { useDeclarativeAudio } from '../audio/audio-trigger';

/**
 * @component
 * @category grid
 * 
 * A dynamic bento-style grid with intelligent sizing
 * Creates visually interesting layouts with varying item sizes
 * Uses CSS Grid with dynamic template areas and span calculations
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to display in the bento grid
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * 
 * @example
 * <GridBento 
 *   data={[
 *     {
 *       title: "Creative Portfolio",
 *       subtitle: "Showcase of artistic and creative projects",
 *       slug: "creative-portfolio",
 *       color: "#f97316",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Creative portfolio"
 *       }
 *     },
 *     {
 *       title: "Tech Startup Landing",
 *       subtitle: "Modern landing page for technology company",
 *       slug: "tech-startup-landing",
 *       color: "#3b82f6",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Tech startup landing"
 *       }
 *     },
 *     {
 *       title: "Restaurant Website",
 *       subtitle: "Elegant dining experience with online reservations",
 *       slug: "restaurant-website",
 *       color: "#dc2626",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Restaurant website"
 *       }
 *     },
 *     {
 *       title: "Fitness App Interface",
 *       subtitle: "Health tracking and workout planning application",
 *       slug: "fitness-app-interface",
 *       color: "#059669",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Fitness app interface"
 *       }
 *     },
 *     {
 *       title: "Financial Dashboard",
 *       subtitle: "Investment tracking and portfolio management",
 *       slug: "financial-dashboard",
 *       color: "#7c3aed",
 *       img: {
 *         url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
 *         width: 800,
 *         height: 600,
 *         description: "Financial dashboard"
 *       }
 *     }
 *   ]}
 * />
 */
export default function GridBento({ 
  data: items = [], 
  className = '', 
  style = {},
  ...props 
}) {
  
  const { currentTheme } = useThemeContext();

  const getItemSize = (index) => {
    const patterns = [
      { gridColumn: 'span 2', gridRow: 'span 2' }, // Large
      { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
      { gridColumn: 'span 1', gridRow: 'span 2' }, // Tall
      { gridColumn: 'span 2', gridRow: 'span 1' }, // Wide
      { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div 
      className={`grid-bento ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gridAutoRows: '200px',
        gap: '1rem',
        width: '100%',
        ...style
      }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            ...getItemSize(index),
            transition: 'transform 0.3s ease',
            minHeight: '200px',
          }}
        >
{currentTheme.data.cardLayout === 'formal' && (
                  <PostTileCs 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'funky' && (
                  <PostTileLg 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'reone' && (
                  <PostTileRe 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'monks' && (
                  <PostTileMonks 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'img' && (
                  <PostTileImg 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
        </div>
      ))}
    </div>
  );
}

const GridGroup = ({ items, templateSize, startIndex }) => {
    if (items.length === 0) return null;
  
    const { currentTheme } = useThemeContext();

    const groupItems = items.slice(0, templateSize);
    const remainingItems = items.slice(templateSize);

    let nextTemplateSize;
    if (templateSize === 6) nextTemplateSize = 4;
    else if (templateSize === 4) nextTemplateSize = 4;
    else if (templateSize === 2) nextTemplateSize = 2;
    else nextTemplateSize = 6;
  
    return (
      <>
        <div className={`grid-template-${templateSize}`}>
          {groupItems.map((item, i) => (
            <div key={startIndex + i} className={`my--${i + 1}`}>
              <AnimatedElement type={AnimStyleEl.FADEIN} delay={i * 0.1}>
                {currentTheme.data.cardLayout === 'formal' && (
                  <PostTileCs 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'funky' && (
                  <PostTileLg 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'reone' && (
                  <PostTileRe 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'monks' && (
                  <PostTileMonks 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
                {currentTheme.data.cardLayout === 'img' && (
                  <PostTileImg 
                    post={item} 
                    data-audio-click="beepOn"
                    data-audio-hover="plink"
                  />
                )}
              </AnimatedElement>
            </div>
          ))}
        </div>
        <GridGroup 
          items={remainingItems} 
          templateSize={nextTemplateSize} 
          startIndex={startIndex + templateSize} 
        />
      </>
    );
  };
