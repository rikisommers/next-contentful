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
import Transition from "../components/transition";
import Modal from "../components/modal";
import CaseStudyTile from "../components/case-study-tile";
import PostContent from "../components/post-content";
import { ScrollableBox } from "../components/scrollable";
import TextAnimation from "../components/text-animation";
import useIntersectionObserver from "../components/intersection-observer";
import Link from "next/link";

export default function Index({ intro, caseStudies, allCaseStudies }) {
  //console.log("all", allCaseStudies);
  // console.log("cs", caseStudies);
  // console.log("intro", intro);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState('test');

  const firstPost = allCaseStudies[0];
  const secondPost = allCaseStudies[1];
  const selectedPost = allCaseStudies.find((post) => post.slug === slug);

   console.log("selectedPost", selectedPost);

  const nextPost = allCaseStudies.find(
    post => post.index === 1
  );

  const selectSlug = (selectedSlug) => {
    console.log("--------------selectedSLug", selectedSlug);
    setSlug(selectedSlug);
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    
    setIsModalOpen(false);
    router.push('/posts')
  };


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

  // const closeModal = () => {
  // };

 const [isIntroVisible, setIntroIsVisible] = useState(true);

  // const introRef = useRef(true);
  const introRef = useIntersectionObserver(
    () => {
      // Perform logic to hide the element when it leaves the viewport
      setIntroIsVisible(false);
    },
    { rootMargin: "0px", threshold: 1},
  false
  );



  const variants = {
    hidden: { opacity: 0, x: 0, y: 64 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 64 },
  };

  return (
    <>
         <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            nextPost={nextPost}
          >
            <button onClick={closeModal}>CLOSE</button>
            
            {selectedPost && <PostContent post={selectedPost} />}
          </Modal>
      
  
    <Layout>
            <div className="postop">mod:{isModalOpen ? 'T' : 'F'}</div>

      <div className="postop2">slug:{slug}</div>

      <Transition />

     
 
      <ScrollableBox infinite={true}> 
  
        
        <motion.div
          className="w-full bg-slate-50 bg-teal-300 top-0"
          exit={{
            zIndex: 0,
          }}
          transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 1.6,
            //  delay: 1,
          }}
        >


          {allCaseStudies.length > 0 && (
            // <CaseStudies intro={intro} posts={allCaseStudies} />

            <div className="flex flex-col gap-6 py-6 mx-6 relative">

              <motion.div
                animate={{
                  background: isIntroVisible ? "red" : "blue",
                }} // Animate opacity to 0 (hidden) when it leaves the viewport
                className="absolute z-20 top-0 mt-6 w-full c-tile c-tile--intro flex items-center justify-center rounded-xl"
               ref={introRef}
              >
                {/* <h1>WORK</h1> */}
                {/* add h-vhr  to intor and 1st post */}
                {/* <TextAnimation content={intro.intro}></TextAnimation> */}
              </motion.div>

              {allCaseStudies.map((post, index) => {
                const url = `/posts`
                return(
              //   <Link 
              //   key={index}
              //  onClick={() => openModal()}
              //  href={`/posts?post=${post.slug}`}
              //  as={url}
              //   >
              <Link href={`/posts?post=${post.slug}`} as={`/posts/${post.slug}`} shallow={true}>

                <motion.div
                key={post.slug}
                      //          onClick={() => openPost(post.slug)}

                          className="cursor-pointer"     
                  initial={{ y: "4rem" }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    ease: [0.33, 1, 0.68, 1],
                    duration: 0.6,
                  }}
                >
                  {/* <button onClick={() => openModal(post.slug)}>
                    {post.slug}
                  </button> */}
                
                  <CaseStudyTile
                  
                    index={index}
                    key={post.slug}
                    post={post}
                    slug={slug}
                    
                  />
                </motion.div>
                  </Link>
              )})}

              {/* <Link 
              onClick={() => openModal(firstPost.slug)}
              href={`/posts?post=${firstPost.slug}`}
              as={`/posts/${firstPost.slug}`}
              shallow={true}
              >
           
              <CaseStudyTile  post={firstPost} />
            </Link>
            <Link 
              onClick={() => openModal(secondPost.slug)}
              href={`/posts?post=${secondPost.slug}`}
              as={`/posts/${secondPost.slug}`}
              shallow={true}
              >
              <CaseStudyTile  post={secondPost}  />
              </Link> */}
            </div>
          )}
        </motion.div>
      </ScrollableBox>
    </Layout>
    </>
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
