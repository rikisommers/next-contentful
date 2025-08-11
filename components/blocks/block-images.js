import React from "react";
import CoverImage from "../image/cover-image";
import BlendImage from "../image/blend-image";
import GridLayout from "../grid/basic";
export const BlockImages = ({ data }) => {
  return (
    <figure>

      <GridLayout>
        {data.imagesCollection &&
          data.imagesCollection.items.map((image) => {
            return (
              <figure className="overflow-hidden relative w-full h-full rounded-lg" key={image.url}>
                <BlendImage title={image.title} src ={image.url} />
       
                <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
                <p className="text-[var(--text-color)] text-xs">{image.title}</p>
                </figcaption>
              </figure>
            );
          })}
      </GridLayout>
    </figure>
  );
};

export default BlockImages;
