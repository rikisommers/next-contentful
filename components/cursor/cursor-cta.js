"use client";

import React, { useContext} from "react";
import { motion, easeInOut } from "../../utils/motion";;
import { MousePosContext } from "../context/mousePosContext";
import { useMousePos } from '../context/mousePosContext'; // Adjust the import path as necessary
import { useThemeContext } from "../context/themeContext";

/**
 * Call-to-action cursor component with rotation and visibility effects
 * @component
 * @category cursor
 * 
 * A text-based cursor that displays custom content and rotates based on mouse movement direction.
 * Features velocity-based rotation, theme-aware styling, and visibility controls.
 * 
 * @param {Object} props - Component props
 * @param {string} props.content - Text content to display in the cursor
 * 
 * @example
 * // Basic CTA cursor with custom text
 * <CursorCta content="Click me" />
 * 
 * @example
 * // Used in layout with theme context
 * {currentTheme.data.cursor === "cta" && <CursorCta content="Hello" />}
 */
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
  const { currentTheme } = useThemeContext();


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
          ease: "easeOut",
          duration: 0.02,
        }}
      className="fixed z-50 p-2 text-xs rounded-full"
      style={{
        backgroundColor: currentTheme.data.backgroundColor,
        color: currentTheme.data.textColor,
      }}
    >
      {content}
    </motion.div>
   </>

  );
};

export default CursorCta;
