import React from "react";
import TextAnimationUp from "../motion/text-animation-up";

export const BlockQuote = ({ data }) => {


  return (
    <blockquote className="grid grid-cols-6">
      <div className="flex flex-col col-span-4 col-start-2 gap-4"
      style={{color:'var(--subtext-color)'}}>
        {data.title && 
        <span style={{color:'var(--heading-color)'}}>
          {data.title}
          </span>}
        {data.content && 
        // <h2 className="text-6xl ">{data.content}</h2>
        <TextAnimationUp content={data.content}/>

        }
      </div>
    </blockquote>
  );
};

export default BlockQuote;
