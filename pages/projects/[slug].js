import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import PostPreview from "../../components/post-preview";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import {
  getAllPostsWithSlug,
  getAllCSPostsWithSlug,
  getCaseStudyAndNextPost,
  getPostAndMorePosts,
  getAllCaseStudies,
  getAllCaseStudies2,
  getAllCaseStudiesNext,
} from "../../lib/api";
import PostTitle from "../../components/post-title";
import { CMS_NAME } from "../../lib/constants";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import NextPost from "../../components/next-post";
import CaseStudyHeader from "../../components/case-study-header";
import CaseStudyPreview from "../../components/case-study-tile";
import CustomCursor from "../../components/cursor";

import Transition from "../../components/transition-wipe";

import { ScrollableBox } from "../../components/scrollable";
import TransitionContent from "../../components/transition-content";
import CaseStudyNext from "../../components/case-study-next";
import CoverImage from "../../components/cover-image";

import CaseStudyIntro from "../../components/case-study-header";


export default function Post({ post, nextPost, preview }) {
  const [isActive, setIsActive] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const isOpen = true;

  
  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);
      // console.log("sv", scrollValue);

      if (value <= 600) {
        setIsActive(false);
      }

      if (value > 600) {
        setIsActive(true);
      }
    //  console.log("isActive", isActive);
    }
  };

  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];

  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });

  const clipPathValueIn = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;
  const clipPathValueAn = `inset(${yv.current}rem ${0}rem 0px round ${
    rv.current
  }rem ${rv.current}rem 0px 0px)`;

  useEffect(() => {
    // if(scrollValue <= 200){
    //   setIsActive(true)
    // }
  }, [scrollValue]);

  const variants = {
    active: { opacity: 0.3 },
    inactive: { opacity: 0 },
    hover: {
      background: "red",
      opacity: 1,
    },
  };

  const bgVariants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    transition: {
      duration: 0.3,
    },
  };
  const wrapperVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      opacity: 0,
      y: "100vh",
    },
    transition: { duration: 0.6, easing: easing },
  };

  const router = useRouter();
  //const shouldAnimate = router.pathname.startsWith("/posts/");

  console.log('rr',router)

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  // console.log("p", post);
  // console.log("np", nextPost);

  return (
    <Layout>
      <div className="postop2">{isActive}</div>
      {/* <Head>
        <title>{`${post.title} | Next.js Blog Example with ${CMS_NAME}`}</title>

        {post.img && <meta property="og:image" content={post.img.url} />}

        <Link rel="preload" as="image" href={post.img.url} />
      </Head> */}
      <Transition />

      <motion.div
        animate={isOpen ? "active" : "inactive"}
        variants={wrapperVariants}
        style={{ clipPath: clipPathValueIn }}
        className="fixed w-full h-full top-0 z-30 flex inset"
      >
        <motion.div className=" z-10 flex flex-grow ">
          <ScrollableBox onScrollChange={handleScrollChange}>
            <motion.article
              className="px-24 py-32  relative z-10 overflow-hidden mb-vhh bg-white rounded-xl shadow-xl"
              initial={{
                y: "100vh",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                y: (router.pathname === "/posts/[slug]") ? "-36vh"  : 0,
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 0.6,
              }}
            >

              <CaseStudyHeader
                title={post.title}
                subtitle={post.subtitle}
                img={post.img}
              />
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.1,
                  },
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
     
              </motion.div> */}

     
                {post.csblocksCollection && (
                  <PostBody content={post.csblocksCollection} />
                )}
                         {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    easing: easing,
                    duration: 0.3,
                    delay: 0,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    easing: easing,
                    duration: 0.3,
                    delay: 0,
                  },
                }}
              >
              </motion.div> */}
            </motion.article>

            {nextPost && isActive && (
              <div className="fixed bottom-0">
              <CaseStudyNext next={true} post={nextPost} />
              </div>
            )}
          </ScrollableBox>
        </motion.div>
  
      </motion.div>

      {!isActive && (
        <motion.div className="fixed z-0 w-full h-full bg-black">
          <div className="opacity-50">
            <CoverImage
              className="opacity-50"
              title={post.title}
              url={post.img.url}
              layout={post.layout}
            />
          </div>
        </motion.div>
      )}
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
