"use client";
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "../context/toastContext";
import Prism from "prismjs"; // Import Prism.js
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "prismjs/components/prism-javascript.min.js"; 
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-tsx.min.js";
import "prismjs/components/prism-css.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-bash.min.js";
import Modal, { ModalDirection, ModalPosition, ModalWidth } from "../base/modal";
import Button, { ButtonType } from "../base/button/button";
/**
 * @component BlockCode
 * @description Interactive code block with syntax highlighting, copy functionality, and expandable modal view
 * @category blocks
 * 
 * @param {Object} data - Code block data
 * @param {string} data.code - The code content to display
 * @param {string} data.title - Optional title for the code block
 * @param {string} data.type - Programming language for syntax highlighting (default: "javascript")
 * @param {string} data.embedurl - Optional embed URL for iframe
 * @param {number} maxHeight - Maximum height in pixels before showing expand button (default: 400)
 * 
 * @example
 * // Code block with syntax highlighting
 * <BlockCode 
 *   data={{
 *     code: "console.log('Hello World');",
 *     title: "Basic JavaScript",
 *     type: "javascript"
 *   }}
 *   maxHeight={300}
 * />
 * @example
 * // TypeScript code block with embed URL
 * <BlockCode
 *   data={{
 *     code: "const greet = (name: string): string => `Hello, ${name}`;",
 *     title: "TypeScript Greeting",
 *     type: "typescript",
 *     embedurl: "https://codepen.io/example/embed",
 *   }}
 * />
 */
export const BlockCode = ({ data, maxHeight = 400 }) => {

  const codeRef = useRef(null);
  const preRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const showToast = useToast();
  
  // Generate unique ID for view transition
  const uniqueId = useRef(`code-${Math.random().toString(36).substr(2, 9)}`).current;

  useEffect(() => {
    if (typeof window !== 'undefined') {
        // Delay highlighting to ensure DOM is ready
        setTimeout(() => {
          Prism.highlightAll();
        }, 0);
        
    }
}, [data.code]);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText)
        .then(() => {
          showToast("Code copied to clipboard!");
        })
        .catch((error) => {
          showToast("Failed to copy code.");
        });
    }
  };

  const handleExpand = () => {
    // Use View Transition API if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setIsExpanded(true);
      });
    } else {
      setIsExpanded(true);
    }
  };

  const handleCollapse = () => {
    // Use View Transition API if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setIsExpanded(false);
      });
    } else {
      setIsExpanded(false);
    }
  };

  // Handle escape key to close expanded view
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  return (
    <>
      {data.embedurl && <iframe src="embedurl"></iframe>}
      
      <div 
        className={`
          ${isExpanded 
            ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm' 
            : 'relative mx-auto max-w-prose'
          }
        `}
        style={{
          viewTransitionName: `code-container-${uniqueId}`
        }}
      >
        <div 
          className={`
            p-4 rounded-md transition-all duration-300
            ${isExpanded 
              ? 'h-full w-full max-w-none m-4' 
              : ''
            }
          `}
        >
          <div className="flex justify-between items-center mb-2">
            {data.title && (
              <span style={{ color: 'var(--subtext-color)' }}>
                {data.title}
              </span>
            )}
            <div className="flex gap-2">
              {isExpanded ? (
                <button
                  className="px-3 py-1 text-sm rounded-md"
                  onClick={handleCollapse}
                  style={{
                    color: 'var(--accent-pri)',
                    backgroundColor: 'var(--surface1)',
                  }}
                >
                  Collapse
                </button>
              ) : (
                <button
                  className="px-3 py-1 text-sm rounded-md"
                  onClick={handleExpand}
                  style={{
                    color: 'var(--accent-pri)',
                    backgroundColor: 'var(--surface1)',
                  }}
                >
                  Expand
                </button>
              )}
              <button
                className="px-3 py-1 text-sm rounded-md"
                onClick={copyToClipboard}
                style={{
                  color: 'var(--accent-pri)',
                  backgroundColor: 'var(--surface1)',
                }}
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden">
            {data.code && (
              <pre  
                ref={preRef}
                style={{
                  backgroundColor: 'var(--body-background-color)',
                  maxHeight: isExpanded ? 'calc(100vh - 120px)' : `${maxHeight}px`,
                  viewTransitionName: `code-block-${uniqueId}`
                }}
                className={`p-4 rounded-md text-sm overflow-y-auto language-${data.type || "javascript"}`}
              >
                <code ref={codeRef}>{data.code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

BlockCode.propTypes = {
  /** Contentful code block entry data */
  data: PropTypes.shape({
    /** The code content to display */
    code: PropTypes.string,
    /** Title for the code block */
    title: PropTypes.string,
    /** Programming language for syntax highlighting */
    type: PropTypes.string,
    /** Optional embed URL for iframe display */
    embedurl: PropTypes.string,
  }),
  /** Maximum height in pixels before showing expand button */
  maxHeight: PropTypes.number,
};

export default BlockCode;
