import React from "react";
import { processTextWithBoldAndLineBreaks } from "../utils/text-processing";

/**
 * @component
 * @description Text that displays without animation but with bold highlighting.
 * @category animations
 * @param {string} content - The text content to display. Supports markdown-like syntax for bold text.
 * @param {string} [highlight=background] - The highlight style to apply to emphasized text.
 * @param {string} [className] - Additional CSS classes to apply.
 * @example
 * // No Animation Text
 * <TextAnimNone 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   highlight="background"
 * />
 */
export const TextAnimNone = ({ 
  content, 
  className,
  highlight,
  type = 'text'
}) => {
  const renderTextWithBoldAndLineBreaks = (text) => {
    if (!text || typeof text !== 'string') {
      return null;
    }
    
    // First split by actual line breaks in the content
    const lines = text.split('\\n').filter(line => line && line.trim() !== '');
    
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
              // Bold text with highlighting
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
            } else {
              // Regular text
              return <React.Fragment key={segmentIndex}>{segment}</React.Fragment>;
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