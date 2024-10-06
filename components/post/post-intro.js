import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";


export default function PostIntro({ title, content }) {
  return (
    <div className="grid items-end content-end grid-cols-12 pb-20 gap h-vh44 md:h-vh55"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <h1 className="text-4xl font-medium font-aon balance-text"> 
          <AnimatedText content={title} delay={AnimTextOrder.ONE}/>
        </h1>
      </div>
      <div className="col-span-12text-left md:col-span-8 lg:col-span-4 text-balance">
        <h2 className="text-xl">
          <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/>
        </h2>
      </div>
    </div>
  );
}
