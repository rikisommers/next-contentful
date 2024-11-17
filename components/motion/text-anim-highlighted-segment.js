"use client";
import React from "react";

export const HighlightedSegment = ({ segment, highlight }) => {
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
        default:
          return {};
      }
    };
  
    return (
      <span
        style={getHighlightStyle()}
      >
       {segment}
      </span>
    );
  };