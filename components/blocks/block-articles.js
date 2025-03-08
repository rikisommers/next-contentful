import React, { useState } from "react";
import Grid from "../grid/grid";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import { ScaleContainer } from "../motion/scale-container";
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

  const { currentTheme } = useThemeContext();

  const posts = data.articlesCollection?.items;

  // console.log("data", data.articlesCollection?.items);
   console.log("data", data);

  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleTagClick = (tag) => {

    console.log(tag)
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
    <div className="px-8 pb-8">
      {data.filter === true && tags && tags.length && (
        <BlockTags
          data={tags}
          selected={selectedTag}
          handleTagClick={handleTagClick}
        />
      )}
      <div className="flex flex-col w-full gap-6 @container/grid">
        <ScaleContainer>
        {posts && <Grid type={currentTheme.data.cardGrid} data={filteredPosts} />}
        </ScaleContainer>
      </div>
    </div>
  );
};

export default BlockArticles;
