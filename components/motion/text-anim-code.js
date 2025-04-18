import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "../../utils/motion";;
import PropTypes from "prop-types";

// Use a wider range of characters for more varied animation
const chars = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

const AnimatedChar = ({ char, delay }) => {
  const controls = useAnimation();
  const [displayChar, setDisplayChar] = useState(randomChar());

  useEffect(() => {
    const animate = async () => {
      // Start with opacity 0
      await controls.set({ opacity: 0 });
      
      // Wait for the delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Fade in while rotating through random chars
      await controls.start({ opacity: 1, transition: { duration: 0.2 } });
      
      // Rotate through random chars
      for (let i = 0; i < 5; i++) {
        setDisplayChar(randomChar());
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Set to final char
      setDisplayChar(char);
    };

    animate();
  }, [char, controls, delay]);

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

const TextAnimCode = ({ content }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  // Clean the content by removing image markdown and bold formatting
  const cleanContent = content
    .replace(/!\[([^\]]*)\]\((.*?)\)/g, '') // Remove image markdown
    .replace(/__/g, '') // Remove bold formatting markers
    .replace(/\*([^*]+)\*/g, '$1'); // Remove italic formatting
  
  const lines = cleanContent.split('\n');
  
  // Calculate total characters for timing
  const totalChars = lines.reduce((acc, line) => {
    return acc + line.split(' ').reduce((lineAcc, word) => lineAcc + word.length, 0);
  }, 0);
  
  // Calculate completion time based on animation sequence
  const completionTime = lines.length * 50 + // Line delays
                        totalChars * 20 + // Character delays
                        300; // Buffer for final character settling

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

  const renderLine = (line, lineIndex) => {
    // Split line into words for word-by-word animation
    const words = line.split(" ");
    
    return (
      <motion.div key={lineIndex} className="flex flex-wrap items-center"
      style={{'--font-family-primary': 'monospace'}}
      variants={lineVariants}>
        {words.map((word, wordIndex) => {
          const wordDelay = lineIndex * 50 + wordIndex * 100;
          
          return (
            <span key={wordIndex} className="mr-2">
              {word.split("").map((char, charIndex) => (
                <AnimatedChar 
                  key={charIndex} 
                  char={char} 
                  delay={wordDelay + charIndex * 20}
                />
              ))}
            </span>
          );
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
      {lines.map((line, lineIndex) => renderLine(line, lineIndex))}
    </motion.div>
  );
};

TextAnimCode.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TextAnimCode;