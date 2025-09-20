"use client";

import React from "react";
import PropTypes from "prop-types";

import { TextAnimLinePosUp } from "./text-anim-line-pos-up";
import { TextAnimLinear } from "./text-anim-linear";
import { TextAnimRandom } from "./text-anim-random";
import { TextAnimBlur } from "./text-anim-blur";
import { TextAnimLineFadeInUp } from "./text-anim-line-fade-in-up";
import { TextAnimWordMask } from "./text-anim-word-mask";
import { TextAnimNone } from "./text-anim-none";
import { TextAnimCode } from "../motion/text-anim-code";
import { TextAnimFigma } from "./text-anim-figma";
import { useThemeContext } from "../context/themeContext";
import { TextAnimNavigators } from "./text-anim-navigators";

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
  FIGMA: "figma",
  LINESUP: "linesup",
  LINEPOSUP: "lineposup",
  LINEFADEINUP: "linefadeinup",
  CHARFADE: "charfade",
  CHARBLUR: "charblur",
  CHARRANDOM: "charrandom",
  CHARCODE: "charcode",
  WORDMASK: "wordmask",
  NAVIGATORS: "navigators",
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

const AnimatedText = ({ type, highlight, content, delay, align }) => {
  //    return getAnimatedComponent(content, delay);
  const { currentTheme } = useThemeContext();
  const highlight2 = currentTheme.data.textHighlight;

  //    console.log('------',currentTheme);

  if (content) {
    switch (type) {
      case AnimStyle.NAVIGATORS:
        return <TextAnimNavigators content={content} highlight={highlight2} align={align} />
      case AnimStyle.FIGMA:
        return <TextAnimFigma content={content} highlight={highlight2} />;
      case AnimStyle.NONE:
        return <TextAnimNone content={content} highlight={highlight2} />;
      case AnimStyle.LINESUP:
        return (
          <TextAnimLinePosUp
            theme={currentTheme}
            content={content}
            delay={delay}
            highlight={highlight2}
            animateWhenInView={true}
            repeatWhenInView={true}
          />
        );
      case AnimStyle.WORDMASK:
        return (
          <TextAnimWordMask
            content={content}
            delay={delay}
            highlight={highlight2}
          />
        );
      case AnimStyle.LINEFADEINUP:
        return (
          <TextAnimLineFadeInUp
            theme={currentTheme}
            delay={delay}
            highlight={highlight2}
            content={content}
          />
        );
      case AnimStyle.CHARFADE:
        return (
          <TextAnimLinear
            delay={delay}
            highlight={highlight2}
            content={content}
          />
        );
      case AnimStyle.CHARBLUR:
        return (
          <TextAnimBlur
            delay={delay}
            highlight={highlight2}
            content={content}
          />
        );

      case AnimStyle.CHARRANDOM:
        return <TextAnimRandom content={content} />;
      case AnimStyle.CHARCODE:
        return <TextAnimCode content={content} />;
      default:
        return (
          <TextAnimLineUp
            content={content}
            delay={delay}
            highlight={highlight2}
            clipText={false}
          />
        );
    }
  }
};

AnimatedText.propTypes = {
  type: PropTypes.oneOf(Object.values(AnimStyle)),
  content: PropTypes.string.isRequired,
};

export default AnimatedText;
export { AnimStyle, HighlightStyle, AnimTextOrder };
