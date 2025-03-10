"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";
import { processItalicText } from "../utils/textFormatting";

export const TextAnimNone = ({ 
  delay,
  content, 
  highlight,
  type = 'text'
}) => {

  const renderLine = (line, lineIndex) => {
    const segments = line.split('__');
    
    return (
      <span
        key={lineIndex}
        style={{ 
          overflow: 'hidden',
          position: 'relative',
        }}
        className="block leading-snug"
      >
        <div
          style={{ 
            position: 'relative',
            display: 'inline-block'
          }}
        >
          {segments.map((segment, segmentIndex) => {
                // Handle image markdown
                const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
                if (imageMatch) {
                  const altText = imageMatch[1]; // Get alt text
                  const imageUrl = imageMatch[2].startsWith('//') ? `https:${imageMatch[2]}` : imageMatch[2]; // Ensure the URL is complete
                  return (
                    <img
                      className="absolute w-[40px] h-0"
                      key={segmentIndex}
                      src={imageUrl}
                      alt={altText}
                      style={{ maxWidth: "40px", height: "auto", display: "inline-block" }} // Adjust styles as needed
                    />
                  );
                }

                // Handle regular text vs highlighted text
                if (segmentIndex % 2 === 0) {
                  // Process the segment for italic text
                  const { processed: processedSegment, hasItalic } = processItalicText(segment);

                  // If segment has italic formatting, use dangerouslySetInnerHTML
                  if (hasItalic) {
                    return (
                      <span 
                        key={segmentIndex}
                        dangerouslySetInnerHTML={{ __html: processedSegment }}
                      />
                    );
                  } else {
                    // If no italic formatting, use regular children
                    return <span key={segmentIndex}>{segment}</span>;
                  }
                } else {
                  // For highlighted segments, let HighlightedSegment handle the italic formatting
                  return (
                    <HighlightedSegment
                      key={segmentIndex}
                      segment={segment}
                      highlight={highlight}
                    />
                  );
                }
          })}
        </div>
      </span>
    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split('\n');
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
    <div>
      <span
        style={{
          //color: 'var(--heading-color)',
          display: 'inline-block'
        }}
      >
        {renderContent(content)}
      </span>
    </div>
  );
}