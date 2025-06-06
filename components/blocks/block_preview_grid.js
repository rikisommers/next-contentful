"use client"

import React from "react"
import { BlockPreview } from "./block_preview"
import { useThemeContext } from "../context/themeContext"

// Import the generated JSON data
import previewData from "../../generated/component-preview-data.json"
// Import the rendered examples
import { exampleComponents } from "../../generated/component-examples.jsx"

export const BlockPreviewGrid = () => {
  // Get the highlight value from the current theme
  const { currentTheme } = useThemeContext()

  return (  
    <div className="space-y-12">
      {Object.entries(previewData.categories).map(([categoryKey, categoryData]) => (
        <div key={categoryKey} className="space-y-6">
          {/* Category Title */}
          <div className="mx-16">
            <h2 className="mb-2 text-3xl font-bold capitalize">
              {categoryData.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {categoryData.description}
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 gap-6 mx-16">
            {categoryData.components.map((componentData) => (
                <div className="grid-cols-1" key={componentData.id}>
                  <BlockPreview
                    title={componentData.title}
                    description={componentData.description}
                    component={exampleComponents[componentData.id] || <div>Preview not found</div>}
                    code={componentData.code}
                  />
                </div>
            ))}
          </div>
        </div>
      ))}

      {/* Show message if no components found */}
      {Object.keys(previewData.categories).length === 0 && (
        <div className="py-12 mx-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">No Components Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Run the component generator to create examples: 
            <code className="px-2 py-1 ml-2 bg-gray-100 rounded dark:bg-gray-800">
              node components/utils/generate-component-examples.js
            </code>
          </p>
        </div>
      )}
    </div>
  )
}

