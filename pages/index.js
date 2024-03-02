import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getHome, lastUpdatedDate } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import Chrome from "../components/navigation/chrome";
import TextAnimation from "../components/utils/text-animation";
import Experience from "../components/utils/experience";
import Background from "../components/utils/background";
import PostHeader from "../components/post/post-header";
import PostDetails from "../components/post/post-details";
import FadeInWhenVisible from "../components/utils/fade-in-visible";
import Audio from "../components/navigation/audio";
import Link from "next/link";
export default function Index({ home, lastUpdated }) {
  const router = useRouter();

  // useEffect(() => {
  //   const wheelEvent =
  //     "onwheel" in document
  //       ? "wheel"
  //       : "onmousewheel" in document
  //       ? "mousewheel"
  //       : "DOMMouseScroll";
  //   const touchEvent = "ontouchstart" in window ? "touchmove" : "";

  //   const handleScroll = (e) => {
  //     router.push("/posts");
  //   };

  //   window.addEventListener(wheelEvent, handleScroll);
  //   window.addEventListener(touchEvent, handleScroll);

  //   return () => {
  //     window.removeEventListener(wheelEvent, handleScroll);
  //     window.removeEventListener(touchEvent, handleScroll);
  //   };
  // }, []);

  const clipPathInitial = `inset(1.0rem 1.0rem 6.0rem round 0.5rem)`;
  const clipPathAnimate = `inset( 1.5rem round 1rem )`;
  const clipPathExit = `inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )`;

  return (
    <Layout>

        <div className="absolute w-screen h-screen bg-gray-800">
          <div className="home z-10 ">
            <FadeInWhenVisible>
              <div className="grid grid-cols-12 h-full items-end py-32 px-32">
                <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
                  {/* <h1 className="text-7xl">{title && title}</h1> */}
                  <motion.p
                    className="text-sm text-slate-500 uppercase"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                      duration: 0.6,
                      delay: 0.3,
                    }}
                  >
                    test
                  </motion.p>

                  <TextAnimation
                    content={home.title}
                    color={"text-slate-400"}
                  />

                  <h2 className="text-slate-500 font-light col-span-6 md:col-span-6 text-2xl text-left  text-balance">
                    {home.intro}
                  </h2>
                </div>
              </div>
            </FadeInWhenVisible>

            <div className="home__footer">
              <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
                <span className="uppercase text-slate-400">Location:</span>
                <Link href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                   className="text-slate-500">
                    @-43.5093881,172.6992615
                </Link>
              </div>

              <div className="flex gap-1 col-span-3 lg:col-span-2 text-xs">
                <span className="uppercase text-slate-400">Last Updated: </span>
                {/* { lastUpdatedDate &&
                <span className="text-slate-500">
                  {lastUpdatedDate}
                </span>
                } */}
              </div>

              <div className="sound">
                <Audio />
              </div>
            </div>
          </div>

          <motion.div
            className="absolute w-full h-full flex items-center justify-end bg-gray-900 opacity-75"
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
                  <TransitionTilt>

          </TransitionTilt>
        </div>
        <TransitionWipe />

    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  const lastUpdated = (await lastUpdatedDate(preview)) ?? [];

  return {
    props: {
      home,
      lastUpdated
    },
  };
}
