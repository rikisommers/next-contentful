"use client"

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
    title: '',
    subtitle: '',
    slug: '',
    img: null
  }, 
  aspect,
  enableParallax = true,
  parallaxOffset = 50,
  ...props 
}) {
  // Early return if no post is provided
  if (!post) {
    console.warn('PostTileColabs: No post data provided');
    return null;
  }

  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef(null);

  // Parallax scroll effect setup
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"]
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
      <motion.div 
        className="w-full h-full"
        style={{ y: yTransform }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group ${aspect ? `aspect-${aspect}` : "aspect-[4/5]"}`}
      {...props}
    >
      <Link
        href={`/articles/${post.slug}`}
        className="relative flex flex-col w-full h-full overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

<div
          className="flex absolute top-0 left-0 z-10 flex-col gap-4 items-start w-full"
          style={{
            color: "var(--text-color-inv)",
          }}
        >
           <div className="flex flex-col gap-2 p-6">
          <h3 className="font-mono text-xl font-medium"
               style={{
                color:'var(--text-color)'
              }}
            >{post?.title}</h3>
          {post?.subtitle && (
          <motion.p className="font-mono text-normal text-[var(--subtext-color)]"
              
              >
              {post?.subtitle}
            </motion.p>
          )}
                        
                     
      
          {/* <button className="inline-flex mt-8 text-sm text-slate-400">
            View Case Study
          </button> */}
        </div>
          </div>
        {/* Image Container with Parallax */}
        {post.img && (
          <div className="overflow-hidden absolute top-0 left-0 flex-1 w-full h-full rounded-t-2xl">
            <ParallaxImage>
              <BlendImage
                alt={post.img.description || `Cover image for ${post.title}`}
                src={post.img.url}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </ParallaxImage>
            
            {/* Overlay gradient for better text readability */}
            
            {/* Tags overlay */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex absolute top-4 left-4 flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 text-xs font-medium text-white rounded-full backdrop-blur-sm bg-black/30"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        )}

{/* <div className="overflow-hidden p-6 space-y-3 w-full h-full bg-red-500 goo" ></div> */}

        {/* Content Container */}
          
            {/* Title
            <motion.h2 
              className="text-xl font-bold leading-tight text-gray-900 line-clamp-2"
              animate={{ 
                color: isHovered ? "var(--accent-pri, #2563eb)" : "#111827" 
              }}
              transition={{ duration: 0.3 }}
            >
              {post.title}
            </motion.h2>

            {post.subtitle && (
              <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                {post.subtitle}
              </p>
            )} */}


              <div className="absolute right-0 bottom-0 w-[60px] h-[60px]  ">
                <div className="relative w-full h-full">
              <svg className="rotate-[-180deg] w-[20px] h-[20px] absolute top-[-20px] right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="var(--background-color, #F9F8F6)"></path></svg>              
              <button className="relative p-1 rounded-tl-[30px] bg-[var(--background-color)]  w-full h-full">
                  <div className="p-3 w-[50px] h-[50px] bg-[var(--surface-1)] rounded-full x-[-10px] absolute bottom-0 right-0">
                  <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.857198 13.7372L27.9141 13.7372" stroke="black" strokeWidth="3"></path><path d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104" stroke="black" strokeWidth="3"></path></svg>
                  </div>
              </button>
              <svg className="absolute bottom-0 rotate-[180deg] left-[-20px] w-[20px] h-[20px]"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill="var(--background-color, #F9F8F6)"></path></svg>
              </div>
          </div>



        

      </Link>
    </motion.div>
  );
}