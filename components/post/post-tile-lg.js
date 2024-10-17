import React, { useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import {
  motion,
} from "framer-motion";

export default function PostTileLg({ post, index ,size}) {

  const [isHovered, setIsHovered] = useState(false); // State to track hover


  return (
    <Link
      href={`/projects/${post.slug}`}
      style={{
        backgroundColor: post.color || "--accent-pri" 
      }}
      className="relative flex flex-col w-full overflow-hidden rounded-2xl aspect-square group"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div className="absolute flex flex-col gap-4 top-3 left-3"
            style={{
              color: 'var(--text-color-inv)',
              backgroundColor: post.color
            }}
     
      >

      </div>

      <div
        className="absolute bottom-0 left-0 flex flex-col w-full h-[33%] p-4 itesm-start"
        style={{
          color: 'var(--text-color-inv)',
        }}
      >
              
          <h2
            className="text-lg"
            style={{
              color: 'var(--text-color)',
            }}
          >
            {post?.title}
          </h2>
          <h3
            className="text-sm"
            style={{
              color:'var(--subtext-color)',
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
        style={{
          clipPath: isHovered ? "inset(1rem 1rem 33% 1rem round 1rem)" : "inset(0rem 0rem 0rem 0rem round 1rem)", // Change clipPath based on hover state
          transition: "clip-path 0.2s ease-in-out", // Custom transition for clipPath
        }}
        // whileHover={{
        //   clipPath: "inset( 1rem 1rem 33% 1rem round 1rem )",
        // }}
   
        >


        {/* <FadeInWhenVisible color={ 'var(--accent)'}> */}
          <BlendImage
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
        {/* </FadeInWhenVisible> */}
        </motion.div>

      )}
    </Link>
  );
}
