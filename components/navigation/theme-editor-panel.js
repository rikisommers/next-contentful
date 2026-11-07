"use client";
import React, { forwardRef } from "react";
import { X } from "@phosphor-icons/react/dist/icons/X";
import ThemeEditor from "../../utils/themeEditor";
import ThemeScrollContainer from "../utils/theme-scroll-container";
import Button, { ButtonType, ButtonSize } from "../base/button/button";

/**
 * Developer-only theme editor panel. Loaded with next/dynamic in development.
 * @component
 * @category navigation
 */
const ThemeEditorPanel = forwardRef(function ThemeEditorPanel(
  { customThemes, onClose },
  ref
) {
  return (
    <div
      ref={ref}
      className="h-screen flex flex-col gap-3 bg-[var(--background-color)]"
      aria-modal="true"
      aria-labelledby="theme-editor-title"
      aria-describedby="theme-editor-description"
    >
      <ThemeScrollContainer>
        <div className="flex flex-col gap-8 justify-start">
          <div className="flex sticky top-0 gap-8 justify-start p-2">
            <h2 id="theme-editor-title" className="sr-only">
              Theme Editor
            </h2>
            <p id="theme-editor-description" className="sr-only">
              Configure site theme settings including colors, typography, and
              layout options
            </p>
            <Button
              className="self-end"
              type={ButtonType.SECONDARY}
              size={ButtonSize.SM}
              onClick={onClose}
              aria-label="Close theme editor"
            >
              <X size={16} aria-hidden="true" />
            </Button>
          </div>
          <ThemeEditor customThemes={customThemes} />
        </div>
      </ThemeScrollContainer>
    </div>
  );
});

export default ThemeEditorPanel;
