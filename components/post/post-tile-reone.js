import React, { useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PostTileRe({ post, index, size }) {
  //   const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <Link
      href={`/projects/${post.slug}`}
      style={{
        backgroundColor: "var(--background-color-inv)",
      }}
      className="relative flex flex-col w-full h-full overflow-hidden rounded-2xl group"
      //   onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      //   onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div className="flex flex-col items-start w-full row-span-1 p-4 !h-1/2">
        <div
          className="flex flex-col items-start w-full p-4"
          style={{
            color: "var(--text-color-inv)",
          }}
        >
          <h2
            className="text-lg"
            style={{
              color: "var(--text-color)",
            }}
          >
            {post?.title}
          </h2>
          <h3
            className="text-sm"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {post?.subtitle}
          </h3>
          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "var(--background-color)",
                      color: "var(--text-color)",
                    }}
                    className="px-3 py-2 text-xs bg-opacity-50 rounded-full backdrop-blur-lg"
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
        </div>
        {post.img && (
          <motion.div className="w-full !h-1/2">
            <BlendImage
              alt={`Cover Image for ${post?.title}`}
              src={post.img.url}
            />
          </motion.div>
        )}
    
    </Link>
  );
}
