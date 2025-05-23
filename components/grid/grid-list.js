import React from "react";
import { useThemeContext } from "../context/themeContext";
import PostTileCs from "../post/post-tile-cs";
import PostTileFunky from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function GridList({ data }) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="@container">
      <h1 className="text-amber-200">List</h1>
      <div className="flex flex-col gap-3">
        {data.map((item, i) => (
          <AnimatedElement type={AnimStyleEl.FADEIN} delay={i * 0.1}>
            <div key={i} className="relative h-[33vh] overflow-hidden">
              {currentTheme.data.cardLayout === "formal" && (
                <PostTileCs post={item}/>
              )}
              {currentTheme.data.cardLayout === "funky" && (
                <PostTileFunky post={item}/>
              )}
              {currentTheme.data.cardLayout === "reone" && (
                <PostTileRe post={item} layout="row"/>
              )}
              {currentTheme.data.cardLayout === "img" && (
                <PostTileImg post={item}/>
              )}
              {currentTheme.data.cardLayout === "monks" && (
                <PostTileMonks post={item} layout="row"/>
              )}
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
}
