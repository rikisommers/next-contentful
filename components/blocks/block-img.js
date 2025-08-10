import React from "react";
import ContentfulImage from "../image/contentful-image";
import BlendImage from "../image/blend-image";

export const BlockImg = ({ data }) => {
  console.log("BlockImg --> block-img.js", data);
  return (
    <figure>
      {data.image && data.title && (
        <div className="relative">
                <BlendImage
          className="absolute w-full h-full img-cover"
          alt={`Cover Image for ${data.image?.title}`}
          src={data.image.url}
        />
          {/* <ContentfulImage
            className="img-cover"
            alt={`${data.image?.title}`}
            src={data.image.url}
          /> */}

          
          <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">{data.title}</p>
          </figcaption>
         
        </div>
      )}

    </figure>
  );
};

export default BlockImg;
