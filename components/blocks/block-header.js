import React from "react";
import AnimatedText,{AnimStyle} from "../motion/animated-text";
export default function BlockHeader({ data }) {

  return (
    <div
      className={`relative flex items-start  rounded-lg ${
        data.primaryPageHeader === true ? "h-vhh" : ""
      }`}
      style={{
        backgroundColor:'var(--accent)'
      }}
    >
      {/* pt-32 pb-16 */}
      <div className="z-20 grid items-start w-full grid-cols-12 gap-3 px-8 py-16"

      >
        <div className="col-span-12 md:col-span-6">
          {data?.title && (
            <h2 className="text-4xl font-normal font-aon"
              style={{color:'var(--text-color)'}}
            >
              <AnimatedText type={AnimStyle.CHARFADE} content={data.title}/> 
            </h2>
          )}
        </div>
        <div
          className="col-span-6 font-aon md:col-span-6 "
          style={{ color: 'var(--text-color)' }}
        >
          <AnimatedText type={AnimStyle.LINESUP} content={data.content}/> 

 
        </div>
      </div>
    </div>
  );
}
