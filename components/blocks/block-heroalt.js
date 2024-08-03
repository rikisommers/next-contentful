import React from "react";
import AnimatedText,{AnimStyle} from "../motion/animated-text";

export default function BlockHeroAlt({
  title,
  intro,
  titlealt,
  contentalt,
  date,
}) {


  return (
    <div
      className={`relative transition ease-in-out w-screen`}
      style={{ background: 'var(--body-background-color)' }}
    >
      <div className="z-10">
        <div className="grid items-end grid-cols-12 px-6 py-8 h-vhh">
          <div className="flex col-span-12 space-between gap-80">
            <div className="grid-cols-5">
              <h2 className="text-4xl font-normal font-aon">
                <AnimatedText type={AnimStyle.LINEPOSUP} content={contentalt}/>
              </h2>
            </div>
            <div className="grid-cols-3">
              <h3 className="text-xl text-center font-regular">
                <AnimatedText type={AnimStyle.LINEFADEIN} content={titlealt}/>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
