import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { getLandingPage, getFooter } from "../lib/api";
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


const Work = ({ data, footerData }) => {

  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const { setScrollPosition } = useScrollPosition();

  console.log("Data------------------------", data);


  

  return (
    <Layout>
      <TransitionTilt active={true} className="z-100">
        <ScrollContainer>
          {/* <ClipPathContainer>
          </ClipPathContainer> */}
  <div className="flex flex-col px-8">
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

          </div>
          {data.titlealt && <BlockFooter data={footerData} />}

        </ScrollContainer>
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [landingPageData, footerData] = await Promise.all([
    getLandingPage("work"), // Fetch the landing page content
    getFooter(), // Fetch the footer content
  ]);

  return {
    props: {
      data: landingPageData || null, // Use null as fallback if data is undefined
      footerData: footerData || null, // Use null as fallback if footerData is undefined
    },
  };
}

export default Work;
