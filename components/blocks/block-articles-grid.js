import React, { useState, useEffect, useMemo } from "react";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import GridBasic from "../articleList/grid-basic";
import GridBento from "../articleList/grid-bento";
import GridThings from "../articleList/grid-things";
export const BlockArticlesGrid = ({ data, tags }) => {
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
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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

  const discoveredGridType = data.type ? data.type : currentTheme?.data?.gridType

  // Normalize and render grid component based on layout type
  const renderGridComponent = (layoutType, postsData) => {
    // Normalize the layout type string to match enum values
    const normalizedKey = String(layoutType ?? '')
      .toLowerCase()
      .replace(/[^a-z]/g, ''); // remove spaces, dashes, underscores

    // Map normalized keys to components
    switch (normalizedKey) {
      case 'gridBasic':
        return <GridBasic data={postsData} />;
      case 'gridbento':
        return <GridBento data={postsData} />;
      case 'gridthings':
        return <GridThings data={postsData} />;
      default:
        return <GridBasic data={postsData} />;
    }
  };

  return (
    <>
     {data.filter === true && tags?.length && (
      <header className="px-8 mb-4 flex flex-col gap-8">

          <BlockTags
            data={tags}
            selected={selectedTag}
            handleTagClick={handleTagClick}
          />
  
      </header>
      )}
      <div className={`flex flex-col gap-4 px-8 pb-10 w-full`}>
        {data.articlesCollection.items.length &&
          renderGridComponent(discoveredGridType, filteredPosts)
        }
      </div>

    </>
  );
};

export default BlockArticlesGrid;
