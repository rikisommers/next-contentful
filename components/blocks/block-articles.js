import React, { useState } from "react";
import PostTile from "../post/post-tile";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import AnimatedText, { AnimStyle } from "../motion/animated-text";
import PostTileRe from "../post/post-tile-reone";
import PostTileImg from "../post/post-tile-img";
import { useThemeContext } from "../themeContext";
import Grid from "../grid/grid";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"

export const BlockArticles = ({ data, tags }) => {
  // const { setVisible, setContent } = useMousePos();

  // const handleShowCursor = ({content}) => {
  //   setVisible(true);
  //   setContent(content); // Set content based on the article index or any other logic

  // };

  // const handleHideCursor = ({content}) => {
  //   setVisible(false);
  //   setContent(''); // Set content based on the article index or any other logic

  // };

  const posts = data.articlesCollection?.items;

  console.log("data", data.articlesCollection?.items);
  console.log("tags", tags);

  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    if (tag) {
      const filtered = posts.filter(
        (post) => post.tags && post.tags.includes(tag)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <>
      {tags && tags.length && <BlockTags data={tags} selected={selectedTag} handleTagClick={handleTagClick}/>}
      <div className="flex flex-col w-full gap-6">
        {posts && <Grid type={data.type} data={filteredPosts} />}
      </div>
    </>
  );
};

export default BlockArticles;
