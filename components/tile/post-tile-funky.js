"use client"

import React, { useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion } from "../../utils/motion";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useRouteAudio } from "../audio/audio-trigger";

/**
 * @component
 * @description A larger post tile with more prominent image and text.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {string} post.client - The client name for the project.
 * @param {array} post.tags - An array of tags for the post.
 * @param {object} post.img - The image object for the post.
 * @param {string} [aspect] - The aspect ratio of the tile (e.g., 'square', '16/9').
 * @example
 * // Large Post Tile
 * <PostTileFunky
 *   post={{
 *     title: "Project Title",
 *     subtitle: "A brief description of the project",
 *     slug: "project-slug",
 *     client: "Client Name",
 *     tags: ["Web Design", "Development"],
 *     img: {
 *       url: "https://example.com/image.jpg",
 *       width: 800,
 *       height: 600,
 *       description: "Project cover image"
 *     }
 *   }}
 *   aspect="16:9"
 * />
 * @exports PostTileFunky
 */
export default function PostTileFunky({ 
  post = {
    title: '',
    subtitle: '',
    slug: '',
    img: null
  }, 
  aspect, 
  'data-audio-click': clickSound, 
  'data-audio-hover': hoverSound, 
  ...props 
}) {
  // Early return if no post is provided
  if (!post) {
    console.warn('PostTileFunky: No post data provided');
    return null;
  }

  const [isHovered, setIsHovered] = useState(false); // State to track hover
  
  // Use audio hook with data attribute sounds
  const audioProps = useRouteAudio({
    clickSound: clickSound,
    hoverSound: hoverSound
  });

  return (
    <Link
      href={`/articles/${post.slug}`}
      style={{
        backgroundColor: "var(--surface3)",
      }}
      className={`relative flex flex-col w-full h-full overflow-hidden rounded-2xl group ${aspect ? `aspect-${aspect}` : ""}`}
      onMouseEnter={(e) => {
        setIsHovered(true);
        audioProps.onMouseEnter?.(e);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={audioProps.onClick}
      {...props}
    >
      <div
        className="flex absolute top-3 left-3 flex-col gap-4"
        style={{
          color: "var(--text-color-inv)",
          backgroundColor: post.color || "var(--accent)",
        }}
      ></div>

      <div className="flex absolute top-4 right-4 gap-2 justify-end">
        <motion.div
          className="z-10 px-4 py-2 text-sm rounded-full"
          animate={{
            x: isHovered ? 0 : -20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // direct array syntax
          }}
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--background-color)",
          }}
        >
          Open Link
        </motion.div>

        <motion.div
          className="flex z-10 items-center px-2 py-1 text-sm rounded-full"
          animate={{
            scale: isHovered ? 1 : 1.2,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // direct array syntax
          }}
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--background-color)",
          }}
        >
          <img
            src="arrow_forward.svg"
            viewBox="0 0 20 20"
            className="z-10 w-5 h-5"
            style={{
              color: "var(--accent-pri)",
            }}
          ></img>
        </motion.div>
      </div>
      <div
        className="absolute bottom-0 left-0 flex flex-col w-full h-[33%] p-4 items-start"
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
      </div>
      {/* 
          <motion.div style={{y}}>     
          </motion.div> */}
      {post.img && (
        <motion.div
          className="w-full h-full"
          animate={{
            clipPath: isHovered
              ? "inset(0.5rem 0.5rem 33% 0.5rem round 0.6rem)"
              : "inset(0rem 0rem 0rem 0rem round 1rem)",
          }}
          initial={{
            clipPath: "inset(0rem 0rem 0rem 0rem round 1rem)"
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // direct array syntax'
            clipPath: {
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              y: isHovered ? "-15%" : 0,
              scale: isHovered ? 1 : 1.2,
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1], // direct array syntax
            }}
          >
            <BlendImage
              alt={`Cover Image for ${post?.title}`}
              src={post.img.url}
            />
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
}
