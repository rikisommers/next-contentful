import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { getWork, getAllBlogPostsIntro } from "../lib/api";
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
import PostTileLg from "../components/post/post-tile-lg";
import PostModal from "../components/post/post-modal";
// import CustomCursor from "../components/utils/cursor";
import NextPost from "../components/post/post-next";
// const getWindowSize = () => [window.innerWidth, window.innerHeight];
import BlockFooter from "../components/blocks/block-footer";
import BlockArticles from "../components/blocks/block-articles";
import BlockVideo from "../components/blocks/block-video";
import { gsap, ScrollTrigger } from "gsap";
import Lenis from "@studio-freight/lenis";
import { useScrollPosition } from "../components/scrollPosContext";

import ScrollContainer from "../components/utils/scroll-container";
import ClipPathContainer from "../components/utils/clip-path-container";

export default function Posts({ intro, posts }) {


  const headerRef = useRef(null);

  console.log("ACS------------------------", posts);

  return (
    <Layout>
        <TransitionTilt active={true} className="z-100">
        <ScrollContainer>
          <ClipPathContainer>

              <div className="flex">
                <div className="w-48 pt-28">
                  <h1>sdsd</h1>
                  <h1>sdsd</h1>
                  <h1>sdsd</h1>
                  <h1>sdsd</h1>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="o-content" ref={headerRef}>
                    <PostIntro
                      title={intro.titlealt}
                      content={intro.contentalt}
                    />
                  </div>

                  {/* {intro.video && (
                    <div className="pb-24 o-content">
                       <BlockVideo data={intro.video} />
                    </div>
        
              )} */}

                  {posts && (
                    <motion.div
                      className="px-24 o-content o-grid"
                      transition={{
                        staggerChildren: 0.3,
                        duration: 0.3,
                      }}
                    >
                      {posts.map((post, index) => {
                        return (
                          <motion.div
                            key={index}
                            layout
                            initial={{
                              y: 30,
                              x: 0,
                              opacity: 0,
                            }}
                            animate={{
                              y: 0,
                              x: 0,
                              opacity: 1,
                            }}
                            // exit={{
                            //   margin: 'auto',
                            //   opacity : index === selectedIndex ? 1 : 0,
                            //   width: index === selectedIndex ? 'calc(100vw - 12rem)': '100%',
                            //   className:'h-vhh',
                            //   y: index === selectedIndex ? finalPos : null
                            // }}
                            transition={{
                              opacity: {
                                easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                                duration: 0.6,
                                delay: index * 0.2,
                              },
                              y: {
                                easing: cubicBezier(0.76, 0, 0.24, 1),
                                duration: 0.6,
                                delay: index * 0.2,
                              },
                            }}
                            //onClick={() => openModal(post.slug)}
                            // onClick={() => getPosition(index)}
                            // style={isClicked ? () => getPositionStyles() : null}
                            className="o-grid__item--cs"
                          >
                            <PostTileCs index={index} post={post} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>
            </ClipPathContainer>
            
            {intro && <BlockFooter content={intro} />}

        </ScrollContainer>
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = (await getAllBlogPostsIntro()) ?? [];
  const intro = (await getWork()) ?? [];

  return {
    props: {
      posts,
      intro,
    },
  };
}
