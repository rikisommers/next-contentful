"use client";
import { useThemeContext } from '../context/themeContext';
import { motion } from "../../utils/motion";
import React, { useEffect, useState } from "react";

const segmentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: (i, delay) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

const delayInterval = 0.1; // Set a delay interval for staggered animations

const ImagePill = ({ url, index = 0, altText }) => (
  <motion.div 
    key={index}
    initial={{ width: '1em', opacity: 0 }}
    animate={{ width: '3em', opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" , delay: index * delayInterval}}  
    className="inline-flex justify-center items-center rounded-xl h-[1em]"
    style={{
      backgroundColor: "var(--background-color)",
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <motion.img
      className="inline h-[1em]"
      src={url}
      alt={altText}
      variants={segmentVariants}
      custom={index}
      animate={"visible"}
      initial={"hidden"}
    />
  </motion.div>
);

const ImageInline = ({ url, index = 0, altText }) => (
  <motion.img
    key={index}
    className="inline h-[1em]"
    src={url}
    alt={altText}   
    variants={segmentVariants}
    custom={index}
    animate={"visible"}
    initial={"hidden"}
  />
);

const getImgStyle = (imgUrl, index, theme, altText) => {
  switch (theme) {
    case 'none':
      return null;
    case 'pill':
      return <ImagePill url={imgUrl} index={index} altText={altText} />;
    case 'inline':
      return <ImageInline url={imgUrl} index={index} altText={altText} />;
    default:
      return null;
  }
};

export const TextAnimImg = ({ imageUrl, altText, index = 0 }) => {
    const { currentTheme } = useThemeContext();
    const theme = currentTheme?.data?.heroTextImage || 'pill';

    console.log("Rendering with theme:", theme);

    return <>
    {getImgStyle(imageUrl, index, theme, index * delayInterval, altText)}
    </>
};
