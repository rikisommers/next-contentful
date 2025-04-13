"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useAnimationControls } from "framer-motion";
import { motion, useInView } from "framer-motion";

const divVariants = {
    left: {
      x: -10,
      transition: {
        duration: 1
      }
    },
    right: {
      x: 10,
      transition: {
        duration: 1
      }
    }
  };

export const TextAnimNavigators = ({
  delay = 1,
  content,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
}) => {

    const textControls = useAnimationControls();
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: !repeatWhenInView,
      amount: 0.2,
    });

    useEffect(() => {
      if (isInView) {
        textControls.start({
          x: [0, 40, -40, 0],
          opacity: [1, 0, 0, 1],
          transition: {
            duration: 0.6,
            times: [0, 0.33, 0.65, 1],
          },
        });
      }
    }, [isInView, textControls]);

  const renderWord = (line, index) => {
    return (
      <motion.span
        className="relative inline-flex px-4 py-0 bg-slate-500/20 rounded-xl"
        animate={textControls}
        variants={divVariants}
        key={index}
      >
        <motion.span
          className="absolute top-0 left-0 inline-flex w-full h-full m-1 bg-purple-600/30"
          key={index + "2r4"}
        />
        {line}
      </motion.span>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split(" ");
      return lines.map((line, lineIndex) => renderWord(line, lineIndex));
    }
  };

  return (
    <div ref={ref}>
        {isInView ? 'Y' : 'N'}
      {renderContent(content)}
    </div>
  )
};
