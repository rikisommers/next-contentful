"use client"

import React, { useState, useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, cubicBezier, useInView } from "../../utils/motion";
import FadeInWhenVisible from "../utils/fade-in-visible";

/**
 * @component
 * @description A post tile with animated image reveal on hover.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {string} post.color - The accent color for the tile.
 * @param {object} post.img - The image object for the post.
 * @param {string} [aspect] - The aspect ratio of the tile (e.g., 'square', '16/9').
 * @example
 * // Image Post Tile
 * <PostTileImg 
 *   post={{
 *     title: "Project Title",
 *     subtitle: "A brief description of the project",
 *     slug: "project-slug",
 *     color: "var(--accent)",
 *     img: {
 *       url: "https://example.com/image.jpg",
 *       width: 800,
 *       height: 600,
 *       description: "Project cover image"
 *     }
 *   }}
 *   aspect="16:9"
 * />
 * @exports PostTileImg
 */
export default function PostTileImg({ post, aspect }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const ref = useRef(null)

  return (
    <Link
      href={`/articles/${post.slug}`}
      className={`relative flex flex-col w-full h-full overflow-hidden rounded-2xl group ${aspect ? `aspect-${aspect}` : ""}`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div
        className="flex absolute top-3 left-3 flex-col gap-4"
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
        className="flex absolute bottom-0 left-0 z-10 flex-col gap-2 items-start p-4 w-full"
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
            className="w-10 h-10 rounded-lg"
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
