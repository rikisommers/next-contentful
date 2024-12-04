import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useThemeContext } from "../themeContext";

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

  const insetValue = currentTheme?.animation?.inset || 1.5;
  const borderRadiusValue = currentTheme?.animation?.borderRadius || 1.5;

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
        backgroundColor: 'var(--accent-pri',
       }}
      className={`relative min-w-screen overflow-hidden`}
    >

        
      {children}
    </motion.div>
  );
};
