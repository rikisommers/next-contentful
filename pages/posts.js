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
import {
  AnimatePresence,
  motion,
  cubicBezier,
  transform,
  useAnimation,
} from "framer-motion";
import CaseStudyPreview from "../components/case-study-tile";
import CustomCursor from "../components/cursor";
import Reel from "../components/reel";
import {
  Lenis,
  Lenis as ReactLenis,
  useLenis,
} from "@studio-freight/react-lenis";
import Transition from "../components/transition-wipe";
import TransitionTilt from "../components/transition-tilt";
import Modal from "../components/modal";
import CaseStudyTile from "../components/case-study-tile";
import PostContent from "../components/post-content";
import { ScrollableBox } from "../components/scrollable";
import TextAnimation from "../components/text-animation";
import useIntersectionObserver from "../components/intersection-observer";
import Link from "next/link";
import CaseStudyNext from "../components/case-study-next";
import FadeInWhenVisible from "../components/fadeInVisible";
import { sl } from "date-fns/locale";

import CaseStudyIntro from "../components/caseStudyIntro";

export default function Posts({ intro, caseStudies, allCaseStudies }) {
  const router = useRouter();

  const loopedPosts = allCaseStudies.slice(0, 2);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [name, setName] = useState("Omar");

  function changeName() {
    setName("Riki");
  }

  useEffect(() => {
    const newPost = allCaseStudies.find((post) => post.slug === slug);
    setPost(newPost);

    const currentPostIndex = allCaseStudies.findIndex(
      (post) => post.slug === slug
    );

    const nextPostIndex = currentPostIndex + 1;
    const newNextPost =
      nextPostIndex < allCaseStudies.length
        ? allCaseStudies[nextPostIndex]
        : allCaseStudies[0];

    setNextPost(newNextPost);
  }, [slug]); // Re-run the effect whenever the route changes

  // const [isIntroVisible, setIntroIsVisible] = useState(true);
  // const introRef = useIntersectionObserver(
  //   () => {
  //     setIntroIsVisible(false);
  //   },
  //   { rootMargin: "0px", threshold: 1 },
  //   false
  // );

  const updateUrl = (url) => {
    const newUrl = `/projects/${url}`;

    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
  };

  const openModal = (slug) => {
    setSlug(slug);
    updateUrl(slug);
    setIsModalOpen(true);
    // router.push('/posts?');
  };

  const [clickedCount, setClickCount] = useState("");
  const dynamicRoute = router.asPath;

  // useEffect(() => {
  //   setClickCount(clickedCount+1)
  //   console.log(clickedCount)

  // }, [dynamicRoute]); // Re-run the effect whenever the route changes

  const closeModal = (slug) => {
    setClickCount(clickedCount + 1);
    changeName();
    // setIsModalOpen(false);
    console.log("ruote", router.asPath);
    console.log("ruote", router.route);
    //router.push(router.route !== '/posts' ? '/posts' :  `/posts?${clickedCount}`);

    if (router.asPath === "/posts?") {
      router.push("/posts");
    } else {
      router.push("/posts?");
    }

    //  console.log(clickedCount);
  };
  //   useEffect(() => {
  //     router.reload
  // }, [router])

  return (
    <Layout>
      <div className="postop2">
        <div>route:{router.route}</div>
        <div>asPath:{router.asPath}</div>
        <button onClick={openModal}>Open Modal</button>
      </div>

      {/* <div className="postop">
      <div>route: {router.route}</div>
        <div>asPath:{router.asPath}</div>

        <div>slug : {slug}</div>

       <div>{ dynamicRoute && dynamicRoute}</div> 
       <div>{ clickedCount && clickedCount.valueOf}</div> 

      </div> */}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        nextPost={nextPost}
        name={name}
        setName={changeName}
      >
        {post && <PostContent post={post} />}
      </Modal>

      <TransitionTilt>
      <ScrollableBox infinite={true} name={name} orientation={"vertical"}>
        <motion.div
          className="w-full bg-slate-100 top-0 px-6"
          exit={{
            zIndex: 0,
          }}
        >
          {allCaseStudies && (
            <div className="relative  work-grid ">
              
             
              <CaseStudyIntro title={intro.title} content={intro.intro}/>

              {allCaseStudies.map((post, index) => {
                return (
                  <motion.div
                    initial={{
                      opacity:0,
                      y:50
                    }}
                    animate={{
                      opacity:1,
                      y:1
                    }}
                    transition={{
                      opacity:{
                        easing:cubicBezier(0.35, 0.17, 0.3, 0.86),
                        duration: 1.2,
                      },
                      y:{
                        easing:cubicBezier(0.35, 0.17, 0.3, 0.86),
                        duration: 0.6,
                      }
                    
                    }}
                    onClick={() => openModal(post.slug)}
                    className={`relative cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full`}
                  >
                    {/*
          relative ${index == 0 ? 'h-vhr': 'h-vhh'}
          <Link 
                key={index}
                onClick={() => openModal(post.slug)}

               href={`/posts?post=${post.slug}`}
               as={`/projects/${post.slug}`}
  
                > */}
                    <FadeInWhenVisible>
                      <CaseStudyTile
                        index={index}
                        key={post.slug}
                        post={post}
                        slug={slug}
                      />
                    </FadeInWhenVisible>
                    {/* </Link>        */}
                  </motion.div>
                  //               <FadeInWhenVisible>

                  // </FadeInWhenVisible>
                );
              })}
               {loopedPosts && (
                <>
              {loopedPosts.map((post, index) => {
                return (
                  <motion.div
                    onClick={() => openModal(post.slug)}
                    className={`relative cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full truncate`}
                  >
                    <FadeInWhenVisible>
                      <CaseStudyTile
                        index={index}
                        key={post.slug}
                        post={post}
                        slug={slug}
                      />
                    </FadeInWhenVisible>
                  </motion.div>
                );
              })}
              </>
               )}
            </div>
          )}
        </motion.div>
      </ScrollableBox>
      </TransitionTilt>
      <Transition />
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
