import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getHome, getTheme } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import TransitionHome from "../components/transition/transition-home";
import PostIntro from "../components/post/post-intro";
import Chrome from "../components/navigation/chrome";
import TextAnimation from "../components/utils/text-animation";
import Experience from "../components/utils/experience";
import Background from "../components/utils/background";
import PostHeader from "../components/post/post-header";
import PostDetails from "../components/post/post-details";
import BlockFooter from "../components/blocks/block-footer";
import FadeInWhenVisible from "../components/utils/fade-in-visible";
import Audio from "../components/navigation/audio";
import Link from "next/link";
import TextScramble from "../components/utils/text-scamble";
import TextAnimationLineUp from "../components/utils/text-animation-line-up";
import TextAnimationUp from "../components/utils/text-animation-up";

import { RichTextForAnimOptions } from "../components/rich-text/rich-text-for-anim";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { TextTitle } from "../components/rich-text/text-title";
import { TextSubtitle } from "../components/rich-text/text-subtitle";


import { useTheme } from 'next-themes';
import { getThemeByKey } from '../utils/theme';


export default function Index({ home }) {
  const router = useRouter();
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  
  // const { theme } = useTheme();
  // const backgroundColor = theme.backgroundColor;
  // const textColor = theme.textColor;

  //console.log(home)
  useEffect(() => {
    const wheelEvent =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    const touchEvent = "ontouchstart" in window ? "touchmove" : "";

    const handleScroll = (e) => {
      router.push("/work");
    };

    window.addEventListener(wheelEvent, handleScroll);
    window.addEventListener(touchEvent, handleScroll);

    return () => {
      window.removeEventListener(wheelEvent, handleScroll);
      window.removeEventListener(touchEvent, handleScroll);
    };
  }, []);

  
  // const theme = {
  //   background:{
  //     dark:black,
  //     light:white
  //   }
  // }

  const clipPathInitial = `inset(1.0rem 1.0rem 6.0rem round 0.5rem)`;
  const clipPathAnimate = `inset( 1.5rem round 1rem )`;
  const clipPathExit = `inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )`;

  const date = new Date(home.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);

  return (
    <Layout>
      {/* <TransitionTilt> */}
      <div 
          style={{ backgroundColor:currentTheme?.bodyBackgroundColor}}
        className={`transition ease-in-out w-screen h-screen z-100`}>
        <div className="z-10 home ">
          <FadeInWhenVisible>
            <div className="grid items-end h-full grid-cols-12 px-32 py-32">
              <div className="flex flex-col col-span-12 gap-6 md:col-span-6 text-slate-50">
                {/* <h1 className="text-7xl">{backgroundColor}</h1> */}

                {/* <TextAnimation  
                    content={home.title}
                    color={"text-slate-400"}
                  /> */}

                <TextTitle content={home.titlealt}>
                  {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
                </TextTitle>
                <TextSubtitle
                  content={home.contentalt}
                  color={currentTheme?.textColor}
                />

                {/* <TextAnimationLineUp content={home.content?.json}></TextAnimationLineUp> */}
              </div>
            </div>
          </FadeInWhenVisible>

          <div className="flex justify-between p-3 selef-end">
            <div className="flex gap-3">
              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Location:</span>
                <Link
                  href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                  className="text-slate-500"
                >
                  @-43.5093881,172.6992615
                </Link>
              </div>

              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Last Updated:</span>
                <span className="text-slate-500">{dateString}</span>
              </div>
            </div>

            <div className="sound">
              <Audio />
            </div>
          </div>
        </div>

        <motion.div
          className="absolute flex items-center justify-end w-full h-full bg-gray-900 opacity-75"
          initial={{ clipPath: clipPathInitial }}
          animate={{ clipPath: clipPathInitial }}
          exit={{ clipPath: clipPathInitial }}
          transition={{
            duration: 0.6,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          }}
        >
          {/* <Background /> */}
        </motion.div>
        {/* <TransitionTilt>

          </TransitionTilt> */}
      </div>

      {/* <BlockFooter title={'sdsdsdd'}/> */}
      {/* </TransitionTilt> */}
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];

  return {
    props: {
      home
    },
  };
}
