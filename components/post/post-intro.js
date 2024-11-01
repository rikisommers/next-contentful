import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";


export default function PostIntro({ title, content }) {
  return (
    <div className="grid items-end content-end grid-cols-12 pt-[16rem] pb-8"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <h1 className="text-4xl leading-normal text-balance"
        > 
          <AnimatedText content={title} delay={AnimTextOrder.ONE}/>
        </h1>
      </div>
      <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
        <h4 className="text-sm font-normal">
          <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/>
        </h4>
      </div>
    </div>
  );
}
