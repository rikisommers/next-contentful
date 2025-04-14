"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";

// Define the fade in ("visible") and fade out ("hidden") variants.
const wordVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 1 }, // fade-out duration
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 }, // fade-in duration
  },
};

// A separate Word component lets each word have its own animation controller.
const Word = ({ word, index, registerControl }) => {
  const controls = useAnimationControls();

  // Register this control with the parent component when the Word mounts.
  useEffect(() => {
    registerControl(index, controls);
  }, [index, controls, registerControl]);

  return (
    <motion.span
      variants={wordVariants}
      initial="hidden"
      animate={controls}
      className="inline-flex items-center justify-center w-8 h-8 m-1 bg-purple-600/30"
    >
      {word}
    </motion.span>
  );
};

export const TextAnimNavigators = ({
  content = "",
  duplicateOnlyVisible = false, // new prop: if true, duplicate words animate only "visible"
}) => {
  const ref = useRef(null);
  // Trigger animation when the container is at least 50% in view.
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const words = content.split(" ");

  // We store animation controllers for each instance:
  // The first words.length indices for original words,
  // and the next words.length indices for duplicates.
  const wordControlsRef = useRef([]);

  // Callback to allow each Word instance to register its controller.
  const registerControl = (index, control) => {
    wordControlsRef.current[index] = control;
  };

  useEffect(() => {
    if (!isInView) return;

    // Timing parameters in milliseconds.
    const staggerDelay = 100;      // delay between each word's fade-in start.
    const overlapDelay = 2000;     // delay after fade-in before starting fade-out.
    const duplicateOffset = 1000;  // additional delay for duplicate words.

    words.forEach((_, index) => {
      // --- Original word sequence ---
      const fadeInDelayOriginal = index * staggerDelay;
      const fadeOutDelayOriginal = fadeInDelayOriginal + overlapDelay;

      // Trigger fade in.
      setTimeout(() => {
        wordControlsRef.current[index]?.start("visible");
      }, fadeInDelayOriginal);

      // Trigger fade out.
      setTimeout(() => {
        wordControlsRef.current[index]?.start("hidden");
      }, fadeOutDelayOriginal);

      // --- Duplicate word sequence ---
      const duplicateIndex = words.length + index;
      const fadeInDelayDuplicate = index * staggerDelay + duplicateOffset;
      const fadeOutDelayDuplicate = fadeInDelayDuplicate + overlapDelay;

      // Trigger fade in for duplicate.
      setTimeout(() => {
        wordControlsRef.current[duplicateIndex]?.start("visible");
      }, fadeInDelayDuplicate);

      // Only schedule fade out for duplicate if duplicateOnlyVisible is false.
      // if (!duplicateOnlyVisible) {
      //   setTimeout(() => {
      //     wordControlsRef.current[duplicateIndex]?.start("hidden");
      //   }, fadeOutDelayDuplicate);
      // }
    });
  }, [isInView, words, duplicateOnlyVisible]);

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {words.map((word, index) => (
        <div className="relative" key={`wrapper-${index}`}>
          {/* Original word */}
          <Word
            key={`word-${index}`}
            word={word}
            index={index}
            registerControl={registerControl}
          />
          {/* Duplicate word.
              Its controller index is offset by the total number of words.
              If duplicateOnlyVisible is true, the duplicate will animate in and stay visible. */}
          <Word
            key={`word-dup-${index}`}
            word={word}
            index={words.length + index}
            registerControl={registerControl}
            duplicateOnlyVisible={true}
              />
        </div>
      ))}
    </div>
  );
};
