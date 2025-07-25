import React, { useState, useEffect } from "react";
import Grid from "../grid/grid";
import List from "../grid/list";
import GridList from "../grid/grid-list";
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
   //  console.log("data", data);

  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleTagClick = (tag) => {

   // console.log(tag)
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
      {data.filter === true && tags?.length && (
        <div className="px-8 pb-8">
        <BlockTags
          data={tags}
          selected={selectedTag}
          handleTagClick={handleTagClick}
        />
        </div>
      )}
  
        {data.type == "list" && (
          <div className="flex flex-col gap-6 pb-8 w-full">
            <List data={filteredPosts} />
          </div>
        )}
        {data.type == "bento" && (
           <div className="flex flex-col gap-6 px-8 pb-8 w-full">
             <Grid type={currentTheme.data.cardGrid} data={filteredPosts} />
          </div>
        )}
      
    </>
  );
};

export default BlockArticles;
