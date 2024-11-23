import React, { useState, useRef } from "react";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from '../themeContext';
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";

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
              <AnimatedElement type={AnimStyleEl.FADEIN}>
                {currentTheme.cardLayout === 'formal' && <PostTileCs post={item} />}
                {currentTheme.cardLayout === 'funky' && <PostTileLg post={item} />}
                {currentTheme.cardLayout === 'reone' && <PostTileRe post={item} />}
                {currentTheme.cardLayout === 'img' && <PostTileImg post={item} />}
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

export default function GridBento({data}) {
    return (
    <GridGroup 
        items={data} 
        templateSize={6} 
        startIndex={0} 
    />
    );
};
