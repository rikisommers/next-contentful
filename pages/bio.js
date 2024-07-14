import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Layout from "../components/layout";
import Head from "next/head";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import { getLandingPage } from "../lib/api";
import TextRotating from "../components/utils/text-rotating";
import { ScrollableBox } from "../components/utils/scrollable";
import BlockFooter from "../components/blocks/block-footer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../components/rich-text/rich-text";
import Link from "next/link";

import { useTheme } from "next-themes";
import { themes } from "../utils/theme";
import { getThemeByKey } from "../utils/theme";
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

  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  return (
    <div style={{ background: currentTheme?.bodyBackgroundColor }}>
      <Layout>
        <TransitionTilt>
          <ScrollContainer>

              <BlockHeroAlt
                titlealt={data.titlealt}
                contentalt={data.contentalt}
              />
              <BlockHero
                titlealt={data.titlealt}
                contentalt={data.contentalt}
              />
              <LandingPageContent data={data} />
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
