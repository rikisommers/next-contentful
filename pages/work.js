import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import {
  getWork,
  getAllCaseStudiesIntro,
} from "../lib/api";
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

import PostModal from "../components/post/post-modal";
// import CustomCursor from "../components/utils/cursor";
import NextPost from "../components/post/post-next";
// const getWindowSize = () => [window.innerWidth, window.innerHeight];
import BlockFooter from "../components/blocks/block-footer";
import BlockVideo from "../components/blocks/block-video";
import { gsap, ScrollTrigger } from "gsap";
import Lenis from "@studio-freight/lenis";
import { useScrollPosition } from "../components/scrollPosContext";

import { useTheme } from 'next-themes';
import { themes } from "../utils/theme";
import { getThemeByKey } from '../utils/theme';


export default function Posts({ intro, allCaseStudies }) {

  const { theme } = useTheme()
  const currentTheme = getThemeByKey(theme);

  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const ref = useRef(null);

  const headerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const { setScrollPosition } = useScrollPosition();


  console.log('ACS------------------------',allCaseStudies)
  //const {scrollYProgress} = useScroll({target: ref});


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

  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const easing = cubicBezier(0.33, 1, 0.68, 1);

  const { scrollYProgress: scrollFooter } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
      // Perform actions based on the scroll position changes
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });
  const { height } = dimension;

  const y = useTransform(scrollFooter, [0, 1], [-300, 0],easing);
  const y2 = useTransform(scrollFooter, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollFooter, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollFooter, [0, 1], [0, height * 3]);
  const [footerOffsetValue, setFooterOffsetValue] = useState(0);


  useMotionValueEvent(scrollFooter, "change", (latest) => {
    //z.set(latest);
    setFooterOffsetValue(y);
  })

  const { scrollYProgress: scrollContent } = useScroll({
    target: contentRef,
        offset: ["start start", "start -100px"],
  })

  const yv = useTransform(scrollContent, [0, 1], [8, 0.01]);
  const xv = useTransform(scrollContent, [0, 1], [1.5, 0.01]);
  const rv = useTransform(scrollContent, [0, 1], [1, 0]);
   const x = useTransform(scrollContent, [0, 1], [1, 100]);
   
   const [clipPathValue, setClipPathValue] = useState('inset( 8rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)');



  useMotionValueEvent(scrollContent, "change", (latest) => {
    //z.set(latest);
    
    console.log(scrollContent.current)
    setScrollPosition(yv.current);
    setClipPathValue(`inset(${yv.current}rem ${xv.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`);

    // console.log("Page scroll: ")
    // console.log("X", x.current)
    // console.log("XV ", xv.current)
    // console.log("YV ", yv.current)
    // console.log("RV ", rv.current)
    // console.log('dddd',clipPathValue)
  })

  
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      //console.log(scrollYProgress.current)
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);

    requestAnimationFrame(raf);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);





 


  return (
    <Layout>
      <TransitionTilt active={true} className="z-100">
      <motion.div
        style={{
          backgroundColor:currentTheme?.backgroundColor
        }}
        animate={{
          clipPath: clipPathValue
        }}
        className={`relative flex flex-col px-10 pb-20 z-100`}
        ref={contentRef}

      >
        <div className="o-content" ref={headerRef}>
          <PostIntro title={intro.titlealt} content={intro.contentalt} theme={theme} />
        </div>

        {/* {intro.video && (
                    <div className="pb-24 o-content">
                       <BlockVideo data={intro.video} />
                    </div>
        
              )} */}

{/* .o-content{
    width:100%;
    padding:0 2rem;
    //padding:0;
    position: relative;
    z-index:9;
    padding: 0 3em;
  
    @media only screen and (min-width: $desktop-min) {
      min-width:$tablet-l-max;
      padding: 0 5em;
      max-width:1440px;
      margin:0 auto;
    }
  

  } */}

        {allCaseStudies && (
          <motion.div
            className="grid grid-cols-12 gap-6 o-content"
            transition={{
              staggerChildren: 0.3,
              duration: 0.3,
            }}
          >
            {allCaseStudies.map((post, index) => {
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{
                   // scale:0.8,
                    y: 60,
                    x: 0,
                    opacity: 0,
                  }}
                  animate={{
                   // scale:1,
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
                    scale: {
                      easing: cubicBezier(0.76, 0, 0.24, 1),
                      duration: 0.6,
                      delay: index * 0.2,
                    },
                  }}
                  //onClick={() => openModal(post.slug)}
                  // onClick={() => getPosition(index)}
                  // style={isClicked ? () => getPositionStyles() : null}
                  className="col-span-12 md:col-span-6"
                >
                  <PostTileCs index={index} post={post} />
                  
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      <motion.div ref={footerRef} className="relative testing123 h-vhh">
        <motion.div
          className="fuck"
          style={{ y: footerOffsetValue }}
          // style={{ translateY: y }}
          //  animate={{ y: footerOffset }}
        >
          {intro &&
          <BlockFooter content={intro}/>
          }
        </motion.div>
      </motion.div>
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps() {
  const allCaseStudies = (await getAllCaseStudiesIntro()) ?? [];
  const intro = (await getWork()) ?? [];

  return {
    props: {
      allCaseStudies,
      intro,
    },
  };
}
