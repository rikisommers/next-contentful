"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const TextAnimLineUp = ({ 
  content, 
  clipText = true, 
  animateWhenInView = false,
  repeatWhenInView = false
}) => {

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.5,
    margin: "0px 100px -50px 0px"
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const lineVariants = clipText
    ? {
        hidden: { y: "100%" },
        visible: { 
          y: 0,
          transition: {
            ease: [0.33, 1, 0.68, 1],
            duration: 1.2,
          }
        }
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            ease: [0.33, 1, 0.68, 1],
            duration: 1.2,
          }
        }
      };

  const renderLine = (line, lineIndex) => {
    const segments = line.split('__');
    
    return (
      <div
        key={lineIndex}
        style={{ 
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '0.25em'
        }}
      >
        <motion.div
          variants={lineVariants}
          style={{ 
            position: 'relative',
            display: 'inline-block'
          }}
        >
          {segments.map((segment, segmentIndex) => {
            if (segmentIndex % 2 === 0) {
              return <span key={segmentIndex}>{segment}</span>;
            } else {
              return (
                <span
                  key={segmentIndex}
                  style={{
                    color: 'var(--text-accent)',
                  }}
                >
                  {segment}
                </span>
              );
            }
          })}
        </motion.div>
      </div>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split('\n');
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={animateWhenInView ? (isInView ? "visible" : "hidden") : "visible"}
      key={isInView ? "inView" : "outOfView"}
    >
      <span
        style={{
          color: 'var(--heading-color)',
          display: 'inline-block'
        }}
      >
        {renderContent(content)}
      </span>
    </motion.div>
  );
}