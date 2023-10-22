import React, { useState, useEffect, useCallback, useRef } from "react";
import TextAnimation from "../utils/text-animation";
import { motion } from "framer-motion";

export default function PostIntro({ title, content }) {
  return (
    <motion.div
    exit={{
      opacity:0
    }}
      className="
          h-full
          w-full   
          flex items-center justify-center rounded-xl z-30 item "
    >
      <div className="flex flex-col gap-8 max-w-3xl">
         
        <TextAnimation content={title} color="white"></TextAnimation>
        <motion.p
          className="text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 1.6,
            delay: 0.6,
          }}
        >
          {content}
        </motion.p>
      </div>
    </motion.div>
  );
}
