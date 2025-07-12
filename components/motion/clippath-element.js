"use client";

import React, { useState, useRef } from "react";
import {
    motion,
    useTransform,
    useScroll,
    useMotionValueEvent,
} from "../../utils/motion";;
export const ClipPathElement = ({ children, offset}) => {

    const elemRef = useRef(null);


    const { scrollYProgress } = useScroll({
        target: elemRef,

        offset: ["start end", "end end"],
        onChange: (latest) => {
          //  console.log("Latest scroll position:", latest);
            // You can perform any other actions or state updates here
        },
    });

   const cp = useTransform(scrollYProgress, [0, 1], [8,1]);

   
   const [clipPathValue, setClipPathValue] = useState('inset( 8rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)');
   //const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);


  useMotionValueEvent(scrollYProgress, "change", (latest) => {    
    setClipPathValue(`inset(${cp.current}rem ${cp.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`);
  })



    return (
        <motion.div
        style={{
          backgroundColor:  'var(--background-color)',
        }}
        animate={{
          clipPath: clipPathValue,
        }}
        transition={{

        }}
        className={`flex relative flex-col w-full h-full z-100`}
        ref={elemRef}
      >
        {children}
      </motion.div>
  
    );
}