'use client';

import React from "react";
import { motion, cubicBezier } from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Logo({logo, showTitle, title}) {
    const { currentTheme } = useThemeContext();
    const pathname = usePathname();

  const LogoContent = () => (
    <motion.div
      style={{
        backgroundColor: currentTheme.data.logoFill ? "var(--accent)" : "transparent",
        color: pathname === "/" ? "var(--text-color)" : "var(--heading-color)",
      }}
      className={`flex relative z-50 items-center rounded-xl cursor-pointer pointer-events-auto`}
    >
      <div className={`flex justify-center items-center p-1 w-[32px] h-[32px]`}>
        {logo && (
          <img
            src={logo.url}
            alt={logo.title}
            title={logo.title}
            className="h-full"
          />
        )}
      </div>
      {showTitle && (
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
          {title || ''}
        </motion.span>
      )}
    </motion.div>
  );

  return pathname === "/" ? (
    <LogoContent />
  ) : (
    <Link href="/" passHref>
      <LogoContent />
    </Link>
  );
}