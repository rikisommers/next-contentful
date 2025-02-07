"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "../../utils/motion";;
import { useScrollPosition } from "../scrollPosContext";

export default function ClipPathContainer({ children }) {


    const contentRef = useRef(null);
    const { scrollYProgress, setScrollPosition } = useScrollPosition();

    const { scrollYProgress: scrollContent } = useScroll({
        target: contentRef,
            offset: ["start start", "start -100px"],
    })

   const yv = useTransform(scrollContent, [0, 1], [8, 0.01]);
   const xv = useTransform(scrollContent, [0, 1], [1.5, 0.01]);

   
   const [clipPathValue, setClipPathValue] = useState('inset( 8rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)');
   //const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);


  useMotionValueEvent(scrollContent, "change", (latest) => {
    //z.set(latest);
    
    console.log(scrollContent.current)
    setScrollPosition(yv.current);
    setClipPathValue(`inset(${yv.current}rem ${xv.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`);

    // console.log("Page scroll: ")
    // console.log("X", x.current)
    // console.log("XV ", xv.current)
    // console.log("YV ", yv.current)
    // console.log("RV ", rv.current)
    // console.log('dddd',clipPathValue)
  })


  return (
    <motion.div
      style={{
        backgroundColor:  'var(--background-color)',
      }}
      animate={{
        clipPath: clipPathValue,
      }}
      className={`relative flex flex-col px-10 pb-20 z-100`}
      ref={contentRef}
    >
      {children}
    </motion.div>
  );
}
