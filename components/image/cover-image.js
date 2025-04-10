"use client";

import React, { useRef } from "react";
import ContentfulImage from "./contentful-image";
import {
  motion,
  useTransform,
  useScroll,
} from "../../utils/motion";;

export default function CoverImage({ title, url, slug, layout }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  const image = (
      <motion.div
        ref={ref}
        className="flex flex-col content-end align-bottom w-full bg-gray-500 relative grid aspect-[16/9] overflow-hidden flex justify-end"
        // initial={{ clipPath: clipPathInitial }}
        // animate={{ clipPath: clipPathInitial }}
        // exit={{ clipPath: clipPathInitial }}
        // transition={{
        //   duration: 0.6,
        //   easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        // }}
      >
        <div className="bsolute w-full h-[calc(100%+200px)] -top-[10px] left-0 bg-purple-700 flex flex-col justify-center items-center">
        {/* style={{ y }} */}
          <motion.div className="w-full h-full py-6" style={{ y }} >
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
  );

  return image;
}
