import { useContext, useState } from "react";
import { RouteContext } from "../../components/context/routeContext";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import PostIntro from "./post-intro";
import {
  AnimStyle,
} from "../motion/animated-text";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function    PostHeader({ content }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>

        {/* <div style={{backgroundColor:'var(--accent)'}}>
        </div> */}
        <PostIntro title={content.title} content={content.subtitle}/>

        <PostTileImgAlt post={content} />

        
      {/* <AnimatedElement type={AnimStyle.FADEIN}> */}
        <PostDetails post={content}></PostDetails>
      {/* </AnimatedElement> */}
    </>
  );
}
