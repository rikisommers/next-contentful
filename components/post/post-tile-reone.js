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
      className="relative flex flex-col w-full h-full overflow-hidden no-underline rounded-2xl group"
      //   onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      //   onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div className="flex flex-col gap-4 justify-start w-full row-span-1 p-4 !h-1/2">
        <div className="flex justify-between w-full"
                 style={{
                  color: "var(--subtext-color)",
                }}
        >
          <span className="text-xs">DATE</span>

          <div className="flex items-center justify-between"></div>
          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div key={index} className="text-xs">
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex flex-col items-start w-full gap-4"
          style={{
            color: "var(--text-color-inv)",
          }}
        >
          <h2
            className="text-lg font-light text-balance"
            style={{
              color: "var(--text-color)",
            }}
          >
            {post?.subtitle}
          </h2>

          <div className="w-10 h-10 rounded-lg " 
                  style={{
                    backgroundColor: "var(--text-color)",
                  }}
          >

          </div>
          {/* <h3
            className="text-sm"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {post?.subtitle}
          </h3> */}
        </div>
      </div>
      {post.img && (
        <motion.div className="w-full !h-1/2"
        initial={{
          scale:1.2
        }}
        animate={{
          scale:1
        }}
        style={{
          backgroundColor: "var(--background-color)",
        }}
        >

          <BlendImage
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
        </motion.div>
      )}
    </Link>
  );
}
