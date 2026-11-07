/**
 * next/image loader for Contentful's Images API: resizes on the CDN and serves WebP.
 * Falls through for non-Contentful URLs.
 */
export const contentfulLoader = ({ src, width, quality }) => {
  if (!src.includes("images.ctfassets.net") && !src.startsWith("//images.ctfassets.net")) return src;
  const base = src.startsWith("//") ? `https:${src}` : src;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}w=${width}&q=${quality || 75}&fm=webp`;
};
