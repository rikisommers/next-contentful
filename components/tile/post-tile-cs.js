"use client";

import { useRef, useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import FadeInWhenVisible from "../utils/fade-in-visible";
import {
  motion,
  useTransform,
  useScroll,
} from "../../utils/motion";
import { useRouteAudio } from "../audio/audio-trigger";

/**
 * @component
 * @description A post tile optimized for case studies with client information.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {string} post.client - The client name for the project.
 * @param {string} post.date - The date of the project.
 * @param {array} post.tags - An array of tags for the post.
 * @param {object} post.img - The image object for the post.
 * @param {string} [aspect] - The aspect ratio of the tile (e.g., 'square', '16/9').
 * @example
 * // Case Study Post Tile
 * <PostTileCs 
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
 *   aspect="4:3"
 * />
 * @exports PostTileCs
 */
export default function PostTileCs({ 
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
  //  console.log("ss", post);
  
  const ref = useRef(null);


  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

    
  // Use audio hook with data attribute sounds
  const audioProps = useRouteAudio({
    clickSound: clickSound,
    hoverSound: hoverSound
  });

  
  return (
    <Link
      scroll={false}
      data-name="show-cursor"
      href={`/articles/${post.slug}`}
      style={{
        color: 'var(--surface3)'
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        audioProps.onMouseEnter?.(e);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col w-full h-full overflow-hidden rounded-lg tile ${aspect ? `aspect-${aspect}` : ""}`}
    >
      {post.img && (
        <div className="flex overflow-hidden relative flex-col flex-grow rounded-lg">
         
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

<div className="flex gap-4 text-xs">
            {post.tags && (
              <div className="flex gap-1">
                {post.tags.slice(0, 2).map((tag, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        color:'var(--text-color)'
                      }}
                      className="px-1.5 py-0.5 text-xs uppercase rounded-md"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            )}

       
          </div>
          {/* 
          <motion.div style={{y}}>     
          </motion.div> */}

         
            <BlendImage
              className="w-full h-full"
              alt={`Cover Image for ${post?.titlealt}`}
              src={post.img.url}
            />
       
        </div>
      )}
{/* fluid-type */}
      <div className="flex justify-between items-start py-3 w-full">
        <div className="flex flex-col gap-2">
          <h3 className="font-mono text-xl font-medium"
               style={{
                color:'var(--text-color)'
              }}
            >{post?.title}</h3>
          {/* {post?.subtitle && (
          <motion.p className="font-mono text-xs text-[var(--subtext-color)]"
              
              >
              {post?.subtitle}
            </motion.p>
          )}
                         */}
                     
      
          {/* <button className="inline-flex mt-8 text-sm text-slate-400">
            View Case Study
          </button> */}
        </div>
      </div>
    </Link>
  );
}
