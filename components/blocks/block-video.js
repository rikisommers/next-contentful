import React from "react";

export const BlockVideo = ({ data }) => {
  return (
    <figure>
      {data.caption && (
        <figcaption className="u-fs--caption u-c--light">
          {data.caption}
        </figcaption>
      )}

      <div className="c-image--landscape-tall">
        <iframe src={data.url} width="100%" height="100%"></iframe>
      </div>
    </figure>
  );
};

export default BlockVideo;
