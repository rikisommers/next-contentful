import { useContext, useState } from "react";
import { RouteContext } from "../../components/routeContext";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import {
  AnimStyle,
} from "../motion/animated-text";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import PostIntro from "./post-intro";

export default function    PostHeader({ content }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>
      <PostIntro title={content.title} content={content.description} />
      <AnimatedElement type={AnimStyle.FADEIN}>

        {/* <div style={{backgroundColor:'var(--accent)'}}>
        </div> */}

        <PostTileImgAlt post={content} />
      </AnimatedElement>
      {/* <AnimatedElement type={AnimStyle.FADEIN}> */}
        <PostDetails post={content}></PostDetails>
      {/* </AnimatedElement> */}
    </>
  );
}
