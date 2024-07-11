import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { getThemeByKey } from "../../utils/theme";

export default function BlockHeader({ data }) {

  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);



  return (
    <div className={`relative flex items-end ${ data.primaryPageHeader === true ? "h-vhh" : ''}`}>
      {/* pt-32 pb-16 */}
      <div className="z-20 grid items-start w-full grid-cols-12 gap-3 px-8 py-16">
        <div className="col-span-12 md:col-span-6">
          <motion.p className="text-lg"
          style={{color:currentTheme?.textAccent}}
          >sdfsdf</motion.p>
          {/* <TextAnimation content={content?.title} /> */}
          {data?.title && (
            // <TextAnimation content={content?.title} color={'#000'}/>
            <TextTitle content={data.title} color={"text-slate-400"} />
          )}
                          <h1>sdsd</h1>

        </div>
        <h2 className="col-span-6 text-5xl font-light text-left md:col-span-6 md:text-right text-balance"
                  style={{color:currentTheme?.headingColor}}
>
          {data?.content}
        </h2>
      </div>
    </div>
  );
}
