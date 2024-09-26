import React, { useState, useEffect, useCallback } from "react";
import { 
  themes,
  typographyThemes,
  textAnimationThemes,
  textHighlightThemes, 
  pageTransitionThemes, 
  pageWidthThemes } from "../../utils/theme";
import { debounce } from "../utils/debounce";
import { useThemeContext } from '../themeContext';

// Fallback values
const defaultTypographyThemes = {
  sans: 'sans-serif',
  serif: 'serif',
  mono: 'monospace',
};

const defaultTextHighlightThemes = {
  text: "text",
  background: "background",
  underline: "underline",
  highlight: "highlight",
  none: "none"
};

const defaultPageTransitionThemes = {
  fade: 'fade',
  wipe: 'wipe',
  none: 'none'
};

const defaultPageWidthThemes = {
  small: 'small',
  large: 'large',
  fluid: 'fluid'
};

const defaultTextAnimationThemes = {
  none: "none",
  linesfadeup: 'fadeup',
  linesmoveup: 'fadeup',
  charsfadein: 'fadechars',
  charsblurin: 'blurchars'
};


// console.log('Imported themes:', themes);
// console.log('Imported typographyThemes:', defaultTypographyThemes);
// console.log('Imported transitionThemes:', defaultPageTransitionThemes);
// console.log('Imported textHighlightThemes:', defaultTextHighlightThemes);


const getBestTheme = (weightType, sliderValue) => {
  let bestTheme = null;
  let closestScoreDiff = Infinity; // Start with a large difference

  for (const [themeName, metrics] of Object.entries(themes)) {
    // Get the weight based on the specified type
    const themeWeight = metrics.weights[weightType];

    // Calculate the difference between the theme weight and the slider value
    const scoreDiff = Math.abs(themeWeight - sliderValue);

    // Check if this theme is closer to the slider value than the previous best
    if (scoreDiff < closestScoreDiff) {
      closestScoreDiff = scoreDiff;
      bestTheme = themeName;
      console.log('Best theme found:', bestTheme); // Log the best theme
    }
  }

  return bestTheme ? themes[bestTheme] : null; // Return the theme object instead of just the name
};


export default function ThemeEditor() {
  const { currentTheme, updateTheme } = useThemeContext();
  const [customTheme, setCustomTheme] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

    // State for slider values
    const [colorWeight, setColorWeight] = useState(5);
    const [typographyWeight, setTypographyWeight] = useState(5);

      // Function to update the current theme based on slider values
  const updateCurrentTheme = useCallback(() => {
    const bestTheme = getBestTheme(colorWeight, typographyWeight);
    if (bestTheme) {
      updateTheme(bestTheme); // Update the theme with the best match
      applyCurrentTheme(bestTheme)
    }
  }, [colorWeight, typographyWeight, updateTheme]);
  
    
  const applyCurrentTheme = useCallback((updatedTheme) => {
    //console.log('Applying theme:', updatedTheme);

    if (!updatedTheme || typeof updatedTheme !== 'object') {
      console.error('Invalid theme object:', updatedTheme);
      return;
    }

    updateTheme(updatedTheme);
    const root = document.documentElement;
    root.setAttribute('data-theme', updatedTheme.key);

    Object.entries(updatedTheme).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });

    // Apply global options
    root.style.setProperty('--mix-blend-mode', updatedTheme.mixBlendMode || 'normal');
    root.style.setProperty('--text-highlight', updatedTheme.textHighlight || 'text');
    root.style.setProperty('--text-animation', updatedTheme.textAnimation || 'linesup');
    root.style.setProperty('--page-transition', updatedTheme.pageTransition || 'fade');
    root.style.setProperty('--page-width', updatedTheme.pageWidth || 'fluid');
    root.style.setProperty('--font-family-primary', updatedTheme.fontFamilyPrimary || 'sans');
    root.style.setProperty('--font-family-secondary', updatedTheme.fontFamilySecondary || 'sans');

    
    localStorage.setItem("currentTheme", JSON.stringify(updatedTheme));
  }, [updateTheme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('currentTheme');
    if (storedTheme) {
      applyCurrentTheme(JSON.parse(storedTheme));
    } else {
      applyCurrentTheme(themes.light);
    }

    const storedCustomTheme = localStorage.getItem('customTheme');
    if (storedCustomTheme) {
      setCustomTheme(JSON.parse(storedCustomTheme));
    }
    
    // Call updateCurrentTheme only when sliders change
    updateCurrentTheme();
  }, [colorWeight, typographyWeight, updateCurrentTheme]);


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
    }
  };

  const handleGlobalOptionChange = (key, value) => {
    updateTheme({ [key]: value });
  };

  const saveThemeToContentful = async (theme) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      console.log('Saving theme to Contentful:', theme);
      const response = await fetch('/api/save-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save theme: ${errorData.message}`);
      }
      console.log('Theme saved to Contentful successfully');
      localStorage.setItem('currentTheme', JSON.stringify(theme));
      localStorage.setItem('themeLastFetched', Date.now().toString());
    } catch (error) {
      console.error('Error saving theme to Contentful:', error.message);
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApply = () => {
    saveThemeToContentful(currentTheme);
  };

  const typographyOptions = currentTheme.typographyThemes || defaultTypographyThemes;
  const textHighlightOptions = currentTheme.textHighlightThemes || defaultTextHighlightThemes;
  const pageTransitionOptions = currentTheme.transitionThemes || defaultPageTransitionThemes;
  const pageWidthOptions = currentTheme.pageWidthThemes || defaultPageWidthThemes;
  const textAnimationOptions = currentTheme.textAnimationThemes || defaultTextAnimationThemes;
  
  const handleColorWeightChange = (value) => {
    setColorWeight(value); // Update the slider state
    const bestTheme = getBestTheme('color', value); // Get the best theme based on color weight
    if (bestTheme) {
      updateTheme(bestTheme); // Update the theme with the best match
    }
  };

  const handleTypographyWeightChange = (value) => {
    setTypographyWeight(value); // Update the slider state
    const bestTheme = getBestTheme('typography', value); // Get the best theme based on typography weight
    if (bestTheme) {
      updateTheme(bestTheme); // Update the theme with the best match
    }
  };

  return (
    <div className="p-4 theme-editor">

       {/* Sliders for Age and Mood */}
       <div className="mb-4">
        <label htmlFor="colorWeight" className="block mb-2 text-sm font-medium">Color Weight (1-10)</label>
        <input
          type="range"
          id="colorWeight"
          min="1"
          max="10"
          value={colorWeight}
          onChange={(e) => handleColorWeightChange(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{colorWeight}</span>
      </div>

      <div className="mb-4">
        <label htmlFor="typographyWeight" className="block mb-2 text-sm font-medium">Typography Weight (1-10)</label>
        <input
          type="range"
          id="typographyWeight"
          min="1"
          max="10"
          value={typographyWeight}
          onChange={(e) => handleTypographyWeightChange(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{typographyWeight}</span>
      </div>

      
      <div className="mb-4">
        <label htmlFor="themeSelect" className="block mb-2 text-sm font-medium">Select Theme</label>
        <select
          id="themeSelect"
          value={currentTheme.key}
          onChange={handleThemeChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(themes).map((themeKey) => (
            <option key={themeKey} value={themeKey}>
              {themeKey}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Global options */}
      <div className="mb-4">
        <label htmlFor="audio" className="flex items-center">
          <input
            type="checkbox"
            id="audio"
            checked={currentTheme.audio}
            onChange={(e) => handleGlobalOptionChange('audio', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium">Audio</span>
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="volume" className="block mb-2 text-sm font-medium">Volume</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={currentTheme.volume}
          onChange={(e) => handleGlobalOptionChange('volume', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mixBlendMode" className="block mb-2 text-sm font-medium">Mix Blend Mode</label>
        <select
          id="mixBlendMode"
          value={currentTheme.mixBlendMode}
          onChange={(e) => handleGlobalOptionChange('mixBlendMode', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'].map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      {/* Typography option */}
      <div className="mb-4">
        <label htmlFor="fontFamilyPrimary" className="block mb-2 text-sm font-medium">Font Family Primary</label>
        <select
          id="fontFamilyPrimary"
          value={currentTheme.fontFamilyPrimary || 'sans'}
          onChange={(e) => handleGlobalOptionChange('fontFamilyPrimary', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(typographyOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Typography option */}
      <div className="mb-4">
        <label htmlFor="fontFamilySecondary" className="block mb-2 text-sm font-medium">Font Family Secondary</label>
        <select
          id="fontFamilySecondary"
          value={currentTheme.fontFamilySecondary || 'sans'}
          onChange={(e) => handleGlobalOptionChange('fontFamilySecondary', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(typographyOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Transition option */}
      <div className="mb-4">
        <label htmlFor="transition" className="block mb-2 text-sm font-medium">Transition</label>
        <select
          id="pageTransition"
          value={currentTheme.pageTransition || 'wide'}
          onChange={(e) => handleGlobalOptionChange('pageTransition', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(pageTransitionOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Text Highlight option */}
      <div className="mb-4">
        <label htmlFor="textHighlight" className="block mb-2 text-sm font-medium">Text Highlight</label>
        <select
          id="textHighlight"
          value={currentTheme.textHighlight || 'text'}
          onChange={(e) => handleGlobalOptionChange('textHighlight', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(textHighlightOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Page Width option */}
      <div className="mb-4">
        <label htmlFor="pageWidth" className="block mb-2 text-sm font-medium">Page Width</label>
        <select
          id="pageWidth"
          value={currentTheme.pageWidth || 'fluid'}
          onChange={(e) => handleGlobalOptionChange('pageWidth', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(pageWidthOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Text Animation option */}
      <div className="mb-4">
        <label htmlFor="textAnimation" className="block mb-2 text-sm font-medium">Text Animation</label>
        <select
          id="textAnimation"
          value={currentTheme.textAnimation || 'none'}
          onChange={(e) => handleGlobalOptionChange('textAnimation', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(textAnimationOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Color options */}
      {Object.entries(currentTheme).map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          return (
            <div key={key} className="flex items-center mb-4">
              <input
                type="color"
                id={key}
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
                disabled={currentTheme.key !== 'custom'}
                className={`w-8 h-8 rounded-md mr-2 ${currentTheme.key === 'custom' ? 'border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' : ''}`}
              />
              <label htmlFor={key} className="text-sm font-medium">{key}</label>
            </div>
          );
        }
        return null;
      })}
      <button
        onClick={handleApply}
        disabled={isSaving}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Apply'}
      </button>
      {saveError && <p className="mt-2 text-red-500">Error saving theme: {saveError}</p>}
    </div>
  );
}