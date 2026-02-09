import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import GridBasic from "../articleList/grid-basic";
import GridBento from "../articleList/grid-bento";
import GridThings from "../articleList/grid-things";

/**
 * Articles grid block that displays a collection of articles in various grid layouts
 * with optional tag-based filtering. Supports basic grid, bento grid, and things grid
 * display modes driven by theme or data configuration.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the articles grid block
 * @param {string} [props.data.type] - Grid layout type: "gridBasic", "gridbento", or "gridthings"
 * @param {boolean} [props.data.filter] - Whether to show the tag filter navigation
 * @param {Object} props.data.articlesCollection - Collection of article entries from Contentful
 * @param {Object[]} props.data.articlesCollection.items - Array of article entries
 * @param {string} [props.data.articlesCollection.items[].title] - Article title
 * @param {string[]} [props.data.articlesCollection.items[].tags] - Tags associated with the article
 * @param {string[]} [props.tags] - Array of unique tags extracted from all articles for the filter
 * @example
 * // Bento grid with tag filtering
 * <BlockArticlesGrid
 *   data={{
 *     type: "gridbento",
 *     filter: true,
 *     articlesCollection: {
 *       items: [
 *         { title: "Project Alpha", tags: ["design"] },
 *         { title: "Project Beta", tags: ["development"] }
 *       ]
 *     }
 *   }}
 *   tags={["design", "development"]}
 * />
 * @example
 * // Basic grid without filtering
 * <BlockArticlesGrid
 *   data={{
 *     type: "gridBasic",
 *     filter: false,
 *     articlesCollection: {
 *       items: [
 *         { title: "Case Study One" },
 *         { title: "Case Study Two" }
 *       ]
 *     }
 *   }}
 * />
 */
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

BlockArticlesGrid.propTypes = {
  /** Contentful entry data for the articles grid block */
  data: PropTypes.shape({
    /** Grid layout type */
    type: PropTypes.string,
    /** Whether to show the tag filter navigation */
    filter: PropTypes.bool,
    /** Collection of article entries from Contentful */
    articlesCollection: PropTypes.shape({
      /** Array of article entries */
      items: PropTypes.arrayOf(
        PropTypes.shape({
          /** Article title */
          title: PropTypes.string,
          /** Tags associated with the article */
          tags: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    }),
  }),
  /** Array of unique tags for the filter navigation */
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default BlockArticlesGrid;
