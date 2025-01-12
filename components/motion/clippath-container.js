import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useThemeContext } from "../context/themeContext";

export const ClipContainer = ({ children }) => {
  const heroRef = useRef(null);
  const { currentTheme } = useThemeContext();

  const [clipPathValue, setClipPathValue] = useState(
    "inset( 0rem 0rem 0rem round 0rem 0rem 0rem 0rem)"
  );

  const { scrollYProgress: scrollContent } = useScroll({
    target: heroRef,

    offset: ["end end", "end 50%"],
    onChange: (latest) => {
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });

  const insetValue = 1.5;
  const borderRadiusValue = 1.5;

  const yv = useTransform(scrollContent, [0, 1], [0, insetValue]);
  const xv = useTransform(scrollContent, [0, 1], [0, insetValue]);
  const xr = useTransform(scrollContent, [0, 1], [0, borderRadiusValue]);

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setClipPathValue(
      `inset(${yv.current}rem ${xv.current}rem round ${xr.current}rem)`
    );
  });

  return (
    <motion.div
      ref={heroRef}
      style={{ 
        clipPath: clipPathValue,
        backgroundColor: 'var(--background-color)',
       }}
      className={`relative min-w-screen overflow-hidden z-10`}
    >
  <motion.div
            className="w-full h-full"
            animate={{
              scale: useTransform(scrollContent, [0, 1], [1, 1.3]), // Updated to use scrollYProgress
            }}
            transition={{
              duration: 4,
              ease: [0.16, 1, 0.3, 1], // direct array syntax
            }}
          >
        
      {children}
      </motion.div>
    </motion.div>
  );
};
