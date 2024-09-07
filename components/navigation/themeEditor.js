import React, { useEffect, useState, useCallback } from "react";
import { useControls, Leva, button } from "leva";
import { useTheme } from "next-themes";
import { themes, getThemeByKey, updateTheme } from "../../utils/theme";
import { useThemeContext } from "../themeContext";

import { useAudioControls, toggleAudio, updateVolume } from "./audio-utils";

export default function ThemeEditor() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [customTheme, setCustomTheme] = useState(null);

  const applyCurrentTheme = useCallback((updatedTheme) => {
    console.log('Applying theme:', updatedTheme);

    if (!updatedTheme || typeof updatedTheme !== 'object') {
      console.error('Invalid theme object:', updatedTheme);
      return;
    }

    setCurrentTheme(updatedTheme);
    const root = document.documentElement;
    root.setAttribute('data-theme', updatedTheme.key);

    Object.entries(updatedTheme).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });

    localStorage.setItem("currentTheme", JSON.stringify(updatedTheme));
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentTheme');
    const savedCustomTheme = localStorage.getItem('customTheme');

    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        applyCurrentTheme(parsedTheme);
      } catch (e) {
        console.error('Error parsing saved theme:', e);
        applyCurrentTheme(themes.light);
      }
    } else {
      applyCurrentTheme(themes.light);
    }

    // Initialize custom theme
    if (savedCustomTheme) {
      try {
        setCustomTheme(JSON.parse(savedCustomTheme));
      } catch (e) {
        console.error('Error parsing saved custom theme:', e);
        setCustomTheme(themes.light);
      }
    } else {
      setCustomTheme(themes.light);
    }
  }, [applyCurrentTheme]);

  const handleThemeChange = (e) => {
    const selectedThemeKey = e.target.value;
    if (selectedThemeKey === 'custom') {
      applyCurrentTheme({...customTheme, key: 'custom'});
    } else {
      const selectedTheme = themes[selectedThemeKey];
      applyCurrentTheme(selectedTheme);
    }
  };

  const handleColorChange = (key, value) => {
    if (currentTheme.key === 'custom') {
      const updatedCustomTheme = { ...customTheme, [key]: value, key: 'custom' };
      setCustomTheme(updatedCustomTheme);
      applyCurrentTheme(updatedCustomTheme);
      localStorage.setItem('customTheme', JSON.stringify(updatedCustomTheme));
      
      // Save to Contentful
      saveThemeToContentful(updatedCustomTheme);
    }
  };

  async function saveThemeToContentful(theme) {
    try {
      console.log('Attempting to save theme:', theme);
      const response = await fetch('/api/save-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Failed to save theme: ${data.message}`);
        }
        console.log('Theme saved to Contentful successfully');
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Received non-JSON response from server');
      }
    } catch (error) {
      console.error('Error saving theme to Contentful:', error.message);
      // You might want to show an error message to the user here
    }
  }
  
  return (
    <div className="theme-editor">
      <select value={currentTheme.key} onChange={handleThemeChange}>
        {Object.keys(themes).map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themeKey}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>
      {Object.entries(currentTheme).map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          return (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="color"
                id={key}
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
                disabled={currentTheme.key !== 'custom'}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}