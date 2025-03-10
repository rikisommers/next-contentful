"use client";

import React from "react";
import AnimatedText from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";

export const BlockQuote = ({ data }) => {
  const { currentTheme } = useThemeContext();
  console.log(data)
  
  return (
    <blockquote className="grid grid-cols-6">
      <div className="flex flex-col col-span-4 col-start-2 gap-4">
        {data.title && (
          <span style={{ color: "var(--heading-color)" }}>
            {/* <AnimatedText
              type={AnimStyle.LINESUP}
              content={data.title}
            /> */}
            {data.title}
          </span>
        )}

        {data.content && (
          <h2 className="text-6xl font-normal leading-relaxed text-balance" style={{ color: "var(--text-color)" }}>
            <AnimatedText
              type={currentTheme.data.textAnimation}
              content={data.content}
            />
           {/* {data.content} */}
          </h2>

        )}
      </div>
    </blockquote>
  );
};

export default BlockQuote;
