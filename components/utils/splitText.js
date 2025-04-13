/**
 * Text processing utilities for animation components
 */

/**
 * Process content into words, handling images and formatting
 * @param {string} content - The content to process
 * @returns {Array} - Array of processed word objects
 */
export const processContent = (content) => {
  if (!content) return [];
  
  // Split content into lines
  const lines = content.split("\n");
  
  // Process each line to extract words and segments
  const processedWords = [];
  
  lines.forEach(line => {
    // Split line by segments (for highlighted text)
    const segments = line.split("__");
    
    segments.forEach((segment, segmentIndex) => {
      // Check for image markdown
      const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
      
      if (imageMatch) {
        // Add image as a special word
        processedWords.push({
          type: 'image',
          altText: imageMatch[1],
          imageUrl: imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2],
          segmentIndex
        });
      } else {
        // Process text for italic formatting
        const { processed: processedSegment, hasItalic } = processItalicText(segment);
        
        // Split segment into words
        const segmentWords = segment.split(/\s+/).filter(word => word.length > 0);
        
        segmentWords.forEach(word => {
          processedWords.push({
            type: 'text',
            text: word,
            hasItalic,
            processedText: hasItalic ? processedSegment : word,
            segmentIndex
          });
        });
      }
    });
  });
  
  return processedWords;
};

/**
 * Split words into lines based on segment indices
 * @param {Array} words - Array of processed word objects
 * @returns {Array} - Array of lines, each containing an array of words
 */
export const splitTextLine = (words) => {
  const lines = [];
  let currentLine = [];
  let currentSegmentIndex = -1;
  
  words.forEach((word) => {
    // If this is a new line or segment, start a new line
    if (word.segmentIndex !== currentSegmentIndex) {
      if (currentLine.length > 0) {
        lines.push([...currentLine]);
      }
      currentLine = [word];
      currentSegmentIndex = word.segmentIndex;
    } else {
      currentLine.push(word);
    }
  });
  
  // Add the last line if it exists
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return lines;
};

/**
 * Split text content into individual words, removing images
 * @param {string} content - The content to process
 * @returns {Array} - Array of words
 */
export const splitTextWords = (content) => {
  if (!content) return [];
  
  // First, strip out all image markdown patterns
  const textWithoutImages = content.replace(/!\[([^\]]*)\]\((.*?)\)/g, "");

  // Split content into words
  return textWithoutImages
    .split(/\s+/)
    .filter((word) => word.length > 0);
}; 