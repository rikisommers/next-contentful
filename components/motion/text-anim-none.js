import React from "react";
import { processTextWithBoldAndLineBreaks, processItalicText } from "../utils/text-processing";

/**
 * @component
 * @description Text that displays without animation but with bold highlighting and italic formatting. Strips all image markdown syntax.
 * @category animations
 * @param {string} content - The text content to display. Supports markdown-like syntax for bold (__text__) and italic (*text*) text. Image syntax will be removed.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @param {string} [className] - Additional CSS classes to apply.
 * @example
 * // No Animation Text - images will be stripped, italics and bold preserved
 * <TextAnimNone
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__ with *emphasis*"
 *   highlight="background"
 * />
 */
export const TextAnimNone = ({ 
  content, 
  className,
  highlight,
  type = 'text'
}) => {
  // Helper function to strip image markdown syntax
  const stripImageMarkdown = (text) => {
    if (!text || typeof text !== 'string') {
      return '';
    }
    // Remove all image markdown syntax: ![alt](url)
    return text.replace(/!\[[^\]]*\]\([^)]*\)/g, '').trim();
  };

  const renderTextWithBoldAndLineBreaks = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }

    // First strip all image markdown syntax
    const textWithoutImages = stripImageMarkdown(text);

    // Split by actual line breaks in the content
    const lines = textWithoutImages.split('\\n').filter(line => line && line.trim() !== '');

    return lines.map((line, lineIndex) => {
      // Process each line for bold text
      const boldSegments = processTextWithBoldAndLineBreaks(line);

      return (
        <React.Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {boldSegments.map((segmentData, segmentIndex) => {
            const segment = segmentData.content;
            const isBold = segmentData.isBold;

            if (isBold) {
              // Bold text with highlighting - check for italic formatting
              const { processed: processedSegment, hasItalic } = processItalicText(segment);

              if (hasItalic) {
                return (
                  <span
                    key={segmentIndex}
                    style={{
                      color: 'var(--text-accent)',
                    }}
                    dangerouslySetInnerHTML={{ __html: processedSegment }}
                  />
                );
              } else {
                return (
                  <span
                    key={segmentIndex}
                    style={{
                      color: 'var(--text-accent)',
                    }}
                  >
                    {segment}
                  </span>
                );
              }
            } else {
              // Regular text - check for italic formatting
              const { processed: processedSegment, hasItalic } = processItalicText(segment);

              if (hasItalic) {
                return (
                  <span
                    key={segmentIndex}
                    dangerouslySetInnerHTML={{ __html: processedSegment }}
                  />
                );
              } else {
                return <React.Fragment key={segmentIndex}>{segment}</React.Fragment>;
              }
            }
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <span 
      className={className}
      style={{
        color: 'var(--heading-color)',
      }}
    >
      {renderTextWithBoldAndLineBreaks(content)}
    </span>
  );
};