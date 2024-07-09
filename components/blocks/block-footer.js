import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { getThemeByKey } from "../../utils/theme";

export default function BlockFooter({ content }) {

  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);



  return (
    <div className="relative flex flex-col h-vhh">
      {/* pt-32 pb-16 */}

      <div className="z-20 grid items-end flex-grow w-full grid-cols-12 gap-3 px-32 py-32 pb-20">
        <div className="col-span-12 md:col-span-6">
          <motion.p className="text-sm text-slate-400">sdfsdf</motion.p>
          {/* <TextAnimation content={content?.title} /> */}
          {content?.titlealt && (
            // <TextAnimation content={content?.title} color={'#000'}/>

            <TextTitle content={content?.titlealt} color={"text-slate-400"} />
          )}
        </div>
        <h2 className="col-span-6 text-2xl font-light text-left text-slate-500 md:col-span-6 md:text-right text-balance">
          {content?.intro}
        </h2>
      </div>

     
      <div
          className="absolute w-full h-full"
          style={{ 
            clipPath: "inset( 1rem round 1rem )",
            backgroundColor: currentTheme?.backgroundColor,
          }}
        />
    </div>
  );
}
