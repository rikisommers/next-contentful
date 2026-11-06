import Image from "next/image";
import { contentfulLoader } from "./contentful-loader";

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/**
 * Contentful image with responsive sizes, WebP and lazy loading.
 * Pass `priority` for the above-the-fold image (disables lazy loading).
 * @component
 * @category image
 */
const ContentfulImage = ({ alt = "", priority = false, className = "w-full h-full object-cover", ...props }) => (
  <Image
    loader={contentfulLoader}
    sizes={DEFAULT_SIZES}
    width={400}
    height={200}
    alt={alt}
    priority={priority}
    className={className}
    {...props}
  />
);

export default ContentfulImage;
