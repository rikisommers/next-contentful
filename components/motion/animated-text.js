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

const AnimTextOrder = {
    ONE: 0,
    TWO: 0.3,
    THREE: 0.6,
    FOUR: 0.9,
    FIVE: 1.2,
};



const getAnimatedComponent = (type, content ,delay) => {
    if(content){
    switch (type) {
        case AnimStyle.LINESUP:
            return <TextAnimLinePosUp 
            content={content} 
            delay={delay}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEPOSUP:
            return <TextAnimLineUp
            content={content}
            delay={delay}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEFADEIN:
            return <TextAnimLineFadeIn 
            delay={delay}
            content={content} />;
        case AnimStyle.CHARFADE:
            return <TextAnimLinear 
            delay={delay}
            content={content} />;
        case AnimStyle.CHARBLUR:
            return <TextAnimBlur 
            delay={delay}
            content={content} />;
        case AnimStyle.CHARRANDOM:
            return <TextAnimRandom content={content} />;
        case AnimStyle.CHARCODE:
            return <TextAnimCode content={content} />;
        default:
            return <TextAnimLineUp 
            content={content} 
            delay={delay}
            clipText={false} />;
    }
    }
};

const AnimatedText = ({ type = AnimStyle.LINEPOSUP, content ,delay}) => {
    return getAnimatedComponent(type, content, delay);
};

AnimatedText.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyle)),
    content: PropTypes.string.isRequired,
};

export default AnimatedText;
export { AnimStyle,AnimTextOrder };