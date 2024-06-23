import React from "react";

export const BlockList = ({ data }) => {
  return (
    <figure>
      <h3 classname="col-6 u-ph--title u-t-subtitle u-mb--16">{data.title}</h3>
        <p>{data.description}</p>
        {data.items &&
          data.itemsCollection.items.map((item,index) => {
            return (
              <figure>
                //
                <figcaption className="u-fs--caption u-c--light">
                  {item.title}
                </figcaption>
                --
                <figcaption className="u-fs--caption u-c--light">
                  {item.content}
                </figcaption>
              </figure>
            );
          })}
    </figure>
  );
};

export default BlockList;
