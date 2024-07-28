import React, { useState, useEffect, useRef } from "react";

import CoverImage from "../image/cover-image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import TextAnimation from "../motion/text-animation";
import FadeInWhenVisible from "../utils/fade-in-visible";
import ContentfulImage from "../image/contentful-image";
import BlendImage from "../image/blend-image";
import PostTileImg from "./post-tile-img";
import PostTileCs from "./post-tile-cs";
import Audio from "../navigation/audio";
import PostTile from "./post-tile";

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
      console.log("1P---", 448 - boundingRect.y);
      setFinalPos(448 - boundingRect.y);
    } else {
      console.log("2P---", boundingRect.y - 448);
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
      className="relative flex flex-col py-24 h-vhh o-content"
      // ref={nextRef}
    >
      <span className="uppercase text-slate-400">Next</span>

      {/* style={{backgroundColor:post?.color}}  */}

      <div className="grid w-full grid-cols-12 gap-6">
      <Link href={`/projects/${post.slug}`} scroll={false} className="col-span-8">
        <div
          className="z-20 grid flex-grow w-full h-full grid-cols-12 gap-3 bg-slate-200 rounded-xl"
          style={{ backgroundColor: post?.color }}
        >
          <div className="z-50 flex flex-col items-start col-span-12 gap-6 p-8 md:col-span-6">
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
