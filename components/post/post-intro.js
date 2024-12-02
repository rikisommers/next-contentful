import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";


export default function PostIntro({ title, content, }) {
  return (
    //pt-[16rem] pb-8
    <div className="grid items-end content-end w-full grid-cols-12 gap-6"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
      {content && 
        <h1 className="leading-normal ~text-2xl/6xl text-balance"
        > 
          <AnimatedText content={title} delay={AnimTextOrder.ONE}/>
        </h1>
      }
      </div>
      <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
        <h4 className="text-sm font-normal">
          <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/>
        </h4>
      </div>
    </div>
  );
}
