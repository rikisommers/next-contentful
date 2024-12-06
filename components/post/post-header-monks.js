import { useContext, useState } from "react";
import { RouteContext } from "../../components/context/routeContext";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import PostIntro from "./post-intro";
import PostIntroMonks from "./post-intro-monks";
import {
  AnimStyle,
} from "../motion/animated-text";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { ClipContainer } from "../motion/clippath-container";
import { ClipPathElement } from "../motion/clippath-element"
export default function PostHeaderMonks({ title, subtitle ,img , children}) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <div className="pt-10">
        {/* <div style={{backgroundColor:'var(--accent)'}}>
        </div> */}
        {img.url && 
        
          <ClipContainer>
            <PostTileImgAlt img={img} />
       
            </ClipContainer>
        }

        {children}
        <div className="py-8">
          <PostIntro title={title} content={subtitle}/>
        </div>
    </div>
  );
}
