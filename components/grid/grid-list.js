import React, { useState, useRef } from "react";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from '../themeContext';
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";



export default function GridList({data}) {

    const { currentTheme } = useThemeContext();

    return (
        <div className="grid grid-cols-3 gap-6">
        {data.map((item, i) => (
            <div key={i}>
              <AnimatedElement type={AnimStyleEl.FADEIN}>
                {currentTheme.cardLayout === 'formal' && <PostTileCs post={item} />}
                {currentTheme.cardLayout === 'funky' && <PostTileLg post={item} />}
                {currentTheme.cardLayout === 'reone' && <PostTileRe post={item} />}
                {currentTheme.cardLayout === 'img' && <PostTileImg post={item} />}
              </AnimatedElement>
            </div>
        ))}
        </div>
    );
};
