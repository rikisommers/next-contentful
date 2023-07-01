//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback } from "react";
import { Router, useRouter } from "next/router";
import Head from "next/head";

import Intro from "../components/intro";
import Layout from "../components/layout";
import { getHome, lastUpdatedDate } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import { motion, cubicBezier, useMotionValue, useTransform } from "framer-motion";
import Transition from "../components/transition-wipe";
import TransitionTilt from "../components/transition-tilt";
import TextAnimation from "../components/text-animation";
import CaseStudyIntro from "../components/caseStudyIntro";
import Chrome from "../components/chrome";
export default function Index({ home, lastUpdate }) {
  const router = useRouter();

  useEffect(() => {
    const wheelEvent =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    const touchEvent = "ontouchstart" in window ? "touchmove" : "";

    const handleScroll = (e) => {
      router.push("/posts");
    };

    window.addEventListener(wheelEvent, handleScroll);
    window.addEventListener(touchEvent, handleScroll);

    return () => {
      window.removeEventListener(wheelEvent, handleScroll);
      window.removeEventListener(touchEvent, handleScroll);
    };
  }, []);

  const lastUpdatedDate = home?.sys?.updatedAt || "N/A";

  const clipPathInitial = `inset(-1rem )`;
  const clipPathAnimate = `inset(1.5rem round 1.5rem )`;

  return (
    <Layout>
      <TransitionTilt>
        {/* bg-slate-100 */}

        <motion.div
          initial={{clipPath: clipPathInitial}}
          animate={{ clipPath: clipPathAnimate }}
          transition={{
            duration: 1.2,
            easing:cubicBezier(0.35, 0.17, 0.3, 0.86)
          }}
          className="fixed w-full h-full top-0 z-30 flex inset"
        >
            <Chrome lastUpdate={lastUpdate} />
            <div className="w-full h-full 0 flex items-end justify-end  grad">
              <CaseStudyIntro title={home.title} content={home.intro} />
            </div>
        </motion.div>
      </TransitionTilt>
      <Transition />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  const lastUpdate = (await lastUpdatedDate(preview)) ?? [];
  return {
    props: {
      home,
      lastUpdate,
    },
  };
}
