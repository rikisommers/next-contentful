import React from "react";
import { useThemeContext } from '../context/themeContext';
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile.monks";

export default function GridList({data}) {

    const { currentTheme } = useThemeContext();

    return (
        <div className="@container">
            <div className="grid gap-6 grid-cols-1 @min-[475px]:grid-cols-2 @min-[768px]:grid-cols-3 @min-[1280px]:grid-cols-4 @min-[1440px]:grid-cols-4">
            {data.map((item, i) => (
                <div key={i} className="relative">
                    {currentTheme.data.cardLayout === 'formal' && <PostTileCs post={item} />}
                    {currentTheme.data.cardLayout === 'funky' && <PostTileLg post={item} />}
                    {currentTheme.data.cardLayout === 'reone' && <PostTileRe post={item} />}
                    {currentTheme.data.cardLayout === 'img' && <PostTileImg post={item} />}
                    {currentTheme.data.cardLayout === 'monks' && <PostTileMonks post={item} />}
                </div>
            ))}
            </div>
        </div>
    );
};
