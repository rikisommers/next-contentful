"use client"

import React, { useState, useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, useInView } from "../../utils/motion";
import AnimatedElement,{ AnimStyleEl} from "../motion/animated-element";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useRouteAudio } from "../audio/audio-trigger";

/**
 * @component
 * @description A post tile with Reone-specific styling and layout.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {string} post.client - The client name for the project.
 * @param {string} post.date - The date of the project.
 * @param {array} post.tags - An array of tags for the post.
 * @param {object} post.img - The image object for the post.
 * @param {number} index - The index of the post, used for animation delay.
 * @param {string} [size] - The size of the tile.
 * @param {string} [layout] - The layout style of the tile.
 * @example
 * // Reone Post Tile
 * <PostTileReone 
 *   post={{
 *     title: "Project Title",
 *     subtitle: "A brief description of the project",
 *     slug: "project-slug",
 *     client: "Client Name",
 *     date: "January 2023",
 *     tags: ["Web Design", "Development"],
 *     img: {
 *       url: "https://example.com/image.jpg",
 *       width: 800,
 *       height: 600,
 *       description: "Project cover image"
 *     }
 *   }}
 *   index={0}
 * />
 * @exports PostTileReone
 */
export default function PostTileReone({ post, index, size, layout, aspect, 'data-audio-click': clickSound, 'data-audio-hover': hoverSound, ...props }) {
  //   const [isHovered, setIsHovered] = useState(false); // State to track hover

  const ref = useRef(null); // Unique ref for each instance
  const inView = useInView(ref, {once:true, threshold: 0.5 }); // Trigger when 50% of the element is visible
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  
  // Use audio hook with data attribute sounds
  const audioProps = useRouteAudio({
    clickSound: clickSound,
    hoverSound: hoverSound
  });


  return (
    <Link
      ref={ref}
      href={`/articles/${post.slug}`}
      style={{
        backgroundColor: "var(--surface3)",
      }}
      className={`relative flex flex-col w-full no-underline rounded-2xl overflow-hidden group ${aspect ? `aspect-${aspect}` : ""}`}
      onMouseEnter={(e) => {
        setIsHovered(true);
        audioProps.onMouseEnter?.(e);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={audioProps.onClick}
      {...props}
    >
      <div className={`flex flex-col row-span-1 gap-4 justify-start p-4 w-full h-auto`}>
        <div
          className="flex justify-between w-full"
          style={{
            color: "var(--subtext-color)",
          }}
        >
          <span className="text-xs">{layout}</span>
          <span className="text-xs">{post.title}</span>

          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div key={index} className="px-2 py-1 text-xs rounded-full"
                  style={{
                   backgroundColor: "var(--body-background-color)",
                  }}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex flex-col gap-4 items-start w-full"
          style={{
            color: "var(--text-color-inv)",
          }}
        >
           <AnimatedElement type={AnimStyleEl.FADEINLEFT}>
          <h2
            className="text-lg font-light text-balance"
            style={{
              color: "var(--text-color)",
            }}
          >
            {post?.subtitle}
          </h2>
          </AnimatedElement>
          <div
            className="w-10 h-10 rounded-lg opacity-50"
          >
      
            <motion.img
              animate={{
                x: isHovered ? [0, 40, -40, 0] : 0,
                opacity: isHovered ? [1, 0, 0, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.33, 0.65, 1],
                ease:"easeOut"
                // repeat: 1,
                // repeatType: "loop",
              }}
              src="arrow_forward.svg"
              viewBox="0 0 20 20"
              className="z-10 w-6 h-6"
              style={{
                color: "var(--accent-pri",
              }}
            ></motion.img>
          </div>

        </div>
      </div>
      {post.img && (
        <motion.div
          className={`overflow-hidden flex-grow w-full`}
          style={{
            backgroundColor: "var(--accent-pri)",
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              scale: inView ? 1 : 1.3,
            }}
            transition={{
              duration: 4,
              ease: [0.16, 1, 0.3, 1], // direct array syntax
            }}
          >
            <FadeInWhenVisible>
            <BlendImage
              alt={`Cover Image for ${post?.title}`}
              src={post.img.url}
            />
            </FadeInWhenVisible>
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
}
