/**
 * Processes text to convert asterisk-wrapped content to italic HTML
 * @param {string} text - The text to process
 * @returns {Object} - Object containing processed text and whether italic formatting was found
 */
export const processItalicText = (text) => {
  // Check if text contains asterisks
  if (!text || !text.includes('*')) {
    return { processed: text, hasItalic: false };
  }
  
  // Replace *text* with <i>text</i>
  const processed = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  return { processed, hasItalic: processed !== text };
}; 