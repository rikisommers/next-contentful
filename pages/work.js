import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { getLandingPage } from "../lib/api";
import { getWork, getAllCaseStudiesIntro } from "../lib/api";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
  useMotionValueEvent,
} from "framer-motion";

import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import { ScrollableBox } from "../components/utils/scrollable";
import FadeInWhenVisible from "../components/utils/fade-in-visible";
import PostIntro from "../components/post/post-intro";
import PostContent from "../components/post/post-content";
import PostTile from "../components/post/post-tile";
import PostTileCs from "../components/post/post-tile-cs";
import PostBody from "../components/post/post-body";
import PostModal from "../components/post/post-modal";
// import CustomCursor from "../components/utils/cursor";
import NextPost from "../components/post/post-next";
// const getWindowSize = () => [window.innerWidth, window.innerHeight];
import BlockFooter from "../components/blocks/block-footer";
import BlockVideo from "../components/blocks/block-video";
import { gsap, ScrollTrigger } from "gsap";
import Lenis from "@studio-freight/lenis";
import { useScrollPosition } from "../components/scrollPosContext";

import ScrollContainer from "../components/utils/scroll-container";
import ClipPathContainer from "../components/utils/clip-path-container";


const Work = ({ data }) => {

  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const { setScrollPosition } = useScrollPosition();

  console.log("Data------------------------", data);


  

  return (
    <Layout>
      <TransitionTilt active={true} className="z-100">
        <ScrollContainer>
          <ClipPathContainer>
           
              <PostIntro
                title={data.titlealt}
                content={data.contentalt}
              />

            {/* {data.video && (
              <div className="pb-24 o-content">
                <BlockVideo data={data.video} />
              </div>
            )} */}

            {data.csblocksCollection.items && (
              <PostBody content={data.csblocksCollection} />
            )}

          </ClipPathContainer>
          {data.titlealt && <BlockFooter content={data.titlealt} />}
        </ScrollContainer>
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage("work")) ?? [];

  return {
    props: {
      data,
    },
  };
}

export default Work;
