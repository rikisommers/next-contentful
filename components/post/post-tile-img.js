import React, { useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, cubicBezier } from "../../utils/motion";;
import FadeInWhenVisible from "../utils/fade-in-visible";

export default function PostTileImg({ post, index, size }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <Link
      href={`/articles/${post.slug}`}
      className="relative flex flex-col w-full h-full overflow-hidden rounded-2xl group"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div
        className="absolute flex flex-col gap-4 top-3 left-3"
        style={{
          color: "var(--text-color-inv)",
          backgroundColor: post.color,
        }}
      ></div>

      <motion.div
        animate={{
          y: isHovered
            ? 0
            : '100%',
        }}
        transition={{
          duration: 0.33,
          ease: cubicBezier(0.16, 1, 0.3, 1),
        }}
        className="absolute bottom-0 left-0 z-10 flex flex-col items-start w-full gap-2 p-4"
      >
        <div className="flex gap-2">
          <h2
            className="px-4 py-2 text-sm font-semibold rounded-lg"
            style={{
              color: "var(--text-color)",
              backgroundColor: "var(--background-color)",
            }}
          >
            {post?.title}
          </h2>
          <div
            className="w-10 h-10 rounded-lg "
            style={{
              backgroundColor: "var(--background-color)",
            }}
          >
            B
          </div>
        </div>

        <h3
            className="px-4 py-2 text-sm font-normal leading-tight rounded-lg"
            style={{
              color: "var(--text-color)",
              backgroundColor: "var(--background-color)",
            }}
        >
          {post?.subtitle}
        </h3>
        {/* {post.tags && (
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--background-color)',
                    color: 'var(--text-color)',
                  }}
                  className="px-3 py-2 text-xs bg-opacity-50 rounded-full backdrop-blur-lg"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )} */}

        {/* <div className="flex gap-4 text-xs">
          <span>DATE</span>
        </div> */}
      </motion.div>
      {/* 
          <motion.div style={{y}}>     
          </motion.div> */}
      {post.img && (
        <motion.div
          className="w-full h-full"

          // whileHover={{
          //   clipPath: "inset( 1rem 1rem 33% 1rem round 1rem )",
          // }}
        >
          <FadeInWhenVisible>
          <BlendImage
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
          </FadeInWhenVisible>
        </motion.div>
      )}
    </Link>
  );
}
