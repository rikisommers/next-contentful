/**
 * Turn a YouTube or Vimeo page URL into its privacy-friendly embed URL.
 * Returns null for anything else.
 * @param {string} url
 * @returns {string|null}
 */
export function toVideoEmbedUrl(url) {
  if (!url) return null;
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`;
  return null;
}

/**
 * Convert a shareable URL into something an iframe can show:
 * Figma files/prototypes use Figma's embed endpoint, YouTube/Vimeo use their players,
 * anything else (CodePen embed, Storybook, StackBlitz) is used as given.
 * @param {string} url
 * @returns {string}
 */
export function toEmbedSrc(url) {
  if (!url) return url;
  if (/^https?:\/\/([\w-]+\.)?figma\.com\/(file|design|proto|board|deck)\//i.test(url)) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }
  return toVideoEmbedUrl(url) || url;
}

/** True for direct video files (by MIME type or extension). */
export const isVideoFile = (url, contentType) =>
  (contentType && contentType.startsWith("video/")) || /\.(mp4|webm|mov)(\?|$)/i.test(url || "");
