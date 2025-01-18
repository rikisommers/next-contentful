import React, { useState } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, cubicBezier } from "../../utils/motion";;

export default function PostTileLg({ post, index, size }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <Link
      href={`/projects/${post.slug}`}
      style={{
        backgroundColor: post.color || "--accent-pri",
      }}
      className="relative flex flex-col w-full h-full overflow-hidden rounded-2xl group"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div
        className="absolute flex flex-col gap-4 top-3 left-3"
        style={{
          color: "var(--text-color-inv)",
          backgroundColor: post.color || "var(--accent)",
        }}
      ></div>

      <div className="absolute flex justify-end gap-2 top-4 right-4">
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
          className="z-10 flex items-center px-2 py-1 text-sm rounded-full"
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
            color: "var(--accent-pri",
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
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1], // direct array syntax
          }}
        >
          <motion.div 
            className="w-full h-full"
            animate={{
              y:isHovered
              ? "-15%"
              : 0,
              scale: isHovered
                ? 1
                : 1.2
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1], // direct array syntax
            }}
          >
            {/* <FadeInWhenVisible color={ 'var(--accent)'}> */}
            <BlendImage
              alt={`Cover Image for ${post?.title}`}
              src={post.img.url}
            />
            {/* </FadeInWhenVisible> */}
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
}
