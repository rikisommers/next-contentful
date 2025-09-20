"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "../../utils/motion";
import PropTypes from "prop-types";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";

// Use a wider range of characters for more varied animation
const chars = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

const AnimatedChar = ({ char, delay }) => {
  const controls = useAnimation();
  const [displayChar, setDisplayChar] = useState(char);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const animate = async () => {
      try {
        // Start with opacity 0
        await controls.set({ opacity: 0 });
        
        // Wait for the delay
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Fade in while rotating through random chars
        if (isMounted) {
          await controls.start({ 
            opacity: 1, 
            transition: { duration: 0.2 } 
          });
        }
        
        // Rotate through random chars
        for (let i = 0; i < 5; i++) {
          if (!isMounted) break;
          setDisplayChar(randomChar());
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Set to final char
        if (isMounted) {
          setDisplayChar(char);
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    animate();

    return () => {
      setIsMounted(false);
    };
  }, [char, controls, delay, isMounted]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={controls}
      className="inline-block text-center text-mon"
    >
      {displayChar}
    </motion.span>
  );
};

/**
 * @component
 * @description Text that animates like code being typed.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold text.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @example
 * // Code Text Animation
 * <TextAnimCode 
 *   content="A __modular__, __themable__ website template for __Designers__, __Developers__ and __Agencies__."
 *   highlight="background"
 * />
 */
export const TextAnimCode = ({ content, highlight = "background" }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Calculate total characters for timing
  const totalChars = (typeof content === 'string' ? content : '').length;
  
  // Calculate completion time based on animation sequence
  const completionTime = totalChars * 20 + 300;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsComplete(true), completionTime);
    return () => clearTimeout(timer);
  }, [completionTime]);

  const renderColoredText = (text, index, delay) => (
    <motion.span
      style={{
        color: 'var(--text-accent)',
      }}
      key={index}
    >
      {text.split('').map((char, charIndex) => (
        <AnimatedChar 
          key={charIndex} 
          char={char} 
          delay={delay + charIndex * 20}
        />
      ))}
    </motion.span>
  );

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }
    
    // First split by actual line breaks in the content
    const lines = text.split('\\n').filter(line => line && line.trim() !== '');
    
    return lines.map((line, lineIndex) => {
      // Process each line for bold text
      const boldSegments = processTextWithBoldAndLineBreaks(line);
      
      return (
        <motion.div 
          key={lineIndex} 
          className="flex flex-wrap items-center"
          style={{'--font-family-primary': 'monospace'}}
          variants={lineVariants}
        >
          {boldSegments.map((segmentData, segmentIndex) => {
            const segment = segmentData.content;
            const isBold = segmentData.isBold;
            const baseDelay = lineIndex * 50 + segmentIndex * 100;
            
            if (isBold) {
              // Bold text with highlighting
              return renderColoredText(segment, `bold-${segmentIndex}`, baseDelay);
            } else {
              // Regular text - process words individually
              const words = segment.split(" ").filter(word => word && word.trim() !== "");
              
              return (
                <React.Fragment key={`text-${segmentIndex}`}>
                  {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="mr-2">
                      {word.split("").map((char, charIndex) => (
                        <AnimatedChar 
                          key={charIndex} 
                          char={char} 
                          delay={baseDelay + wordIndex * 50 + charIndex * 20}
                        />
                      ))}
                    </span>
                  ))}
                </React.Fragment>
              );
            }
          })}
          {lineIndex === lines.length - 1 && !isComplete && (
            <motion.span
              className="inline-block ml-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, loop: Infinity, ease: "linear" }}
            >
              |
            </motion.span>
          )}
          {lineIndex === lines.length - 1 && isComplete && (
            <motion.span
              style={{color:'var(--text-accent)'}}
              className="inline-block ml-1 origin-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0}}
              transition={{ duration: 0.5 }}
            >
              |
            </motion.span>
          )}
        </motion.div>
      );
    });
  };

  return (
    <motion.div 
      className="flex flex-col items-start font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        color: "var(--heading-color)",
      }}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </motion.div>
  );
};

TextAnimCode.propTypes = {
  content: PropTypes.string.isRequired,
};