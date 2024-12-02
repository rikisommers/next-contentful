import React from "react";
import BlendImage from "../image/blend-image";

export default function PostTileImgAlt({ img }) {
  return (
    <div className="relative flex flex-col flex-grow overflow-hidden rounded-lg img-post">
        <div className="absolute top-0 left-0 z-10 flex items-start justify-between w-full h-full gap-4 px-4 py-4 text-white ">
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-4">
                {post?.type[0] === "case study" && (
                  <>
                    <span className="w-1 text-lg text-white material-icons">
                      inventory_alt
                    </span>
                    Case study
                  </>
                )}
                {post?.type[0] === "blog post" && (
                  <>
                    <span className="w-1 text-lg text-white material-icons">
                      article
                    </span>
                    Blog
                  </>
                )}
              </div> */}

              {/* {post?.tags && (
                <div className="flex gap-1">
                  {post?.tags.slice(0, 2).map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="text-xs text-slate-400 uppercase py-0.5 px-1.5 bg-slate-800 rounded-md"
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              )} */}
            </div>
            <div className="flex gap-4 text-xs">
              <span>DATE</span>
            </div>
          </div>
      {/* 
<motion.div style={{y}}>     
</motion.div> */}
      {img &&
        <BlendImage
          className="img-cover"
          alt={`Cover Image for ${img.title}`}
          src={img.url}
        />
      }
    </div>
  );
}
