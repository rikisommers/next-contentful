import React from "react";
import PropTypes from "prop-types";
import { toEmbedSrc } from "../utils/embed-urls";

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
  if (!data?.url) return null;
  const isPrototype = /figma\.com\/proto\//i.test(data.url);

  return (
    <figure className={`flex flex-col gap-3 ${data.displayFullWidth ? "w-full" : "mx-auto max-w-5xl"}`}>
      <div className={`overflow-hidden relative w-full rounded-lg ${isPrototype ? "aspect-[4/3]" : "aspect-video"}`}>
        <iframe
          src={toEmbedSrc(data.url)}
          title={data.title || data.caption || "Embedded content"}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      {data.caption && (
        <figcaption className="text-xs text-[var(--subtext-color)]">{data.caption}</figcaption>
      )}
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
