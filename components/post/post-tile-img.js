"use client";

import React from "react";
import FadeInWhenVisible from "../utils/fade-in-visible";
import BlendImage from "../image/blend-image";

export default function PostTileImg({ post }) {
  return (
    <div className="relative flex flex-col flex-grow overflow-hidden rounded-lg img-post">
      <div className="absolute flex top-3 left-3">
        {/* <p>{post.type }</p> */}
        {post?.type[0] === "case study" && (
          <span className="text-lg text-white material-icons">inventory_alt</span>
        )}
        {post?.type[0] === "blog post" && (
          <span className="text-white material-icons">article</span>
        )}
      </div>

      <div className="absolute top-0 left-0 z-50 flex items-end justify-between w-full h-full gap-4 px-4 pb-4 text-white ">

        {post.tags && (
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag, index) => {
              return (
                <div
                  key={index}
                  className="text-xs text-slate-400 uppercase py-0.5 px-1.5 bg-slate-800 rounded-md"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-4 text-xs">
          <span>DATE</span>
        </div>
      </div>
      {/* 
<motion.div style={{y}}>     
</motion.div> */}

      <FadeInWhenVisible color={post?.color}>
        <BlendImage
          className="img-cover"
          color={post?.color}
          alt={`Cover Image for ${post?.title}`}
          src={post.img.url}
        />
      </FadeInWhenVisible>
    </div>
  );
}
