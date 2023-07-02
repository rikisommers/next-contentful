import React, { useState, useEffect, useCallback, useRef } from "react";
import TextAnimation from "../utils/text-animation";
import { motion  } from "framer-motion";

export default function PostIntro({ title, content }) {
  return (
    <div
      className="
          top-0 
          w-full   
          flex items-center justify-center rounded-xl  z-30  item"
    >
      <div className="home-content gap-8">

      <TextAnimation content={title}></TextAnimation>

      <motion.p className="text-sm	text-left"
            initial={{ opacity: 0 }}
            animate={{
              opacity:1
            }}
            transition={{
              ease: [0.33, 1, 0.68, 1],
              duration: 1.6,
              delay:0.6
            }}
            >{content}</motion.p>

      </div>
    </div>
  );
}
