"use client";
import React, { useRef, useEffect } from "react";
import { useToast } from "../context/toastContext";
import Prism from "prismjs"; // Import Prism.js
import "prismjs/components/prism-javascript.min.js"; // Import the language you want to highlight

export const BlockCode = ({ data }) => {

  const codeRef = useRef(null);
  const showToast = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
        Prism.highlightAll();
    }
}, []);

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

  return (
    <article >
      {data.embedurl &&       
      <iframe src="embedurl"></iframe>
      }
        <div className="relative w-full">
          <div className="p-4 rounded-md" >
            {/* style={{ backgroundColor: 'var(--surface1)', color: 'var(--text-color)', }} */}
            <div className="flex items-center justify-between mb-2">
              {data.title && (
                <span style={{ color: 'var(--subtext-color)', }}>
                  {data.title}
                </span>
              )}
              <button
                className="px-3 py-1 rounded-md code"
                onClick={copyToClipboard}
                style={{
                  color: 'var(-accent)',
                  backgroundColor: 'var(-body-background-color)',
                }}
              >
                Copy
              </button>
            </div>
            <div className="overflow-x-auto">
              {data.code && (
                <pre className={`language-${data.type ? data.type : "javascript"}`} ref={codeRef} >
                   <code>{data.code}</code>
                </pre>
              )}
            </div>
          </div>
        </div>

    </article>
  );
};

export default BlockCode;
