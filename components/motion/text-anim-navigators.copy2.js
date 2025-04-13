"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { processImageMarkdown, createImageWord } from "../utils/textFormatting";
import { splitTextWords } from "../utils/splitText";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimNavigators = ({
  delay = 1,
  itemDuration = 0.1,
  itemGap = 0.05,
  textDelay = 2,
  buffer = 0,
  content,
  highlight,
  animateWhenInView = false,
  repeatWhenInView = false,
  type = "text",
  useSimpleContent = false,
}) => {
  const ref = useRef(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [textStep, setTextStep] = useState(0);
  const [words, setWords] = useState([]);
  const [lines, setLines] = useState([]);
  const isInView = useInView(ref, {
    once: !repeatWhenInView,
    amount: 0.2,
  });

  // Define animation transition
  const TRANSITION = {
    ease: "easeInOut",
    duration: itemDuration,
  };

  // Process content when it changes
  useEffect(() => {
    if (content) {
      if (useSimpleContent) {
        // For simple content, just split into words
        const processedWords = splitTextWords(content);
        setWords(processedWords);
        setLines([processedWords]); // All words in one line
      } else {
        // For complex content, process line by line
        const { lines: processedLines, words: processedWords } = processContent(content);
        setLines(processedLines);
        setWords(processedWords);
      }
    }
  }, [content, useSimpleContent]);

  // Animation sequence
  useEffect(() => {
    if (words.length === 0 || !(animateWhenInView ? isInView : true)) return;

    // Reset animation steps
    setLoadingStep(0);
    setTextStep(0);
    console.log("Animation started with", words.length, "words, textDelay:", textDelay);

    // Step 1: Animate loading spans in sequence
    const loadingInTimers = words.map((_, index) => {
      return setTimeout(() => {
        setLoadingStep((prev) => {
          if (prev === index) {
            console.log("Loading span", index, "appeared, step:", index + 1);
            return index + 1;
          }
          return prev;
        });
      }, index * itemGap * 1000); // Match text speed
    });

    // Step 2: Animate loading spans out in sequence - start when text starts appearing
    const loadingOutTimers = words.map((_, index) => {
      // Start fading out when text starts appearing (after textDelay seconds)
      // Each loading span fades out before its corresponding text fades in
      // Reduce the gap by starting the fade-out slightly earlier
      const fadeOutStartTime = textDelay * 1000 + index * itemGap * 1000; // 50ms earlier
      console.log("Loading span", index, "will fade out at", fadeOutStartTime, "ms");
      
      return setTimeout(() => {
        setLoadingStep((prev) => {
          // Ensure each loading span fades out before its text appears
          if (prev > index) {
            console.log("Loading span", index, "fading out, step:", words.length + index + 1);
            return words.length + index + 1;
          }
          return prev;
        });
      }, fadeOutStartTime);
    });

    // Step 3: Animate text in sequence - start after textDelay seconds
    const textInTimers = words.map((_, index) => {
      // Start text animation after textDelay seconds from when component came into view
      // Each text appears after its corresponding loading span has faded out
      const textStartTime = textDelay * 1000 + index * itemGap * 1000;
      console.log("Text", index, "will appear at", textStartTime, "ms");
      
      return setTimeout(() => {
        setTextStep((prev) => {
          if (prev === index) {
            console.log("Text", index, "appearing, step:", index + 1);
            return index + 1;
          }
          return prev;
        });
      }, textStartTime);
    });

    // Cleanup timers
    return () => {
      loadingInTimers.forEach((timer) => clearTimeout(timer));
      loadingOutTimers.forEach((timer) => clearTimeout(timer));
      textInTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [words, isInView, animateWhenInView, itemDuration, itemGap, buffer, textDelay]);

  // Process content into lines of words, handling images and formatting
  const processContent = (content) => {
    if (!content) return [];
    
    const rawLines = content.split('\n');
    const processedLines = [];
    let allWords = [];
    let segmentIndex = 0;
    let spaceIndex = 0; // Add a counter for space elements

    rawLines.forEach((line, lineIndex) => {
      if (line.trim() === '') {
        processedLines.push([]); // Add empty line to maintain structure
        return;
      }

      const lineWords = [];
      // Split by spaces but keep the spaces as separate segments
      const segments = line.split(/(\s+)/);
      
      segments.forEach((segment, segmentIndex) => {
        if (segment.trim() === '') {
          lineWords.push({ 
            type: 'space', 
            text: segment, 
            segmentIndex: segmentIndex++,
            spaceIndex: spaceIndex++ // Add a unique index for each space
          });
          return;
        }

        // Process image markdown
        const { hasImage, imageInfo } = processImageMarkdown(segment);
        if (hasImage) {
          imageInfo.forEach(info => {
            const imageWord = createImageWord(info, segmentIndex++);
            lineWords.push(imageWord);
            allWords.push(imageWord);
          });
          return;
        }

        // Strip formatting characters and just use plain text
        const cleanText = segment.replace(/__|\*\*/g, '');
        
        const textWord = {
          type: 'text',
          text: cleanText,
          segmentIndex: segmentIndex++
        };
        lineWords.push(textWord);
        allWords.push(textWord);
      });

      processedLines.push(lineWords);
    });

    return { lines: processedLines, words: allWords };
  };

  // Render a single word with loading and text animations
  const renderWord = (word, index, loadingStep, textStep, totalWords, { itemDuration, textDelay }) => {
    // Determine if this word's loading span should be visible
    // Loading span is visible when it has appeared but not yet faded out
    const loadingVisible = loadingStep > index && loadingStep <= words.length + index;
    
    // Determine if this word's text should be visible
    // Text is visible when its loading span has faded out
    const textVisible = textStep > index;
    
    // Debug visibility conditions for the first word
    if (index === 0 && (loadingStep % 5 === 0 || textStep % 5 === 0)) {
      console.log("Word 0 - Loading step:", loadingStep, "Text step:", textStep, "Loading visible:", loadingVisible, "Text visible:", textVisible);
    }

    if (word.type === 'linebreak') {
      return <br key={`break-${index}`} />;
    }

    if (word.type === 'space') {
      return <span key={`space-${word.spaceIndex || index}`}>{word.text}</span>;
    }

    if (word.type === 'image') {
      return (
        <span className="relative mr-2" key={`word-${index}`} data-index={index}>
          <motion.span
            style={{backgroundColor:'var(--surface2)'}}
            className="absolute inline-flex w-full h-full py-2 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingVisible ? 1 : 0 }}
            transition={TRANSITION}
          ></motion.span>
          <motion.span
            className="z-50 inline-flex py-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: textVisible ? 1 : 0 }}
            transition={{
              ...TRANSITION,
              duration: itemDuration,
              delay: textDelay,
            }}
          >
            <img
              src={word.imageUrl}
              alt={word.altText}
              className="inline h-[1em]"
              style={{
                maxWidth: "40px",
                height: "auto",
                display: "inline-block",
              }}
            />
          </motion.span>
        </span>
      );
    }

    return (
      <span className="relative flex items-center justify-center mr-2" key={`word-${index}`} data-index={index}>
        <motion.span
          style={{backgroundColor:'var(--surface2)'}}
          className="absolute top-[10%] left-0 inline-flex w-full h-[80%]  py-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: loadingVisible ? 1 : 0 }}
          transition={TRANSITION}
        ></motion.span>
        <motion.span
          className="relative z-50 inline-flex py-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: textVisible ? 1 : 0 }}
          transition={{
            ...TRANSITION,
            duration: itemDuration,
            delay: textDelay,
          }}
        >
         {word.text}
        </motion.span>
      </span>
    );
  };

  // Render a line of words
  const renderLine = (line, lineIndex, allWords, loadingStep, textStep, options) => {
    return (
      <div key={`line-${lineIndex}`} className="flex flex-wrap mb-2">
        {line.map((word, wordIndex) => {
          const index = allWords.findIndex(w => w === word);
          return renderWord(word, index, loadingStep, textStep, allWords.length, options);
        })}
      </div>
    );
  };

  // Render the entire content with vertical stacking
  const renderContent = (lines, loadingStep, textStep, options) => {
    if (!lines || lines.length === 0) return null;

    return (
      <div className="flex flex-col">
        {lines.map((line, lineIndex) => 
          renderLine(line, lineIndex, words, loadingStep, textStep, options)
        )}
      </div>
    );
  };

  return renderContent(lines, loadingStep, textStep, { itemDuration, textDelay })
  
};
