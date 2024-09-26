import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Layout from "../components/layout";
import Head from "next/head";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import { getLandingPage, getFooter } from "../lib/api";
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
import TransitionPage from "../components/transition/pageTransition";

const Bio = ({ data, footerData }) => {
  console.log("-------------------------------", data);
  const contentRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <Layout>
      <TransitionPage>
      <div className="flex flex-col px-8">
          <PostIntro title={data.titlealt} content={data.contentalt} />

          <LandingPageContent data={data} />
          <BlockFooter content={footerData} />
        </div>
      </TransitionPage>
      <TransitionWipe />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage("bio")) ?? [];
  const footerData = (await getFooter()) ?? {};

  return {
    props: {
      data,
      footerData,
    },
  };
}

export default Bio;
