/**
 * Text rendering utilities for animation components
 */
import { motion } from "../motion";
import { splitTextLine } from "./splitText";

// Define animation transition
const TRANSITION = {
  ease: "easeInOut",
  duration: 0.2,
};

/**
 * Render a single word with loading and text animations
 * @param {Object} word - Word object to render
 * @param {number} index - Index of the word in the array
 * @param {number} animationStep - Current animation step
 * @param {number} totalWords - Total number of words
 * @param {Object} options - Animation options
 * @param {number} options.itemDuration - Duration of each item animation in seconds
 * @param {number} options.textDelay - Delay before text appears in seconds
 * @returns {JSX.Element} - Rendered word component
 */
export const renderWord = (word, index, animationStep, totalWords, { itemDuration, textDelay }) => {
  // Determine if this word's loading span should be visible
  const loadingVisible = animationStep > index && animationStep <= totalWords + index;
  // Determine if this word's text should be visible
  const textVisible = animationStep > totalWords + index;

  return (
    <span className="relative mr-2" key={`word-${index}`} data-index={index}>
      <motion.span
        className="absolute top-0 left-0 inline-flex w-full h-full px-4 py-0 bg-purple-200 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: loadingVisible ? 1 : 0 }}
        transition={TRANSITION}
      ></motion.span>
      <motion.span
        className="z-50 inline-flex px-4 py-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{
          ...TRANSITION,
          duration: itemDuration,
          delay: textDelay,
        }}
      >
        {word.type === 'image' ? (
          <img
            src={word.imageUrl}
            alt={word.altText}
            className="inline h-[1em]"
            style={{
              maxWidth: "40px",
              height: "auto",
              display: "inline-block",
            }}
          />
        ) : word.hasItalic ? (
          <span dangerouslySetInnerHTML={{ __html: word.processedText }} />
        ) : (
          word.text || word
        )}
      </motion.span>
    </span>
  );
};

/**
 * Render a line of words
 * @param {Array} line - Array of words in the line
 * @param {number} lineIndex - Index of the line
 * @param {Array} allWords - All words array (for finding indices)
 * @param {number} animationStep - Current animation step
 * @param {Object} options - Animation options
 * @returns {JSX.Element} - Rendered line component
 */
export const renderLine = (line, lineIndex, allWords, animationStep, options) => {
  return (
    <div key={`line-${lineIndex}`} className="flex flex-wrap">
      {line.map((word, wordIndex) => {
        const index = allWords.findIndex(w => w === word);
        return renderWord(word, index, animationStep, allWords.length, options);
      })}
    </div>
  );
};

/**
 * Render the entire content with vertical stacking
 * @param {Array} words - Array of processed word objects
 * @param {number} animationStep - Current animation step
 * @param {Object} options - Animation options
 * @returns {JSX.Element} - Rendered content component
 */
export const renderContent = (words, animationStep, options) => {
  if (!words || words.length === 0) return null;

  // Group words by line
  const lines = splitTextLine(words);

  return (
    <div className="flex flex-col space-y-2">
      {lines.map((line, lineIndex) => 
        renderLine(line, lineIndex, words, animationStep, options)
      )}
    </div>
  );
};

/**
 * Render simple content (just words, no images or formatting)
 * @param {Array} words - Array of words
 * @param {number} animationStep - Current animation step
 * @param {Object} options - Animation options
 * @returns {JSX.Element} - Rendered content component
 */
export const renderSimpleContent = (words, animationStep, options) => {
  if (!words || words.length === 0) return null;

  return (
    <div className="flex flex-wrap">
      {words.map((word, index) => 
        renderWord(word, index, animationStep, words.length, options)
      )}
    </div>
  );
};

/**
 * Detects and processes image markdown in text
 * @param {string} text - The text to process
 * @returns {Object} Object containing image information and processed text
 */
export const processImageMarkdown = (text) => {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  const matches = [...text.matchAll(imageRegex)];
  
  if (matches.length === 0) {
    return { hasImage: false, text };
  }

  const processedText = text.replace(imageRegex, (match, alt, url) => {
    return `<img src="${url}" alt="${alt}" class="inline-block max-h-[1.2em] align-middle" />`;
  });

  return {
    hasImage: true,
    processedText,
    imageInfo: matches.map(match => ({
      altText: match[1],
      imageUrl: match[2]
    }))
  };
}; 