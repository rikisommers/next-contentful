import Image from "next/image";
import { useThemeContext } from "../context/themeContext";
import { contentfulLoader } from "./contentful-loader";

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/** Greyscale image that blends with the page using the theme's blend mode. */
const BlendImage = ({ alt = "", ...props }) => {
  const { currentTheme } = useThemeContext();

  return (
    <Image
      loader={contentfulLoader}
      sizes={DEFAULT_SIZES}
      width={400}
      height={200}
      alt={alt}
      style={{ mixBlendMode: currentTheme.data.imageMixBlendMode }}
      className="object-cover w-full h-full greyscale"
      {...props}
    />
  );
};

export default BlendImage;
