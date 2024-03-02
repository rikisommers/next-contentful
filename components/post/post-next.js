import React, { useState, useEffect, useRef } from "react";

import CoverImage from "../image/cover-image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import TextAnimation from "../utils/text-animation";

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
    <Link href={`/projects/${post.slug}`} scroll={false}>

    <motion.div className="relative h-vhh flex flex-col" 
    ref={nextRef}
    >

    {/* pt-32 pb-16 */}
    
    <div className="grid grid-cols-12 w-full gap-3 flex-grow items-end pb-20  py-32 px-32 z-20">
      <div className="col-span-12 md:col-span-6">
        {/* <h1 className="text-7xl">{title && title}</h1> */}
        <motion.p className="text-sm text-slate-400">{post.client}</motion.p>
     
        <TextAnimation content={post?.title} />
      </div>
      <h2 className="text-slate-500 font-light col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance">
        {post?.subtitle && post?.subtitle}
      </h2>
    </div>

    <div className="home__footer px-32 ">
            <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
              <span className="uppercase text-slate-400">Location:</span>
              <Link href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                 className="text-slate-500">
                  @-43.5093881,172.6992615
              </Link>
            </div>

            <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
              <span className="uppercase text-slate-400">Last Updated: </span>
            
              <span className="text-slate-500">
                lastUpdatedDate
              </span>
             
            </div>

            <div className="sound">
              {/* <Audio /> */}
            </div>
          </div>
    <div className="rounded-xl  absolute overflow-hidden w-full h-full z-0"></div>


  </motion.div>
  </Link>


    // <div className="">
    //   <Link href={`/projects/${post.slug}`}>
    //     <motion.div
    //       ref={nextRef}
    //       layout
    //       initial={{
    //         y: 150,
    //         x: 0,
    //         opacity: 0,
    //       }}
    //       animate={{
    //         y: 0,
    //         x: 0,
    //         opacity: 1,
    //       }}
    //       exit={{
    //         margin: "auto",
    //         width: "calc(100vw - 12rem)",
    //         className: "h-vhh",
    //         y: finalPos,
    //       }}
    //       transition={{
    //         easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
    //         duration: 0.6,
    //         delay: 0.3,
    //       }}
    //       onClick={() => getPosition()}
    //       className="relative cursor-pointer  overflow-hidden rounded-xl w-full h-vh66 bg-slate-400"
    //     >
    //       <motion.div
    //         initial="initial"
    //         whileHover="hover"
    //         exit="initial"
    //         key={post?.title}
    //         variants={animateContentOnHover}
    //         className="absolute z-20 w-full h-full bg-zinc-900/30"
    //       >
    //         <h2 className="absolute w-full top-0 left-0 px-8 pt-5 text-white">
    //           {post?.title}
    //           <span>{post?.client}</span>
    //           <span>DATE</span>
    //         </h2>
    //       </motion.div>

    //       {post.img != null && (
    //         <motion.div
    //           className="w-full h-full"
    //           whileHover={{
    //             opacity: 0.5,
    //           }}
    //           exit={{
    //             opacity: 1,
    //           }}
    //           transition={{
    //             easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
    //             duration: 0.6,
    //           }}
    //         >
    //           <CoverImage
    //             title={post.title}
    //             url={post.img.url}
    //             layout={post.layout}
    //           />
    //         </motion.div>
    //       )}
    //     </motion.div>
    //   </Link>
    // </div>
  );
}
