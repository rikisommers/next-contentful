import React from "react";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";
import { useThemeContext } from "../context/themeContext";

/**
 * Article block component that renders rich text content with optional images
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful article entry data
 * @param {string} props.data.title - Article section title displayed as a subheading
 * @param {Object} props.data.content - Plain text content object with nested content string
 * @param {Object} props.data.contentRich - Rich text content from Contentful (contains json property)
 * @param {Array<Object>} props.data.img - Array of image objects to display below the article
 * @param {string} props.data.img[].url - Image source URL
 * @param {string} props.data.img[].title - Image title used as alt text and key
 * @example
 * // Article with rich text content
 * <BlockArticle
 *   data={{
 *     title: "Design Process",
 *     contentRich: { json: richTextDocument },
 *   }}
 * />
 * @example
 * // Article with plain text and images
 * <BlockArticle
 *   data={{
 *     title: "Gallery",
 *     content: { content: "A collection of project screenshots." },
 *     img: [
 *       { url: "https://images.ctfassets.net/photo1.jpg", title: "Screenshot 1" },
 *       { url: "https://images.ctfassets.net/photo2.jpg", title: "Screenshot 2" },
 *     ],
 *   }}
 * />
 */
export const BlockArticle = ({ data }) => {

  const { currentTheme } = useThemeContext();
  const richTextOptions = useRichTextOptions();

  const getContentClass = (height) => {
    switch (height) {
      case "center":
        return "mx-auto max-w-prose";
      case "left":
        return "max-w-prose";
        case "split":
          return "w-full grid grid-cols-2";
      default:
        return "mx-auto max-w-prose";
    }
  };


  return (

    <article className={`${getContentClass(currentTheme.data.bodyTextAlign)} richtext`} id={data.title}>
 

        
        {data.title && 
        <h2 className="mb-4 text-sm font-normal" style={{color: 'var(--subtext-color)'}}>{data.title}</h2>
        }
        {data.content && (
          <p className={`mb-8 text-base ${currentTheme.data.bodyTextIndent ? "indent-12" : ""}`} 
          style={{color: 'var(--subtext-color)',}}>{data.content.content}</p>
        )}

        {data.contentRich && (
          <div style={{color:'var(--text-color)'}} className={`leading-normal text-balance ${currentTheme.data.bodyTextIndent ? "[&>p:first-of-type]:indent-12" : ""}`}>
            {documentToReactComponents(
              data.contentRich.json,
              richTextOptions
            )} 
          </div>
        )}
        {data.img &&
          data.img.map((img) => {
            return (
              <ContentfulImage
                key={img.title}
                width={2000}
                height={1000}
                alt={`Cover Image for ${img.title}`}
                src={img.url}
              />
            );
          })}
    </article>
  
  );
};

BlockArticle.propTypes = {
  /** Contentful article entry data */
  data: PropTypes.shape({
    /** Article section title */
    title: PropTypes.string,
    /** Plain text content object */
    content: PropTypes.shape({
      content: PropTypes.string,
    }),
    /** Rich text content from Contentful */
    contentRich: PropTypes.shape({
      json: PropTypes.object,
    }),
    /** Array of image objects */
    img: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default BlockArticle;
