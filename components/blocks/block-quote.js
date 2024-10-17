"use client";

import React from "react";

export const BlockQuote = ({ data }) => {

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
          <h2 className="text-6xl" style={{ color: "var(--text-accent)" }}>
            {/* <AnimatedText
              type={AnimStyle.CHARFADE}
              content={data.content}
            /> */}
           {data.content}
          </h2>

        )}
      </div>
    </blockquote>
  );
};

export default BlockQuote;
