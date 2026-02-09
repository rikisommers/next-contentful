import React from "react";
import PropTypes from "prop-types";
import { useThemeContext } from "../context/themeContext";

import FooterDefault from "../footer/footer-default";
import FooterFormat from "../footer/footer-format";
import FooterOnto from "../footer/footer-ondo";

/**
 * Footer block component that renders different footer layouts based on type.
 * Supports multiple footer variants: textList, format, and onto
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful footer entry data
 * @param {string} props.data.type - Footer layout type ("textList", "format", "onto"). Falls back to theme footerTheme
 * @param {string} props.data.title - Footer title or heading
 * @param {string} props.data.content - Footer body content text
 * @param {Object} props.data.socialCollection - Collection of social media links
 * @param {Array<Object>} props.data.socialCollection.items - Array of social link objects
 * @example
 * // Default text list footer
 * <BlockFooter
 *   data={{
 *     type: "textList",
 *     title: "Get in Touch",
 *     content: "Feel free to reach out for collaborations.",
 *     socialCollection: {
 *       items: [
 *         { title: "Twitter", url: "https://twitter.com/example" },
 *         { title: "GitHub", url: "https://github.com/example" },
 *       ],
 *     },
 *   }}
 * />
 * @example
 * // Format-style footer with minimal data
 * <BlockFooter
 *   data={{
 *     type: "format",
 *     title: "Studio Name",
 *     content: "Copyright 2025. All rights reserved.",
 *   }}
 * />
 */
export default function BlockFooter({ data }) {

  const { currentTheme } = useThemeContext();

  const discoveredFooterType = data.type ? data.type : currentTheme?.data?.footerTheme

  // Normalize and render grid component based on layout type
  const renderFooterComponent = (footerType, data) => {

    // Map normalized keys to components
    switch (footerType) {
      case 'textList':
        return <FooterDefault data={data} pages={pages}/>;
      case 'format':
        return <FooterFormat data={data} pages={pages}/>;
      case 'onto':
        return <FooterOnto data={data} pages={pages}  />;
      default:
        return <FooterDefault data={data} pages={pages}/>;
    }
  };


  const pages = [
    {
      id: "home",
      title: "Home",
      url: "/",
    },
    {
      id: "work",
      title: "Work",
      url: "/work",
    },
    {
      id: "blog",
      title: "Blog",
      url: "/blog",
    },
    {
      id: "about",
      title: "About",
      url: "/bio",
    },
  ];

  // return (
  //  <>
  //  asd
  //  </>
  // );

  return renderFooterComponent(discoveredFooterType, data);

}

BlockFooter.propTypes = {
  /** Contentful footer entry data */
  data: PropTypes.shape({
    /** Footer layout type */
    type: PropTypes.oneOf(["textList", "format", "onto"]),
    /** Footer title or heading */
    title: PropTypes.string,
    /** Footer body content text */
    content: PropTypes.string,
    /** Collection of social media links */
    socialCollection: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    }),
  }),
};
