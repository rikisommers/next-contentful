import React, { useState, useEffect, useMemo } from "react";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import { ScaleContainer } from "../motion/scale-container"
import { articleListLayoutThemes } from "../../utils/theme";
import GridBasic from "../articleList/grid-basic";
import GridBento from "../articleList/grid-bento";
import GridThings from "../articleList/grid-things";
import ListTextHover from "../articleList/list-text-hover";
import ListTextImage from "../articleList/list-text-image";
import ListText from "../articleList/list-text";
import ArticlesListStack from "../articleList/articles-list-stack";
import PostIntro from "../post/post-intro"
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

  // Normalize and render grid component based on layout type
  const renderGridComponent = (layoutType, postsData) => {
    // Normalize the layout type string to match enum values
    const normalizedKey = String(layoutType ?? '')
      .toLowerCase()
      .replace(/[^a-z]/g, ''); // remove spaces, dashes, underscores

    // Map normalized keys to components
    switch (normalizedKey) {
      case 'gridBasic':
        return <GridBasic data={postsData} theme="primary" />;
      case 'gridbento':
        return <GridBento data={postsData} />;
      case 'gridbento2':
        return <GridBento data={postsData} />;
      case 'gridthings':
        return <GridThings data={postsData} />;
      case 'texthoverlist':
        return <ListTextHover data={postsData} />;
      case 'textimagelist':
        return <ListTextImage data={postsData} />;
      case 'textlist':
        return <ListText data={postsData} />;
      case 'articlesliststack':
        return <ArticlesListStack data={postsData} />;
      default:
        return <GridBasic data={postsData} />;
    }
  };

  // Resolve layout type: prefer prop `type`, then `data.type`, then theme setting
  const resolvedLayoutType = currentTheme?.data?.cardGrid;
  
  // Memoize grid component to ensure it updates when theme or data changes
  const gridType = useMemo(() => {
    return renderGridComponent(currentTheme?.data?.cardGrid, filteredPosts);
  }, [resolvedLayoutType, filteredPosts]); 
  return (
<>
      <header className="px-8 mb-4 flex flex-col gap-8">
      {/* <PostIntro  title={data.title ? data.title : null}  description={data.description ? data.description : null}/> */}

<h1>{currentTheme.data.gridPrimary} {data?.type ? data?.type : 'no type'}</h1>
      <h1 className="text-xs font-light transition-colors duration-300 text-balance  text-[var(--subtext-color)]">
        {data.title ? data.title : null}
      </h1>
      {/* <p className="text-sm text-[var(--subtext-color)]"> {data.description ? data.description : null} </p> */}
      {data.filter === true && tags?.length && (
      
      <BlockTags
        data={tags}
        selected={selectedTag}
        handleTagClick={handleTagClick}
      />
    )}
      </header>

  


      <div className={`flex flex-col gap-4 px-8 pb-10 w-full`}>
        <h1>{currentTheme?.data?.gridPrimary}</h1>
      {renderGridComponent( data?.type ? data?.type : currentTheme?.data?.gridPrimary, filteredPosts)}
      </div>
  
      </>
  );
};

export default BlockArticles;
