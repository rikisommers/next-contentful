//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";


import Layout from "../../components/layout";
import {
  getAllCaseStudiesForHome,
  getAllCaseStudies,
  getWork,
} from "../../lib/api";

import { AnimatePresence, motion, transform, useAnimation } from "framer-motion";

import Transition from "../../components/transition-wipe";
import Modal from "../../components/modal";
import CaseStudyTile from "../../components/case-study-tile";
import PostContent from "../../components/post-content";
import { ScrollableBox } from "../../components/scrollable";
import TextAnimation from "../../components/text-animation";
import useIntersectionObserver from "../../components/intersection-observer";
import Link from "next/link";




export default function Index({ intro, caseStudies, allCaseStudies }) {
  const router = useRouter();

 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);


  
  useEffect(() => {

      const newPost = allCaseStudies.find((post) => post.slug === slug)
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

  }, [slug]); // Re-run the effect whenever the route changes

    

  const [isIntroVisible, setIntroIsVisible] = useState(true);
  const introRef = useIntersectionObserver(
    () => {
      setIntroIsVisible(false);
    },
    { rootMargin: "0px", threshold: 1 },
    false
  );


  const updateUrl = (url) => {
    const newUrl = `/posts/${url}`
    //router.push('/posts',`/posts/${url}`);

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
  }



  const openModal = (slug) => {
    setSlug(slug)
    //updateUrl(slug)
    setIsModalOpen(true);

  };

  const [isPosts, setIsPosts] = useState(true);


  const closeModal = () => {
    
    //setIsModalOpen(false);
    console.log('ruote',router.asPath)
    setIsPosts(!isPosts)
    router.push('/posts/all');
  };



  return (
    <Layout>

      <div className="postop">
        <div>{router.pathname}</div>
       <div>{isPosts ? 'yes' : 'no'}</div> 
      </div>

      <Modal
        isOpen={!!router.query.post}
        onClose={closeModal}
        nextPost={nextPost}
      >
        {post && <PostContent post={post} />}

      </Modal> 


      <ScrollableBox infinite={true}  > 

      <motion.div
          className="w-full bg-white top-0"
          exit={{
            zIndex: 0,
          }}
          transition={{
            ease: [0.33, 1, 0.68, 1],
            duration: 1.6,
            //  delay: 1,
          }}
        >
      {allCaseStudies && (
        <div className="flex flex-col gap-6 py-6 mx-6 relative  work-grid ">

        <motion.div
          animate={{
           /// background: isIntroVisible ? "red" : "blue",
          }}
          className="
          absolute 
          z-20 
          top-0 
          mt-6 
          w-full   
          h-vhr flex items-center justify-center rounded-xl bg-white z-30  item"
          ref={introRef}
        >
          <TextAnimation content={intro.intro}></TextAnimation>
        </motion.div>
   
          {allCaseStudies.map((post, index) => {
            return (
              <motion.div
              key={index}

                //onClick={() => openModal(post.slug)}
                className={`cursor-pointer item overflow-hidden bg-slate-200 rounded-xl w-full ${
                  index == 0 ? "h-vhr" : "h-full"
                }`}
              >
          <Link 
            //  onClick={() => openModal(post.slug)}
               href={`/posts/all?post=${post.slug}`}
               as={`/posts/${post.slug}`}
                >
                  <CaseStudyTile
                  index={index}
                  key={post.slug}
                  post={post}
                  slug={slug}
                  />       
                  </Link>       
              </motion.div>
              //               <FadeInWhenVisible>

              // </FadeInWhenVisible>
            );
          })}
          
          </div>
        )}
        </motion.div>
        </ScrollableBox>
        <Transition/>
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
