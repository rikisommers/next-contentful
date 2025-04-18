"use client";
import React from "react";
import { useThemeContext } from '../context/themeContext';
import { processItalicText } from "../utils/textFormatting";

export const HighlightedSegment = ({ segment, highlight }) => {
    const { currentTheme } = useThemeContext();
    
    // Get colors from theme
    const surface1 = currentTheme?.data?.surface1 || '#f1f1f1';
    const surface2 = currentTheme?.data?.surface2 || '#e1e1e1';
    const gradientAngle = currentTheme?.data?.gradientAngle || '145deg';
    
    // Process the segment for italic text using the shared utility function
    const { processed: processedSegment, hasItalic } = processItalicText(segment);

    // Get the appropriate style based on highlight type
    const getHighlightStyle = () => {


      // Standard highlight styles
      switch (highlight) {
        case 'text':
          return { color: 'var(--text-accent)' };
        case 'background':
          return { backgroundColor: 'var(--accent)' };
        case 'underline':
          return { textDecoration: 'underline', textDecorationColor: 'var(--accent)' };
        case 'highlight':
          return { backgroundColor: 'var(--accent)', filter: 'blur(20px)' };
        case 'figma':
          return { backgroundColor: 'var(--surface1)' };
        case 'figma-neumorphic':
            return {
              backgroundColor: `linear-gradient(${gradientAngle}, ${surface1}, ${surface2})`,
              position: 'relative',
              boxShadow: `7px 7px 14px ${currentTheme?.data?.bodyBackgroundColor || '#ffffff'}, 
                          -7px -7px 14px ${currentTheme?.data?.textHighlightOutlineNeumorphicEndColor || '#000000'}`
            };
        default:
          return { backgroundColor: 'var(--surface1)' };
      }
    };

    // Get the computed style
    const style = getHighlightStyle();
  
    // Render with the appropriate approach based on whether we have italic text
    return hasItalic ? (
      <span 
        className="inline-flex px-4 py-0 rounded-xl"
        style={style}
        dangerouslySetInnerHTML={{ __html: processedSegment }}
      />
    ) : (
      <span 
        className="relative inline-flex py-0"
      >

        <span className="z-10 px-3">{segment}</span>
        <span className="absolute z-0 w-full h-[80%] top-[10%] rounded-xl"
              style={style}
         ></span>
      </span>
    );
};
