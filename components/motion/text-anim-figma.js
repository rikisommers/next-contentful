"use client";

import React from "react";
import { HighlightedSegment } from "./text-anim-highlighted-segment";

export const TextAnimFigma = ({ 
  delay,
  content, 
  highlight,
  type = 'text'
}) => {



  const renderLine = (line, lineIndex) => {
    const segments = line.split('__');
    
    return (

        <div
        key={lineIndex}
        className="inline-flex items-center gap-2 leading-snug"
  
        >
          {segments.map((segment, segmentIndex) => {

                const imageMatch = segment.match(/!\[([^\]]*)\]\((.*?)\)/);
                if (imageMatch) {
                const altText = imageMatch[1]; // Get alt text
                const imageUrl = imageMatch[2].startsWith('//') ? `https:${imageMatch[2]}` : imageMatch[2]; // Ensure the URL is complete
                return (
                    <img
                    className="inline h-[1em]"
                    key={segmentIndex}
                    src={imageUrl}
                    alt={altText}
                    
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

    );
  };

  const renderContent = (text) => {
    if (text) {
      const lines = text.split('\n');
      return lines.map((line, lineIndex) => renderLine(line, lineIndex));
    }
  };

  return (
 
      <span
       className="flex flex-col gap-3"
        style={{
          color: 'var(--heading-color)',
          //display: 'inline-block'
        }}
      >
        {renderContent(content)}
      </span>

  );
}