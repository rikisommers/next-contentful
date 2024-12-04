import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";


export default function PostIntroMonks({ title, content, }) {
  return (
    //pt-[16rem] pb-8
    <div className="grid items-end content-end w-full grid-cols-12 gap-6"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
      {content && 
        <h1 > 
        <span className="inline leading-normal ~text-2xl/6xl text-balance">
          <AnimatedText type={AnimStyle.LINEFADEIN} content={title} delay={AnimTextOrder.THREE}/>
          </span>
          <span className="inline leading-normal ~text-2xl/6xl text-balance font-normal text-red">

          <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/>
          </span>
        </h1>
      }
      </div>
    </div>
  );
}
