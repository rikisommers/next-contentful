import CoverImage from "../image/cover-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouteContext } from "../../components/routeContext";
import TextAnimation from "../utils/text-animation";
import { motion, cubicBezier } from "framer-motion";
import PostDetails from "./post-details";
import BlendImage from "../image/blend-image";
import PostTileImgAlt from "./post-tile-img-alt";
import BlockQuote from "../blocks/block-quote";
import { TextTitle } from "../rich-text/text-title";
import { TextSubtitle } from "../rich-text/text-subtitle";

export default function PostHeader({ content }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  console.log("deep", content);
  return (
    <>
      <div className="grid items-end grid-cols-12 gap-3 h-header ">
        <div className="col-span-12 mb-10 md:col-span-6">
          {content?.titlealt && (
            // <TextAnimation content={content?.title} color={'#000'}/>

            <TextTitle content={content?.titlealt} color={"text-slate-400"} />
          )}
        </div>
        <div className="col-span-6 mb-16 text-right text-gray-400 text-h3">
          {content?.contentalt && (
            <TextSubtitle
              content={content.contentalt}
              color={"text-slate-400"}
            />
          )}
        </div>
      </div>

      <motion.div
        className="relative overflow-hidden h-vhh rounded-xl bg-slate-100"
        initial={{
          y: 0,
          x: 0,
          opacity: 0,
        }}
        animate={{
          y: 0,
          x: 0,
          opacity: 1,
        }}
      >
        <FadeInWhenVisible color={content?.color}>
          <PostTileImgAlt post={content} />
        </FadeInWhenVisible>
      </motion.div>
      <PostDetails post={content}></PostDetails>
    </>
  );
}
