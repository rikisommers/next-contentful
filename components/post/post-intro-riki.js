import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";

export default function PostIntroRiki({ title, content }) {
  const { currentTheme } = useThemeContext();

  return (
    //pt-[16rem] pb-8
    <div className="grid items-end content-end w-full grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        {title && (
          <h4 className="mb-4 text-sm font-normal"
            style={{
                color:currentTheme.subtextColor
            }}
          >
            {title}
        
          </h4>
        )}
        {content && (
          <h1 className="leading-normal ~text-2xl/6xl text-balance">
            <AnimatedText
              content={content}
              type={currentTheme.textAnimation}
              delay={AnimTextOrder.TWO}
            />
          </h1>
        )}
      </div>
    </div>
  );
}
