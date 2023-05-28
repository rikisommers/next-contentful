//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback } from "react";

import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import CaseStudies from "../components/caseStudies";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllCaseStudiesForHome,getAllCaseStudies, getWork } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { AnimatePresence,motion } from "framer-motion";
import CaseStudyPreview from "../components/case-study-tile";
import CustomCursor from "../components/cursor";
import Reel from "../components/reel";
import { Lenis as ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Transition from "../components/transition";
import Modal from "../components/modal";

export default function Index({  intro, caseStudies, allCaseStudies }) {
   console.log("all", allCaseStudies);
  // console.log("cs", caseStudies);
  // console.log("intro", intro);

  const [showModal, setShowModal] = useState(true);


  const variants = {
    hidden: { opacity: 0, x: 0, y: 64 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 64 },
  };

  // const lenis = useLenis(({ scroll }) => {
  //  // console.log(window.scrollY);
  // });

  // function raf(time) {
  //   lenis.raf(time)
  //   requestAnimationFrame(raf)
  // }

  // requestAnimationFrame(raf)

  return (

    <Layout infinite="true">
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>


      <motion.div
        className="w-full bg-slate-50 bg-white top-0"
        initial={{ scale: 1 }}
        exit={{
          scale: 0.9,
          className: "z-10 test",

        }}
        transition={{
          ease: [0.33, 1, 0.68, 1],
          duration: 1.6,
          //  delay: 1,
        }}
      >
      {allCaseStudies.length > 0 && <CaseStudies intro={intro} posts={allCaseStudies} />}
      </motion.div>
      <Transition/> 

    </Layout>
  
  );
}

export async function getStaticProps({ preview = false }) {
  const allCaseStudies = (await getAllCaseStudies(preview = false)) ?? [];
  const intro = (await getWork(preview = false)) ?? [];

  return {
    props: {
      allCaseStudies,
      intro,
    },
  };
}
