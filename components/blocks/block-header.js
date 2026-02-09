import React from "react";
import PropTypes from "prop-types";
import { useThemeContext } from "../context/themeContext";
import { getResponsiveGridPositionClass, getTextAlignClass } from "../../utils/styleUtils";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";

const getHeightClass = (heightVh) => {
  return `h-[${heightVh || 33}vh]`;
};

/**
 * Page header block that displays a title and content with animated text,
 * responsive grid positioning, and theme-driven styling.
 * @component
 * @category blocks
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data for the header block
 * @param {string} [props.data.title] - Small subtitle displayed above the main content
 * @param {string} [props.data.content] - Main heading content displayed as h2
 * @param {boolean} [props.data.primaryPageHeader] - Whether this is the primary page header (affects height)
 * @example
 * // Basic header with title and content
 * <BlockHeader
 *   data={{
 *     title: "About Us",
 *     content: "Building the future of web experiences"
 *   }}
 * />
 * @example
 * // Header with only main content, no subtitle
 * <BlockHeader
 *   data={{
 *     content: "Welcome to our platform"
 *   }}
 * />
 */
export default function BlockHeader({ data }) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={`relative w-full flex items-end ${getHeightClass(currentTheme.data.headerHeight)}`}>
      <div className="w-full">
        <div
          className={`grid grid-cols-12 gap-6 content-end items-end w-full`}
        >
          <div
            className={`o-edit-outline flex flex-col items-start ${(() => {
              const positions = {
                sm: currentTheme.data.headerTextPositionSm || currentTheme.data.headerTextPosition || '0-0',
                md: currentTheme.data.headerTextPositionMd || currentTheme.data.headerTextPosition || '0-0',
                lg: currentTheme.data.headerTextPositionLg || currentTheme.data.headerTextPosition || '0-0',
                xl: currentTheme.data.headerTextPositionXl || currentTheme.data.headerTextPosition || '0-0',
              };
              const colSpans = {
                sm: currentTheme.data.headerTextColSpanSm || 3,
                md: currentTheme.data.headerTextColSpanMd || 3,
                lg: currentTheme.data.headerTextColSpanLg || 3,
                xl: currentTheme.data.headerTextColSpanXl || 3,
              };
              const gridClasses = getResponsiveGridPositionClass(positions, colSpans);
              return gridClasses;
            })()}`}
          >
            {data.title && (
              <h4
                className={`mb-4 text-xs font-normal ${getTextAlignClass(currentTheme.data.headerTextAlign)}`}
                style={{ color: 'var(--subtext-color)' }}
              >
                <AnimatedText
                  content={data.title}
                  type={currentTheme.data.textAnimationSec}
                  delay={AnimTextOrder.TWO}
                />
              </h4>
            )}

            {data.content && (
              <h2 className={`leading-normal font-normal text-2xl lg:text-4xl text-balance ${getTextAlignClass(currentTheme.data.headerTextAlign)}`}>
                <AnimatedText
                  content={data.content}
                  type={currentTheme.data.textAnimation}
                  delay={AnimTextOrder.TWO}
                />
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

BlockHeader.propTypes = {
  /** Contentful entry data for the header block */
  data: PropTypes.shape({
    /** Small subtitle displayed above the main content */
    title: PropTypes.string,
    /** Main heading content displayed as h2 */
    content: PropTypes.string,
    /** Whether this is the primary page header */
    primaryPageHeader: PropTypes.bool,
  }),
};
    // <div
    //   className={`flex flex-col justify-end relative px-8 ${data.primaryPageHeader === true ? "h-vhh" : "h-vh33"}`}
    // >
    //   <div className="grid grid-cols-12 gap-6 content-end items-end w-full">
    //     <div className="col-span-12 md:col-span-8 lg:col-span-8">
    //       {data.title && (
    //         <h4
    //           className="mb-4 text-xs font-normal"
    //           style={{color:'var(--subtext-color)'}} 
    //         >
    //           <AnimatedText
    //             content={data.title}
    //             type={currentTheme.data.textAnimationSec}
    //             delay={AnimTextOrder.TWO}
    //           >
    //           </AnimatedText>
    //         </h4>
    //       )}

    //       {data.content && (
    //         <h2 className="leading-normal font-normal ~text-2xl/4xl text-balance">
             
    //           <AnimatedText
    //             content={data.content}
    //             type={'none'}
    //             delay={AnimTextOrder.TWO}
    //           />
    //         </h2>
    //       )}


    //     </div>
    //   </div>
    // </div>