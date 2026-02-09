import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { BlockTags } from "./block-tags";
// import { useMousePos } from "../mousePosContext"
import { useThemeContext } from "../context/themeContext";
import ListTextHover from "../articleList/list-text-hover";
import ListTextImage from "../articleList/list-text-image";
import ListText from "../articleList/list-text";
import ArticlesListStack from "../articleList/articles-list-stack";

/**
 * Articles list block that displays a collection of articles in various list layouts
 * with optional tag-based filtering. Supports text, text-hover, text-image, and
 * stacked list display modes driven by theme or data configuration.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the articles list block
 * @param {string} [props.data.type] - List layout type: "textList", "textHoverList", "textImageList", or "textImageListStack"
 * @param {boolean} [props.data.filter] - Whether to show the tag filter navigation
 * @param {Object} props.data.articlesCollection - Collection of article entries from Contentful
 * @param {Object[]} props.data.articlesCollection.items - Array of article entries
 * @param {string} [props.data.articlesCollection.items[].title] - Article title
 * @param {string[]} [props.data.articlesCollection.items[].tags] - Tags associated with the article
 * @param {string[]} [props.tags] - Array of unique tags extracted from all articles for the filter
 * @example
 * // Articles list with tag filtering enabled
 * <BlockArticlesList
 *   data={{
 *     type: "textImageList",
 *     filter: true,
 *     articlesCollection: {
 *       items: [
 *         { title: "Getting Started", tags: ["tutorial"] },
 *         { title: "Advanced Patterns", tags: ["tutorial", "advanced"] }
 *       ]
 *     }
 *   }}
 *   tags={["tutorial", "advanced"]}
 * />
 * @example
 * // Simple text list without filtering
 * <BlockArticlesList
 *   data={{
 *     type: "textList",
 *     filter: false,
 *     articlesCollection: {
 *       items: [
 *         { title: "Blog Post One" },
 *         { title: "Blog Post Two" }
 *       ]
 *     }
 *   }}
 * />
 */
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

BlockArticlesList.propTypes = {
  /** Contentful entry data for the articles list block */
  data: PropTypes.shape({
    /** List layout type */
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

export default BlockArticlesList;
