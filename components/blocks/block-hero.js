import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import { TextSubtitle } from "../rich-text/text-subtitle";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getThemeByKey } from "../../utils/theme";

export default function BlockHero({
  title,
  intro,
  titlealt,
  contentalt,
  date,
}) {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  return (
    <div
      className={`relative transition ease-in-out w-screen h-screen`}
      style={{ background: currentTheme?.bodyBackgroundColor }}
    >
      <div className="z-10 home">
        <div className="grid items-end h-full grid-cols-12 px-32 py-32">
          <div className="flex flex-col col-span-12 gap-6 md:col-span-6 ">
            {/* <h1 className="text-7xl">{backgroundColor}</h1> */}

            {/* <TextAnimation  
              content={home.title}
              color={"text-slate-400"}
            /> */}

            <TextTitle content={titlealt}>
              {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
            </TextTitle>
            <TextSubtitle
              content={contentalt}
              color={currentTheme?.textColor}
            />
          </div>
        </div>
        {date && (
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
        )}
      </div>
      <motion.div
        className="absolute flex items-center justify-end w-full h-full opacity-75"
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
      />
    </div>
  );
}
