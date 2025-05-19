import React from "react";
import { useThemeContext } from "../context/themeContext";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-funky";
import PostTileImg from "../post/post-tile-img";
import PostTileRe from "../post/post-tile-reone";
import PostTileMonks from "../post/post-tile-monks";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function GridThings({ data }) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="@container">
      <h1 className="text-amber-200">Grid Things</h1>
      <div className={`${currentTheme.data.gridGallery === "gallery1" ? "grid-gallery" : "grid-gallery2"}`}>
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
