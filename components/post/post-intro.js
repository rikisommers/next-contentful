import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import Background from "../utils/background";
import AnimatedText, { AnimStyle } from "../motion/animated-text";


export default function PostIntro({ title, content }) {
  return (
    <motion.div
      exit={{
        opacity: 0,
      }}
      className="grid items-end content-end grid-cols-12 pb-20 gap h-vh44 md:h-vh55"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-6">
        <h1 className="text-4xl font-medium font-aon"> 
          <AnimatedText type={AnimStyle.LINEPOSUP} content={title}/>
        </h1>
      </div>
      <div className="col-span-12text-left md:col-span-8 lg:col-span-6 lg:text-right text-balance">
        <h2 className="text-xl">
          <AnimatedText type={AnimStyle.LINEFADEIN} content={content}/>
        </h2>
      </div>
    </motion.div>
  );
}
