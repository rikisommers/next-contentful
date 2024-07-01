import React, { useRef } from "react";
import { useToast } from "../toastContext";
import { useTheme } from "next-themes";
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";

export const BlockCode = ({ data }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
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
          <div className="p-4 text-white rounded-md" style={{ backgroundColor: currentTheme?.surface1 }}>
            <div className="flex items-center justify-between mb-2">
              {data.title && (
                <span className="text-gray-400" style={{ color: currentTheme?.subtitleColor }}>
                  {data.title}
                </span>
              )}
              <button
                className="px-3 py-1 rounded-md code"
                onClick={copyToClipboard}
                style={{
                  color: currentTheme?.accent,
                  backgroundColor: currentTheme?.bodyBackgroundColor
                }}
              >
                Copy
              </button>
            </div>
            <div className="overflow-x-auto">
              {data.code && (
                <pre ref={codeRef} className="text-gray-300" style={{ color: currentTheme?.textColor }}>
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
