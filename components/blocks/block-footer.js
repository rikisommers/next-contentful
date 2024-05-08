import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import Audio from "../navigation/audio";
import Link from "next/link";

export default function BlockFooter({ content }) {
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

      <div className="px-32 home__footer ">
        <div className="flex col-span-3 gap-1 text-xs lg:col-span-2">
          <span className="uppercase text-slate-400">Location:</span>
          <Link
            href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
            className="text-slate-500"
          >
            @-43.5093881,172.6992615
          </Link>
        </div>

        <div className="flex col-span-3 gap-1 text-xs lg:col-span-2">
          <span className="uppercase text-slate-400">Last Updated: </span>

          <span className="text-slate-500">lastUpdatedDate</span>
        </div>

        <div className="sound">
          <Audio />
        </div>
      </div>
      <div className="absolute z-0 w-full h-full overflow-hidden rounded-xl"></div>
    </div>
  );
}
