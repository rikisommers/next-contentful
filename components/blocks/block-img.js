import React from "react";
import CoverImage from "../image/cover-image";

export const BlockImg = ({ data }) => {
  return (
    <figure>
      {data.image && data.title && (
        <>
          <CoverImage
            title={data.image.title}
            url={data.image.url}
            layout="landscape"
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
