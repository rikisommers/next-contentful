"use client";
import React from "react";
import { useThemeContext } from '../context/themeContext';
import { data } from "autoprefixer";

export const HighlightedSegment = ({ segment, highlight }) => {
    const { currentTheme } = useThemeContext();
    
    // Get colors from theme
    const surface1 = currentTheme?.data?.surface1 || '#f1f1f1';
    const surface2 = currentTheme?.data?.surface2 || '#e1e1e1';
    const gradientAngle = currentTheme?.data?.gradientAngle || '145deg';
    
    const getHighlightStyle = () => {
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
            return {
               backgroundColor: 'var(--accent)',
                filter: 'blur(20px)'
               };
        default:
          return {};
      }
    };
  
    // Create the style with dynamic gradient
    const highlightStyle = {
      backgroundColor: `linear-gradient(${gradientAngle}, ${surface1}, ${surface2})`,
      padding: '0.25em 0.5em',
      borderRadius: '0.25em',
      display: 'inline-block',
      position: 'relative',
      boxShadow: `7px 7px 14px ${currentTheme?.data?.bodyBackgroundColor || '#ffffff'}, 
                  -7px -7px 14px ${currentTheme?.data?.textHighlightOutlineNeumorphicEndColor || '#000000'}`
    };
  
    
    return (
      <span className="inline-flex px-4 py-0 rounded-xl"
       style={
        currentTheme.data.textHighlightOutline === 'nuemorphic' ? {...highlightStyle} : {backgroundColor:'red'} }
      >
       {segment}
      </span>
    );
  };

//   <span
//   style={getHighlightStyle()}
//  >
//   {segment}
//  </span>