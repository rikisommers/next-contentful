import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, cubicBezier } from "../../utils/motion";;
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";
import { useThemeContext } from '../context/themeContext';


export default function PostIntro({ title, content, }) {

  const { currentTheme } = useThemeContext();

  return (
    //pt-[16rem] pb-8
    <div className="grid items-end content-end w-full grid-cols-12 gap-6"
    >
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
      {content && 
<>
<div className="inline-flex p-2 mb-8 ml-2 text-sm text-white uppercase rounded-xl"
style={{backgroundColor:"var(--accent-pri)"}}>
Portfolio
</div>
      {/* //~text-4xl/6xl */}

      
        <h1 className="leading-normal text-balance"> 
          <AnimatedText content={title} type={currentTheme.data.textAnimation} delay={AnimTextOrder.ONE}/>
          {/* <AnimatedText type={AnimStyle.LINEFADEIN} content={content} delay={AnimTextOrder.THREE}/> */}
        </h1>
        </>
      }
      </div>
      <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
        <h4 className="text-sm font-normal">
          {content && 
          <AnimatedText type={currentTheme.data.textAnimationSec} content={content} delay={AnimTextOrder.THREE}/>
        }
        </h4>
      </div>
    </div>
  );
}
