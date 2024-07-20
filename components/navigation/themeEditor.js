import React, { useEffect, useState } from "react";
import { useControls, Leva } from "leva";
import { useTheme } from "next-themes";
import { themes, getThemeByKey, updateTheme } from "../../utils/theme";

export default function ThemeEditor() {
  const { theme, setTheme } = useTheme();

  // Function to load the initial theme from localStorage
  const loadInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('currentTheme');
      try {
        return savedTheme ? JSON.parse(savedTheme) : themes.dark;
      } catch (e) {
        console.error("Invalid JSON in localStorage:", e);
        return themes.dark;
      }
    }
    return themes.dark;
  };

  const [currentTheme, setCurrentTheme] = useState(loadInitialTheme());
  const [levaKey, setLevaKey] = useState(0);

  const mixBlendModes = [
    "normal", "multiply", "screen", "overlay", "darken", "lighten",
    "color-dodge", "color-burn", "hard-light", "soft-light",
    "difference", "exclusion", "hue", "saturation", "color", "luminosity"
  ];

  const applyCurrentTheme = (updatedTheme) => {
    setCurrentTheme(updatedTheme);
    setTheme(updatedTheme.key);
    updateTheme(updatedTheme.key, updatedTheme);
    localStorage.setItem('currentTheme', JSON.stringify(updatedTheme));

    // Update CSS variables
    Object.entries(updatedTheme).forEach(([key, value]) => {
      if (typeof value === 'string') {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });

    // Force re-render of Leva controls
    setLevaKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentTheme');
    try {
      const parsedTheme = savedTheme ? JSON.parse(savedTheme) : null;
      if (parsedTheme) {
        setCurrentTheme(parsedTheme);
        setTheme(parsedTheme.key);
      }
    } catch (e) {
      console.error("Failed to parse theme from localStorage:", e);
    }
  }, [setTheme]);

  const controls = {
    Theme: {
      value: currentTheme.key,
      options: Object.keys(themes),
      onChange: (value) => {
        const updatedTheme = getThemeByKey(value);
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
    "Background Color": {
      value: currentTheme.backgroundColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, backgroundColor: value };
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
    "Surface 1": {
      value: currentTheme.surface1,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface1: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Surface 2": {
      value: currentTheme.surface2,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface2: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Surface 3": {
      value: currentTheme.surface3,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface3: value };
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
    "Text Accent": {
      value: currentTheme.textAccent,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textAccent: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    'NavBg': {
      value: currentTheme.navBg,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, navBg: value };
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
    AccentPri: {
      value: currentTheme.accentPri,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accentPri: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    AccentSec: {
      value: currentTheme.accentSec,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accentSec: value };
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

  useControls(() => controls, [levaKey]);

  return (
    <>
      <Leva
        fill={true} // Make the pane fill the parent DOM node
        flat // Remove border radius and shadow
        oneLineLabels={false} // Alternative layout for labels
        hideTitleBar={true} // Hide the GUI header
        collapsed={false} // Start the GUI in collapsed state
        hidden={false} // GUI is visible by default
      />
    </>
  );
}