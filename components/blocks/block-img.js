import React from "react";
import PropTypes from "prop-types";
import ContentfulImage from "../image/contentful-image";
import BlendImage from "../image/blend-image";

/**
 * Image block component that renders a Contentful image with a blend overlay
 * and a caption displayed in a floating card
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful image entry data
 * @param {string} props.data.title - Caption text displayed in the floating figcaption card
 * @param {Object} props.data.image - Image object from Contentful
 * @param {string} props.data.image.url - Image source URL
 * @param {string} props.data.image.title - Image title used for alt text
 * @example
 * // Image block with caption
 * <BlockImg
 *   data={{
 *     title: "Final prototype screenshot",
 *     image: {
 *       url: "https://images.ctfassets.net/screenshot.jpg",
 *       title: "Prototype Screenshot",
 *     },
 *   }}
 * />
 * @example
 * // Image block with long caption
 * <BlockImg
 *   data={{
 *     title: "The redesigned dashboard showing real-time analytics and user activity metrics",
 *     image: {
 *       url: "https://images.ctfassets.net/dashboard.jpg",
 *       title: "Dashboard Redesign",
 *     },
 *   }}
 * />
 */
export const BlockImg = ({ data }) => {
  return (
    <figure>
      {data.image && data.title && (
        <div className="overflow-hidden relative rounded-lg">
                <BlendImage
          className="absolute w-full h-full img-cover"
          alt={`Cover Image for ${data.image?.title}`}
          src={data.image.url}
        />
          {/* <ContentfulImage
            className="img-cover"
            alt={`${data.image?.title}`}
            src={data.image.url}
          /> */}

          
          <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">{data.title}</p>
          </figcaption>
         
        </div>
      )}

    </figure>
  );
};

BlockImg.propTypes = {
  /** Contentful image entry data */
  data: PropTypes.shape({
    /** Caption text for the image */
    title: PropTypes.string,
    /** Image object from Contentful */
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  }),
};

export default BlockImg;
