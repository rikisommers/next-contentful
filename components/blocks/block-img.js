import React from "react";
import CoverImage from "../image/cover-image";
import ContentfulImage from "../image/contentful-image";

export const BlockImg = ({ data }) => {
  return (
    <figure>
      {data.image && data.title && (
        <>
          <h2 className="py-4 text-sm" style={{ color: "var(--text-color)" }}>
            {data.title}
          </h2>

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
