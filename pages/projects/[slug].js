import { useState, useEffect } from "react";
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
} from "framer-motion";
import { ScrollableBox } from "../../components/utils/scrollable";

import PostHeader from "../../components/post/post-header";
import PostBody from "../../components/post/post-body";
import TransitionWipe from "../../components/transition/transition-wipe";
import TransitionTilt from "../../components/transition/transition-tilt";
import NextPost from "../../components/post/post-next";
import CoverImage from "../../components/image/cover-image";
import PostContent from "../../components/post/post-content";
import Link from "next/link";

export default function Post({ post, nextPost, preview }) {
  const [scrollValue, setScrollValue] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const isOpen = true;

  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);
      if (value <= 600) {
        setIsActive(false);
      }
      if (value > 600) {
        setIsActive(true);
      }
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
  const clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;

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

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
  
  <TransitionTilt>
        <motion.div className=" z-10 flex flex-grow ">
          <ScrollableBox onScrollChange={handleScrollChange}>
            <motion.div
              className="px-24  relative z-10 overflow-hidden bg-white rounded-xl"
              initial={{
                y: "100vh",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                y: router.pathname === "/posts/[slug]" ? "-36vh" : 0,
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 0.6,
              }}
            >
              <PostContent post={post}></PostContent>
            </motion.div>

            {nextPost && isActive && (
   
                <Link href={`/projects/${nextPost.slug}`} shallow={false}>
                <article className="px-24 pt-32">

                <PostHeader
                title={nextPost.title}
                duration={nextPost.duration}
                img={nextPost.img}
                />
                </article>
               </Link>  

            
            )}
          </ScrollableBox>
        </motion.div>
</TransitionTilt>
        {/* <motion.div
        animate={isOpen ? "active" : "inactive"}
        variants={wrapperVariants}
        style={{ clipPath: clipPathValue }}
        className="fixed w-full h-full top-0 z-30 flex inset"
      >
      </motion.div> */}

      {/* {!isActive && (

        //TODO: Add clippath
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
      )} */}
      <TransitionWipe />
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
