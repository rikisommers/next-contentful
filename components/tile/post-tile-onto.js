https://studio-onto.com/work
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
 * <PostTileOnto 
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
export default function PostTileOnto({ post, aspect }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const ref = useRef(null)

  return (
    <Link
      href={`${post?.slug ? `/articles/${post?.slug}` : '/'}`}
      className={`@container relative grid grid-cols-1 grid-rows-[1fr_auto] w-full h-full decoration-none overflow-hidden group ${aspect ? `aspect-${aspect}` : ""}`}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
 


      {post?.img && (
        <div className="overflow-hidden w-full h-full">
              <motion.div
              className="w-full h-full"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1], 
              }}
            >
              <BlendImage
                alt={`Cover Image for ${post?.title}`}
                src={post.img.url}
              />
            </motion.div>
        </div>
      )}

<div
       
       className="grid left-0 z-10 grid-cols-12 gap-0 gap-2 items-start py-4 w-full"
     >
      
         <h2
           className="col-span-6 col-start-1 @min-[600px]:col-span-2 text-sm font-semibold"
           style={{
             color: "var(--text-color)",
           }}
         >
           {post?.title}
         </h2>
        
      

       <h3
           className="col-span-6 col-start-1 @min-[600px]:col-span-2 @min-[600px]:col-start-5 text-sm font-normal leading-tight"
           style={{
             color: "var(--text-color)",
           }}
       >
         {post?.subtitle}
       </h3>


       <h3
           className="col-span-6 col-start-1 @min-[600px]:col-span-2 @min-[600px]:col-start-8 uppercase text-xs font-normal leading-tight"
           style={{
             color: "var(--subtext-color)",
           }}
       >
           
          
                    {post?.tags && post?.tags.slice(0, 2).map((tag, index) => {
                      return (
                        <span key={index}>
                            {tag}
                        </span>
                      );
                    })}
             
       </h3>
       
     </div>


    </Link>
  );
}