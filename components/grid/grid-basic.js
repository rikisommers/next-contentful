import React from "react";
import { useThemeContext } from "../context/themeContext";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function GridBasic({ data }) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="@container">
      <h1 className="text-amber-200">List</h1>
      <div className="grid gap-6 grid-cols-1 @min-[475px]:grid-cols-2 @min-[768px]:grid-cols-3 @min-[1280px]:grid-cols-4 @min-[1440px]:grid-cols-4">
        {data.map((item, i) => (
          <AnimatedElement type={AnimStyleEl.FADEIN} delay={i * 0.1}>
            <div key={i} className="relative w-full h-full">
              {currentTheme.data.cardLayout === "formal" && (
                <PostTileCs post={item} />
              )}
              {currentTheme.data.cardLayout === "funky" && (
                <PostTileLg post={item} />
              )}
              {currentTheme.data.cardLayout === "reone" && (
                <PostTileRe post={item} />
              )}
              {currentTheme.data.cardLayout === "img" && (
                <PostTileImg post={item} />
              )}
              {currentTheme.data.cardLayout === "monks" && (
                <PostTileMonks post={item} />
              )}
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
}
