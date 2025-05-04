'use client';

import React from "react";
import { motion, cubicBezier } from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";
import { usePathname } from "next/navigation";

export default function Logo({logo}) {
    const { currentTheme } = useThemeContext();
    const pathname = usePathname();

  return (
    <motion.div
      style={{
        backgroundColor: currentTheme.data.logoFill ? "var(--accent)" : "transparent" ,
        color: pathname === "/" ? "var(--text-color)" : "var(--heading-color)",
      }}
      className={`pointer-events-auto cursor-pointer relative z-50 flex items-center rounded-xl`}
    >
      <div className={`w-[32px] h-[32px] flex items-center justify-center`}>
        {logo &&
          <img
            src={logo.url}
            title={logo.title}
            viewBox="0 0 32 32"
            className="h-full"
          />
        }
      </div>

      <motion.span
        className="self-center p-3 font-medium whitespace-nowrap"
        style={{ color: "var(--text-color)" }}
        layoutId="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          delay: 0,
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        }}
      >
        Riki Sommers
      </motion.span>
    </motion.div>
  );
}