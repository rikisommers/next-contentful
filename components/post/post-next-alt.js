import React, { useState, useRef } from "react";
import { motion } from "../../utils/motion";;
import TextAnimation from "../utils/text-animation";
import PostTileImgAlt from "./post-tile-img-alt";
export default function NextPostAlt({ post }) {
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
      className="relative flex flex-col h-vhh o-content "
      ref={nextRef}
    >
{/* 
      <Link
      onClick={handleLinkClick}
        href={`/projects/${post.slug}`}
        scroll={false}
        className="col-span-8"
      > */}
        {/* <FadeInWhenVisible> */}
          <div className="grid items-end grid-cols-12 gap-3 h-header ">
            <div className="col-span-12 mb-10 md:col-span-6">
              <TextAnimation content={post.title} />
              
            </div>
          </div>

          <motion.div
            className="relative overflow-hidden h-vhh rounded-xl bg-slate-100"
            
          >
            {/* <FadeInWhenVisible color={post?.color}> */}
              <PostTileImgAlt post={post} />
            {/* </FadeInWhenVisible> */}
          </motion.div>
        {/* </FadeInWhenVisible> */}
      {/* </Link> */}
    </motion.div>
  );
}
