import React, { useState, useRef, useContext} from "react";
import { motion, cubicBezier } from "../../utils/motion";;
import { MousePosContext } from "../context/mousePosContext";
//import { checkTouchDevice } from "./check-toucch-device";
import { useThemeContext } from "../context/themeContext";

/**
 * Animated cursor dot component with smooth spring physics
 * @component
 * @category cursor
 * 
 * A circular cursor that follows mouse movement with spring animations.
 * Features click states, hover effects, and theme-aware styling.
 * 
 * @example
 * // Basic cursor dot
 * <CursorDot />
 * 
 * @example
 * // Used in layout with theme context
 * {currentTheme.data.cursor === "dot" && <CursorDot />}
 */
const CursorDot = () => {
  const { mousePosition, direction, velocity } = useContext(MousePosContext);

  const [touchDevice, setTouchDevice] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [cursorWithinViewport, setCursorWithinViewport] = useState(false);

  const hostRef = useRef(null);
  const { currentTheme } = useThemeContext();

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


  const onMouseDown = () => {
    setMouseClicked(true);
  };

  const onMouseUp = () => {
    setMouseClicked(false);
  };

  const cursorClasses = () => {
    let classes = "cursor w-4 h-4 rounded-full z-[9999] fixed";

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


  // const cursorVariants = {
  //   initial: { opacity: 1, backgroundColor: "#ffffff" },
  //   isOverImg: { opacity: 1, backgroundColor: "#000000" },
  //   hidden: { opacity: 0 },
  // };


  //  // Define variants for rotation
  //  const variants = {
  //   up: { rotate: 30 },
  //   down: { rotate: -30 },
  //   neutral: { rotate: 0 },
  // };


  return (
    <>

  
    <motion.div
      ref={hostRef}
      className={cursorClasses()}
      style={{
        backgroundColor: currentTheme.data.backgroundColor,
        color: currentTheme.data.textColor,
      }}
      animate={{
          zIndex: 9999,
         left: `${mousePosition.x}px`,
         top: `${mousePosition.y}px`,
        opacity: cursorWithinViewport ? 0 : 1,
     }}
      transition={{
        type: "spring",
        stiffness: 1200,
        damping: 40,
        mass: 0.5,
      }}
    >
      {/* <motion.div className="w-16 h-16 bg-white rounded-full z-[9999]"></motion.div> */}
    </motion.div>
    </>

  );
};

export default CursorDot;