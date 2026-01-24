//https://mount.jp/
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
 * <PostTileMount
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
 * @exports PostTileMount
 */
export default function PostTileImg({ post, aspect }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const ref = useRef(null)



  return (
    <Link
      href={`${post?.slug ? `/articles/${post?.slug}` : '/'}`}
      className={`relative flex flex-col w-full h-full overflow-hidden group ${aspect ? `aspect-${aspect}` : ""}`}
      style={{
        backgroundColor: "var(--surface3)",
      }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div
        className="flex absolute top-3 left-3 flex-col gap-4"
        style={{
          color: "var(--text-color-inv)",
        }}
      ></div>

<div className="flex absolute bottom-0 left-0 z-10 flex-col gap-1 px-4 py-4 pr-16 pb-8 bg-[var(--background-color)] min-w-[300px]">
          <h2
            className="font-semibold uppercase whitespace-nowrap text-md"
            style={{
              color: "var(--text-color)",
            }}
          >
            {post?.title}
          </h2>
         
   

        <h3
            className="font-normal leading-tight"
            style={{
              color: "var(--subtext-color)",
            }}
        >

                  <div className="flex gap-1">
                    tags
                    {post?.tags && post?.tags.slice(0, 2).map((tag, index) => {
                      return (
                        <span key={index}>
                            {tag}
                        </span>
                        );
                      })}
                     
                    </div>
                
        </h3>
       
      </div>
      {post?.img && (
         <motion.div
         className="w-full h-full"
         animate={{
           scale: isHovered ? 1.1 : 1,
         }}
         transition={{
           duration: 0.33,
           ease: [0.16, 1, 0.3, 1], 
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