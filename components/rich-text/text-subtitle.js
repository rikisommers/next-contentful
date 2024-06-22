import React, { Children } from "react";
import { motion } from "framer-motion";
import RichTextAsset from "./rich-text-asset";
import { RichTextOptions } from "./rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from '../../utils/theme';


export const TextSubtitle = ({ content, children }) => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  const container = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
        staggerChildren: 0.123,
        duration: 0.3,
      },
    },
  };

  const line = {
    initial: {
      opacity: 0,
      rotateX: 0,
      y: "30px",
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

  const renderNewLine = (text, index) => (
    <motion.span
      key={index}
      variants={line}
      style={{
        color:currentTheme?.subtextColor
      }}
      className={`inline`}
    >
      {text}
    </motion.span>
  );

  const renderTextAsLines = (text) => {
    const segments = text.split("\n");
    return segments.map((segment, index) => {
      return renderNewLine(segment, index);
    });
  };

  return (

    <motion.h2 
         variants={container}
         initial="initial"
         animate="animate"
         className={`text-xl`}>{renderTextAsLines(content)}
        {children}     
    </motion.h2>
  );
};
