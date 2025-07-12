import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "../../utils/motion";;
import TextAnimation from "../motion/text-animation";
import BlendImage from "../image/blend-image";
import PostTileCs from "./post-tile-cs";

export default function NextPost({ post }) {
  const [finalPos, setFinalPos] = useState(null);
  const nextRef = useRef(null);

  const getPosition = () => {
    const boundingRect = nextRef.current.getBoundingClientRect();
    console.log("el", boundingRect);
    //console.log('scroll' ,scrollValue);
    // console.log('size' ,windowSize[0])
    // console.log('rese' ,windowSize[0] - boundingRect.top);

    if (boundingRect.y < 448) {
      // console.log("1P---", 448 - boundingRect.y);
      setFinalPos(448 - boundingRect.y);
    } else {
    //  console.log("2P---", boundingRect.y - 448);
      setFinalPos(-(boundingRect.y - 448));
    }
  };

  const animateContentOnHover = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="flex relative flex-col py-24 h-vhh o-content"
      // ref={nextRef}
    >
      <span className="uppercase text-slate-400">Next</span>

      {/* style={{backgroundColor:post?.color}}  */}

      <div className="grid grid-cols-12 gap-6 w-full">
      <Link href={`/projects/${post.slug}`} scroll={false} className="col-span-8">
        <div
          className="grid z-20 flex-grow grid-cols-12 gap-3 w-full h-full rounded-xl bg-slate-200"
          style={{ backgroundColor: post?.color }}
        >
          <div className="flex z-50 flex-col col-span-12 gap-6 items-start p-8 md:col-span-6">
            <h2 className="font-light text-slate-50 text-1xl text-balance">
              {post?.title && post?.title}
            </h2>
            <TextAnimation
              content={post?.subtitle}
              color={"#fff"}
              size={"text-4xl"}
            />
          </div>

          <BlendImage
            className="img-cover"
            color={post?.color}
            alt={`Cover Image for ${post?.title}`}
            src={post.img.url}
          />

        </div>
      </Link>
      <div className="flex flex-col col-span-4 gap-6">
        <PostTileCs post={post}/>
        {/* <PostTileImg post={post}/> */}
      </div>
      </div>
    </motion.div>
  );
}
