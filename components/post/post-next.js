import React, { useState, useEffect, useRef } from "react";

import CoverImage from "../image/cover-image";
import Link from "next/link";
import { motion, cubicBezier} from "framer-motion";
export default function NextPost({ post }) {

  const [finalPos, setFinalPos] = useState(null);
  const nextRef = useRef(null);

  const getPosition = () => {
    const boundingRect = nextRef.current.getBoundingClientRect();
    console.log('el' ,boundingRect);
    //console.log('scroll' ,scrollValue);
    // console.log('size' ,windowSize[0])
    // console.log('rese' ,windowSize[0] - boundingRect.top);

    if(boundingRect.y < 448){
      console.log('1P---',  448 - boundingRect.y)
      setFinalPos(448 - boundingRect.y)
    }else{
      console.log('2P---',boundingRect.y - 448)
      setFinalPos( - (boundingRect.y - 448))
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
<div className="">
    <Link href={`/projects/${post.slug}`} 
          shallow={false}
          
          >
      

<motion.div ref={nextRef}
                      layout
                      initial={{
                        y: 150,
                        x: 0,
                        opacity: 0,
                      }} 
                      animate={{
                        y: 0,
                        x: 0,
                        opacity: 1,

                      }}
                      exit={{
                        margin: 'auto',
                        width: 'calc(100vw - 12rem)',
                        className:'h-vhh',
                        y: finalPos
                      }}
                      transition={{
                        easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                        duration: 0.6,    
                        delay:0.3              
                      }}
                      onClick={() => getPosition()}
                      className="relative cursor-pointer  overflow-hidden rounded-xl w-full h-vh66 bg-slate-400"
                    >
              
              <motion.div
            initial="initial"
            whileHover="hover"
            exit="initial"
            key={post?.title}
            variants={animateContentOnHover}
            className="absolute z-20 w-full h-full bg-zinc-900/30"
          >
       
            <h2 className="absolute w-full top-0 left-0 px-8 pt-5 text-white">
              {post?.title}
              <span>{post?.client}</span>
              <span>DATE</span>

            </h2>
          </motion.div>
   
  
        {post.img != null && (
            <motion.div 
            className="w-full h-full"
            whileHover={{
              opacity:0.5
            }}
            exit={{
              opacity:1
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.6,    
            }}
            >
              <CoverImage
                title={post.title}
                url={post.img.url}
                layout={post.layout}
              />
            </motion.div>
        )}
    </motion.div>
    </Link>
    </div>
  );
}
