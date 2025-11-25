"use client";

import React, { useEffect, useState } from "react";
import { splitText, animate, stagger } from "../../utils/motion";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";

/**
 * @component
 * @description Text that animates character by character in a linear fashion.
 * @category animations
 * @param {string} content - The text content to animate. Supports markdown-like syntax for bold and italics.
 * @param {number} delay - The delay in seconds before the animation starts.
 * @param {string} highlight - The highlight style to apply to emphasized text.
 * @example
 * // Linear Text Animation
 * <TextAnimLinear 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   delay={0}
 *   highlight="background"
 * />
 */
export const TextAnimLinear = ({ content, delay}) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const { chars } = splitText(containerRef.current);
    animate(chars, { opacity: [0,1], y: [10,0] }, { delay, delayChildren: stagger(0.02) });
  }, [content, delay]);

  return (
    <div ref={containerRef} style={{ color: 'var(--heading-color)' }}>
      {content}
    </div>
  );
};