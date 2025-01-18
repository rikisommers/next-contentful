"use client";

import React, { useState, useEffect, useRef, useContext} from "react";
import { motion, cubicBezier, easeInOut } from "../../utils/motion";;
import { MousePosContext } from "../context/mousePosContext";
import { useMousePos } from '../context/mousePosContext'; // Adjust the import path as necessary

const CursorCta = ({content}) => {
  const { visible } = useMousePos(); // Access the visible state from context
  const { mousePosition, direction, velocity } = useContext(MousePosContext);
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


  // useEffect(() => {
  //   checkTouchDevice();
  //   return
  // }, []);

  return (
    <>
    <motion.div
        animate={{
          opacity: visible ? 1 : 0.5, // Set opacity based on the provider's visible value
          rotate: rotation, // Apply rotation based on the calculated angle
          x: mousePosition?.x + 20,
          y: mousePosition?.y - 20,
        }}
        transition={{
          ease: easeInOut,
          duration: 0.2,
        }}
      className="fixed z-50 p-2 text-xs text-black bg-white shadow-md rounded-2xl shadow-emerald-300"
    >
      {content}
    </motion.div>
   </>

  );
};

export default CursorCta;
