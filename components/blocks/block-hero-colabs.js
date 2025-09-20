import React, { useState, useEffect } from "react";
import { motion } from "../../utils/motion";
import { useThemeContext } from "../context/themeContext";
import BlendImage from "../image/blend-image";
import { ClipContainer } from "../motion/clippath-container";
import AnimatedText, { AnimTextOrder } from "../motion/animated-text";
import { getGridPositionClass } from "../../utils/styleUtils";

// Lazy imports for heavy components - only load when needed
const UnifiedCanvas = React.lazy(() => import("../background/unified-canvas"));

const getHeightClass = (height) => {
  switch (height) {
    case "full":
      return "min-h-screen";
    case "large":
      return "min-h-[80vh]";
    case "medium":
      return "min-h-[60vh]";
    case "small":
      return "min-h-[40vh]";
    default:
      return "min-h-screen";
  }
};

/**
 * @component
 * @description A hero block inspired by Colabs HomeHero_Main design with statistical highlights and CTA.
 * @category blocks
 * @param {string} title - The main hero title text.
 * @param {string} subtitle - Optional subtitle text.
 * @param {string} description - Main description content.
 * @param {string} tag - Optional category tag.
 * @param {object} image - Optional hero background image.
 * @param {object} ctaButton - Call-to-action button configuration.
 * @param {string} ctaButton.text - Button text.
 * @param {string} ctaButton.url - Button URL.
 * @param {array} statistics - Array of statistical highlights.
 * @param {object} statistics[].value - The statistic value (number or text).
 * @param {string} statistics[].label - The statistic label.
 * @param {string} statistics[].description - Optional description.
 * @param {string} [height="full"] - Hero section height.
 * @example
 * // Colabs-style Hero Block
 * <BlockHeroColabs 
 *   title="Making space for transformative innovation"
 *   description="Empowering breakthrough research and development in biotechnology"
 *   ctaButton={{
 *     text: "Join the Lab",
 *     url: "/join"
 *   }}
 *   statistics={[
 *     { value: "34", label: "Initiatives Supported" },
 *     { value: "22", label: "Impact Scholarships Awarded" },
 *     { value: "65%", label: "Of plants here double as lab assistants" }
 *   ]}
 *   height="full"
 * />
 * @exports BlockHeroColabs
 */
export default function BlockHeroColabs({ 
  title, 
  subtitle,
  description, 
  tag, 
  image,
  ctaButton,
  statistics = [],
  height = "full"
}) {
  const { currentTheme } = useThemeContext();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <ClipContainer>
      <section 
        id="main-content" 
        role="main" 
        aria-label="Hero section"
        className={`relative ${getHeightClass(height)} overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        {/* Background Image/Video/Canvas */}
        {image && (
          <div className="absolute inset-0 -z-10">
            <BlendImage
              className="object-cover w-full h-full opacity-30"
              alt={image.description || `Hero background image`}
              src={image.url}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80" />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="relative z-10 flex flex-col justify-between h-full px-6 py-12 mx-auto max-w-7xl lg:px-8">
          
          {/* Top Section - Tag and Navigation Space */}
          <div className="flex justify-between items-start">
            {tag && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
                role="banner"
                aria-label={`Page category: ${tag}`}
              >
                {tag}
              </motion.div>
            )}
          </div>

          {/* Center Content */}
          <div className="flex flex-col justify-center flex-1 py-16">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* Main Title */}
              {title && (
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl font-bold text-white leading-tight mb-6 lg:text-7xl"
                  tabIndex="0"
                  aria-describedby={description ? "hero-description" : undefined}
                >
                  <AnimatedText
                    align="center"
                    content={title}
                    type={currentTheme?.data?.textAnimation || "none"}
                    delay={AnimTextOrder.ONE}
                  />
                </motion.h1>
              )}

              {/* Subtitle */}
              {subtitle && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-slate-300 mb-8 lg:text-2xl"
                >
                  {subtitle}
                </motion.h2>
              )}

              {/* Description */}
              {description && (
                <motion.p
                  id="hero-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                  role="doc-subtitle"
                  aria-label="Hero section description"
                >
                  <AnimatedText
                    content={description}
                    type={currentTheme?.data?.textAnimationSec || "none"}
                    delay={AnimTextOrder.TWO}
                  />
                </motion.p>
              )}

              {/* CTA Button */}
              {ctaButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mb-16"
                >
                  <a
                    href={ctaButton.url}
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-full transition-all duration-300 hover:bg-slate-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                    role="button"
                    aria-label={ctaButton.text}
                  >
                    {ctaButton.text}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Section - Statistics */}
          {statistics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mb-2 lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-2">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {stat.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/50 to-transparent" />
          
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent" />
          
          {/* Side gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-900/30 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-900/30 to-transparent" />
          
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      </section>
    </ClipContainer>
  );
}