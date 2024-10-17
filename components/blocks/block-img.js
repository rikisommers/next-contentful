import React from "react";
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

          <figcaption
            className="py-4 text-sm"
            style={{ color: "var(--text-color)" }}
          >
            {data.title}
          </figcaption>
        </>
      )}
    </figure>
  );
};

export default BlockImg;
