"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { processImageMarkdown, createImageWord } from "../utils/textFormatting";
import { splitTextWords } from "../utils/splitText";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

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
  loadingPercentage = 100,
}) => {
  const ref = useRef(null);
  const [animationStep, setAnimationStep] = useState(0);
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

    // Reset animation step
    setAnimationStep(0);

    // Calculate how many loading words to animate based on the percentage
    const loadingWordsCount = Math.max(1, Math.floor((words.length * loadingPercentage) / 100));
    
    // Step 1: Animate loading spans in sequence
    const loadingInTimers = words.map((_, index) => {
      return setTimeout(() => {
        setAnimationStep((prev) => {
          if (prev === index) {
            return index + 1;
          }
          return prev;
        });
      }, index * itemDuration * 1000); // Convert seconds to milliseconds
    });

    // Step 2: Animate loading spans out in sequence
    const allLoadingCompleteTime =
      loadingWordsCount * itemDuration * 1000 + buffer * 1000; // Time for all loading spans to appear + buffer

    const loadingOutTimers = words.map((_, index) => {
      return setTimeout(() => {
        setAnimationStep((prev) => {
          if (prev === words.length + index) {
            return words.length + index + 1;
          }
          return prev;
        });
      }, allLoadingCompleteTime + index * itemGap * 1000); // Start after all loading spans are visible
    });

    // Step 3: Animate text in sequence after each loading span has faded out
    const textInTimers = words.map((_, index) => {
      return setTimeout(() => {
        setAnimationStep((prev) => {
          if (prev === words.length * 2 + index) {
            return words.length * 2 + index + 1;
          }
          return prev;
        });
      }, allLoadingCompleteTime + index * itemGap * 1000 + 0); // Start immediately after loading span starts fading out
    });

    // Cleanup timers
    return () => {
      loadingInTimers.forEach((timer) => clearTimeout(timer));
      loadingOutTimers.forEach((timer) => clearTimeout(timer));
      textInTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [words, isInView, animateWhenInView, itemDuration, itemGap, buffer, loadingPercentage]);

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
  const renderWord = (word, index, animationStep, totalWords, { itemDuration, textDelay }) => {
    // Calculate how many loading words to animate based on the percentage
    const loadingWordsCount = Math.max(1, Math.floor((totalWords * loadingPercentage) / 100));
    
    // Determine if this word's loading span should be visible
    const loadingVisible = animationStep > index && animationStep <= totalWords + index;
    // Determine if this word's text should be visible
    const textVisible = animationStep > totalWords + index;

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
            className="absolute top-0 left-0 inline-flex w-full h-full py-0 rounded-xl"
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
      <span className="relative mr-2" key={`word-${index}`} data-index={index}>
        <motion.span
          style={{backgroundColor:'var(--surface2)'}}
          className="absolute top-0 left-0 inline-flex w-full h-full py-0 rounded-xl"
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
         {word.text}
        </motion.span>
      </span>
    );
  };

  // Render a line of words
  const renderLine = (line, lineIndex, allWords, animationStep, options) => {
    return (
      <div key={`line-${lineIndex}`} className="flex flex-wrap mb-2">
        {line.map((word, wordIndex) => {
          const index = allWords.findIndex(w => w === word);
          return renderWord(word, index, animationStep, allWords.length, options);
        })}
      </div>
    );
  };

  // Render the entire content with vertical stacking
  const renderContent = (lines, animationStep, options) => {
    if (!lines || lines.length === 0) return null;

    return (
      <div className="flex flex-col">
        {lines.map((line, lineIndex) => 
          renderLine(line, lineIndex, words, animationStep, options)
        )}
      </div>
    );
  };

  return renderContent(lines, animationStep, { itemDuration, textDelay })
  
};
