"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "../../utils/motion";
import { processContent, processSimpleContent, groupWordsByLine } from "../utils/textProcessing";
import { createAnimationSequence } from "../utils/animationTiming";
import { renderContent, renderSimpleContent } from "../utils/textRendering";

// Define animation transition
const TRANSITION = {
  ease: "easeInOut",
  duration: 0.2,
};

export const TextAnimNavigators = ({
  delay = 1,
  itemDuration = 0.1,
  itemGap = 0.1,
  textDelay = 0.1,
  buffer = 0.2,
  content,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
  useSimpleContent = false,
}) => {
  const ref = useRef(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [words, setWords] = useState([]);
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.2,
  });

  // Global delay variable for animations
  const animationDelay = 1; // 1 second default

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: delay,
      },
    },
  };

  // Process content when it changes
  useEffect(() => {
    if (content) {
      // Use either the simple or advanced content processing
      const processedWords = useSimpleContent 
        ? processSimpleContent(content)
        : processContent(content);
      
      setWords(processedWords);
    }
  }, [content, useSimpleContent]);

  // Animation sequence
  useEffect(() => {
    if (words.length === 0 || !(animateWhenInView ? isInView : true)) return;

    // Create animation sequence
    const { cleanup } = createAnimationSequence(
      words,
      { itemDuration, itemGap, buffer, textDelay },
      setAnimationStep
    );

    // Cleanup timers
    return cleanup;
  }, [words, isInView, animateWhenInView, itemDuration, itemGap, buffer, textDelay]);

  return (
    <motion.div
      className="contents"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={
        animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"
      }
    >
      {useSimpleContent 
        ? renderSimpleContent(words, animationStep, { itemDuration, textDelay })
        : renderContent(words, animationStep, { itemDuration, textDelay })}
    </motion.div>
  );
};
