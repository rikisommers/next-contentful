"use client";

import { useRef } from "react";

import ContentfulImage from "../image/contentful-image";
import BlendImage from "../image/blend-image";
import Link from "next/link";
import FadeInWhenVisible from "../utils/fade-in-visible";
import RollUpWhenVisible from "../utils/roll-up-visible";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
} from "framer-motion";

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
      
      href={`/projects/${post.slug}`}
      style={{
        color: 'var(--background-color)'
      }}
      className="relative flex flex-col w-full h-full rounded-lg tile overflow-hidde"
    >
      {post.img && (
        <div className="relative flex flex-col flex-grow overflow-hidden rounded-lg img-post">
          <div className="absolute flex top-3 left-3"
           style={{
            color: 'var(--text-color-inv)'
          }}
          >
            {/* <p>{post.type }</p> */}
            {post?.type[0] === "case study" && (
              <span className="text-lg material-icons">
                inventory_alt
              </span>
            )}
            {post?.type[0] === "blog post" && (
              <span className="material-icons">article</span>
            )}
          </div>

          <div
            ref={ref}
            className="absolute top-0 left-0 z-50 flex items-end justify-between w-full h-full gap-4 px-4 pb-4 text-white "
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

          <FadeInWhenVisible>
            <BlendImage
              className="img-cover"
              alt={`Cover Image for ${post?.title}`}
              src={post.img.url}
            />
          </FadeInWhenVisible>
        </div>
      )}

      <div className="flex items-start justify-between w-full py-3 asolute ">
        <div className="flex flex-col gap-2">
          <h2 className="z-50 font-mono text-sm font-medium"
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
