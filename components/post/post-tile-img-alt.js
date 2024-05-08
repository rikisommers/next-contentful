import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import FadeInWhenVisible from "../utils/fade-in-visible";
import BlendImage from "../image/blend-image";

export default function PostTileImgAlt({ post }) {
  return (
    <div className="flex flex-col flex-grow rounded-lg overflow-hidden relative img-post">
        <div className="absolute z-50 w-full h-full flex gap-4 justify-between items-start top-0 left-0 px-4 py-4 text-white ">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {post?.type[0] === "case study" && (
                  <>
                    <span className="material-icons text-white text-lg w-1">
                      inventory_alt
                    </span>
                    Case study
                  </>
                )}
                {post?.type[0] === "blog post" && (
                  <>
                    <span className="material-icons text-white text-lg w-1">
                      article
                    </span>
                    Blog
                  </>
                )}
              </div>

              {post?.tags && (
                <div className="flex gap-1">
                  {post?.tags.slice(0, 2).map((tag, index) => {
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
            </div>
            <div className="text-xs flex gap-4">
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
          src={post?.img.url}
        />
      </FadeInWhenVisible>
    </div>
  );
}
