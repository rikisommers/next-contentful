import React, { useState, useEffect, useMemo } from "react";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import ListTextHover from "../articleList/list-text-hover";
import ListTextImage from "../articleList/list-text-image";
import ListText from "../articleList/list-text";
import ArticlesListStack from "../articleList/articles-list-stack";
export const BlockArticlesList = ({ data, tags }) => {
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

  const discoveredListType = data.type ? data.type : currentTheme?.data?.listType

  // Normalize and render grid component based on layout type
  const renderListComponent = (layoutType, postsData) => {
    // Normalize the layout type string to match enum values


    // Map normalized keys to components
    switch (layoutType) {
      case 'textList':
        return <ListText data={postsData} />;
      case 'textHoverList':
        return <ListTextHover data={postsData} />;
      case 'textImageList':
        return <ListTextImage data={postsData} />;
      case 'textImageListStack':
        return <ArticlesListStack data={postsData} />;
      default:
        return <ListTextImage data={postsData} />;
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
          renderListComponent(discoveredListType, filteredPosts)
        }
      </div>

    </>
  );
};

export default BlockArticlesList;
