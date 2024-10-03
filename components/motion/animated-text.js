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
import { ThemeProvider, useThemeContext } from "../themeContext";


const HighlightStyle = {
    NONE: "none",
    TEXT: "text",
    BACKGROUND: "background",
    HIGHLIGHT: "highlight",
    UNDERLINE: "underline",
};


//TODO: This needs to be defined once somwhere and imported to themeEditor and here
const AnimStyle = {
    NONE: "none",
    LINESUP: "linesup",
    LINEPOSUP: "lineposup",
    LINEFADEIN: "linefadein",
    CHARFADE: "charfade",
    CHARBLUR: "charblur",
    CHARRANDOM: "charrandom",
    CHARCODE: "charcode",
};

// none: "none",
// linesfadeup:'fadeup',
// linesmoveup:'fadeup',
// charsfadein:'fadechars',
// charsblurin: 'blurchars',

const AnimTextOrder = {
    ONE: 0,
    TWO: 0.3,
    THREE: 0.6,
    FOUR: 0.9,
    FIVE: 1.2,
};



const getAnimatedComponent = (type, highlight, content,  delay) => {

    const { currentTheme } = useThemeContext();
    const type2 = currentTheme.textAnimation
    const highlight2 = currentTheme.textHighlight

    console.log('----',type2)
    console.log('---',highlight2)
//    console.log('------',currentTheme);

    if(content){
    switch (type2) {
        case AnimStyle.NONE:
            return <>{content}</>;
        case AnimStyle.LINESUP:
            return <TextAnimLinePosUp 
            content={content} 
            delay={delay}
            highlight={highlight2}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEPOSUP:
            return <TextAnimLineUp
            content={content}
            delay={delay}
            highlight={highlight2}
            animateWhenInView={true}
            repeatWhenInView={true}
            />;
        case AnimStyle.LINEFADEIN:
            return <TextAnimLineFadeIn 
            delay={delay}
            highlight={highlight2}
            content={content} />;
        case AnimStyle.CHARFADE:
            return <TextAnimLinear 
            delay={delay}
            highlight={highlight2}
            content={content} />;
        case AnimStyle.CHARBLUR:
            return <TextAnimBlur 
            delay={delay}
            highlight={highlight2}
            content={content} />;
        case AnimStyle.CHARRANDOM:
            return <TextAnimRandom content={content} />;
        case AnimStyle.CHARCODE:
            return <TextAnimCode content={content} />;
        default:
            return <TextAnimLineUp 
            content={content} 
            delay={delay}
            highlight={highlight2}
            clipText={false} />;
    }
    }
};

const AnimatedText = ({type, highlight, content ,delay}) => {
    
//TODO: make this a util
//     const [highlight, setHighlight] = useState('text'); // Default value

//   useEffect(() => {
//     const getTextHighlight = () => {
//       const root = document.documentElement;
//       const computedStyle = getComputedStyle(root);
//       return computedStyle.getPropertyValue('--text-highlight').trim() || 'text';
//     };

//     setHighlight(getTextHighlight());

//     // Optional: Add a MutationObserver to watch for changes in the data-theme attribute
//     const observer = new MutationObserver(() => {
//       setHighlight(getTextHighlight());
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['data-theme']
//     });

//     return () => observer.disconnect();
//   }, []);



//    return getAnimatedComponent(content, delay);
const { currentTheme } = useThemeContext();
const type2 = currentTheme.textAnimation
const highlight2 = currentTheme.textHighlight

console.log('----',type2)
console.log('---',highlight2)
//    console.log('------',currentTheme);

if(content){
switch (type2) {
    case AnimStyle.NONE:
        return <>{content}</>;
    case AnimStyle.LINESUP:
        return <TextAnimLinePosUp 
        content={content} 
        delay={delay}
        highlight={highlight2}
        animateWhenInView={true}
        repeatWhenInView={true}
        />;
    case AnimStyle.LINEPOSUP:
        return <TextAnimLineUp
        content={content}
        delay={delay}
        highlight={highlight2}
        animateWhenInView={true}
        repeatWhenInView={true}
        />;
    case AnimStyle.LINEFADEIN:
        return <TextAnimLineFadeIn 
        delay={delay}
        highlight={highlight2}
        content={content} />;
    case AnimStyle.CHARFADE:
        return <TextAnimLinear 
        delay={delay}
        highlight={highlight2}
        content={content} />;
    case AnimStyle.CHARBLUR:
        return <TextAnimBlur 
        delay={delay}
        highlight={highlight2}
        content={content} />;
    case AnimStyle.CHARRANDOM:
        return <TextAnimRandom content={content} />;
    case AnimStyle.CHARCODE:
        return <TextAnimCode content={content} />;
    default:
        return <TextAnimLineUp 
        content={content} 
        delay={delay}
        highlight={highlight2}
        clipText={false} />;
}
}

};

AnimatedText.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyle)),
    content: PropTypes.string.isRequired,
};

export default AnimatedText;
export { AnimStyle,HighlightStyle,AnimTextOrder };