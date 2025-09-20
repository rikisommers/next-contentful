import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";

export const ScaleContainer = ({ children }) => {
  const containerRef = useRef(null);

  const [scaleValue, setScaleValue] = useState(1);

  const { scrollYProgress: scrollContent } = useScroll({
    target: containerRef,
    offset: ["end end", "end 50%"],
  });

  const scaleMotionValue = useTransform(scrollContent, [0, 1], [1, 0.9]);
  const yMotionValue = useTransform(scrollContent, [0, 1], [0, -45]);

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setScaleValue(scaleMotionValue);
  });

  return (

      <motion.div
            ref={containerRef}
        className="flex relative flex-col justify-center w-full h-full pointer-events-none"
        style={{
          scale: scaleValue,
          y:yMotionValue,
          position: "relative" // Ensures proper scroll offset calculation
        }}
        transition={{
          duration: 4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>


  );
};
