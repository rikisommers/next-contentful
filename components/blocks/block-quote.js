"use client";

import React from "react";
import PropTypes from "prop-types";
import AnimatedText from "../motion/animated-text";
import { useThemeContext } from "../context/themeContext";
import Link from "next/link";
import Button from "../base/button/button";
import ButtonWipe from "../base/button/button-wipe"
import ButtonMonks from "../base/button/button-monks"
import ButtonSwap from "../base/button/button-swap"
import { ButtonType,ButtonSound } from "../base/button/button.util";

/**
 * Quote block component that renders a styled blockquote with optional title,
 * animated content text, and a call-to-action button
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful quote entry data
 * @param {string} props.data.title - Quote label or attribution displayed above the quote
 * @param {string} props.data.content - The quote text, rendered with animated text effects
 * @param {string} props.data.author - Quote author name (not currently rendered but available)
 * @param {Object} props.data.authorImage - Author avatar image object (not currently rendered)
 * @param {Object} props.data.callToAction - Optional CTA link rendered as a button
 * @param {string} props.data.callToAction.title - CTA button label text
 * @param {string} props.data.callToAction.slug - CTA link destination path
 * @example
 * // Simple quote with title and content
 * <BlockQuote
 *   data={{
 *     title: "On Design",
 *     content: "Design is not just what it looks like. Design is how it works.",
 *   }}
 * />
 * @example
 * // Quote with call-to-action button
 * <BlockQuote
 *   data={{
 *     title: "Client Testimonial",
 *     content: "Working with this team transformed our product experience.",
 *     author: "Jane Smith",
 *     callToAction: {
 *       title: "View Case Study",
 *       slug: "/work/case-study",
 *     },
 *   }}
 * />
 */
export const BlockQuote = ({ data }) => {
  const { currentTheme } = useThemeContext();
  
  return (
    <blockquote className={`p-10 mx-auto flex flex-col gap-4 max-w-prose ${currentTheme.data.fontScale === 'fluid' ? 'fluid-type' : ''} bg-[var(--surface1)]/20 rounded-2xl text-${currentTheme.data.blockquoteTextAlign}`}>
        {data.title && (
          <span className="text-sm text-[var(--subtext-color)]">
            {/* <AnimatedText
              type={AnimStyle.LINESUP}
              content={data.title}
            /> */}
            {data.title}
          </span>
        )}

        {data.content && (
          <h3 className="text-2xl font-light leading-relaxed text-balance text-[var(--text-color)]">
            <AnimatedText
              align={currentTheme.data.blockquoteTextAlign}
              type={currentTheme.data.textAnimation}
              content={data.content}
            />
           {/* {data.content} */}
          </h3>

        )}
        {data.callToAction && (
          <div className="flex justify-start">
            <Link href={data.callToAction.slug}>
              <Button label={data.callToAction.title} type={ButtonType.DEFAULT} sound={ButtonSound.CLICK} />
            </Link>
          </div>
        )}
    </blockquote>
  );
};

BlockQuote.propTypes = {
  /** Contentful quote entry data */
  data: PropTypes.shape({
    /** Quote label or attribution */
    title: PropTypes.string,
    /** The quote text content */
    content: PropTypes.string,
    /** Quote author name */
    author: PropTypes.string,
    /** Author avatar image object */
    authorImage: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
    /** Optional call-to-action link */
    callToAction: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
    }),
  }),
};

export default BlockQuote;
