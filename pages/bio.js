import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Layout from "../components/layout";
import Head from "next/head";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import { getLandingPage } from "../lib/api";
import { ScrollableBox } from "../components/utils/scrollable";
import BlockFooter from "../components/blocks/block-footer";


import PostBody from "../components/post/post-body";
import PostContent from "../components/post/post-content";
import BlockHero from "../components/blocks/block-hero";
import LandingPageContent from "../components/landing-page-content";
import BlockHeroAlt from "../components/blocks/block-heroalt";
import ScrollContainer from "../components/utils/scroll-container";
import ClipPathContainer from "../components/utils/clip-path-container";

import Lenis from "@studio-freight/lenis";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import BlockHeader from "../components/blocks/block-header";

const Bio = ({ data }) => {
  console.log("-------------------------------", data);
  const contentRef = useRef(null);
  const footerRef = useRef(null);



  return (
    <div style={{ background:  'var(--body-background-color)' }}>
      <Layout>
      <TransitionTilt active={true} className="z-100">
      <ScrollContainer>

              <BlockHeroAlt
                titlealt={data.titlealt}
                contentalt={data.contentalt}
              />

               <motion.div className="flex flex-col"
      initial={{
        opacity:0,
        y: 100,
      }}
      animate={{
        opacity:1,
        y: 0,
      }}
      transition={{
        delay:0.6,
      ease: [0.33, 1, 0.68, 1],
      duration: 1.2,
      }}
    >
                    {/* <BlockHero
                titlealt={data.titlealt}
                contentalt={data.contentalt}
              /> */}
              <LandingPageContent data={data} />
              </motion.div>
              <BlockFooter content={data.intro} />
 
          </ScrollContainer>
        </TransitionTilt>
        <TransitionWipe />
      </Layout>
    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage("bio")) ?? [];

  return {
    props: {
      data,
    },
  };
}

export default Bio;
