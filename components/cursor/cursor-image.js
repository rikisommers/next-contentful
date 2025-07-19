import React, { useState, useRef, useEffect, useContext} from "react";
import { motion, cubicBezier } from "../../utils/motion";;
import { MousePosContext } from "../context/mousePosContext";
//import { checkTouchDevice } from "./check-toucch-device";
import { useThemeContext } from "../context/themeContext";

/**
 * Large animated cursor image component with fade transitions
 * @component
 * @category cursor
 * 
 * A large rectangular cursor that appears on hover with smooth fade animations.
 * Designed for use in grid layouts to provide visual feedback on interactive elements.
 * 
 * @example
 * // Basic cursor image
 * <CursorImage />
 * 
 * @example
 * // Conditional rendering based on hover state
 * {showCursor && <CursorImage />}
 */
const CursorImage = () => {
  const { mousePosition, direction, velocity } = useContext(MousePosContext);

  const [touchDevice, setTouchDevice] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [cursorWithinViewport, setCursorWithinViewport] = useState(false);

  const hostRef = useRef(null);
  const animationFrameRef = useRef(null);
  const { currentTheme } = useThemeContext();

//   useEffect(() => {
//     checkTouchDevice();
//     return () => removeEventListeners();
//   }, []);


//   const checkTouchDevice = () => {
//     if (
//       typeof window !== "undefined" &&
//       ("ontouchstart" in window || navigator.maxTouchPoints)
//     ) {
//       setTouchDevice(true);
//     } else {
//       addEventListeners();
//     }
//   };




  const onMouseDown = () => {
    setMouseClicked(true);
  };

  const onMouseUp = () => {
    setMouseClicked(false);
  };


  return (
    <>
  
    <motion.div
      ref={hostRef}
      className="overflow-hidden fixed pointer-events-none top-0 right-0 w-[300px] h-[300px] opacity-40 aspect-video bg-amber-400"
      style={{
        backgroundColor: currentTheme.data.accentPri,
        color: currentTheme.data.textColor,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.8,
        left: `${mousePosition.x - 150}px`,
        top: `${mousePosition.y - 150}px`,
      }}
      animate={{
        zIndex: 1,
         left: `${mousePosition.x - 150}px`,
         top: `${mousePosition.y - 150}px`,
        opacity: cursorWithinViewport ? 0 : 1,
        scale: 1,
     }}
      style={{
        willChange: 'transform, opacity'
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 1200,
        damping: 40,
        mass: 0.5,
        opacity: { 
          duration: 0.2,
          ease: "easeInOut"
        },
        scale: { 
          duration: 0.2,
          ease: "easeInOut" 
        },
      }}
    >
      {/* <motion.div className="w-16 h-16 bg-white rounded-full z-[9999]"></motion.div> */}
    </motion.div>
    </>

  );
};

export default CursorImage;