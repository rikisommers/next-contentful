import React from "react";
import BlendImage from "./blend-image";
import { useReducedMotion } from "../utils/accessibility-helper";
import { isVideoFile, toVideoEmbedUrl } from "../utils/embed-urls";

export { toVideoEmbedUrl };

const absolute = (url) => (url && url.startsWith("//") ? `https:${url}` : url);

/**
 * Renders a Contentful asset or a video URL:
 * - video assets and .mp4/.webm URLs play inline (muted loop autoplay, or paused with
 *   controls for reduced-motion visitors)
 * - YouTube / Vimeo URLs render as an embedded player
 * - everything else renders as an optimised image
 *
 * @component
 * @category image
 * @param {Object} props
 * @param {{url: string, title?: string, description?: string, contentType?: string, width?: number, height?: number}} [props.asset] - Contentful asset
 * @param {string} [props.videoUrl] - External video URL (YouTube, Vimeo or a direct file)
 * @param {string} [props.alt] - Alt text override (defaults to the asset description, then title)
 * @param {string} [props.sizes] - Image sizes hint
 * @param {boolean} [props.priority] - Load eagerly (above the fold)
 */
export default function Media({ asset, videoUrl, alt, sizes, priority = false, className = "" }) {
  const reducedMotion = useReducedMotion();
  const label = alt ?? asset?.description ?? asset?.title ?? "";

  const embed = toVideoEmbedUrl(videoUrl);
  if (embed) {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <iframe
          src={embed}
          title={label || "Video"}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const fileUrl = absolute(videoUrl && isVideoFile(videoUrl) ? videoUrl : asset?.url);
  if (fileUrl && isVideoFile(fileUrl, asset?.contentType)) {
    return (
      <video
        className={`w-full h-auto ${className}`}
        src={fileUrl}
        width={asset?.width}
        height={asset?.height}
        aria-label={label || undefined}
        muted
        loop
        playsInline
        autoPlay={!reducedMotion}
        controls={reducedMotion}
        preload="metadata"
      />
    );
  }

  if (!asset?.url) return null;

  return (
    <BlendImage
      src={asset.url}
      alt={label}
      width={asset.width || 1600}
      height={asset.height || 1000}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
