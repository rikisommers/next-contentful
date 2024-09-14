"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {TextAnimLineUp} from "./text-anim-line-up";
import { TextAnimLinePosUp } from "./text-anim-line-pos-up";
import {TextAnimLinear} from "./text-anim-linear";
import {TextAnimRandom} from "./text-anim-random";
import { TextAnimBlur } from "./text-anim-blur";
import { TextAnimLineFadeIn } from "./text-anim-line-fade";
import TextAnimCode from "../motion/text-anim-code";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';
// import TextAnimCharBlur from "./text-anim-char-blur";  // Uncomment when implemented

const HighlightStyle = {
    NONE: "none",
    TEXT: "text",
    BACKGROUND: "background",
    HIGHLIGHT: "highlight",
    UNDERLINE: "underline",
};



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



const getAnimatedComponent = (type,  highlight,content,  delay) => {
    if(content){
    switch (type) {
        case AnimStyle.LINESUP:
            return <TextAnimLinePosUp 
            content={content} 
            delay={delay}
            highlight={highlight}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEPOSUP:
            return <TextAnimLineUp
            content={content}
            delay={delay}
            highlight={highlight}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEFADEIN:
            return <TextAnimLineFadeIn 
            delay={delay}
            highlight={highlight}
            content={content} />;
        case AnimStyle.CHARFADE:
            return <TextAnimLinear 
            delay={delay}
            highlight={highlight}
            content={content} />;
        case AnimStyle.CHARBLUR:
            return <TextAnimBlur 
            delay={delay}
            highlight={highlight}
            content={content} />;
        case AnimStyle.CHARRANDOM:
            return <TextAnimRandom content={content} />;
        case AnimStyle.CHARCODE:
            return <TextAnimCode content={content} />;
        default:
            return <TextAnimLineUp 
            content={content} 
            delay={delay}
            highlight={highlight}
            clipText={false} />;
    }
    }
};

const AnimatedText = ({ type = AnimStyle.LINEPOSUP, content ,delay}) => {

    const [highlight, setHighlight] = useState('text'); // Default value

  useEffect(() => {
    const getTextHighlight = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return computedStyle.getPropertyValue('--text-highlight').trim() || 'text';
    };

    setHighlight(getTextHighlight());

    // Optional: Add a MutationObserver to watch for changes in the data-theme attribute
    const observer = new MutationObserver(() => {
      setHighlight(getTextHighlight());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);



    return getAnimatedComponent(type, highlight, content, delay);
};

AnimatedText.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyle)),
    content: PropTypes.string.isRequired,
};

export default AnimatedText;
export { AnimStyle,HighlightStyle,AnimTextOrder };