"use client";

import { useRef } from "react";

import ContentfulImage from "../image/contentful-image";
import Link from "next/link";

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
      className="flex overflow-hidden relative flex-col w-full h-full rounded-lg tile"
    >
      {/* <motion.div
        initial="initial"
        whileHover="hover"
        exit="initial"
        key={post?.title}
        className="flex relative z-20 flex-1 w-full h-full bg-zinc-900/30"
      >
        
        <h2 className="absolute bottom-0 left-0 px-8 pb-5 w-full text-white">
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
        <div className="flex overflow-hidden relative flex-grow rounded-lg img-portrait">
      
          {post.tags && (
          <div className="flex absolute bottom-4 left-4 gap-1">
            {post.tags.slice(0, 2).map((tag, index) => {
              return (
                <div
                  key={index}
                  className="px-1.5 py-0.5 text-xs uppercase rounded-md bg-[var(--accent-image-bg)] text-[var(--text-color-inv)]"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )}

          {/* <motion.div style={{y}}>     </motion.div> */}
          <ContentfulImage
            className="img-cover"
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
        </div>
      )}

      <div className="flex justify-between items-start py-4">
        <div className="flex flex-col gap-2">
          <h2 className="z-50 text-2xl text-black">{post?.title}</h2>
          <p className="text-md">{post?.subtitle}</p>
          {/* <button className="inline-flex mt-8 text-sm text-slate-400">
            View Case Study
          </button>{" "} */}
        </div>

       
      </div>
    </Link>
  );
}
