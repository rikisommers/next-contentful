"use client";

import React from "react";
import AnimatedText from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";

export const BlockQuote = ({ data }) => {
  const { currentTheme } = useThemeContext();
  console.log(data)
  
  return (
    <blockquote className="p-10 mx-auto flex flex-col gap-4 max-w-prose fluid-type bg-[var(--surface1)]/20 rounded-2xl">
        {data.title && (
          <span className="text-sm text-[var(--subtext-color)]">
            {/* <AnimatedText
              type={AnimStyle.LINESUP}
              content={data.title}
            /> */}
            {data.title}
          </span>
        )}

        {data.content && (
          <h3 className="text-2xl font-light leading-relaxed text-balance text-[var(--text-color)]">
            <AnimatedText
              type={currentTheme.data.textAnimation}
              content={data.content}
            />
           {/* {data.content} */}
          </h3>

        )}
    </blockquote>
  );
};

export default BlockQuote;
