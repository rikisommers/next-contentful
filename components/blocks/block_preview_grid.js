"use client"

import React from "react"
import { BlockPreview } from "./block_preview"
import { createTextAnimComponents } from "../motion/utils/anim-text-preview.util"
import { createTileComponents } from "../post/tile-preview.util"
import { createNavComponents } from "../navigation/navigation-preview.util"
import { useThemeContext } from "../context/themeContext"

export const BlockPreviewGrid = () => {
  // Get the highlight value from the current theme
  const { currentTheme } = useThemeContext()
  const highlight = currentTheme?.data?.textHighlight || "text"
  
  // Create the text animation components with the current theme
  const textAnimComponents = createTextAnimComponents(highlight)
  const tileComponents = createTileComponents()
  const navComponents = createNavComponents()

  return (  
    <>
    <div className="grid grid-cols-1 gap-6 mx-16 md:grid-cols-2 xl:grid-cols-3">
      {Object.entries(textAnimComponents).map(([key, { title, description, component, code }]) => (
        <div className="grid-cols-1" key={key}>
          <BlockPreview
            title={title}
            description={description}
            component={component}
            code={code}
          />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 mx-16 md:grid-cols-2 xl:grid-cols-3">
      {Object.entries(tileComponents).map(([key, { title, description, component, code }]) => (
        <div className="grid-cols-1" key={key}>
          <BlockPreview
            title={title}
            description={description}
            component={component}
            code={code}
          />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 mx-16 md:grid-cols-2 xl:grid-cols-3">
      {Object.entries(navComponents).map(([key, { title, description, component, code }]) => (
        <div className="grid-cols-1" key={key}>
          {/* <BlockPreview
            title={title}
            description={description}
            component={component}
            code={code}
          /> */}
        </div>
      ))}
    </div>
    </>
  )
}
