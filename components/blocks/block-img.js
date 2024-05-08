import React from "react";
import CoverImage from "../image/cover-image";
import ContentfulImage from "../image/contentful-image";

export const BlockImg = ({ data }) => {
  return (
    <figure>
      {data.image && data.title && (
        <>
          <ContentfulImage
            className="img-cover"
            alt={`${data.image?.title}`}
            src={data.image.url}
          />

          <figcaption className="u-fs--caption u-c--light u-mt--16 figcaption">
            {data.image.description}
          </figcaption>
        </>
      )}
    </figure>
  );
};

export default BlockImg;
