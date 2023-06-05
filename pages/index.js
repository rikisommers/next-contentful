//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback } from "react";
import { Router, useRouter } from "next/router";
import Head from "next/head";

import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllCaseStudiesForHome, getHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Transition from "../components/transition";
import TextAnimation from "../components/text-animation";
export default function Index({ home }) {
  // const router = useRouter();

  // const handleScroll = (e) => {
  //   //const delta = e.deltaY;
  //   // router.push("/work");
  //   // return;
  // };
  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll);
  //   return () => window.removeEventListener("wheel", handleScroll);
  // });

  return (
    
    <Layout>
    
      <motion.div
        className="fixed w-full h-full overflow-hidden top-0"
        initial={{ scale: 1 }}
        exit={{
          scale: 0.9,
          zIndex:10
        }}
        transition={{
          ease: [0.33, 1, 0.68, 1],
          duration: 1.6,
          //  delay: 1,
        }}
      >
        <div className="fixed w-full h-full p-5 top-0">
          <div className="w-full h-full bg-blue-200 0 flex items-center justify-center rounded-xl">
            <h1>HOME</h1>
            {/* <TextAnimation content={home.intro}></TextAnimation> */}
          </div>
        </div>
      </motion.div>
      <Transition />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  return {
    props: {
      home,
    },
  };
}
