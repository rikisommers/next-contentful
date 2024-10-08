"use client";

import React, { useState, useEffect, useRef, useContext} from "react";
import { motion, cubicBezier } from "framer-motion";
import { MousePosContext } from "../mousePosContext";


const CustomCursor = () => {
  const { mousePosition, direction, velocity } = useContext(MousePosContext);

  //const [touchDevice, setTouchDevice] = useState(false);
  //const [mouseClicked, setMouseClicked] = useState(false);
  //const [cursorWithinViewport, setCursorWithinViewport] = useState(false);

  const hostRef = useRef(null);

  // useEffect(() => {
  //   checkTouchDevice();
  //   return () => removeEventListeners();
  // }, []);


  // const checkTouchDevice = () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     ("ontouchstart" in window || navigator.maxTouchPoints)
  //   ) {
  //     setTouchDevice(true);
  //   } else {
  //     addEventListeners();
  //   }
  // };


  // const cursor = {};
  // cursor.x = 0;
  // cursor.y = 0;

  // const onMouseMove = (e) => {
  //   const windowWidth = window.innerWidth;
  //   const windowHeight = window.innerHeight;
  
  //   cursor.x = (e.clientX / windowWidth) * 2 - 1;
  //   cursor.y = (e.clientY / windowHeight) * 2 - 1;
  //   setCursorWithinViewport(cursor.x < -0.9 || cursor.x > 0.9 || cursor.y < -0.9 || cursor.y > 0.9);

  //   document.body.focus();
  //   setPosition({ x: e.clientX, y: e.clientY });
  //  // console.log(cursor.x)
  //  // console.log(cursorWithinViewport)
  // };


  // const onMouseDown = () => {
  //   setMouseClicked(true);
  // };

  // const onMouseUp = () => {
  //   setMouseClicked(false);
  // };

  // const cursorClasses = () => {
  //   let classes = "cursor";

  //   if (mouseClicked) {
  //     classes += " clicked";
  //   }

  //   if (typeof document !== "undefined") {
  //     const isMouseOverBack = document.querySelector('.c-back:hover');
  //     if (isMouseOverBack) {
  //       classes += ' back';
  //     }

  //     const isMouseOverNext = document.querySelector('.next-project:hover');
  //     if (isMouseOverNext) {
  //       classes += ' next';
  //     }

  //     const isMouseOverImg = document.querySelector('.cursor-as--post:hover');
  //     if (isMouseOverImg) {
  //       classes += ' custom-c';
  //     }

  //     // if(cursorWithinViewport){
  //     //   classes += ' hidden';

  //     // }else{
  //     //   classes = classes.replace('hidden', '');

  //     // }
     
  //   }

  //   return classes;
  // };

  // if (touchDevice) {
  //   return null;
  // }

  // const cursorVariants = {
  //   initial: { opacity: 1, backgroundColor: "#ffffff" },
  //   isOverImg: { opacity: 1, backgroundColor: "#000000" },
  //   hidden: { opacity: 0 },
  // };

  const sensitivity = 20; // Adjust this value to increase or decrease sensitivity


  const getRotationAngle = () => {
    if (direction === 'up') {
      return Math.min(90, velocity * sensitivity); // Scale velocity to rotation angle, max 20
    } else if (direction === 'down') {
      return Math.max(-90, -velocity * sensitivity); // Scale velocity to rotation angle, min -20
    }
    return 0; // Neutral position if not moving
  };

  const rotation = getRotationAngle();

  //  // Define variants for rotation
  //  const variants = {
  //   up: { rotate: 30 },
  //   down: { rotate: -30 },
  //   neutral: { rotate: 0 },
  // };

  const currentVariant = direction === 'up' ? 'up' : (direction === 'down' ? 'down' : 'neutral');

  return (
    <>

    <motion.div

         // className={cursorClasses()}
         style={{
          rotate: rotation, // Apply rotation based on the calculated angle
          x: mousePosition?.x,
          y: mousePosition?.y,
        }}
        // variants={variants} // Set the variants
        // animate={currentVariant} // Animate based on the current variant
      
        transition={{
          ease: [0.33, 1, 0.68, 1],
          
          duration: 0.6,
        }}
      className="absolute z-50 p-2 text-xs text-black bg-white shadow-md rounded-2xl shadow-emerald-300"
    >
      View Project 
      {/* {mousePosition.x}, {mousePosition.y}
      <div>Direction: {direction}</div>
      <div>Velocity: {velocity.toFixed(2)}</div> */}
    </motion.div>
    {/* <motion.div
      ref={hostRef}
      className={cursorClasses()}
      style={{
          zIndex: 9999,
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
    </motion.div> */}
    </>

  );
};

export default CustomCursor;
