"use client";

import React from "react";
import AnimatedText, { AnimStyle, AnimTextOrder } from "../motion/animated-text";

export const BlockQuote = ({ data }) => {


  return (
    <blockquote className="grid grid-cols-6">
      <div className="flex flex-col col-span-4 col-start-2 gap-4">
        {data.title && 
        <span style={{color:'var(--heading-color)'}}>
          <AnimatedText type={AnimStyle.LINESUP} content={data.content} delay={AnimTextOrder.THREE}/>
          {data.title}
          </span>}

<h1>SD</h1>
        {data.content && 
        <h2 className="text-6xl" style={{color:'var(--text-accent)'}}>
        <AnimatedText type={AnimStyle.LINESUP} content={data.content} delay={AnimTextOrder.THREE}/>
        </h2>
        }
      </div>
    </blockquote>
  );
};

export default BlockQuote;
