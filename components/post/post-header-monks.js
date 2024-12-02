import { useContext, useState } from "react";
import { RouteContext } from "../../components/routeContext";
import PostDetails from "./post-details";
import PostTileImgAlt from "./post-tile-img-alt";
import PostIntro from "./post-intro";
import {
  AnimStyle,
} from "../motion/animated-text";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

export default function PostHeaderMonks({ title, subtitle ,img }) {
  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  return (
    <>
        {/* <div style={{backgroundColor:'var(--accent)'}}>
        </div> */}
        {img.url && 
        <PostTileImgAlt img={img} />
}
        <PostIntro title={title} content={subtitle}/>

    </>
  );
}
