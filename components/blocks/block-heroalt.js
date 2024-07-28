import React from "react";
import { motion } from "framer-motion";

import AnimatedText,{AnimStyle} from "../motion/animated-text";
import Audio from "../navigation/audio";
import Link from "next/link";

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
            {/* <h1 className="text-7xl">{backgroundColor}</h1> */}

            <div className="grid-cols-5">
              <h2 className="text-4xl font-normal font-aon">
                <AnimatedText type={AnimStyle.LINEPOSUP} content={contentalt}/>
              </h2>
            </div>

            {/* <TextTitle content={titlealt}/> */}
            {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
            <div className="grid-cols-3">
              <h3 className="text-xl text-center font-regular">
                <AnimatedText type={AnimStyle.LINEFADEIN} content={titlealt}/>
              </h3>
            </div>
          </div>
        </div>
        {/* {date && (
          <div className="flex justify-between p-6">
            <div className="flex gap-1 p-2 text-xs rounded-lg bg-slate-600 ">
              <span className="uppercase text-slate-400">Location:</span>
              <a
                href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                className="text-slate-500"
              >
                @-43.5093881,172.6992615
              </a>
            </div>

            <div className="flex gap-1 p-2 text-xs rounded-lg bg-slate-600">
              <span className="uppercase text-slate-400">Last Updated:</span>
              <span className="text-slate-500">{date}</span>
            </div>
          </div>
        )} */}
      </div>
      {/* <motion.div
        className="flex items-center justify-end w-full opacity-75 h-vhh"
        initial={{ clipPath: "inset(1.0rem 1.0rem 1.0rem round 0.5rem)" }}
        animate={{
          backgroundColor: currentTheme?.backgroundColor,
          clipPath: "inset( 1rem round 1rem )",
        }}
        exit={{ clipPath: "inset( 1.5rem 1.5rem 1.5rem 1.5rem round 1rem )" }}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
      /> */}
    </div>
  );
}
