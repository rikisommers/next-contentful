import React from "react";
import CoverImage from "../image/cover-image";
import ContentfulImage from "../image/contentful-image";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";

export const BlockImg = ({ data }) => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <figure>
      {data.image && data.title && (
        <>
        <h2 className="py-4 text-sm"
        style={{color:currentTheme?.textColor}}>
          {data.title}
        </h2>

        {/* <figcaption className="text-xs"
        style={{color:currentTheme?.textColor}}>
            {data.image.description}
          </figcaption> */}
          <ContentfulImage
            className="img-cover"
            alt={`${data.image?.title}`}
            src={data.image.url}
          />

        </>
      )}
    </figure>
  );
};

export default BlockImg;
