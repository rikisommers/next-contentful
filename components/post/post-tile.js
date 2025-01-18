"use client";

import { useRef } from "react";

import ContentfulImage from "../image/contentful-image";
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
} from "../../utils/motion";;

export default function PostTile({ post, index }) {
  // const animateContentOnHover = {
  //   initial: {
  //     opacity: 0,
  //   },
  //   hover: {
  //     opacity: 1,
  //     transition: {
  //       ease: [0.33, 1, 0.68, 1],
  //       duration: 0.6,
  //     },
  //   },
  // };

  //  console.log("ss", post);

  const ref = useRef(null);

  // const { scrollYProgress } = useScroll({

  //   target: ref,

  //   offset: ['start start', 'end end']

  // })

  // const y = useTransform(scrollYProgress, [0, 1], [-100, 0])

  return (
    <Link
      scroll={false}
      href={`/projects/${post.slug}`}
      className="relative flex flex-col w-full h-full rounded-lg tile overflow-hidde "
    >
      {/* <motion.div
        initial="initial"
        whileHover="hover"
        exit="initial"
        key={post?.title}
        className="relative z-20 flex flex-1 w-full h-full bg-zinc-900/30"
      >
        
        <h2 className="absolute bottom-0 left-0 w-full px-8 pb-5 text-white">
          {post?.title}
        </h2>





        {post.tags && (
          <div className="flex gap-4">
            {post.tags.map((tag, index) => {
              return <div className="tag">{tag}</div>;
            })}
          </div>
        )}
      </motion.div> */}

      {post.img && (
        <div className="relative flex flex-grow overflow-hidden rounded-lg img-portrait ">
          <div
            ref={ref}
            className="absolute top-0 left-0 z-50 flex items-end justify-between w-full h-full gap-4 px-4 pb-4 text-white "
          >
            {/* <div className="flex flex-col gap-1">
              <span className="text-xs uppercase">{post?.client}</span>
              <p className="">{post?.subtitle}</p>
            </div> */}

            <div className="flex gap-4">
              <span>DATE</span>
            </div>
          </div>

          {/* <motion.div style={{y}}>     </motion.div> */}
          <ContentfulImage
            className="img-cover"
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
        </div>
      )}

      <div className="flex items-start justify-between py-4 ">
        <div className="flex flex-col gap-2">
          <h2 className="z-50 text-2xl text-black ">{post?.title}</h2>
          <p className="text-md">{post?.subtitle}</p>
          {/* <button className="inline-flex mt-8 text-sm text-slate-400">
            View Case Study
          </button>{" "} */}
        </div>

        {post.tags && (
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag, index) => {
              return (
                <div
                  key={index}
                  className="text-xs text-slate-400 uppercase py-0.5 px-1.5 bg-slate-200 rounded-md"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
