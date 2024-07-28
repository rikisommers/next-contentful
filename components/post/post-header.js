import FadeInWhenVisible from "../utils/fade-in-visible";
import { useContext, useState } from "react";
import { RouteContext } from "../../components/routeContext";
import { motion } from "framer-motion";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import AnimatedText,{AnimStyle} from "../motion/animated-text";

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
              <AnimatedText type={AnimStyle.CHARCODE} content={content.title}/>
            </h1>
          )}
        </div>
        <div className="col-span-12 text-left md:col-span-8 lg:col-span-6 lg:text-right text-balance">
          <h2 className="text-xl">
            {content?.subtitle && (
              <AnimatedText type={AnimStyle.LINEFADEIN} content={content.subtitle}/>
            )}
          </h2>
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
