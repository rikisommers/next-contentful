import { useContext, useState } from "react";
import { RouteContext } from "../../components/context/routeContext";
import PostIntroRiki from "./post-intro-riki";
import BlendImage from "../image/blend-image";

export default function PostHeaderRiki({ title, subtitle, content, img }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");


  return (
    <>
      <div className="px-16 pt-64 pb-8 xl:px-0 ">
        <PostIntroRiki title={title} subtitle={subtitle} />
      </div>

      <div className="relative flex-col flex-grow mx-16 overflow-hidden rounded-lg first-line:flex xl:mx-0 img-post">
        {/* <div className="absolute top-0 left-0 z-10 flex items-start justify-between w-full h-full gap-4 px-4 py-4 text-white ">
          <div className="flex items-center gap-4"></div>
          <div className="flex gap-4 text-xs">
            <span>DATE</span>
          </div>
        </div> */}

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
