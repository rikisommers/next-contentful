import React, { useRef, useState } from "react";
import AnimatedText, { AnimStyle } from "./animated-text";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ThemeProvider, useThemeContext } from "../themeContext";

export const ClipContainer = ({ children }) => {
  const heroRef = useRef(null);
  const { currentTheme } = useThemeContext();
console.log(currentTheme)
  const [clipPathValue, setClipPathValue] = useState(
    "inset( 8rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)"
  );

  const { scrollYProgress: scrollContent } = useScroll({
    target: heroRef,

    offset: ["end end", "end 50%"],
    onChange: (latest) => {
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });

  const insetValue = currentTheme?.animation?.inset || 8;
  const borderRadiusValue = currentTheme?.animation?.borderRadius || 8;

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
      className={`relative min-w-screen min-h-screen overflow`}
    >

        
      {children}
    </motion.div>
  );
};
