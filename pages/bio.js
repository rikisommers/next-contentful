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

  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [footerOffsetValue, setFooterOffsetValue] = useState(0);

  const easing = cubicBezier(0.33, 1, 0.68, 1);

  const { scrollYProgress: scrollFooter } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
      // Perform actions based on the scroll position changes
      //   console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });
  const { height } = dimension;

  const y = useTransform(scrollFooter, [0, 1], [-300, 0], easing);

  useMotionValueEvent(scrollFooter, "change", (latest) => {
    //z.set(latest);
    setFooterOffsetValue(y);
  });

  const { scrollYProgress: scrollContent } = useScroll({
    target: contentRef,
    offset: ["start start", "start -100px"],
  });

  const yv = useTransform(scrollContent, [0, 1], [8, 0.01]);
  const xv = useTransform(scrollContent, [0, 1], [1.5, 0.01]);
  const rv = useTransform(scrollContent, [0, 1], [1, 0]);
  const x = useTransform(scrollContent, [0, 1], [1, 100]);

  const initialClipPath = "inset( 0rem 0rem 0px round 0rem 0rem 0rem 0rem)";
  const finalClipPath =
    "inset( 5rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)";

  const [clipPath, setClipPathValue] = useState(initialClipPath);

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setClipPathValue(
      `inset(${yv.current}rem ${xv.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`
    );
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);

    requestAnimationFrame(raf);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ background: currentTheme?.bodyBackgroundColor }}>
      <Layout>
        <TransitionTilt>
          <BlockHeroAlt titlealt={data.titlealt} contentalt={data.contentalt} />
          <BlockHero titlealt={data.titlealt} contentalt={data.contentalt} />
          <LandingPageContent data={data} />
          <BlockFooter content={data.intro} />
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
