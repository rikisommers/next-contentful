import React from "react";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from '../context/themeContext';
import PostTileCs from "../tile/post-tile-cs";
import PostTileLg from "../tile/post-tile-funky";
import PostTileImg from "../tile/post-tile-img";
import PostTileRe from "../tile/post-tile-reone";
import PostTileMonks from "../tile/post-tile-monks";

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

export default function GridJonas({data}) {
    return (
    <GridGroup 
        items={data} 
        startIndex={0} 
    />
    );
};
