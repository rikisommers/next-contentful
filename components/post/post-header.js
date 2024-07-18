import CoverImage from "../image/cover-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useContext, useState, useEffect } from "react";
import { RouteContext } from "../../components/routeContext";
import TextAnimation from "../utils/text-animation";
import { motion, cubicBezier } from "framer-motion";
import PostDetails from "./post-details";
import BlendImage from "../image/blend-image";
import PostTileImgAlt from "./post-tile-img-alt";
import BlockQuote from "../blocks/block-quote";
import { TextAnimRandom } from "../rich-text/text-anim-random";
import { TextSubtitle } from "../rich-text/text-subtitle";
import TextAnimationChar from "../rich-text/text-anim-char";
import TextAnimCode from "../rich-text/text-anim-code";

export default function PostHeader({ content }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>
      <div className="grid items-end content-end grid-cols-12 gap-4 pb-10 mt-48 lg:gap-8 ">
      <div className="col-span-12 md:col-span-8 lg:col-span-6">
          {content?.title && (
            // <TextAnimation content={content?.title} color={'#000'}/>
              
            <h1 className="text-5xl">
            <TextAnimCode content={content?.title} />
            </h1>
          )}
        </div>
        <div className="col-span-12 text-xl text-left md:col-span-8 lg:col-span-6 lg:text-right text-balance">
        {content?.subtitle && (
            <TextSubtitle
              content={content.subtitle}
            
            />
          )}
        </div>
      </div>

      <motion.div
        className="relative overflow-hidden rounded-xl bg-slate-100"
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
        <FadeInWhenVisible>
          <PostTileImgAlt post={content} />
        </FadeInWhenVisible>
      </motion.div>
      <PostDetails post={content}></PostDetails>
    </>
  );
}
