import { useContext, useState, useRef } from "react";
import { RouteContext } from "../../components/context/routeContext";
import { ClipContainer } from "../motion/clippath-container";

import PostIntroRiki from "./post-intro-riki";
import BlendImage from "../image/blend-image";
import { useThemeContext } from "../context/themeContext";

export default function PostHeaderMonks({ title, subtitle, img, tags }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");
  const { currentTheme } = useThemeContext();


  return (

    <ClipContainer>
    {/*grid  grid-rows-[48px_48px_1fr_1fr_1fr_48px_48px] grid-cols-12 */}
    <div className="relative top-0 left-0 z-50 w-screen h-dvh"
      style={{
        backgroundColor: "var(--accent-pri)"
      }}
    >

      { img && (
          <BlendImage
            className="absolute z-10 w-full h-full img-cover"
            alt={`Cover Image for ${img?.title}`}
            src={img.url}
          />
        )}

        <div className="absolute bottom-0 w-full p-16">
      <PostIntroRiki title={title} subtitle={subtitle} className="z-50" />
            {tags && (
            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag, index) => {
                return (
                  <div key={index} className="px-2 py-1 text-xs border border-solid rounded-full"
                  style={{
                   borderColor:"var(--text-color)",
                   backgroundColor: "var(--body-background-color)",
                   color:"var(--text-color)"
                  }}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
          </div>
    </div>
  </ClipContainer>


  );
}
