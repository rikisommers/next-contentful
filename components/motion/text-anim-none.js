"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

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
          marginBottom: '0.25em'
        }}
      >
        <div
          style={{ 
            position: 'relative',
            display: 'inline-block'
          }}
        >
          {segments.map((segment, segmentIndex) => {

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

            if (segmentIndex % 2 === 0) {
              return <span key={segmentIndex}>{segment}</span>;
            } else {
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
          color: 'var(--heading-color)',
          display: 'inline-block'
        }}
      >
        {renderContent(content)}
      </span>
    </div>
  );
}