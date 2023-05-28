import { useEffect, useRef, useState } from "react";

import { getAllCaseStudies2, getAllCaseStudiesNext } from "../lib/api";

import PostPreview from "./post-preview";
import CaseStudyTile from "./case-study-tile";
import CaseStudyPreviewAlt from "./case-study-preview-alt";
import { motion, cubicBezier, useScroll, useTransform } from "framer-motion";
import TextAnimation from "../components/text-animation";
import Modal from "./modal";
import Post from "../pages/posts/[slug]";
import { useRouter } from "next/router";

export default function CaseStudies({ intro, posts }) {
  //console.log('---------_WORK',intro);

  const router = useRouter();
  //  console.log('rq',router.query.post);
  const firstPost = posts[0];
  const secondPost = posts[1];
  //<div className='c-projects__list'>

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState('access-control');

  const selectSlug = (slug) => {
    console.log('ssss',slug)
    setSlug(slug);
    openModal();
  };

  const openModal = (slug) => {
    setSlug(slug);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  //   const handleOpenModal = () => {
  //    router.push(`/posts/${post.slug}`);
  //  };

  //!!router.query.post
  return (
    <div className="flex flex-col gap-6 p-6 relative">

      <Modal isOpen={isModalOpen} onClose={closeModal} slug={slug}>
        <button className="close-button" onClick={closeModal}>
          closeModal
        </button>

        <h1>S:{slug && slug}</h1>
        
        <Post/>
      </Modal>

      <motion.div className="c-tile c-tile--intro h-vhr flex items-center justify-center rounded-xl">
        <h1>WORK</h1>

        {/* <TextAnimation content={intro.intro}></TextAnimation> */}
      </motion.div>

      {posts.map((post, index) => (
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
          <button onClick={() => openModal(post.slug)}>{post.slug}</button>

          <CaseStudyTile index={index} key={post.slug} post={post} slug={slug}/>
        </motion.div>
      ))}

      <CaseStudyTile key={firstPost.slug} post={firstPost} />
      <CaseStudyTile key={secondPost.slug} post={secondPost} />
    </div>
  );
}
