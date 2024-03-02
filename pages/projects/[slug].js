import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import {
  getAllCaseStudies,
  getAllCaseStudies2,
  getAllCaseStudiesNext,
} from "../../lib/api";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ScrollableBox } from "../../components/utils/scrollable";

import PostHeader from "../../components/post/post-header";
import TransitionWipe from "../../components/transition/transition-wipe";
import TransitionTilt from "../../components/transition/transition-tilt";
import PostContent from "../../components/post/post-content";
import Link from "next/link";
import PostTile from "../../components/post/post-tile";
import FadeInWhenVisible from "../../components/utils/fade-in-visible";
import NextPost from "../../components/post/post-next";
import { RouteContext } from "../../components/routeContext";
import Lenis from "@studio-freight/lenis";

export default function Post({ post, nextPost }) {
  const router = useRouter();

  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState("");

  useEffect(() => {
  //  setSourceRoute(routeInfo.sourceRoute);
    setDestRoute(routeInfo.destRoute);
  }, [routeInfo]); // Include routeInfo in the dependency array if needed

  const shouldFadeIn = !destRoute.includes("/projects/");

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const footerRef = useRef(null);
  const contentRef = useRef(null);

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

  const y = useTransform(scrollFooter, [0, 1], [-300, 0], easing);
  const y2 = useTransform(scrollFooter, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollFooter, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollFooter, [0, 1], [0, height * 3]);

  const [footerOffsetValue, setFooterOffsetValue] = useState(0);

  useMotionValueEvent(scrollFooter, "change", (latest) => {
    //z.set(latest);
    setFooterOffsetValue(y);
  });





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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <Layout>
      <motion.div
        className="z-10 relative flex flex-col pb-20 bg-slate-100"
        ref={contentRef}
        style={{ clipPath: clipPathValue}}

      >
        {/* <h1>Map csblocks collectoion article</h1> */}

        {/* xxl:grid grid-cols-3 */}
          {/* className="xxl:col-span-2" */}
          <motion.div
            className="pt-32 px-8 md:px-24 xl:px-xlx o-content"
            exit={{
              opacity: 0,
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.3,
              delay: 0,
            }}
          >
            {post.csblocksCollection && (
              <div className="">
                {post.csblocksCollection.items &&
                  post.csblocksCollection.items.length > 0 &&
                  post.csblocksCollection.items.map((item, index) => {
                    return (
                      <>
                        {item.__typename === "BlockArticle" && (
                          <h1 key={index}>{item.title}</h1>
                        )}
                      </>
                    );
                  })}
              </div>
            )}
            <PostContent post={post}></PostContent>
          </motion.div>
      </motion.div>

      {nextPost && (
        <motion.div ref={footerRef} className="z-10 fixed testing123 relative h-vhh">
          <motion.div
            className="fuck"
            style={{ y: footerOffsetValue }}
            // style={{ translateY: y }}
            //  animate={{ y: footerOffset }}
          >
            <NextPost post={nextPost} />
          </motion.div>
        </motion.div>
      )}

   <TransitionWipe />
       {/* {shouldFadeIn && } */}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getAllCaseStudies2(slug, preview);
  const next = await getAllCaseStudiesNext(slug, preview);

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      nextPost: next[0] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false);
  return {
    paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  };
}
