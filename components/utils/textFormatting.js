/**
 * Text formatting utilities for animation components
 */

/**
 * Converts asterisk-wrapped content to italic HTML
 * @param {string} text - The text to process
 * @returns {Object} Object containing processed text and whether italic formatting was found
 */
export const processItalicText = (text) => {
  // Only match if the entire word is wrapped in asterisks
  const italicRegex = /^\*(.*?)\*$/;
  const hasItalic = italicRegex.test(text);
  
  if (!hasItalic) {
    return { hasItalic: false, processedText: text };
  }
  
  const processedText = text.replace(italicRegex, (match, content) => {
    return `<i>${content}</i>`;
  });
  
  return { hasItalic: true, processedText };
};

/**
 * Converts double underscore-wrapped content to bold HTML
 * @param {string} text - The text to process
 * @returns {Object} Object containing processed text and whether bold formatting was found
 */
export const processBoldText = (text) => {
  // Only match if the entire word is wrapped in double underscores
  const boldRegex = /^__(.*?)__$/;
  const hasBold = boldRegex.test(text);
  
  if (!hasBold) {
    return { hasBold: false, processedText: text };
  }
  
  const processedText = text.replace(boldRegex, (match, content) => {
    return `<b>${content}</b>`;
  });
  
  return { hasBold: true, processedText };
};

/**
 * Processes text for both italic and bold formatting
 * @param {string} text - The text to process
 * @returns {Object} Object containing processed text and formatting flags
 */
export const processTextFormatting = (text) => {
  // First check if the entire word is wrapped in formatting
  const isBold = /^__(.*?)__$/.test(text);
  const isItalic = /^\*(.*?)\*$/.test(text);
  
  // If the word has both bold and italic markers, prioritize bold
  if (isBold) {
    const { hasBold, processedText } = processBoldText(text);
    return { hasBold, hasItalic: false, processedText };
  } else if (isItalic) {
    const { hasItalic, processedText } = processItalicText(text);
    return { hasBold: false, hasItalic, processedText };
  }
  
  // No formatting found
  return { hasBold: false, hasItalic: false, processedText: text };
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

/**
 * Creates an image word object from image information
 * @param {Object} imageInfo - Image information object
 * @param {string} imageInfo.altText - Alt text for the image
 * @param {string} imageInfo.imageUrl - URL of the image
 * @param {number} segmentIndex - Index of the segment in the content
 * @returns {Object} Image word object
 */
export const createImageWord = (imageInfo, segmentIndex) => {
  return {
    type: 'image',
    altText: imageInfo.altText,
    imageUrl: imageInfo.imageUrl,
    segmentIndex
  };
}; 