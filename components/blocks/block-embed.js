import React from "react";
import PropTypes from "prop-types";

/**
 * Embed block that renders an iframe with an optional caption.
 * Used to embed external content such as videos, maps, or interactive widgets.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the embed block
 * @param {string} [props.data.caption] - Caption text displayed above the embed
 * @param {string} props.data.url - URL of the content to embed in the iframe
 * @example
 * // Embed a video with caption
 * <BlockEmbed
 *   data={{
 *     caption: "Product demo walkthrough",
 *     url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
 *   }}
 * />
 * @example
 * // Embed without caption
 * <BlockEmbed
 *   data={{
 *     url: "https://codepen.io/pen/embed/abc123"
 *   }}
 * />
 */
export const BlockEmbed = ({ data }) => {
  return (
    <figure>
      {data.caption && (
        <figcaption className="u-fs--caption u-c--light">
          {data.caption}
        </figcaption>
      )}

      <div className="c-image--landscape-tall">
        <iframe src={data.url} width="100%" height="100%"></iframe>
      </div>
    </figure>
  );
};

BlockEmbed.propTypes = {
  /** Contentful entry data for the embed block */
  data: PropTypes.shape({
    /** Caption text displayed above the embed */
    caption: PropTypes.string,
    /** URL of the content to embed in the iframe */
    url: PropTypes.string.isRequired,
  }),
};

export default BlockEmbed;
