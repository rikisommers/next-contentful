import React from "react";
import CoverImage from "../image/cover-image";

export const BlockImages = ({ data }) => {
  return (
    <figure>
      <h3 className="redo">{data.title}</h3>

      <div className="redo">
        {data.imagegridCollection &&
          data.imagegridCollection.items.map((image) => {
            return (
              <figure>
                <CoverImage title={image.title} url={image.url} />
                <figcaption className="redo">
                  {image.description}
                </figcaption>
              </figure>
            );
          })}
      </div>
    </figure>
  );
};

export default BlockImages;
