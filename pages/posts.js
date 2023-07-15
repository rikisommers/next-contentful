import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import { getAllCaseStudies, getWork } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";

import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import { ScrollableBox } from "../components/utils/scrollable";
import FadeInWhenVisible from "../components/utils/fade-in-visible";
import PostIntro from "../components/post/post-intro";
import PostContent from "../components/post/post-content";
import PostTile from "../components/post/post-tile";
import PostModal from "../components/post/post-modal";
import CustomCursor from "../components/utils/cursor";

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
  }, [slug]);



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
  };

  const [clickedCount, setClickCount] = useState("");
  const dynamicRoute = router.asPath;

  const closeModal = (slug) => {
    setClickCount(clickedCount + 1);
    changeName();
    console.log("ruote", router.asPath);
    console.log("ruote", router.route);

    if (router.asPath === "/posts?") {
      router.push("/posts");
    } else {
      router.push("/posts?");
    }
  };

  return (
    <Layout>

      <CustomCursor/>


      {/* <div className="postop2">
        <div>route:{router.route}</div>
        <div>asPath:{router.asPath}</div>
        <button onClick={openModal}>Open Modal</button>
      </div> */}
      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        nextPost={nextPost}
        name={name}
        setName={changeName}
      >
        {post && <PostContent post={post} />}
      </PostModal>

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
                <PostIntro title={intro.title} content={intro.intro} />

                {allCaseStudies.map((post, index) => {
                  return (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 50,
                      }}
                      animate={{
                        opacity: 1,
                        y: 1,
                      }}
                      transition={{
                        opacity: {
                          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                          duration: 1.2,
                        },
                        y: {
                          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                          duration: 0.6,
                        },
                      }}
                      onClick={() => openModal(post.slug)}
                      className={`relative cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full`}
                    >
                      <FadeInWhenVisible>
                        <PostTile
                          index={index}
                          key={post.slug}
                          post={post}
                          slug={slug}
                        />
                      </FadeInWhenVisible>
                    </motion.div>
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
                            <PostTile
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
      <TransitionWipe />
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
