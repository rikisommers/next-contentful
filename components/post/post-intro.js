import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import Background from "../utils/background";
import TextAnimationUp from "../utils/text-animation-up";
import { TextAnimLineUp } from "../rich-text/text-anim-line-up";
import { TextSubtitle } from "../rich-text/text-subtitle";
import TextAnimation,{TextSize, AnimationType} from "../utils/text-animation";
import { TextAnimLinear } from "../rich-text/text-anim-linear";
import TextScramble from "../utils/text-scamble";
import TextAnimationLineUp from "../utils/text-animation-line-up";
import TextAnimCode from "../rich-text/text-anim-code";

export default function PostIntro({ title, content }) {



  return (
    //   <div className="grid items-end grid-cols-12 gap-3 pb-20 h-header">

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
    //   <h2 className="col-span-6 text-2xl text-left md:col-span-6 md:text-right text-balance">
    //     {subtitle}
    //   </h2>

    // </div>

    <motion.div
      exit={{
        opacity: 0,
      }}
      className="grid items-end content-end grid-cols-12 pb-20 gap h-vh44 md:h-vh55"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-6">
        {/* <TextScramble content={['This','is','stupid']}/> */}
        <h1 className="text-4xl font-medium font-aon">
          <TextAnimLineUp content={title}/>
        </h1>
        {/* <TextAnimLineUp content={title} 
          animateWhenInView={true}
          repeatWhenInView={true}></TextAnimLineUp> */}
          {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
      </div>
      <div className="col-span-12 text-xl text-left md:col-span-8 lg:col-span-6 lg:text-right text-balance">
        <TextSubtitle content={content} />
      </div>
    </motion.div>
  );
}
