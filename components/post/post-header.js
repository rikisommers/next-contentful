import CoverImage from "../image/cover-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouteContext } from "../../components/routeContext";
import TextAnimation from "../utils/text-animation";
export default function PostHeader({
  title,
  img,
  subtitle,
  tags,
  client,
  role,
  duration,
  enabled
}) {


  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState('');
  const [destRoute, setDestRoute] = useState('');

  return (
      <>
      <FadeInWhenVisible>
        {/* pt-32 pb-16 */}
      <div className="grid grid-cols-12 gap-3 post-header">
        <div className="col-span-6">
          <p className="text-xs text-slate-400">{duration && duration}</p>
          {/* <h1 className="text-7xl">{title && title}</h1> */}
          <TextAnimation content={title}/>
        </div>
      </div>
      </FadeInWhenVisible>

      <div className="h-vhh rounded-xl overflow-hidden bg-slate-100">
        <CoverImage title={img && img.title} url={img && img.url} layout="landscape" />
      </div>
      
      </>
  );
}
