"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "../../utils/motion";
import BlendImage from "../image/blend-image";
import { ParalaxElement } from "../motion/paralax-element";

/**
 * @component
 * @description A post tile inspired by Colabs CtaGrid_Cta design with parallax image support.
 * @category tiles
 * @param {object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.subtitle - The subtitle/description of the post.
 * @param {string} post.slug - The slug for the post URL.
 * @param {object} post.img - The image object for the post.
 * @param {array} [post.tags] - Optional array of tags for the post.
 * @param {string} [aspect] - The aspect ratio of the tile.
 * @param {boolean} [enableParallax=true] - Whether to enable parallax effect on the image.
 * @param {number} [parallaxOffset=50] - The parallax offset distance in pixels.
 * @example
 * // Colabs-style Post Tile with Parallax
 * <PostTileColabs
 *   post={{
 *     title: "We believe biology is the future of technology",
 *     subtitle: "Discover how biotechnology is transforming innovation",
 *     slug: "biology-future-tech",
 *     img: {
 *       url: "https://example.com/biology-image.jpg",
 *       width: 800,
 *       height: 600
 *     },
 *     tags: ["Innovation", "Biology"]
 *   }}
 *   enableParallax={true}
 *   parallaxOffset={75}
 * />
 * @exports PostTileColabs
 */
export default function PostTileColabs({
  post = {
    title: "",
    subtitle: "",
    slug: "",
    img: null,
  },
  aspect,
  enableParallax = true,
  parallaxOffset = 50,
  ...props
}) {
  // Early return if no post is provided
  if (!post) {
    console.warn("PostTileColabs: No post data provided");
    return null;
  }

  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef(null);

  // Parallax scroll effect setup
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset]
  );

  const ParallaxImage = ({ children }) => {
    if (!enableParallax) {
      return <div className="w-full h-full">{children}</div>;
    }

    return (
      <motion.div className="w-full h-full" style={{ y: yTransform }}>
        {children}
      </motion.div>
    );
  };

  return (
    <Link
      ref={tileRef}
      className={`group goo ${
        aspect ? `aspect-${aspect}` : "aspect-[4/5]"
      } relative flex flex-col overflow-hidden no-underline`}
      {...props}
      href={`/articles/${post.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div
        className="flex top-0 left-0 z-10 flex-col gap-4 items-start w-full"
        style={{
          color: "var(--text-color-inv)",
        }}
      >
     
          
        <div className="flex flex-col gap-3 p-6">

        {post.tags && (
            <div className="flex gap-1 mb-4">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
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
          
          <h3
            className="font-mono text-xl font-medium"
            style={{
              color: "var(--text-color)",
            }}
          >
            {post?.title}
          </h3>
          {post?.subtitle && (
            <motion.p className="font-mono text-sm text-[var(--subtext-color)]">
              {post?.subtitle}
            </motion.p>
          )}
        </div>
      </div>



      <svg class="absolute top-0 left-0" 
           width="100%" 
           height="100%"
           viewBox="0 0 1 1" 
           preserveAspectRatio="none">
        <rect x="0" y="0" width="1" height="1" fill={`var(--accent-pri)`} clip-path="url(#notchClip)"/>
      </svg>


      <motion.div
          className="flex absolute right-0 bottom-0 z-10 items-center px-2 py-2 m-2 text-sm"
          animate={{
            scale: isHovered ? 1 : 1.2,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // direct array syntax
          }}
          style={{
            color: "var(--text-color)",
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
      {/* {post.img && (
              <BlendImage
                alt={post.img.description || `Cover image for ${post.title}`}
                src={post.img.url}
                className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
  
           
        )} */}
    </Link>
  );
}
