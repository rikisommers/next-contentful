import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../components/layout";
import { getWork, getAllBlogPostsIntro, getAllBlogTags, getFooter } from "../lib/api";
import PostIntro from "../components/post/post-intro";
import PostTileCs from "../components/post/post-tile-cs";
import BlockFooter from "../components/blocks/block-footer";
import TransitionPage from "../components/transition/pageTransition";

export default function Posts({ intro, posts, tags, footerData }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const { scrollY } = useScroll();

  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    }
  }, []);

  const menuY = useTransform(scrollY, (value) => {
    if (!footerRef.current || !menuRef.current) return 0;
    const footerTop = footerRef.current.getBoundingClientRect().top;
    const menuBottom = menuRef.current.getBoundingClientRect().bottom;
    const overlap = menuBottom - footerTop;
    return overlap > 0 ? -overlap : 0;
  });

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
      {/* <ScrollContainer> */}
        <div className="flex">

          <div className="o-menu">
          <motion.div
            ref={menuRef}
            className="self-start w-64 p-4"
            style={{ 
              backgroundColor: "var(--body-background-color)",
              position: 'fixed',
              top: 100,
              y: menuY
            }}
          >
            <ul className="flex flex-col gap-4">
              <li
                className={`px-2 py-1 text-sm rounded-md cursor-pointer tag ${
                  selectedTag === null
                    ? "text-accent-pri bg-surface-2"
                    : "text-subtext-color"
                }`}
                onClick={() => handleTagClick(null)}
              >
                All
              </li>
              {tags &&
                tags.map((tag, index) => (
                  <li
                    key={index}
                    className={`px-2 py-1 text-sm rounded-md cursor-pointer tag ${
                      selectedTag === tag
                        ? "text-accent-pri bg-surface-2"
                        : "text-subtext-color"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </li>
                ))}
            </ul>
          </motion.div>
</div>
          <div ref={contentRef} className="flex-grow ml-64">
            <div className="o-content">
              <PostIntro title={intro.titlealt} content={intro.contentalt} />
            </div>

            {filteredPosts && (
              <motion.div
                className="px-24 pb-16 o-content o-grid"
                transition={{
                  staggerChildren: 0.3,
                  duration: 0.3,
                }}
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="o-grid__item--cs"
                  >
                    <PostTileCs index={index} post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {footerData && (
          <div ref={footerRef} className="mt-16">
            <BlockFooter data={footerData} />
          </div>
        )}
      {/* </ScrollContainer> */}
    </Layout>
  );
}

export async function getStaticProps() {
  // Fetch posts, tags, and footer data
  const { posts, tags } = (await getAllBlogPostsIntro()) ?? {
    posts: [],
    tags: [],
  };
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
