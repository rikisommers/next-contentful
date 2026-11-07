import React from "react";
import PropTypes from "prop-types";
import Media from "../image/media";

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
  if (!data?.image && !data?.video) return null;

  // `size: ["full"]` lets a block break out to the page width; everything else sits in the column.
  const fullWidth = Array.isArray(data.size) ? data.size.includes("full") : data.size === "full";

  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden relative rounded-lg">
        <Media
          asset={data.image}
          videoUrl={data.video}
          alt={data.image?.description || data.title}
          sizes={fullWidth ? "100vw" : "(max-width: 768px) 100vw, 66vw"}
          className="img-cover"
        />
      </div>
      {data.title && (
        <figcaption className="text-xs text-[var(--subtext-color)]">{data.title}</figcaption>
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
      description: PropTypes.string,
      contentType: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /** External video URL (YouTube, Vimeo or .mp4) shown instead of the image */
    video: PropTypes.string,
    /** ["full"] for page-width media */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
};

export default BlockImg;
