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
 * // Hovertext Post Tile 
 * <PostTileText
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
export default function PostTileText({
  post = {
    title: '',
    subtitle: '',
    slug: '',
    tags: [],
    img: null
  }, 
  index, 
  size, 
  layout, 
  aspect, 
  'data-audio-click': clickSound, 
  'data-audio-hover': hoverSound, 
  ...props 
}) {
  // Early return if no post is provided
  if (!post) {
    console.warn('PostTileHovertext: No post data provided');
    return null;
  }

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
      className={`grid relative grid-cols-2 p-8 w-full no-underline rounded-lg border-b hover:bg-opacity-100 group hover:bg-slate-700 border-slate-700`}
      style={{
        "&:hover": {
          backgroundColor: "var(--accent-pri)"
        }
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        audioProps.onMouseEnter?.(e);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={audioProps.onClick}
      {...props}
    >
     
     <div
          className="grid z-20 grid-cols-2 gap-3 justify-between w-full fluid-type group"

        >
          
          
          <h2
            className="text-2xl font-light transition-colors duration-300 text-balance bg-theme-accent-pri"
           
          >
            {post?.subtitle}
            </h2>
            <div className="flex gap-2 items-center">
              <span className="text-xs">Date: {post.date}</span>
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
        </div>

       
      {/* {post.img && (
        <motion.div
          className={`overflow-hidden absolute top-0 right-0 flex-grow w-[300px] h-[300px] aspect-square`}
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
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FadeInWhenVisible>
            <BlendImage
              alt={`Cover Image for ${post.title}`}
              src={post.img.url}
            />
            </FadeInWhenVisible>
          </motion.div>
        </motion.div>
      )} */}
    </Link>
  );
}
