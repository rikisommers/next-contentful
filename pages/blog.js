import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { getWork, getAllBlogPostsIntro, getAllBlogTags, getFooter } from "../lib/api";
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
import PostTileLg from "../components/post/post-tile-lg";
import PostModal from "../components/post/post-modal";
// import CustomCursor from "../components/utils/cursor";
import NextPost from "../components/post/post-next";
// const getWindowSize = () => [window.innerWidth, window.innerHeight];
import BlockFooter from "../components/blocks/block-footer";
import BlockArticles from "../components/blocks/block-articles";
import BlockVideo from "../components/blocks/block-video";
import { gsap, ScrollTrigger } from "gsap";
import Lenis from "@studio-freight/lenis";
import { useScrollPosition } from "../components/scrollPosContext";

import ScrollContainer from "../components/utils/scroll-container";
import ClipPathContainer from "../components/utils/clip-path-container";

export default function Posts({ intro, posts, tags, footerData }) {


  const headerRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState(null); // State for selected tag
  const [filteredPosts, setFilteredPosts] = useState(posts); // State for filtered posts


  console.log("POSTS------------------------", posts);
  console.log("TAGS------------------------", tags);
  // console.log("TAGS------------------------", posts);


  // Function to handle tag click
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    if (tag) {
      const filtered = posts.filter((post) => post.tags && post.tags.includes(tag));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };


  return (
    <Layout>
      {/* <TransitionTilt active={true} className="z-100"> */}
      {/* <ClipPathContainer>
          </ClipPathContainer> */}

      <div className="flex">


        <div className="o-menu" style={{ backgroundColor: 'var(--body-background-color)' }}>
          <ul className="sticky top-0 flex flex-col self-start gap-4">

            <li
              className="px-2 py-1 text-sm rounded-md cursor-pointer tag"
              style={{
                color: selectedTag === null ? 'var(--accent-pri)' : 'var(--subtext-color)',
                backgroundColor: selectedTag === null ? 'var(--surface-2)' : '',
              }}
              onClick={() => handleTagClick(null)}
            >All</li>
            {tags &&
              tags.map((tag, index) => (
                <li key={index}
              className="px-2 py-1 text-sm rounded-md cursor-pointer tag"
                  style={{
                    color: selectedTag === tag ? 'var(--accent-pri)' : 'var(--subtext-color)',
                    backgroundColor: selectedTag === tag ? 'var(--surface02)' : '',
                  }}

                  onClick={() => handleTagClick(tag)} // Set the selected tag on click
                >
                  {tag} {/* Display the actual tag */}
                </li>
              ))
            }

        </ul>

      </div>


      <div className="flex flex-col flex-grow">

        <div className="o-content" ref={headerRef}>
          <PostIntro
            title={intro.titlealt}
            content={intro.contentalt}
          />
        </div>

        {/* {intro.video && (
                    <div className="pb-24 o-content">
                       <BlockVideo data={intro.video} />
                    </div>
        
              )} */}

        {filteredPosts && (
          <motion.div
            className="px-24 o-content o-grid"
            transition={{
              staggerChildren: 0.3,
              duration: 0.3,
            }}
          >
            {filteredPosts.map((post, index) => {
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{
                    y: 30,
                    x: 0,
                    opacity: 0,
                  }}
                  animate={{
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
                  }}
                  //onClick={() => openModal(post.slug)}
                  // onClick={() => getPosition(index)}
                  // style={isClicked ? () => getPositionStyles() : null}
                  className="o-grid__item--cs"
                >
                  <PostTileCs index={index} post={post} />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {footerData && <BlockFooter data={footerData} />}

      </div>
    </div>


      {/* </TransitionTilt> */ }
  <TransitionWipe />
    </Layout >
  );
}

export async function getStaticProps() {
  // Fetch posts, tags, and footer data
  const { posts, tags } = (await getAllBlogPostsIntro()) ?? { posts: [], tags: [] };
  const intro = (await getWork()) ?? [];
  const footerData = await getFooter();

  return {
    props: {
      intro,
      posts,
      tags,
      footerData: footerData || null, // Use null as fallback if footerData is undefined
    },
  };
}