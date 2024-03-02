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
} from "framer-motion";

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
      className="flex rounded-lg flex-col tile relative w-full h-full overflow-hidde "
    >
      {/* <motion.div
        initial="initial"
        whileHover="hover"
        exit="initial"
        key={post?.title}
        className="z-20 w-full h-full bg-zinc-900/30 flex flex-1 relative"
      >
        
        <h2 className="absolute w-full bottom-0 left-0 px-8 pb-5 text-white">
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
        <div className="flex flex-grow rounded-lg overflow-hidden relative img-portrait ">
          <div
            ref={ref}
            className="absolute z-50 w-full h-full flex gap-4 justify-between items-end top-0 left-0 px-4 pb-4 text-white "
          >
            {/* <div className="flex flex-col gap-1">
              <span className="uppercase text-xs">{post?.client}</span>
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

      <div className="flex justify-between items-start py-4 ">
        <div className="flex flex-col gap-2">
          <h2 className=" text-black z-50 text-2xl">{post?.title}</h2>
          <p className="text-md">{post?.subtitle}</p>
          {/* <button className="text-sm text-slate-400 inline-flex mt-8">
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
