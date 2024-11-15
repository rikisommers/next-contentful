import React, { useState, useRef } from "react";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import AnimatedElement,{AnimElOrder, AnimStyleEl} from "../motion/animated-element";

export default function PostTileRe({ post, index, size }) {
  //   const [isHovered, setIsHovered] = useState(false); // State to track hover

  const ref = useRef(null); // Unique ref for each instance
  const inView = useInView(ref, {once:true, threshold: 0.5 }); // Trigger when 50% of the element is visible

  return (
    <Link
      ref={ref}
      href={`/projects/${post.slug}`}
      style={{
        backgroundColor: "var(--background-color)",
      }}
      className="relative flex flex-col w-full h-full overflow-hidden no-underline rounded-2xl group"
      // onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      // onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div className="flex flex-col gap-4 justify-start w-full row-span-1 p-4 !h-1/2">
        <div
          className="flex justify-between w-full"
          style={{
            color: "var(--subtext-color)",
          }}
        >
          <span className="text-xs">DATE</span>

          <div className="flex items-center justify-between"></div>
          {post.tags && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => {
                return (
                  <div key={index} className="text-xs">
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex flex-col items-start w-full gap-4"
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
            className="w-10 h-10 rounded-lg "
            style={{
              backgroundColor: "var(--text-color)",
            }}
          ></div>
          {/* <h3
            className="text-sm"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {post?.subtitle}
          </h3> */}
        </div>
      </div>
      {post.img && (
        <motion.div
          className="w-full !h-1/2 overflow-clip"
          style={{
            backgroundColor: "var(--background-color)",
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
