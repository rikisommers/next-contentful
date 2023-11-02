import React, { useState, useEffect, useCallback, useRef } from "react";
import TextAnimation from "../utils/text-animation";
import { motion } from "framer-motion";
import Background from "../utils/background";
export default function PostIntro({ title, content }) {
  return (

  //   <div className="grid grid-cols-12 gap-3 h-header items-end pb-20">

  //   <div className="col-span-12 md:col-span-6">
  //     {/* <h1 className="text-7xl">{title && title}</h1> */}
  //     <motion.p className="text-sm text-slate-400"
  //      initial={{
  //       opacity: 0,
  //     }}
  //     animate={{
  //       opacity: 1,
  //     }}
  //     transition={{
  //       easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
  //       duration: 0.6,
  //       delay: 0.3,
  //     }}
  //     >
  //     {client && client}
  //     </motion.p>

  //     <TextAnimation content={title} />
  //   </div>
  //   <h2 className="col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance">
  //     {subtitle}
  //   </h2>

  // </div>


    <motion.div
    exit={{
      opacity:0
    }}
      className="
         
      grid grid-cols-12 gap-3 h-vh66 items-end pb-20"
    >
      <div className="col-span-12 md:col-span-6">
         
        <TextAnimation content={title} color="black"></TextAnimation>

      </div>

      <motion.h2
          className="col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 1.6,
            delay: 1.2,
          }}
        >
          {content}
        </motion.h2>
   

    </motion.div>
  );
}
