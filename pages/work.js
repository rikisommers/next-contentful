//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback } from "react";
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

export default function Index({ intro, caseStudies, allCaseStudies }) {
  console.log("all", allCaseStudies);
  // console.log("cs", caseStudies);
  // console.log("intro", intro);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState("access-control");
  const [post, setPost] = useState(null);

  const firstPost = allCaseStudies[0];
  const secondPost = allCaseStudies[1];
  const selectedPost = allCaseStudies.find((post) => post.slug === slug);
  const nextPost = allCaseStudies.find((post) => post.index === selectedPost.index + 1);

  const selectSlug = (slug) => {
    console.log("ssss", slug);
    setSlug(slug);
  };

  const openModal = (slug) => {
    setSlug(slug);
    const href = `/work?post=${slug}`;
    const as = `/posts/${slug}`;
    router.push(href, as);
    // router.replace(`/posts/${slug}`);
    // href={`/work?post=${post.slug}`}
    //   as={`/posts/${post.slug}`}

    setPost(allCaseStudies.find((post) => post.slug === slug));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    router.push("/work");
    // setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (isModalOpen) {
        //   event.preventDefault();
        //    event.stopPropagation();
      }
    };

    // if (isModalOpen) {
    //   //Lenis.stop
    //    document.body.classList.add('no-scroll');
    //   // window.addEventListener('scroll', handleScroll, { passive: false });
    // } else {
    //    document.body.classList.remove('no-scroll');
    //   // window.removeEventListener('scroll', handleScroll);
    // }

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalOpen]);

  const variants = {
    hidden: { opacity: 0, x: 0, y: 64 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 64 },
  };

  return (
    <Layout>

      <Head>
        <title>{`oooooooooohhh yeeeaaaaaahhhhhhhh ${slug}`}</title>
      </Head>

      <Transition />

      <ScrollableBox infinite={true}>
      

        <h1 className="postop2">
          {slug} {isModalOpen}
        </h1>
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
          <Modal isOpen={isModalOpen} onClose={closeModal} slug={slug} nextPost={selectedPost }>
            {selectedPost && <PostContent post={selectedPost} />}
          </Modal>

          {allCaseStudies.length > 0 && (
            // <CaseStudies intro={intro} posts={allCaseStudies} />

            <div className="flex flex-col gap-6 p-6 relative">
              <motion.div className="c-tile c-tile--intro h-vhr flex items-center justify-center rounded-xl">
                {/* <h1>WORK</h1> */}

                <TextAnimation content={intro.intro}></TextAnimation>
              </motion.div>

              {allCaseStudies.map((post, index) => (
                <motion.div
                  initial={{ y: "4rem" }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    ease: [0.33, 1, 0.68, 1],
                    duration: 0.6,
                  }}
                  key={index}
                >
                  <button onClick={() => openModal(post.slug)}>
                    {post.slug}
                  </button>

                  <CaseStudyTile
                    index={index}
                    key={post.slug}
                    post={post}
                    slug={slug}
                  />
                </motion.div>
              ))}

              <CaseStudyTile key={firstPost.slug} post={firstPost} />
              <CaseStudyTile key={secondPost.slug} post={secondPost} />
            </div>
          )}
        </motion.div>
      </ScrollableBox>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allCaseStudies = (await getAllCaseStudies((preview = false))) ?? [];
  const intro = (await getWork((preview = false))) ?? [];

  return {
    props: {
      allCaseStudies,
      intro,
    },
  };
}
