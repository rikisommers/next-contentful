//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import CaseStudies from "../components/caseStudies";
import Intro from "../components/intro";
import Layout from "../components/layout";
import {
  getAllCaseStudiesForHome,
  getAllCaseStudies,
  getWork,
} from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { AnimatePresence, motion, transform } from "framer-motion";
import CaseStudyPreview from "../components/case-study-tile";
import CustomCursor from "../components/cursor";
import Reel from "../components/reel";
import {
  Lenis,
  Lenis as ReactLenis,
  useLenis,
} from "@studio-freight/react-lenis";

import Transition from "../components/transition-wipe";

import Modal from "../components/modal";
import CaseStudyTile from "../components/case-study-tile";
import PostContent from "../components/post-content";
import { ScrollableBox } from "../components/scrollable";
import TextAnimation from "../components/text-animation";
import useIntersectionObserver from "../components/intersection-observer";
import Link from "next/link";
import CaseStudyNext from "../components/case-study-next";

export default function Index({ intro, caseStudies, allCaseStudies }) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState("test");

  const selectedPost = allCaseStudies.find(
    (post) => post.slug === router.query.post
  );

  const currentPostIndex = allCaseStudies.findIndex(
    (post) => post.slug === router.query.post
  );

  const nextPostIndex = currentPostIndex + 1;
  const nextPost =
    nextPostIndex < allCaseStudies.length
      ? allCaseStudies[nextPostIndex]
      : allCaseStudies[0];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setIsModalOpen(false);
    router.push("/posts");
  };


  const [isIntroVisible, setIntroIsVisible] = useState(true);
  const introRef = useIntersectionObserver(
    () => {
      setIntroIsVisible(false);
    },
    { rootMargin: "0px", threshold: 1},
  false
  );


  const openPost = (s) => {

    //   console.log('--------------opening modal',s)
      
    //  setPost(allCaseStudies.find((post) => post.slug === s));
     //  selectSlug(s);
    //   console.log('rq',router.query)
  
    //   setIsModalOpen(true);
      
      
      const href = `/posts?post=${s}`;
      const as = `/posts/${s}`;
      router.push(href, as, { shallow: true });
  
    };
  
  

  
  return (
    <Layout>
      <div className="postop">{router.query.post ? "T" : "F"}</div>
      
      
       <Modal
        isOpen={router.query.post}
        onClose={closeModal}
        nextPost={nextPost}
      >
        {selectedPost && <PostContent post={selectedPost} />}

      </Modal> 

      <ScrollableBox infinite={true} stopScroll={true}> 
      <motion.div
          className="w-full bg-white top-0 bg-red-500"
          exit={{
            zIndex: 0,
          }}
          transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 1.6,
            //  delay: 1,
          }}
        >
      {allCaseStudies && (
        <div className="flex flex-col gap-6 py-6 mx-6 relative  work-grid ">

          <motion.div
            animate={{
             /// background: isIntroVisible ? "red" : "blue",
            }}
            className="
            absolute 
            z-20 
            top-0 
            mt-6 
            w-full   
            h-vhr flex items-center justify-center rounded-xl bg-white z-30  item"
            ref={introRef}
          >
            <TextAnimation content={intro.intro}></TextAnimation>
          </motion.div>

          {allCaseStudies.map((post, index) => {
            return (
              <motion.div
            //  onClick={openModal}
              className={`item overflow-hidden bg-slate-200 rounded-xl w-full ${index == 0 ? 'h-vhr': 'h-full'}`}
              initial={{
                opacity:0
              }}
              animate={{
                opacity:1
              }}
                  transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 0.6,
            //  delay: 1,
          }}>
              <Link
                  key={index} 
                  href={`/posts?post=${post.slug}`} 
                  as={`/posts${post.slug}`}
              >
                <CaseStudyTile
                  index={index}
                  key={post.slug}
                  post={post}
                  slug={slug}
                />
              </Link>
                            </motion.div>

            );
          })}
          
        </div>
      )}
      </motion.div>
      </ScrollableBox>
      <Transition/>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCaseStudies = (await getAllCaseStudies()) ?? [];
  const intro = (await getWork()) ?? [];

  return {
    props: {
      allCaseStudies,
      intro,
    },
  };
}
