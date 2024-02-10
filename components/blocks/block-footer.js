import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import Audio from "../navigation/audio";
export default function BlockFooter() {
  return (
    <div className="relative h-vhh flex flex-col">
      {/* pt-32 pb-16 */}
      
      <div className="grid grid-cols-12 w-full gap-3 flex-grow items-end pb-20  py-32 px-32 z-20">
        <div className="col-span-12 md:col-span-6">
          {/* <h1 className="text-7xl">{title && title}</h1> */}
          <motion.p className="text-sm text-slate-400">sdfsdf</motion.p>

          <TextAnimation content={"sds"} />
        </div>
        <h2 className="text-slate-500 font-light col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance">
          asdasd
        </h2>
      </div>


      <div className="home__footer z-20">
        <div className="flex flex-col gap-1 col-span-3 lg:col-span-2 text-xs">
          <span className="uppercase text-slate-400">Location:</span>
          <span className="text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempo
          </span>
        </div>

        <div className="flex flex-col gap-1 col-span-3 lg:col-span-2 text-xs">
          <span className="uppercase text-slate-400">Location:</span>
          <span className="text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempo
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
