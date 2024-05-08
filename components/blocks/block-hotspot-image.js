import React from "react";
import ContentfulImage from "../image/contentful-image";
import CtxMenu from "../base/ctx-menu";
export const BlockHotspotImg = ({ data }) => {
  console.log("imgage data", data);
  return (
    <figure className="relative">
      {data && (
        <>
          {data.hotspots &&
            data.hotspots.hotspots.map((item, index) => {
              return (
                <div
                  key={index}
                  className="hotspot"
                  style={{
                    top: `${item.y}%`,
                    left: `${item.x}%`,
                    width: `${item.width}%`,
                    height: `${item.height}%`,
                  }}
                >
                  <CtxMenu
                    menuContent={
                    <div className="w-40 bg-red-400">
                      {item.name}
                      </div>
                  }
                    buttonContent={
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    }
                  ></CtxMenu>
                </div>
              );
            })}
          <ContentfulImage
            width={1920}
            height={1280}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt={`Cover Image for ${data.title}`}
            src={data.imageUrl}
          />
        </>
      )}
    </figure>
  );
};

export default BlockHotspotImg;
