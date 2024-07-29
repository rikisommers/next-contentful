import React from "react";
import PropTypes from "prop-types";
import {TextAnimLineUp} from "./text-anim-line-up";
import { TextAnimLinePosUp } from "./text-anim-line-pos-up";
import {TextAnimLinear} from "./text-anim-linear";
import {TextAnimRandom} from "./text-anim-random";
import { TextAnimBlur } from "./text-anim-blur";
import { TextAnimLineFadeIn } from "./text-anim-line-fade";
import TextAnimCode from "../motion/text-anim-code";

// import TextAnimCharBlur from "./text-anim-char-blur";  // Uncomment when implemented

const AnimStyle = {
    LINESUP: "lines-up",
    LINEPOSUP: "line-pos-up",
    LINEFADEIN: "line-fade-in",
    CHARFADE: "char-fade",
    CHARBLUR: "char-blur",
    CHARRANDOM: "char-random",
    CHARCODE: "char-code",
};

const getAnimatedComponent = (type, content) => {
    if(content){
    switch (type) {
        case AnimStyle.LINESUP:
            return <TextAnimLinePosUp content={content} 
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEPOSUP:
            return <TextAnimLineUp content={content}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEFADEIN:
            return <TextAnimLineFadeIn content={content} />;
        case AnimStyle.CHARFADE:
            return <TextAnimLinear content={content} />;
        case AnimStyle.CHARBLUR:
            return <TextAnimBlur content={content} />;
        case AnimStyle.CHARRANDOM:
            return <TextAnimRandom content={content} />;
        case AnimStyle.CHARCODE:
            return <TextAnimCode content={content} />;
        default:
            return <TextAnimLineUp content={content} clipText={false} />;
    }
    }
};

const AnimatedText = ({ type = AnimStyle.LINEPOSUP, content }) => {
    return getAnimatedComponent(type, content);
};

AnimatedText.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyle)),
    content: PropTypes.string.isRequired,
};

export default AnimatedText;
export { AnimStyle };