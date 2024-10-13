import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { getHome, getLandingPage, getFooter} from "../lib/api";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import html2canvas from "html2canvas";
import { gsap } from "gsap";
import * as THREE from "three";
import { vertexShader } from "../shaders/water/vertex";
import { fragmentShader } from "../shaders/water/fragment";
import ScrollContainer from "../components/utils/scroll-container";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import BlockHero from "../components/blocks/block-hero";
import { ParalaxElement } from "../components/motion/paralax-element";
import AnimatedText,{AnimStyle} from "../components/motion/animated-text";
import { ClipPathElement } from "../components/motion/clippath-element";
import TransitionPage from "../components/transition/pageTransition";
import { ClipContainer } from "../components/motion/clippath-container";
const Index = ({ data, footerData }) => {



  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);
// console.log('footerData',footerData)
// console.log('data',data)

  return (
       <Layout>
        <TransitionPage>
           <ScrollContainer>
            <BlockHero
              content={data.content}
              titlealt={data.titlealt}
              contentalt={data.contentalt}
              date={dateString}
              image={data.image}
            />

    
          
              {/* <BlockHero/> */}

            <BlockFooter data={footerData} />

            </ScrollContainer>
        </TransitionPage>
      </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const [landingPageData, footerData] = await Promise.all([
    getLandingPage("home"), // Fetch the landing page content
    getFooter(), // Fetch the footer content
  ]);

  return {
    props: {
      data: landingPageData || null, // Use null as fallback if data is undefined
      footerData: footerData || null, // Use null as fallback if footerData is undefined
    },
  };
}
export default Index;

