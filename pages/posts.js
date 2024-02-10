import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import {
  getAllCaseStudies,
  getWork,
  getAllCaseStudiesForHome,
  getPostWithSlug,
} from "../lib/api";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
} from "framer-motion";

import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import { ScrollableBox } from "../components/utils/scrollable";
import FadeInWhenVisible from "../components/utils/fade-in-visible";
import PostIntro from "../components/post/post-intro";
import PostContent from "../components/post/post-content";
import PostTile from "../components/post/post-tile";
import PostModal from "../components/post/post-modal";
// import CustomCursor from "../components/utils/cursor";
import NextPost from "../components/post/post-next";
// const getWindowSize = () => [window.innerWidth, window.innerHeight];
import BlockFooter from "../components/blocks/block-footer";
import BlockVideo from "../components/blocks/block-video";

export default function Posts({
  intro,
  allCaseStudiesForHome,
}) {
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);

  const handleScrollChange = (value) => {
    setScrollValue(value);
    x.set(value);
    console.log(value)
    const content = contentRef.current?.getBoundingClientRect();
    const footer = footerRef.current?.getBoundingClientRect();
    const h = footer?.height;
    const t = -(scrollValue - (content?.height - h));
  
    if (value <= 1000) {
      x.set(value);

      // if (value <= 200) {
      //    setIsActive(false);
      // }
    }
    if (t < h) {
      x.set(t);
      z.set(t);
      // console.log('sds')
    }
  };

  const easing = cubicBezier(0.33, 1, 0.68, 1);
  const x = useMotionValue(0);
  const z = useMotionValue(0);

  const input = [0, 400];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];

  const yv = useTransform(x, input, cpyo);
  const xv = useTransform(x, input, cpxo);
  const rv = useTransform(x, input, ro);

  let clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem ${rv.current}rem ${rv.current}rem)`;
  const clipPathValueInitial = `inset(90vh 0px 0px round 8rem 8rem 0rem 0rem)`;
  const clipPathValueExit = `inset(0px 0px 100vh round 8rem 8rem 8rem 8rem)`;

  const isContentInView = useInView(headerRef);
  // const isInView = useInView({
  //   contentRef,
  //   margin: "0px 100px -50px 0px"
  // })
  //   useEffect(() => {

  //     if (!isContentInView) {
  //       console.log("Element is in view: ", isContentInView)

  //         contentRef.current.classList.add('bg-black');
  //     } else {
  //         contentRef.current.classList.remove('bg-black');
  //     }
  // }, [scrollValue]);


  return (
    <Layout>
     
        {/* <CustomCursor /> */}

        <div className="fixed top-16 left-5 z-50 bg-red-500 ">
          <>
            {scrollValue} 
          </>
        </div>
        <ScrollableBox
          infinite={false}
          orientation={"vertical"}
          onScrollChange={handleScrollChange}
        >
          <TransitionTilt>
            <div
              className="relative flex flex-col pb-20 z-50 bg-slate-100" 
              ref={contentRef}
              style={{ clipPath: clipPathValue }}
            >
              <div className="px-6 md:px-12 lg:px-24" ref={headerRef}>
                <PostIntro title={intro.title} content={intro.intro} />
              </div>

              {intro.video && (
                    <div className="mb-24">
                        <BlockVideo data={intro.video} />
                        </div>
        
              )}

              {allCaseStudiesForHome && (
                <motion.div
                  className="o-grid px-6 md:px-12 lg:px-24"
                  transition={{
                    staggerChildren: 0.3,
                    duration: 0.3,
                  }}
                >
                  {allCaseStudiesForHome.map((post, index) => {
                 
                    return (
                      <motion.div
                        key={post.slug}
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
                        className="o-grid__item"
                      >
                        <PostTile
                          index={index}
                          post={post}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

            </div>

            <motion.div ref={footerRef}>
                <BlockFooter />
            </motion.div>


          </TransitionTilt>
        </ScrollableBox>
        {/* </motion.div> */}





        <TransitionWipe />
    
    </Layout>
  );
}

export async function getStaticProps() {
  const allCaseStudiesForHome = (await getAllCaseStudiesForHome()) ?? [];
  const selectedPost = (await getPostWithSlug()) ?? [];

  const allCaseStudies = (await getAllCaseStudies()) ?? [];
  const intro = (await getWork()) ?? [];

  return {
    props: {
      allCaseStudiesForHome,
      allCaseStudies,
      intro,
    },
  };
}
