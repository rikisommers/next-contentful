import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import { getAllCaseStudies, getPost, getNextPost } from "../../lib/api";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import PostIntro from "../../components/post/post-intro";
import PostHeader from "../../components/post/post-header";
import TransitionTilt from "../../components/transition/transition-tilt";
import TransitionWipe from "../../components/transition/transition-wipe";
import PostContent from "../../components/post/post-content";
import Link from "next/link";
import NextPost from "../../components/post/post-next";

import { RouteContext } from "../../components/routeContext";
import Lenis from "@studio-freight/lenis";
import BlockFooter from "../../components/blocks/block-footer";
import PostTileCs from "../../components/post/post-tile-cs";
import { useScrollPosition } from "../../components/scrollPosContext";

export default function Post({ post, nextPost }) {
  const router = useRouter();
  console.log("post---------------------------", post);

  const { scrollPosition, setScrollPosition } = useScrollPosition();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Calculate the maximum scrollable distance
      const scrollableDistance = documentHeight - windowHeight;

      // Calculate the scroll percentage (0 to 100)
      const percentage = Math.round((scrollTop / scrollableDistance) * 100);

      // Ensure the percentage is between 0 and 100
      const clampedPercentage = Math.max(0, Math.min(100, percentage));

      setScrollPercentage(clampedPercentage);
      setScrollPosition(clampedPercentage);
    };

    // Initial call to set the initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setScrollPosition]);

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

  const [footerOffsetValue, setFooterOffsetValue] = useState(0);

  useMotionValueEvent(scrollFooter, "change", (latest) => {
    setFooterOffsetValue(y);
  });

  const { scrollYProgress: scrollContent } = useScroll({
    target: contentRef,
    offset: ["start start", "start -100px"],
  });

  const yv = useTransform(scrollContent, [0, 1], [8, 0.01]);
  const xv = useTransform(scrollContent, [0, 1], [1.5, 0.01]);
  const rv = useTransform(scrollContent, [0, 1], [1, 0]);
  const x = useTransform(scrollContent, [0, 1], [1, 100]);

  const [clipPathValue, setClipPathValue] = useState(
    "inset( 8rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)"
  );

  const clipPathValueExit = "inset( 0rem 0rem 300px round 0rem 0rem 0rem 0rem)";

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setClipPathValue(
      `inset(${yv.current}rem ${xv.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`
    );
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //const shouldAnimate = router.paths.startsWith("/projects/");

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const [posT, setPosT] = useState(0);

  // useEffect(() => {
  //   if (router.pathname.startsWith("/posts/")) {
  //     // Select the title wrapper
  //     const next = document.querySelector(".test");
  //     if (next) {
  //       setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  //     }
  //   }
  // }, [router.pathname]);

  const handleLinkClick = () => {
    const next = document.querySelector(".test");
    //console.log("ddd", Math.round(next.getBoundingClientRect().y) - 90);
    setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  };

  return (
    <>
      {post.csblocksCollection && (
        <div className="fixed grid items-center w-10 h-full pl-8 pointer-events-none z-nav">
          <div className="relative z-50 flex flex-col gap-1 bg-gray-600 bg-opacity-50 rounded-xl backdrop-blur-lg">
            {post.csblocksCollection.items &&
              post.csblocksCollection.items.length > 0 &&
              post.csblocksCollection.items.map((item, index) => {
                return (
                  <>
                    {" "}
                    {item.__typename === "BlockArticle" && (
                      <div className="relative flex items-center px-3 py-3 text-sm text-white uppercase rounded-lg pointer-events-auto">
                        <motion.div
                          className="absolute w-3 bg-red-400"
                          style={{ scaleY: scrollPosition }}
                        ></motion.div>
                        <h1> {scrollPosition}px</h1>

                        <h1 key={index}>{/* {item.title} */}P</h1>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
        </div>
      )}

      <Layout>
      <TransitionTilt active={true} className="z-100">
      {/* <h1 className="absolute p-8 m-8 left-8 top-8">{post && post.slug}</h1> */}

          <motion.div
            style={{
              backgroundColor:  'var(--background-color)',
              clipPath: clipPathValue,
            }}
            className={`relative z-10 flex flex-col pb-20`}
            ref={contentRef}
            exit={{
              opacity: 0,
              //  clipPath: clipPathValue
            }}
            transition={{
              ease: [0.33, 1, 0.68, 1],
              duration: 0.6, // custom duration for opacity property only
            }}
          >
            {/* <h1>Map csblocks collectoion article</h1> */}

            {/* xxl:grid grid-cols-3 */}
            {/* className="xxl:col-span-2" */}

            <motion.div
              className="pt-32 md:px-24 xl:px-xlx o-content"
              exit={{
                opacity: 0,
              }}
              transition={{
                easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                duration: 0.3,
                delay: 0,
              }}
            >
              {/* <h1> {shouldFadeIn && shouldFadeIn}
                </h1> */}
              {post && (
                <>
                  {/* <PostIntro title={post.titlealt} content={post.contentalt} /> */}
                  <PostHeader content={post} />
                  <PostContent content={post} />
                </>
              )}
            </motion.div>
          </motion.div>

          {/* 
        {post.related && post.relatedCollection.items.map((post, index) => {
        <>
        <h1>dd</h1>
        <PostTileCs index={index} post={post} />
        </>
        })} */}

          <motion.div ref={footerRef} className="relative z-10 testing123 h-vh">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -posT }}
              style={{ y }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 0.6, // custom duration for opacity property only
                delay: 0.2,
              }}
            >
              {/* {post.relatedCollection.items && (
            post.relatedCollection.items.map((item,index) => {
              return (
                <PostTileCs post={item} index={index} />
              )
            })

      )} */}
              {/* {nextPost && (
              <div className="test">
                <Link
                  onClick={handleLinkClick}
                  scroll={false}
                  href={`/projects/${nextPost.slug}`}
                  className="link"
                >
                  <NextPostAlt post={nextPost} />
                </Link>
              </div>
            )} */}
              <BlockFooter />
            </motion.div>
          </motion.div>
        </TransitionTilt>
        <TransitionWipe />
        {/* {shouldFadeIn && } */}
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getPost(slug, preview);
  const next = await getNextPost(slug, preview);

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
