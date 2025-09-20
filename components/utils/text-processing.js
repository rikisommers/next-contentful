"use client";

/**
 * Text processing utilities for animation components
 * Handles bold, italic, and image markdown syntax
 */

/**
 * Process italic text within a string, converting *text* to <em>text</em>
 * @param {string} text - Text to process
 * @returns {object} - Object with processed text and hasItalic flag
 */
export const processItalicText = (text) => {
  if (!text || typeof text !== 'string') {
    return { processed: '', hasItalic: false };
  }

  const italicRegex = /\*([^*]+)\*/g;
  const hasItalic = italicRegex.test(text);
  
  if (hasItalic) {
    const processed = text.replace(italicRegex, '<em>$1</em>');
    return { processed, hasItalic: true };
  }
  
  return { processed: text, hasItalic: false };
};

/**
 * Parse image markdown syntax ![alt](url)
 * @param {string} text - Text to check for image syntax
 * @returns {object|null} - Image data or null if no match
 */
export const parseImageMarkdown = (text) => {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const imageMatch = text.match(/!\[([^\]]*)\]\((.*?)\)/);
  if (imageMatch) {
    const altText = imageMatch[1];
    const imageUrl = imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2];
    return {
      altText,
      imageUrl,
      match: imageMatch[0],
      index: imageMatch.index,
      fullMatch: imageMatch
    };
  }
  
  return null;
};

/**
 * Split text into segments handling bold (__text__), italic (*text*), and images
 * @param {string} content - Content to process
 * @returns {Array} - Array of text segments with their types
 */
export const parseTextSegments = (content) => {
  if (!content || typeof content !== 'string') {
    return [];
  }

  const lines = content.split("\n").filter(line => line && line.trim() !== "");
  const allSegments = [];

  lines.forEach((line, lineIndex) => {
    // Split by bold markers first
    const boldSegments = line.split("__");
    const lineSegments = [];

    boldSegments.forEach((segment, segmentIndex) => {
      if (!segment) return;

      const isBold = segmentIndex % 2 === 1; // Odd indices are bold text

      // Check for images in this segment
      const imageData = parseImageMarkdown(segment);
      if (imageData) {
        // Add text before image
        const beforeImage = segment.substring(0, imageData.index).trim();
        if (beforeImage) {
          lineSegments.push({
            type: isBold ? 'bold' : 'text',
            content: beforeImage,
            lineIndex,
            segmentIndex
          });
        }

        // Add image
        lineSegments.push({
          type: 'image',
          content: imageData.match,
          altText: imageData.altText,
          imageUrl: imageData.imageUrl,
          lineIndex,
          segmentIndex
        });

        // Add text after image
        const afterImage = segment.substring(imageData.index + imageData.match.length).trim();
        if (afterImage) {
          lineSegments.push({
            type: isBold ? 'bold' : 'text',
            content: afterImage,
            lineIndex,
            segmentIndex
          });
        }
      } else {
        // No image, check for italic text
        const { processed, hasItalic } = processItalicText(segment);
        lineSegments.push({
          type: isBold ? 'bold' : 'text',
          content: segment,
          processedContent: hasItalic ? processed : null,
          hasItalic,
          lineIndex,
          segmentIndex
        });
      }
    });

    allSegments.push({
      type: 'line',
      segments: lineSegments,
      lineIndex
    });
  });

  return allSegments;
};

/**
 * Split content into words while preserving bold and italic formatting
 * @param {string} content - Content to process
 * @returns {Array} - Array of word objects with formatting info
 */
export const parseWordsWithFormatting = (content) => {
  if (!content || typeof content !== 'string') {
    return [];
  }

  const words = [];
  const lines = content.split("\n").filter(line => line && line.trim() !== "");

  lines.forEach((line, lineIndex) => {
    // Split the line into words and filter out empty strings
    const lineWords = line.split(" ").filter(word => word && word.trim() !== "");

    lineWords.forEach((word, wordIndex) => {
      // Check for image markdown syntax
      const imageData = parseImageMarkdown(word);
      if (imageData) {
        words.push({
          type: 'image',
          content: word,
          altText: imageData.altText,
          imageUrl: imageData.imageUrl,
          lineIndex,
          wordIndex
        });
        return;
      }

      // Check for bold text (wrapped with __)
      const boldMatch = word.match(/^__(.*)__$/);
      if (boldMatch) {
        const boldText = boldMatch[1];
        words.push({
          type: 'bold',
          content: boldText,
          originalContent: word,
          lineIndex,
          wordIndex
        });
        return;
      }

      // Process the word for italic text
      const { processed, hasItalic } = processItalicText(word);
      words.push({
        type: 'text',
        content: word,
        processedContent: hasItalic ? processed : null,
        hasItalic,
        lineIndex,
        wordIndex
      });
    });
  });

  return words;
};

/**
 * Legacy function for backward compatibility
 * Processes text with bold and line breaks similar to text-anim-random
 * @param {string} content - Content to process
 * @returns {Array} - Array of processed segments
 */
export const processTextWithBoldAndLineBreaks = (content) => {
  if (!content || typeof content !== 'string') {
    return [];
  }

  const boldSegments = content.split("__");
  return boldSegments.map((segment, index) => ({
    content: segment,
    isBold: index % 2 === 1,
    index
  }));
};