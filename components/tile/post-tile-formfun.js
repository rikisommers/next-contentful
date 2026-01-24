//https://www.formandfun.co/
"use client"

import React, { useState, useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, cubicBezier, useInView } from "../../utils/motion";
import FadeInWhenVisible from "../utils/fade-in-visible";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import { TextAnimWordPosUp } from "../motion/text-anim-word-pos-up";
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
 * @exports PostTileFormFun
 */
export default function PostTileFormFun({ post, aspect }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const ref = useRef(null)

  return (
    <Link
      href={`${post?.slug ? `/articles/${post?.slug}` : '/'}`}
      className={`@container relative flex flex-col w-full h-full overflow-hidden rounded-2xl group ${aspect ? `aspect-${aspect}` : ""}`}
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

      <div className="grid absolute top-0 left-0 z-10 grid-cols-12 gap-0 px-6 py-4 w-full text-lg font-normal leading-tight"
      >


            <h2
                className="col-span-6 col-start-1 @min-[600px]:col-span-2"
                style={{
                color: "var(--text-color)",
                }}
            >
              <TextAnimWordPosUp
                content={post?.title}
                delay={AnimTextOrder.ONE}
              />
            
            
            </h2>
         
     

            <h3
                className="col-span-6 col-start-1 @min-[600px]:col-span-2 @min-[600px]:col-start-5"
                style={{
                    color: "var(--text-color)",
                  }}
            >
     

                {post?.tags && (
                  <div className="flex gap-1">
                    {post?.tags.slice(0, 2).map((tag, index) => {
                      return (
                        <div key={index}>
                          
                          <TextAnimWordPosUp
                content={tag}
                delay={AnimTextOrder.TWO}
              />
                        </div>
                      );
                    })}
                  </div>
                )}
            </h3>
       
            <div className="flex col-span-1 col-start-12 row-start-1 justify-end">
              <TextAnimWordPosUp
                content={'+'}
                delay={AnimTextOrder.TWO}
              />
            </div>
      </div>

      {post?.img && (
        <figure
          className="w-full h-full"
        >
          <FadeInWhenVisible>
          <BlendImage
            alt={`Cover Image for ${post?.title}`}
            src={post?.img.url}
          />
          </FadeInWhenVisible>
        </figure>
      )}
    </Link>
  );
}