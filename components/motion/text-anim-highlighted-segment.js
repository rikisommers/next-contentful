"use client";
import React from "react";
import { useThemeContext } from '../context/themeContext';
import { processItalicText } from "../utils/textFormatting";
import { motion } from "../../utils/motion";

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
          return { backgroundColor: 'var(--surface1)' ,color: 'var(--text-accent)' };
          case 'tabloid':
            return { backgroundColor: 'var(--accent-sec)',color: 'var(--text-accent)' };
        case 'underline':
          return { textDecoration: 'underline', textDecorationColor: 'var(--accent-pri)' };
        case 'highlight':
          return { backgroundColor: 'var(--accent-sec)', color: 'var(--text-color)', filter: 'blur(20px)' };
        case 'figma':
          return { backgroundColor: 'var(--surface1)' };
        case 'figma-neumorphic':
            return {
              background: `linear-gradient(${gradientAngle}, ${surface1}, ${surface2})`,
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
      >
        {segment.split(/(\*[^*]+\*)/g).map((part, partIndex) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            // Remove asterisks and render as italic
            const italicText = part.substring(1, part.length - 1);
            return (
              <span key={`italic-${partIndex}`} className="italic">
                {italicText}
              </span>
            );
          } else {
            // Render as normal text
            return part;
          }
        })}
      </span>
    ) : (
      <span 
        className="inline-flex relative py-0"
      >
        {(() => {
          switch (highlight) {
            case 'underline':
              return (
                <span className="z-10 px-3" style={style}>{segment}</span>
              );
            case 'background':
              return (
                <>
                  <span style={{ color: 'var(--text-accent)'}} className="z-10 px-3">{segment}</span>
                  <span 
                    className="absolute z-0 w-full h-[80%] top-[10%] rounded-xl"
                    style={style}
                  />
                </>
              );
              case 'tabloid':
                return (
                    <>    
                    <motion.span 
                      id="tabloid-highlight"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}  
                      className="absolute z-0 w-full h-[80%] top-[10%] rounded-xs"
                      style={style}
                    />
                    <span className="relative z-10 px-3"  style={{ color: 'var(--text-accent)'}}>{segment}</span>
                    </>
                );
            case 'figma':
              return (
                <>
                  <span className="z-10 px-3"  style={{ color: 'var(--text-accent)'}}>{segment}</span>
                  <span 
                    className="absolute z-0 w-full h-[90%] top-[5%] rounded-lg"
                    style={{
                      ...style,
                      opacity: 0.2,
                      transform: 'skew(-12deg)',
                    }}
                  />
                </>
              );
            default:
              return <span className="z-10 px-3"
              style={{
                ...style,
              }}
              >{segment}</span>;
          }
        })()}
      </span>
    );
};
