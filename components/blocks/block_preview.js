"use client"

import { useState } from "react"

export default function BlockPreview({ component, code, title, description }) {
  const [activeView, setActiveView] = useState("preview")

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
      {(title || description) && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex p-1 space-x-1 bg-white border border-gray-200 rounded-md">
          <button
            onClick={() => setActiveView("preview")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              activeView === "preview" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveView("code")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
              activeView === "code" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
          </button>
        </div>
      </div>

      {activeView === "preview" ? (
        <div className="p-6 bg-white">
          <div className="flex items-center justify-center">{component}</div>
        </div>
      ) : (
        <div className="p-0 bg-gray-50">
          <pre className="p-4 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
