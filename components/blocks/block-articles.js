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
import PostIntro from "../post/post-intro"
export const BlockArticles = ({ data, tags, type }) => {
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
        case articleListLayoutThemes.gridPrimary:
            return (
                <GridBasic data={data} theme="primary" />
            )
        case articleListLayoutThemes.gridSecondary:
            return (
                <GridBasic data={data} theme="secondary" />
            )
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
            return (
              <div className="flex flex-col gap-2 px-8 pb-10 w-full">
                <h1>Default-----</h1>
                <GridBasic data={data} />
              </div>
            )
    }
};

  // Normalize layout type to enum keys
  const normalizeLayoutType = (t) => {
    const key = String(t ?? '')
      .toLowerCase()
      .replace(/[^a-z]/g, ''); // remove spaces, dashes, underscores
    switch (key) {
      case 'gridprimary':
        return articleListLayoutThemes.gridPrimary;
      case 'gridsecondary':
        return articleListLayoutThemes.gridSecondary;
      case 'gridbento':
        return articleListLayoutThemes.gridBento;
      case 'gridthings':
        return articleListLayoutThemes.gridThings;
      case 'texthoverlist':
        return articleListLayoutThemes.textHoverList;
      case 'textimagelist':
        return articleListLayoutThemes.textImageList;
      case 'textlist':
        return articleListLayoutThemes.textList;
      default:
        return articleListLayoutThemes.gridPrimary;
    }
  };

  // Resolve layout type: prefer prop `type`, then `data.type`, then theme setting
  const resolvedTypeRaw = (type ?? data?.type ?? currentTheme?.data?.articleListLayout);
  const normalizedType = normalizeLayoutType(resolvedTypeRaw);
  const gridType = getGridType(normalizedType, filteredPosts); 
  return (
    <div className="flex flex-col gap-2 px-8 pb-10 w-full">

        <div className="grid grid-cols-12 gap-6">{data.type}</div>
      <header className="mb-10">
      <PostIntro  title={data.title ? data.title : null}  description={data.description ? data.description : null}/>
      </header>

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
