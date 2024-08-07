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

export default function PostTileLg({ post, index ,size}) {
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
        color: 'var(--background-color)',
      }}
      className={`relative flex flex-col w-full h-full overflow-hidden rounded-lg tile-lg img-${size}`}
    >
      <div className="absolute flex flex-col gap-4 top-3 left-3"
            style={{
              color: 'var(--text-color-inv)',
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

        <div className="flex flex-col gap-1">
        <motion.p
            className="text-lg"
            style={{
              color:'var(--subtext-color)',
            }}
          >
            {post?.subtitle}
          </motion.p>
          <h2
            className="z-50 text-2xl"
            style={{
              color: 'var(--text-color)',
            }}
          >
            {post?.title}
          </h2>
         
        </div>
      </div>

      <div
        ref={ref}
        className="absolute bottom-0 left-0 z-50 flex justify-between w-full gap-4 px-4 pb-4"
        style={{
          color: 'var(--text-color-inv)',
        }}
      >
        {post.tags && (
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
        )}

        <div className="flex gap-4 text-xs">
          <span>DATE</span>
        </div>
      </div>
      {/* 
          <motion.div style={{y}}>     
          </motion.div> */}
      {post.img && (
        <FadeInWhenVisible color={ 'var(--accent)'}>
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
        </FadeInWhenVisible>
      )}
    </Link>
  );
}
