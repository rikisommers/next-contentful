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

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const initialTheme = loadInitialTheme();
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  const mixBlendModes = [
    "normal", "multiply", "screen", "overlay", "darken", "lighten",
    "color-dodge", "color-burn", "hard-light", "soft-light",
    "difference", "exclusion", "hue", "saturation", "color", "luminosity"
  ];

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

  const applyCurrentTheme = (updatedTheme) => {
    const applyCurrentTheme = (updatedTheme) => {
      setCurrentTheme(updatedTheme);
      setTheme(updatedTheme.key);
      updateTheme(updatedTheme.key, updatedTheme);
      localStorage.setItem('currentTheme', JSON.stringify(updatedTheme));
    
      // Update CSS variables
      document.documentElement.style.setProperty('--body-background-color', updatedTheme.bodyBackgroundColor);
      document.documentElement.style.setProperty('--background-color', updatedTheme.backgroundColor);
      document.documentElement.style.setProperty('--surface1', updatedTheme.surface1);
      document.documentElement.style.setProperty('--surface2', updatedTheme.surface2);
      document.documentElement.style.setProperty('--background-color-inv', updatedTheme.backgroundColorInv);
      document.documentElement.style.setProperty('--heading-color', updatedTheme.headingColor);
      document.documentElement.style.setProperty('--text-color', updatedTheme.textColor);
      document.documentElement.style.setProperty('--subtext-color', updatedTheme.subtextColor);
      document.documentElement.style.setProperty('--text-color-inv', updatedTheme.textColorInv);
      document.documentElement.style.setProperty('--accent', updatedTheme.accent);
      document.documentElement.style.setProperty('--text-accent', updatedTheme.textAccent);
      document.documentElement.style.setProperty('--mix-blend-mode', updatedTheme.mixBlendMode);
      document.documentElement.style.setProperty('--state-success-background', updatedTheme.stateSuccessBackground);
    };
  };

  const controls = {
    Theme: {
      value: currentTheme.key,
      options: Object.keys(themes),
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

  useControls(() => controls);

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