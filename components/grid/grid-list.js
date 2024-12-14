import React, { useState, useRef } from "react";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from '../context/themeContext';
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile.monks";


export default function GridList({data}) {

    const { currentTheme } = useThemeContext();

    return (
        <div className="grid grid-cols-3 gap-6">
        {data.map((item, i) => (
            <div key={i} class="relative">
                {currentTheme.cardLayout === 'formal' && <PostTileCs post={item} />}
                {currentTheme.cardLayout === 'funky' && <PostTileLg post={item} />}
                {currentTheme.cardLayout === 'reone' && <PostTileRe post={item} />}
                {currentTheme.cardLayout === 'img' && <PostTileImg post={item} />}
                {currentTheme.cardLayout === 'monks' && <PostTileMonks post={item} />}
            </div>
        ))}
        </div>
    );
};
