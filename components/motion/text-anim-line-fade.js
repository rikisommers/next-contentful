import React from "react";
import { motion } from "../../utils/motion";;

export const TextAnimLineFadeIn = ({ 
  content ,delay, highlight, theme,
  animateWhenInView = false,
  repeatWhenInView = false,
}) => {

  const container = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        delayChildren:delay,
        staggerChildren: 0.123,
        duration: 0.3,
      },
    },
  };

  const lineVariants = {
    initial: {
      opacity: 0,
      rotateX: 0,
      y: "300px",
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        // delay: 0.5, // Add a delay to the start of the animation
        ease: [0.33, 1, 0.68, 1],
        duration: 1.2,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay:1,
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
      },
    },
  };


  const renderNewLine = (line, index) => {
    const segments = line.split("__");

    return (
      <span
        key={index}
        style={{
          position: "relative",
          marginBottom: "0.25em",
        }}
      >
        <motion.div
          variants={lineVariants}
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {segments.map((segment, segmentIndex) => {
            const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
              if (imageMatch) {
                if (theme.heroTextImageStyle === "none") {
                  return "_"
                }else{

                const altText = imageMatch[1]; // Get alt text
                const imageUrl = imageMatch[2].startsWith("//")
                  ? `https:${imageMatch[2]}`
                  : imageMatch[2]; // Ensure the URL is complete
                return (
                  <motion.div
                  
                  variants={imageVariants}
                  initial="hidden"
                  // animate={
                  //   animateWhenInView ? (isInView ? "visible" : "hidden") : "hidden"
                  // }
                  animate="visible"
                  className="relative inline-block rounded-full w-[30px] h-[30px] overflow-hidden mx-1 leading-normal bg-slate-300">
                    <img
                      key={segmentIndex}
                      src={imageUrl}
                      alt={altText}
                      style={{
                        maxWidth: "60px",
                        height: "auto",
                        display: "inline-block",
                      }} // Adjust styles as needed
                    />
                  </motion.div>
                );
              
              }
            }

            return <span key={segmentIndex}>{segment}</span>;
          })}
        </motion.div>
      </span>
    );
  };

  const renderTextAsLines = (text) => {
    if(text){
    const segments = text.split("\n");
    return segments.map((segment, index) => {
      return renderNewLine(segment, index);
    });
  }
  };

  return (

    <motion.span
         variants={container}
         initial="initial"
         animate="animate"
         style={{
          color: "var(--heading-color)",
          display: "inline-block",
        }}
          
         >
          SS
          {renderTextAsLines(content)}
    </motion.span>
  );
};
