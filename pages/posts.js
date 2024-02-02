import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import {
  getAllCaseStudies,
  getWork,
  getAllCaseStudiesForHome,
  getPostWithSlug,
} from "../lib/api";
import { motion, cubicBezier, AnimatePresence } from "framer-motion";

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



export default function Posts({
  intro,
  allCaseStudies,
  allCaseStudiesForHome,
}) {
  const router = useRouter();

  // console.log(allCaseStudies);

  const loopedPosts = allCaseStudies.slice(0, 2);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [scrollValue, setScrollValue] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [finalPos, setFinalPos] = useState(null);

  const elementRefs = Array.from({ length: allCaseStudies.length }, () => useRef(null));

  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);

    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    // Check if window is defined before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []); // Empty dependency array means this effect runs once after the initial render


  const getPosition = (index) => {
    setSelectedIndex(index);
    const boundingRect = elementRefs[index].current.getBoundingClientRect();
    console.log('el' ,boundingRect);

    if(boundingRect.y < 448){
      console.log('1P---',  448 - boundingRect.y)
      setFinalPos(448 - boundingRect.y)
    }else{
      console.log('2P---',boundingRect.y - 448)
      setFinalPos( - (boundingRect.y - 448))
    } 

  };



  const handleScrollChange = (value) => {
    setScrollValue(value);
    //console.log(scrollValue)
  };

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
    console.log('ssss')
  };

  const [clickedCount, setClickCount] = useState("");
  const dynamicRoute = router.asPath;

  const closeModal = (slug) => {
    setClickCount(clickedCount + 1);

    console.log("ruote", router.asPath);
    console.log("ruote", router.route);

    if (router.asPath === "/posts?") {
      router.push("/posts?");
    } else {
      router.push("/posts?");
    }
  };

  return (
    <Layout>
      {/* <CustomCursor /> */}

      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        nextPost={nextPost}
      >
        {post && <PostContent post={post} />}
      </PostModal> 
      {/* <motion.div exit={{zIndex:0}}> */}
     <ScrollableBox
        infinite={false}
        orientation={"vertical"}
      >


            {allCaseStudies && (
              <div className="relative px-6 md:px-12 lg:px-24 bg-orange-50 flex flex-col gap-6 ">
                
                <PostIntro title={intro.title} content={intro.intro} />

                {allCaseStudiesForHome.map((post, index) => {

                  const isSelected = selectedIndex === index;


                  return (
<>
                    {/* {clickedIndex !== null && <div
                                          className={`relative cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full h-vh66`}

                     />} */}

                    <motion.div
                     key={post.slug}
                      ref={elementRefs[index]} 
                      layout
                      initial={{
                        y: 150,
                        x: 0,
                        opacity: 0,
                      }} 
                      animate={{
                        y: 0,
                        x: 0,
                        opacity: 1,

                      }}
                      exit={{
                        margin: 'auto',
                        opacity : index === selectedIndex ? 1 : 0,
                        width: index === selectedIndex ? 'calc(100vw - 12rem)': '100%',
                        className:'h-vhh',
                        y: index === selectedIndex ? finalPos : null
                      }}
                      transition={{
                  
                        opacity:{
                          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                          duration: 0.3,
                          delay:0   
                        },
                        y:{
                          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                          duration: 0.6,   
                          delay:0.3   
                        },
                        width:{
                          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                          duration: 0.6,   
                          delay:0.3   
                        }
                      }}
                      //onClick={() => openModal(post.slug)}
                      onClick={() => getPosition(index)}
                     // style={isClicked ? () => getPositionStyles() : null}
                      className="relative cursor-pointer  overflow-hidden rounded-xl w-full h-vh66 bg-slate-400"
                    >
                    
                    <PostTile
                          index={index}
                          key={post.slug}
                          post={post}
                          slug={slug}
                        />
                    
                    </motion.div>
                      {/* <h1>is it? {index} {clickedIndex}</h1> */}

                      {/* <div onClick={() => openModal(post.slug)}> */}
                 
                      {/* </div>
         */}
                    </>
                  );
                })}
                {/* {loopedPosts && (
                  <>
                    {loopedPosts.map((post, index) => {
                      return (
                        <motion.div
                          key={post.slug}
                          onClick={() => openModal(post.slug)}
                          className={`relative cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full truncate`}
                        >
                          <FadeInWhenVisible>
                            <PostTile index={index} post={post} slug={slug} />
                          </FadeInWhenVisible>
                        </motion.div>
                      );
                    })}
                  </>
                )} */}
              </div>
            )}


<div className=" p-6 ">
                <NextPost post={loopedPosts[0]} />
              </div>
        </ScrollableBox>

      {/* </motion.div> */}
    
      {/* <TransitionWipe /> */}
      

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
