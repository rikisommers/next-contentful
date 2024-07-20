"use client";
import React, { useRef } from "react";
import { useToast } from "../toastContext";

export const BlockCode = ({ data }) => {

  const codeRef = useRef(null);
  const showToast = useToast();

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
    <article className="grid grid-cols-12 gap-3 article-content">
      <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
        <div className="relative w-full">
          <div className="p-4 rounded-md" style={{ backgroundColor: 'var(--surface1)', color: 'var(--text-color)', }}>
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
                <pre ref={codeRef} style={{ color: 'var(--text-color)' }}>
                  <code>
                    {data.code}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlockCode;
