"use client";

import { useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import FadeInWhenVisible from "../utils/fade-in-visible";
import {
  motion,
  useTransform,
  useScroll,
} from "../../utils/motion";

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
 * @param {number} index - The index of the post, used for animation delay.
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
 *   index={0}
 * />
 * @exports PostTileCs
 */
export default function PostTileCs({ post, index }) {
  //  console.log("ss", post);
  
  const ref = useRef(null);


  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <Link
      scroll={false}
      data-name="show-cursor"
      href={`/articles/${post.slug}`}
      style={{
        color: 'var(--background-color)'
      }}
      className="relative flex flex-col w-full h-full overflow-hidden rounded-lg tile"
    >
      <h1 className="absolute top-0 left-0 z-10 text-amber-200">CS</h1>
      {post.img && (
        <div className="relative flex flex-col flex-grow overflow-hidden rounded-lg">
          <div className="absolute flex top-3 left-3"
           style={{
            color: 'var(--text-color-inv)'
          }}
          >
            {/* <p>{post.type }</p> */}

            {post?.type && post?.type[0] === "case study" && (
              <span className="text-lg material-icons">
                inventory_alt
              </span>
            )}
            {post?.type && post?.type[0] === "blog post" && (
              <span className="material-icons">article</span>
            )}
          </div>
          <div
            ref={ref}
            className="absolute top-0 left-0 z-10 flex items-end justify-between w-full h-full gap-4 px-4 pb-4 text-white "
          >


            {post.tags && (
              <div className="flex gap-1">
                {post.tags.slice(0, 2).map((tag, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        color:'var(--text-color)'
                      }}
                      className="text-xs uppercase py-0.5 px-1.5 rounded-md"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-4 text-xs">
              <span>DATE</span>
            </div>
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

      <div className="flex items-start justify-between w-full py-3 asolute ">
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-sm font-medium "
               style={{
                color:'var(--text-color)'
              }}
          >{post?.title}</h2>
          <motion.p className="font-mono text-xs opacity-1"
                style={{
                color: 'var(--subtext-color)'
              }}
          >{post?.subtitle}</motion.p>
                        
                     
      
          {/* <button className="inline-flex mt-8 text-sm text-slate-400">
            View Case Study
          </button> */}
        </div>
      </div>
    </Link>
  );
}
