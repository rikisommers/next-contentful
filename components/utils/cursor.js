"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchDevice, setTouchDevice] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [cursorWithinViewport, setCursorWithinViewport] = useState(false);

  const hostRef = useRef(null);

  useEffect(() => {
    checkTouchDevice();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cursorPosition", JSON.stringify(position));
    }
  }, [position]);

  const checkTouchDevice = () => {
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints)
    ) {
      setTouchDevice(true);
    } else {
      addEventListeners();
    }
  };

  const addEventListeners = () => {
    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const removeEventListeners = () => {
    if (typeof document !== "undefined") {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    }
  };

  const cursor = {};
  cursor.x = 0;
  cursor.y = 0;

  const onMouseMove = (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    cursor.x = (e.clientX / windowWidth) * 2 - 1;
    cursor.y = (e.clientY / windowHeight) * 2 - 1;
    setCursorWithinViewport(cursor.x < -0.9 || cursor.x > 0.9 || cursor.y < -0.9 || cursor.y > 0.9);

    document.body.focus();
    setPosition({ x: e.clientX, y: e.clientY });
   // console.log(cursor.x)
   // console.log(cursorWithinViewport)
  };


  const onMouseDown = () => {
    setMouseClicked(true);
  };

  const onMouseUp = () => {
    setMouseClicked(false);
  };

  const cursorClasses = () => {
    let classes = "cursor";

    if (mouseClicked) {
      classes += " clicked";
    }

    if (typeof document !== "undefined") {
      const isMouseOverBack = document.querySelector('.c-back:hover');
      if (isMouseOverBack) {
        classes += ' back';
      }

      const isMouseOverNext = document.querySelector('.next-project:hover');
      if (isMouseOverNext) {
        classes += ' next';
      }

      const isMouseOverImg = document.querySelector('.cursor-as--post:hover');
      if (isMouseOverImg) {
        classes += ' custom-c';
      }

      // if(cursorWithinViewport){
      //   classes += ' hidden';

      // }else{
      //   classes = classes.replace('hidden', '');

      // }
     
    }

    return classes;
  };

  if (touchDevice) {
    return null;
  }

  const cursorVariants = {
    initial: { opacity: 1, backgroundColor: "#ffffff" },
    isOverImg: { opacity: 1, backgroundColor: "#000000" },
    hidden: { opacity: 0 },
  };


  return (
    <motion.div
      ref={hostRef}
      className={cursorClasses()}
      style={{
         left: `${position.x}px`,
         top: `${position.y}px`,
        // opacity: cursorWithinViewport ? 0 : 1,
         backgroundColor: cursorWithinViewport ? 0 : 1,

     }}
      transition={{
        easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        duration: 1.2,
      }}
    >
      <motion.div className="circle"></motion.div>
    </motion.div>
  );
};

export default CustomCursor;
