import CoverImage from "../image/cover-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouteContext } from "../../components/routeContext";
import TextAnimation from "../utils/text-animation";
import { motion, cubicBezier } from "framer-motion";

export default function PostHeader({
  title,
  img,
  subtitle,
  tags,
  client,
  role,
  duration,
  enabled,
}) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>
      <FadeInWhenVisible>
        {/* pt-32 pb-16 */}
        <div className="grid grid-cols-12 gap-3 h-header items-end pb-20">

          <div className="col-span-12 md:col-span-6">
            {/* <h1 className="text-7xl">{title && title}</h1> */}
            <motion.p className="text-sm text-slate-400"
             initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.6,
              delay: 0.3,
            }}
            >
            {client && client}
            </motion.p>

            <TextAnimation content={title}/>
          </div>
          <h2 className="text-slate-500 font-light col-span-6 md:col-span-6 text-2xl text-left md:text-right text-balance">
            {subtitle}
          </h2>
      
        </div>
      </FadeInWhenVisible>

      <div className="h-vhh rounded-xl overflow-hidden bg-slate-100">
        <CoverImage
          title={img && img.title}
          url={img && img.url}
          layout="landscape"
        />
      </div>
    </>
  );
}
