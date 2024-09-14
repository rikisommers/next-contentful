import React from "react";
import { motion } from "framer-motion";
import Audio from "../navigation/audio";
import Link from "next/link";
import Background from "../utils/background";
import AnimatedText,{AnimStyle, HighlightStyle, AnimTextOrder} from "../motion/animated-text";
import { TextAnimLineUp } from "../motion/text-anim-line-up";
import TextAnimationUp from "../motion/text-animation-up";

export default function BlockHero({
  title,
  intro,
  titlealt,
  contentalt,
  date,
  content,
  layout,
}) {

  return (
    <div data-name="hero-container"
      className={`relative transition ease-in-out w-full h-screen noisy`}
      style={{ background: 'var(--body-background-color)' }}
    >
{/* 
<div className="absolute w-full h-full z-1">
       <Background />
       </div>
        */}
        <div className="absolute z-50 flex flex-col items-center justify-center w-full h-full pointer-events-none margin-auto ">
          <div className="grid max-w-xl gap-8">
            {/* <h1 className="text-7xl">{backgroundColor}</h1> */}

            {/* <TextAnimation  
              content={home.title}
              color={"text-slate-400"}
            /> */}
             <p>{title}</p>
            <h1 className="text-4xl font-medium text-center font-aon">
              <AnimatedText 
               type={AnimStyle.LINEPOSUP} 
               highlight={HighlightStyle.TEXT}
               content={titlealt} 
               delay={AnimTextOrder.ONE}/>
              {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
            </h1>
              <h2 className="text-xl text-center font-regular"
                   style={{
                    color: 'var(--subtext-color)',
                  }}>
                <AnimatedText type={AnimStyle.LINEFADEIN} content={titlealt} delay={AnimTextOrder.THREE}/>
              </h2>

          </div>
        </div>
        {date && (
          <div className="absolute flex justify-between w-full p-6 bottom-1">
            <div className="flex gap-1 p-2 text-xs ">
              <span className="uppercase">Location:</span>
              <a
                href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                stlye={{color:'var(--accent)'}}
              >
                @-43.5093881,172.6992615
              </a>
            </div>

            <div className="flex gap-1 p-2 text-xs"
             stlye={{color:'var(--accent)'}}>
              <span className="uppercase">Last Updated:</span>
              <span>{date}</span>
            </div>
          </div>
        )}
              {/* <div className="absolute z-10 flex flex-col w-full h-full">

      </div> */}
      <motion.div
        className="absolute z-0 flex items-center justify-end w-full h-full opacity-75 pointer-events-none"
        initial={{ clipPath: "inset(1.0rem 1.0rem 1.0rem round 0.5rem)" }}
        animate={{
          backgroundColor: 'var(--background-color)',
          clipPath: "inset( 1rem round 1rem )",
        }}
        exit={{ clipPath: "inset( 1.5rem 1.5rem 1.5rem 1.5rem round 1rem )" }}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
      />
     
    </div>
  );
}
