"use client";

import { useState } from "react";
import React from "react";
import BlockCode from "./block-code";

export const BlockPreview = ({ component, code, title, description }) => {
  const [activeView, setActiveView] = useState("preview");
  const [renderKey, setRenderKey] = useState(0);

  const triggerReRender = () => {
    setRenderKey((prevKey) => prevKey + 1);
  };

  // Create a data object for BlockCode
  const codeData = {
    title: title || "Code Preview",
    code: code,
    type: "jsx",
  };

  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden border rounded-2xl group inset-shadow-xl"
      style={{
        borderColor: "var(--body-background-color)",
      }}
    >
      <div className="relative w-full h-full py-20 overflow-clip">
        <div className="absolute flex items-center justify-between w-full px-4 py-2 top-2 right-2">
          <span
            className="text-xs"
            style={{
              color: "var(--subtext-color)",
            }}
          >
            {title}
          </span>

          <div className="flex p-1 space-x-1 rounded-md">
            <button
              onClick={() => setActiveView("preview")}
              style={{
                backgroundColor: activeView === "preview" ? "var(--body-background-color)" : "var(--surface2)",
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md `}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveView("code")}
              style={{
                backgroundColor: activeView === "code" ? "var(--body-background-color)" : "var(--surface2)",
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center `}
            >
              Code
            </button>
            <button
              onClick={triggerReRender}
              style={{
                backgroundColor:   "var(--surface2)",
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md `}
            >
              Re-render
            </button>
          </div>
        </div>

        {activeView === "preview" ? (
          <div className="flex flex-col gap-4 ">
            <div className="p-6">
                {React.cloneElement(component, { key: renderKey })}
            </div>

            {(title || description) && (
              <div className="flex flex-col gap-4 justify-start w-full row-span-1 p-4 !h-1/2">
                <div
                  className="flex flex-col items-start w-full gap-4"
                  style={{
                    color: "var(--text-color-inv)",
                  }}
                >
                  <div className="p-4">
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--subtext-color)",
                      }}
                    >
                      {title}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--subtext-color)",
                      }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
            <BlockCode data={codeData} />
        )}
      </div>
    </div>
  );
};
