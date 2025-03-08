import React, { useRef } from "react";
import ContentfulImage from "./contentful-image";
import {
  motion,
} from "../../utils/motion";;
import RollUpWhenVisible from "../utils/roll-up-visible";

export default function ContentImage({ title, url, slug, layout }) {
  const ref = useRef(null);

  const image = (
    <RollUpWhenVisible>
      <motion.div
        ref={ref}
        className="w-full bg-gray-500 relative grid aspect-[16/9] overflow-hidden flex justify-end flex flex-col align-bottom content-end"
        // initial={{ clipPath: clipPathInitial }}
        // animate={{ clipPath: clipPathInitial }}
        // exit={{ clipPath: clipPathInitial }}
        // transition={{
        //   duration: 0.6,
        //   easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        // }}
      >
        <div className="absolute w-full h-[calc(100%+200px)] -top-[10px] left-0 bg-purple-700 flex flex-col justify-center items-center">
          <motion.div className="w-full h-full py-6" >
            <ContentfulImage
              width={1920}
              height={1280}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt={`Cover Image for ${title}`}
              src={url}
            />
          </motion.div>
        </div>
      </motion.div>
    </RollUpWhenVisible>
  );

  return image;
}
