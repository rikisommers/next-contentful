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
      className="flex flex-col md:flex-row rounded-lg tile relative w-full h-full overflow-hidde bg-slate-50"
    >

      {post.img && (
        <div className="flex flex-col flex-grow rounded-lg overflow-hidden relative img-landscape">
          <div
            ref={ref}
            className="absolute z-50 w-full h-full flex gap-4 justify-between items-end top-0 left-0 px-4 pb-4 text-white "
          >
            {/* <div className="flex flex-col gap-1">
              <span className="uppercase text-xs">{post?.client}</span>
              <p className="">{post?.subtitle}</p>
            </div> */}

            <div className="text-xs flex gap-4">
              <span>DATE</span>
            </div>
          </div>
{/* 
          <motion.div style={{y}}>     
          </motion.div> */}

          <FadeInWhenVisible>
          <ContentfulImage
            className="img-cover"
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />
                </FadeInWhenVisible>
  
        </div>
      )}


      <div className="asolute flex justify-between items-start p-8 w-full md:w-2/5">
        <div className="flex flex-col gap-2">
        {post.tags && (
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag, index) => {
              return (
                <div key={index} className="text-xs text-slate-400 uppercase py-0.5 px-1.5 bg-slate-200 rounded-md">
                  {tag}
                </div>
              );
            })}
          </div>
        )}
          <h2 className=" text-black z-50 text-2xl">{post?.title}</h2>
          <p className="text-md">{post?.subtitle}</p>
          <button className="text-sm text-slate-400 inline-flex mt-8">
            View Case Study
            </button>
        </div>

    


      </div>
    </Link>
  );
}
