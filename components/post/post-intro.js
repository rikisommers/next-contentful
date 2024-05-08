import React, { useState, useEffect, useCallback, useRef } from "react";
import TextAnimation from "../utils/text-animation";
import { motion } from "framer-motion";
import Background from "../utils/background";
import TextAnimationUp from "../utils/text-animation-up";
import { TextTitle } from "../rich-text/text-title";
import { TextSubtitle } from "../rich-text/text-subtitle";

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
      className="grid items-end grid-cols-12 gap-3 pb-20 h-vh66"
    >
      <div className="col-span-12 md:col-span-6">
        <TextTitle content={title} color={"text-slate-400"}>
          {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
        </TextTitle>
      </div>
      <div className="col-span-6 text-xl text-left md:col-span-6 md:text-right text-balance">
        <TextSubtitle content={content} color={"text-slate-400"} />
      </div>
    </motion.div>
  );
}
