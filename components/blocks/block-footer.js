import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import Audio from "../navigation/audio";
import Link from "next/link";

export default function BlockFooter({ content }) {
  return (
    <div className="relative h-vhh flex flex-col">
      {/* pt-32 pb-16 */}
      
      <div className="grid grid-cols-12 w-full gap-3 flex-grow items-end pb-20  py-32 px-32 z-20">
        <div className="col-span-12 md:col-span-6">
          {/* <h1 className="text-7xl">{title && title}</h1> */}
          <motion.p className="text-sm text-slate-400">sdfsdf</motion.p>

          <TextAnimation content={content?.title} />
        </div>
        <h2 className="text-slate-500 font-light col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance">
          {content?.intro}
        </h2>
      </div>

      <div className="home__footer px-32 ">
              <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
                <span className="uppercase text-slate-400">Location:</span>
                <Link href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                   className="text-slate-500">
                    @-43.5093881,172.6992615
                </Link>
              </div>

              <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
                <span className="uppercase text-slate-400">Last Updated: </span>
              
                <span className="text-slate-500">
                  lastUpdatedDate
                </span>
               
              </div>

              <div className="sound">
                <Audio />
              </div>
            </div>
      <div className="rounded-xl  absolute overflow-hidden w-full h-full z-0"></div>


    </div>
  );
}
