import { useContext, useState, useRef } from "react";
import { RouteContext } from "../../components/context/routeContext";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import PostIntro from "./post-intro";
import PostIntroMonks from "./post-intro-monks";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { ClipContainer } from "../motion/clippath-container";
import { ClipPathElement } from "../motion/clippath-element";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useThemeContext } from "../context/themeContext";

export default function PostHeaderMonks({ title, subtitle, img, children }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");
  const { currentTheme } = useThemeContext();
  const heroRef = useRef(null);
  const post1Ref = useRef(null);
  const pos2Ref = useRef(null);

  const { scrollYProgress: scrollContent } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
    onChange: (latest) => {
      console.log("Latest scroll position:", latest);
    },
  });

  return (
    <div className="relative pt-10" ref={heroRef}>
      {/* <div style={{backgroundColor:'var(--accent)'}}>
        </div> */}
      {img.url && (
                // <ClipContainer>

        <div className="relative">
          <motion.div
            className="absolute z-40 bottom-5 left-5"
            // animate={{
            //   y: useTransform(scrollContent, [0, 1], [1, 200]),
            // }}
          >
            <h2
              ref={post1Ref}
              className="mx-auto text-6xl leading-normal low-root"
              style={{
                color: "var(--text-color)",
              }}
            >
              <span className="font-medium">{title}</span> •
            </h2>
          </motion.div>
          <PostTileImgAlt img={img} />
        </div>
      )}

      {children}
      <div className="py-8">
        <div className="grid items-end content-end w-full grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-8">
            <h1
              className="leading-normal ~text-2xl/6xl text-balance"
              ref={pos2Ref}
            >
              <AnimatedText
                content={title}
                type={currentTheme.textAnimation}
                delay={AnimTextOrder.ONE}
              />
              <AnimatedText
                type={AnimStyle.LINEFADEIN}
                content={subtitle}
                delay={AnimTextOrder.THREE}
              />
            </h1>
          </div>
          <div className="col-span-12 text-left md:col-span-8 lg:col-span-4 text-balance">
            <h4 className="text-sm font-normal">
              <AnimatedText
                type={currentTheme.textAnimationSec}
                content={subtitle}
                delay={AnimTextOrder.THREE}
              />
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
