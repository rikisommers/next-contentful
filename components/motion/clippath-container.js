import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";

export const ClipContainer = ({ children, background, scale }) => {
  const heroRef = useRef(null);
  const { currentTheme } = useThemeContext();

  const [clipPathValue, setClipPathValue] = useState(
    "inset( 0rem 0rem 0rem round 0rem 0rem 0rem 0rem)"
  );

  const [scaleValue, setScaleValue] = useState(1);

  const { scrollYProgress: scrollContent } = useScroll({
    target: heroRef,

    offset: ["end end", "end 50%"],
  });

  const insetValue = 1.5;
  const borderRadiusValue = 1.5;

  const yv = useTransform(scrollContent, [0, 1], [0, insetValue]);
  const xv = useTransform(scrollContent, [0, 1], [0, insetValue]);
  const xr = useTransform(scrollContent, [0, 1], [0, borderRadiusValue]);
  const scaleMotionValue = useTransform(scrollContent, [0, 1], [1, 0.9]);

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setClipPathValue(
      `inset(${yv.current}rem ${xv.current}rem round ${xr.current}rem)`
    );
    setScaleValue(scaleMotionValue);
  });

  return (
    <motion.div
      ref={heroRef}
      style={{
        clipPath: clipPathValue,
        backgroundColor: "var(--background-color)",
        position: "relative", // Ensures proper scroll offset calculation
      }}
      className={`relative z-10 w-full`}
    >

      {/* <div className="absolute top-0 left-0 w-full h-screen">
      {background}
      </div> */}


      <motion.div
        className="flex flex-col w-full h-full"
        style={{
         // scale: scale === false ? 1 : scaleValue
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
