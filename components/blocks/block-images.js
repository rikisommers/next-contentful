import React from "react";
import CoverImage from "../image/cover-image";

export const BlockImages = ({ data }) => {
  return (
    <figure>
      <h3 className="col-6 u-ph--title u-t-subtitle u-mb--16">{data.title}</h3>

      <div className="o-img-grid">
        {data.imagegridCollection &&
          data.imagegridCollection.items.map((image) => {
            return (
              <figure>
                <CoverImage title={image.title} url={image.url} />
                <figcaption className="u-fs--caption u-c--light">
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
