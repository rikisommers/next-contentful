import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";
import HeroBackground from "../background/hero-background";
import { ClipContainer } from "../motion/clippath-container";
import { ScaleContainer } from "../motion/scale-container";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import {
  getGridPositionClass,
  getResponsiveGridPositionClass,
  getResponsiveGridCSSVars,
  generateResponsiveGridCSS,
  getTextAlignClass,
} from "../../utils/styleUtils";
import Message, { MessageType } from "../base/message/message";

const getHeightClass = (heightVh) => {
  return `h-[${heightVh}vh]`;
};

/**
 * Hero block component that renders a full-width hero section with animated text,
 * background imagery, and optional info messages
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {string} props.title - Main hero heading text, rendered with animated text effects
 * @param {string} props.content - Subtitle or description text below the heading
 * @param {string} props.tag - Category or label badge displayed above the title
 * @param {Object} props.image - Hero background image object from Contentful
 * @param {Object} props.infoMessage - Optional info message displayed in the hero
 * @param {string} props.infoMessage.title - Info message title
 * @param {string} props.infoMessage.content - Info message body text
 * @param {boolean} props.infoMessage.dismiss - Whether the message can be dismissed
 * @example
 * // Hero with title, content, and tag
 * <BlockHero
 *   title="Welcome to the Portfolio"
 *   content="Explore my latest design work and case studies"
 *   tag="Featured"
 *   image={{ url: "https://images.ctfassets.net/hero.jpg", title: "Hero Image" }}
 * />
 * @example
 * // Hero with info message
 * <BlockHero
 *   title="Project Showcase"
 *   content="A deep dive into the design process"
 *   tag="Case Study"
 *   image={{ url: "https://images.ctfassets.net/project.jpg", title: "Project" }}
 *   infoMessage={{
 *     title: "New Release",
 *     content: "This project was recently updated.",
 *     dismiss: true,
 *   }}
 * />
 */
export default function BlockHero({ title, content, tag, image, infoMessage }) {
  const { currentTheme } = useThemeContext();
  const full = false;

  return (
    <div className="relative max-lg:h-[100vh] overflow-hidden">
      {/* Inject responsive grid CSS */}
      <style>{`
        ${generateResponsiveGridCSS("text")}
        ${generateResponsiveGridCSS("subtext")}
        ${generateResponsiveGridCSS("bg")}
      `}</style>


      {/* <ScaleContainer>  </ScaleContainer> */}
      {/* Debug panel for responsive values */}
      {/* <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 text-xs font-mono z-[9999] rounded max-w-lg">
          <div>Text: SM:{currentTheme.data.heroTextPositionSm || 'unset'} MD:{currentTheme.data.heroTextPositionMd || 'unset'} LG:{currentTheme.data.heroTextPositionLg || 'unset'}</div>
          <div>Span: SM:{currentTheme.data.heroTextColSpanSm || 'unset'} MD:{currentTheme.data.heroTextColSpanMd || 'unset'} LG:{currentTheme.data.heroTextColSpanLg || 'unset'}</div>
          <div className="pt-1 mt-1 border-t border-gray-500">
            Classes: {(() => {
              if (typeof window !== 'undefined' && window.debugGridClasses?.text) {
                return window.debugGridClasses.text;
              }
              return 'loading...';
            })()}
          </div>
          <div className="mt-1 w-4 h-4 bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-purple-500"></div>
        </div> */}

      <div
        className={`o-edit-outline ${getHeightClass(
          currentTheme.data.heroHeight,
        )}  ${
          currentTheme.data.fontScale === "fluid" ? "fluid-type" : ""
        } relative grid grid-highlight grid-cols-12 grid-rows-12 justify-end left-0 top-0 z-50 w-full gap-0 pointer-events-none `}
      >
        



        <div
          className={`o-edit-outline flex flex-col z-10 items-${
            currentTheme.data.heroTextAlign
          } ${getResponsiveGridCSSVars("text")}`}
        >
          {tag && (
            <div
              className={`${currentTheme.data.heroLabelTheme === 'badge' ?  'px-2 py-1  ml-2' : '' } block  mb-8 text-xs font-medium uppercase rounded-full pointer-events-auto w-fit`}
              style={currentTheme.data.heroLabelTheme === 'badge' ? {
                color: "var(--text-color-inv)",
                backgroundColor: "var(--accent-pri)",
              } : {
                color: "var(--subtext-color)",
              }}
              role="banner"
              aria-label={`Page category: ${tag}`}
            >
              {tag}
            </div>
          )}

          <h1
            className={`text-4xl !text-[var(--text-color-inv)] leading-normal pointer-events-auto text-balance`}
            tabIndex="0"
            aria-describedby={content ? "hero-content" : undefined}
          >
            {title && (
              <AnimatedText
                align={currentTheme.data.heroTextAlign}
                content={title}
                type={currentTheme.data.textAnimation}
                delay={AnimTextOrder.ONE}
              />
            )}
          </h1>
        </div>

        <div
          className={`z-10 o-edit-outline h-fit ${getResponsiveGridCSSVars("subtext",
          )}`}
        >
          {/* <figcaption className="flex absolute right-4 bottom-4 flex-col gap-4 max-w-[200px] bg-[var(--background-color)]/40  rounded-lg shadow-2xl p-4">
          <p className="text-[var(--text-color)] text-xs">{data.title}</p>
          </figcaption> */}
          <p
            id="hero-content"
            className={`text-${currentTheme.data.heroSubTextAlign} text-sm font-normal pointer-events-auto text-balance text-[var(--subtext-color)]`}
            role="doc-subtitle"
            aria-label="Hero section description"
          >
            {content && (
              <AnimatedText
                type={currentTheme.data.textAnimationSec}
                content={content}
                delay={AnimTextOrder.THREE}
              />
            )}
          </p>

          {infoMessage && (
            <div class="absolute right-6 bottom-6">
              <Message
                type={MessageType.DEFAULT}
                title={infoMessage.title}
                content={infoMessage.content}
                dismiss={infoMessage.dismiss}
              />
            </div>
          )}



        </div>


        <div className={`z-0 not-first:overflow-hidden relative rounded-${currentTheme.data.heroBgBorderRadius} shadow-${currentTheme.data.heroBgShadow} ${getResponsiveGridCSSVars("bg")}`}>
            <HeroBackground
              heroBackground={currentTheme.data.heroBackground}
              image={image}
              theme={currentTheme}
            />
        </div>
        
      </div>
    </div>
  );
}

BlockHero.propTypes = {
  /** Main hero heading text */
  title: PropTypes.string,
  /** Subtitle or description text */
  content: PropTypes.string,
  /** Category or label badge text */
  tag: PropTypes.string,
  /** Hero background image object from Contentful */
  image: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }),
  /** Optional info message displayed in the hero section */
  infoMessage: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    dismiss: PropTypes.bool,
  }),
};
