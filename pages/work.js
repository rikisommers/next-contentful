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
import PostIntro from "../components/post/post-intro";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
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
