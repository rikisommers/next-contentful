import React, { useEffect, useState } from "react";

import { useControls } from "leva";
import { useTheme } from "next-themes";
import { ThemeProvider } from "next-themes";
import { themes, getThemeByKey, updateTheme } from "../../utils/theme";

export default function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const initialTheme = getThemeByKey(theme) || themes.light; // Use a fallback theme
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [forceUpdate, setForceUpdate] = useState(0); // State to trigger re-render
  const mixBlendModes = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ];

  useEffect(() => {
    const newTheme = getThemeByKey(theme) || themes.light; // Use a fallback theme
    setCurrentTheme(newTheme);
  }, [theme]);

  const themeKeys = Object.keys(themes);

  const applyCurrentTheme = (updatedTheme) => {
    setCurrentTheme(updatedTheme);
    setTheme(updatedTheme.key);
    updateTheme(updatedTheme.key, updatedTheme);
    setForceUpdate(forceUpdate + 1); // Trigger re-render
  };

  console.log("CT----------", currentTheme && currentTheme);

  const controls = {
    Theme: {
      value: currentTheme.key,
      options: themeKeys,
      onChange: (value) => {
        const updatedTheme = getThemeByKey(value);
        applyCurrentTheme(updatedTheme);
      },
    },
    "Background Color": {
      value: currentTheme.backgroundColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, backgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Body Background Color": {
      value: currentTheme.bodyBackgroundColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, bodyBackgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Inv Background Color": {
      value: currentTheme.backgroundColorInv,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, backgroundColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Heading Color": {
      value: currentTheme.headingColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, headingColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Text Color": {
      value: currentTheme.textColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Subtext Color": {
      value: currentTheme.subtextColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, subtextColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Text Color Inv": {
      value: currentTheme.textColorInv,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    Accent: {
      value: currentTheme.accent,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accent: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    MixBlendMode: {
      value: currentTheme.mixBlendMode,
      options: mixBlendModes,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, mixBlendMode: value };
        applyCurrentTheme(updatedTheme);
      },
    },
  };

  // Use Leva to render controls
  //const themeControls = useControls(() => controls);
  useControls(() => controls);


}
