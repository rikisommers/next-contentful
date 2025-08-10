import React, { useState, useEffect } from "react";
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

  console.log("data.type:", data.type, typeof data.type);
  console.log("textHoverList:", articleListLayoutThemes.textHoverList, typeof articleListLayoutThemes.textHoverList);
  console.log("Strict equal?", data.type === articleListLayoutThemes.textHoverList);
  console.log("Length check:", data.type?.length, articleListLayoutThemes.textHoverList?.length);

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

  const getGridType = (type, data, aspectRatio) => {
    console.log("getGridType called with:", {
      type,
      typeType: typeof type,
      textHoverList: articleListLayoutThemes.textHoverList,
      textHoverListType: typeof articleListLayoutThemes.textHoverList,
      equal: type === articleListLayoutThemes.textHoverList,
      typeJSON: JSON.stringify(type),
      textHoverListJSON: JSON.stringify(articleListLayoutThemes.textHoverList)
    });

    switch (type) {
        case articleListLayoutThemes.gridBasic:
            return <GridBasic data={data}/>;
        case articleListLayoutThemes.gridBento:
            return <GridBento data={data}/>;
        case articleListLayoutThemes.gridThings:
            return <GridThings data={data}/>;
        case articleListLayoutThemes.textHoverList:
            return <ListTextHover data={data}/>;
        case articleListLayoutThemes.textImageList:
            return <ListTextImage data={data}/>;
        case articleListLayoutThemes.textList:
            return <ListText data={data}/>;
        default:
            return <GridBasic data={data}/>;
    }
};

  // Extract the type from the array
  const gridType = getGridType(currentTheme.data.articleListLayout, filteredPosts); 
  return (
    <div className="flex flex-col gap-2 px-8 pb-10 w-full">
      {data.filter === true && tags?.length && (
      
        <BlockTags
          data={tags}
          selected={selectedTag}
          handleTagClick={handleTagClick}
        />
      )}

      {gridType}
  
      
    </div>
  );
};

export default BlockArticles;
