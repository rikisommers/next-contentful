import { useContext, useState } from "react";
import { RouteContext } from "../../components/context/routeContext";
import PostIntro from "./post-intro";
import BlendImage from "../image/blend-image";

export default function PostHeader({ title, subtitle, img }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>
    
    <div className="pt-64 pb-8">
      <PostIntro title={title} content={subtitle} />
      </div>
      
      <div className="relative flex flex-col flex-grow overflow-hidden rounded-lg img-post">
        <div className="absolute top-0 left-0 z-10 flex items-start justify-between w-full h-full gap-4 px-4 py-4 text-white ">
          <div className="flex items-center gap-4"></div>
          <div className="flex gap-4 text-xs">
            <span>DATE</span>
          </div>
        </div>

        {img && (
          <BlendImage
            className="img-cover"
            alt={`Cover Image for ${img.title}`}
            src={img.url}
          />
        )}
      </div>
    </>
  );
}
