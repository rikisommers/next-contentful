import React, { useState, useEffect, useCallback } from "react";
import { 
  themes,
  typographyThemes,
  fluidFontSizeThemes,
  fontSizeThemes,
  textAnimationThemes,
  textHighlightThemes, 
  pageTransitionThemes, 
  pageWidthThemes, 
  cardThemes,
  cardImageHoverThemes,
  cardImageScrollThemes,
  heroBackgroundThemes,
  heroTextImageThemes,
  heroTextCompositionThemes,
  heroTextPositionThemes,
  heroGradThemes,
  navigationPositionThemes,
  navigationStyleThemes,
  cursorThemes,
  bodyTextThemes,
  helpers,
  
  mixBlendThemes} from "../../utils/theme";
import { debounce } from "../utils/debounce";
import { useThemeContext } from '../themeContext';
import { FloatType } from "three";
import { Leva, useControls ,button, folder} from "leva";



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
  const [selectedCursors, setSelectedCursors] = useState(currentTheme.cursor || []); // Initialize with current theme cursor

    // State for slider values
    const [colorWeight, setColorWeight] = useState(5);
    const [vibranceWeight, setVibrancyWeight] = useState(5);
    const [funkynessWeight, setFunkynessWeight] = useState(5);

      // Function to update the current theme based on slider values
  const updateCurrentTheme = useCallback(() => {
    const bestTheme = getBestTheme(colorWeight, vibranceWeight, funkynessWeight);
    if (bestTheme) {
      updateTheme(bestTheme); // Update the theme with the best match
      applyCurrentTheme(bestTheme)
    }
  }, [colorWeight, vibranceWeight, funkynessWeight, updateTheme]);
  
    
  const applyCurrentTheme = useCallback((updatedTheme) => {
    console.log('Applying theme:', updatedTheme);

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
    root.style.setProperty('--font-family-primary', updatedTheme.fontFamilyPrimary || 'sans-serif');
    root.style.setProperty('--font-family-secondary', updatedTheme.fontFamilySecondary || 'sans-serif');
    root.style.setProperty('--cursor', updatedTheme.cursor || 'dot');
    root.style.setProperty('--font-ratio-min', updatedTheme.fluidFontRatioMin || 1.2);
    root.style.setProperty('--font-ratio-max', updatedTheme.fluidFontRatioMax || 1.25);

    
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
  }, [colorWeight, vibranceWeight, funkynessWeight, updateCurrentTheme]);


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

    console.log('global',key,value)
    const updatedTheme = {
      ...currentTheme,
      [key]: value,
    };

  
    updateTheme(updatedTheme); // Update the theme with the new values
    applyCurrentTheme(updatedTheme); // Ensure the theme is applied to the DOM
  };


  const handleCheckboxChange = (cursor) => {
    setSelectedCursors((prev) => {
      if (prev.includes(cursor)) {
        // If already selected, remove it
        return prev.filter((c) => c !== cursor);
      } else {
        // Otherwise, add it
        return [...prev, cursor];
      }
    });
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


  const handleWeightChange = (metricType, value) => {
    switch (metricType) {
      case 'color':
        setColorWeight(value);
        break;
      case 'vibrance':
        setVibrancyWeight(value); // Ensure this updates the state
        break;
      case 'funkyness':
        setFunkynessWeight(value); // Ensure this updates the state
        break;
      default:
        console.warn(`Unknown metric type: ${metricType}`);
    }
  
    const bestTheme = getBestTheme(metricType, value);
    if (bestTheme) {
      updateTheme(bestTheme); // Ensure this is called for vibrancy and funkyness
    }
  };

  // Define controls before using it in useControls
  const controls = {
    currentTheme: { 
      options: Object.keys(themes), 
      value: currentTheme.key, 
      label: 'Current Theme',
      onChange: (value) => {
        handleThemeChange({ target: { value } }); // Call existing handler
      }
    },
    'Theme Selection': folder({
      colorWeight: { 
        value: colorWeight, 
        min: 1, 
        max: 10, 
        label: 'Color Weight',
        onChange: (value) => {
          handleWeightChange(value)
         // updateCurrentTheme(); // Call to update the theme based on new weight
        }
      },
      vibranceWeight: { 
        value: vibranceWeight, 
        min: 1, 
        max: 10, 
        label: 'Vibrance Weight',
        onChange: (value) => {
          handleWeightChange(value)
         // updateCurrentTheme(); // Call to update the theme based on new weight
        }
      },
      funkynessWeight: { 
        value: funkynessWeight, 
        min: 1, 
        max: 10, 
        label: 'Funkyness Weight',
        onChange: (value) => {
          handleWeightChange(value)
       //   updateCurrentTheme(); // Call to update the theme based on new weight
        }
      },
    }),
    'Audio': folder({
      audio: { 
        value: currentTheme.audio, 
        label: 'Audio',
        onChange: (value) => handleGlobalOptionChange('audio', value) // Call existing handler
      },
      volume: { 
        value: currentTheme.volume, 
        min: 0, 
        max: 1, 
        step: 0.1, 
        label: 'Volume',
        onChange: (value) => handleGlobalOptionChange('volume', value) // Call existing handler
      },
    }),
    'Globals': folder({
      pageWidth: { 
        options: Object.keys(pageWidthThemes), 
        value: currentTheme.pageWidth || 'fluid', 
        label: 'Page Width',
        onChange: (value) => handleGlobalOptionChange('pageWidth', value) // Call existing handler
      },
      cursor: { 
        options: Object.keys(cursorThemes), 
        value: currentTheme.cursor || 'dot', 
        label: 'Cursor',
        onChange: (value) => handleGlobalOptionChange('cursor', value) // Call existing handler
      },
    }),
    'Animation': folder({
      pageTransition: { 
        options: Object.keys(pageTransitionThemes), 
        value: currentTheme.pageTransition || 'fade', 
        label: 'Page Transition',
        onChange: (value) => handleGlobalOptionChange('pageTransition', value) // Call existing handler
      },
      textAnimation: { 
        options: Object.keys(textAnimationThemes), 
        value: currentTheme.textAnimation || 'none', 
        label: 'Text Animation',
        onChange: (value) => handleGlobalOptionChange('textAnimation', value) // Call existing handler
      },
    }),
    'Typography': folder({
      fontFamilyPrimary: { 
        options: Object.keys(typographyThemes), 
        value: currentTheme.fontFamilyPrimary || 'sans', 
        label: 'Font Family Primary',
        onChange: (value) => handleGlobalOptionChange('fontFamilyPrimary', value) // Call existing handler
      },
      fontFamilySecondary: { 
        options: Object.keys(typographyThemes), 
        value: currentTheme.fontFamilySecondary || 'sans', 
        label: 'Font Family Secondary',
        onChange: (value) => handleGlobalOptionChange('fontFamilySecondary', value) // Call existing handler
      },
      textHighlight: { 
        options: Object.keys(textHighlightThemes), 
        value: currentTheme.textHighlight || 'text', 
        label: 'Text Highlight',
        onChange: (value) => handleGlobalOptionChange('textHighlight', value) // Call existing handler
      },
      'Body Text': folder({
        dropCap: { 
          value: currentTheme.bodyTextStyle?.dropCap || false, // Default to false
          label: 'Drop Cap',
          onChange: (value) => handleGlobalOptionChange('bodyTextStyle', { ...currentTheme.bodyTextStyle, dropCap: value }) // Update handler
        },
        indent: { 
          value: currentTheme.bodyTextStyle?.indent || false, // Default to false
          label: 'Indent',
          onChange: (value) => handleGlobalOptionChange('bodyTextStyle', { ...currentTheme.bodyTextStyle, indent: value }) // Update handler
        },
        highlight: { 
          value: currentTheme.bodyTextStyle?.highlight || false, // Default to false
          label: 'Highlight',
          onChange: (value) => handleGlobalOptionChange('bodyTextStyle', { ...currentTheme.bodyTextStyle, highlight: value }) // Update handler
        },
      }),

    }),
    'Navigation': folder({
      navigationPosition: { 
        options: Object.keys(navigationPositionThemes), 
        value: currentTheme.navigationPosition || 'gradient', 
        label: 'Nav Position',
        onChange: (value) => handleGlobalOptionChange('navigationPosition', value) // Call existing handler
      },
      navigationStyle: { 
        options: Object.keys(navigationStyleThemes), 
        value: currentTheme.navigationStyle || 'gradient', 
        label: 'Nav Style',
        onChange: (value) => handleGlobalOptionChange('heroBackgroundStyle', value) // Call existing handler
      },
    }),

    'Hero': folder({
        heroBackgroundStyle: { 
          options: Object.keys(heroBackgroundThemes), 
          value: currentTheme.heroBackgroundStyle || 'gradient', 
          label: 'Hero Background Style',
          onChange: (value) => handleGlobalOptionChange('heroBackgroundStyle', value) // Call existing handler
        },
        heroGradMidPoint: { 
          value: currentTheme.heroGradMidPoint, 
          min: 0, 
          max: 1, 
          step: 0.1, 
          label: 'Gradient Mid Point',
          onChange: (value) => handleGlobalOptionChange('heroGradMidPoint', value) // Call existing handler
        },
        heroTextImageStyle: { 
          options: Object.keys(heroTextImageThemes), 
          value: currentTheme.heroTextImageStyle || 'none', 
          label: 'Hero Text Image Style',
          onChange: (value) => handleGlobalOptionChange('heroTextImageStyle', value) // Call existing handler
        },
        heroTextLayoutStyle: { 
          options: Object.keys(heroTextPositionThemes), 
          value: currentTheme.heroTextPosition || 'center', 
          label: 'Hero Text Layout Style',
          onChange: (value) => handleGlobalOptionChange('heroTextPosition', value) // Call existing handler
        },
        heroTextCompStyle: { 
          options: Object.keys(heroTextCompositionThemes), 
          value: currentTheme.heroTextComposition || 'foo', 
          label: 'Hero Text Comp Style',
          onChange: (value) => handleGlobalOptionChange('heroTextPosition', value) // Call existing handler
        },

    }),
    'Cards': folder({
      cardStyle: { 
        options: Object.keys(cardThemes), 
        value: currentTheme.cardStyle || 'formal', 
        label: 'Card Style',
        onChange: (value) => handleGlobalOptionChange('cardStyle', value) // Call existing handler
      },
      cardImageScrollStyle: { 
        options: Object.keys(cardThemes), 
        value: currentTheme.cardImageScrollStyle || 'none', 
        label: 'Card Image Scroll Style',
        onChange: (value) => handleGlobalOptionChange('cardImageScrollStyle', value) // Call existing handler
      },
      cardImageHoverThemes: { 
        options: Object.keys(cardThemes), 
        value: currentTheme.cardImageHoverThemes || 'none', 
        label: 'Card Image Hover Style',
        onChange: (value) => handleGlobalOptionChange('cardImageHoverThemes', value) // Call existing handler
      },
      mixBlendMode: { 
        options: Object.keys(mixBlendThemes), 
        value: currentTheme.mixBlendMode, 
        label: 'Mix Blend Mode',
        onChange: (value) => handleGlobalOptionChange('mixBlendMode', value) // Call existing handler
      },
    }),
    resetButton: button(() => {
      handleApply()
    }, {
      label: 'Save Theme to Custom?'
    })
  };

  // Now use controls in useControls
  const values = useControls(() => controls);

  useEffect(() => {
    const updatedTheme = { ...currentTheme, ...values };
    console.log("Updated theme values:", updatedTheme);
    if (JSON.stringify(updatedTheme) !== JSON.stringify(currentTheme)) {
      applyCurrentTheme(updatedTheme);
    }
  }, [values, currentTheme, applyCurrentTheme]);

  useEffect(() => {
    if (saveError) {
      console.error('Error saving theme:', saveError);
    }
  }, [saveError]);


  return (
    <>
      <Leva
        fill={false} // Make the pane fill the parent DOM node
        flat // Remove border radius and shadow
        oneLineLabels={false} // Alternative layout for labels
        hideTitleBar={true} // Hide the GUI header
        collapsed={false} // Start the GUI in collapsed state
        hidden={false} // GUI is visible by default
      />
    </>
  );

  
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
          onChange={(e) => handleWeightChange('color', parseInt(e.target.value))}
          className="w-full"
        />
        <span>{colorWeight}</span>
      </div>

      
      <div className="mb-4">
        <label htmlFor="vibranceWeight" className="block mb-2 text-sm font-medium">Vibrance Weight (1-10)</label>
        <input
          type="range"
          id="vibranceWeight"
          min="1"
          max="10"
          value={vibranceWeight}
          onChange={(e) => handleWeightChange('vibrance', parseInt(e.target.value))}
          className="w-full"
        />
        <span>{vibranceWeight}</span>
      </div>

      <div className="mb-4">
        <label htmlFor="funkynessWeight" className="block mb-2 text-sm font-medium">Funkyness Weight (1-10)</label>
        <input
          type="range"
          id="funkynessWeight"
          min="1"
          max="10"
          value={funkynessWeight}
          onChange={(e) => handleWeightChange('funkyness', parseInt(e.target.value))}
          className="w-full"
        />
        <span>{funkynessWeight}</span>
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
        <label htmlFor="volume" className="block mb-2 text-sm font-medium">Gradient Mid Point</label>
        <input
          type="range"
          id="gradMidPoint"
          min="0"
          max="1"
          step="0.1"
          value={currentTheme.gradMidPoint}
          onChange={(e) => handleGlobalOptionChange('gradMidPoint', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>


      
      <div className="mb-4">
        <label htmlFor="cardStyle" className="block mb-2 text-sm font-medium">Card Style</label>
        <select
          id="cardStyle"
          value={currentTheme.cardStyle || 'formal'}
          onChange={(e) => handleGlobalOptionChange('cardStyle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(cardThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="cardImageScrollStyle" className="block mb-2 text-sm font-medium">Card Image Scroll Style</label>
        <select
          id="cardImageScrollStyle"
          value={currentTheme.cardImageScrollStyle || 'none'}
          onChange={(e) => handleGlobalOptionChange('cardImageScrollStyle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(cardImageScrollThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="cardImageHoverStyle" className="block mb-2 text-sm font-medium">Card Image Hover Style</label>
        <select
          id="cardImageHoverStyle"
          value={currentTheme.cardImageHoverThemes || 'none'}
          onChange={(e) => handleGlobalOptionChange('cardImageHoverThemes', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(cardImageHoverThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>

      
      <div className="mb-4">
        <label htmlFor="heroBackgroundStyle" className="block mb-2 text-sm font-medium">Hero Background Style</label>
        <select
          id="heroBackgroundStyle"
          value={currentTheme.heroBackgroundStyle || 'gradient'}
          onChange={(e) => handleGlobalOptionChange('heroBackgroundStyle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(heroBackgroundThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>


      <div className="mb-4">
        <label htmlFor="heroTextImageStyle" className="block mb-2 text-sm font-medium">Hero Text Image Style</label>
        <select
          id="heroTextImageStyle"
          value={currentTheme.heroTextImageStyle || 'none'}
          onChange={(e) => handleGlobalOptionChange('heroTextImageStyle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(heroTextImageThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="heroLayoutStyle" className="block mb-2 text-sm font-medium">Hero Layout Style</label>
        <select
          id="heroLayoutStyle"
          value={currentTheme.heroLayoutStyle || 'center'}
          onChange={(e) => handleGlobalOptionChange('heroLayoutStyle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(heroLayoutThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>


      <div className="mb-4">
        <label htmlFor="mixBlendMode" className="block mb-2 text-sm font-medium">Mix Blend Mode</label>
        <select
          id="mixBlendMode"
          value={currentTheme.mixBlendMode}
          onChange={(e) => handleGlobalOptionChange('mixBlendMode', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(mixBlendThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>

      
      <div className="mb-4">
        <label htmlFor="fontFamilyPrimary" className="block mb-2 text-sm font-medium">Cursor</label>
        <select
          id="fontFamilyPrimary"
          value={currentTheme.cursor || 'dot'}
          onChange={(e) => handleGlobalOptionChange('cursor', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(cursorThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="fontFamilyPrimary" className="block mb-2 text-sm font-medium">Font Family Primary</label>
        <select
          id="fontFamilyPrimary"
          value={currentTheme.fontFamilyPrimary || 'sans'}
          onChange={(e) => handleGlobalOptionChange('fontFamilyPrimary', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(typographyThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
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
          {Object.entries(typographyThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>


      {/* fontScale:fontSizeThemes.fluid,
    fluidFontScale:{
      fontSizeMin: fluidFontSizeThemes.fontSizeMin,
      fontSizeMax: fluidFontSizeThemes.fontSizeMax,
      fontRatioMin: fluidFontSizeThemes.fontRatioMin,
      fontRatioMax: fluidFontSizeThemes.fontRatioMax,
      fontWidthMin: fluidFontSizeThemes.fontWidthMin,
      fontWidthMax: fluidFontSizeThemes.fontWidthMax,
      variableUnit: fluidFontSizeThemes.variableUnit
    }, */}

      <div className="mb-4">
        <label htmlFor="fontScale" className="block mb-2 text-sm font-medium">Font Scale</label>
        <select
          id="fontScale"
          value={currentTheme.fontScale || 'fluid'}
          onChange={(e) => handleGlobalOptionChange('fontScale', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(fontSizeThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>


      <div className="mb-4">
        <label htmlFor="fontRatioMin" className="block mb-2 text-sm font-medium">Font Ratio Min</label>
        <input
          type="range"
          id="fontRatioMin"
          min="0"
          max="5"
          step="0.01"
          value={currentTheme.fluidFontRatioMin}
          onChange={(e) => handleGlobalOptionChange('fluidFontRatioMin', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fontRatioMax" className="block mb-2 text-sm font-medium">Font Ratio Max</label>
        <input
          type="range"
          id="fontRatioMax"
          min="0"
          max="5"
          step="0.01"
          value={currentTheme.fluidFontRatioMax}
          onChange={(e) => handleGlobalOptionChange('fluidFontRatioMax', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
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
          {Object.entries(pageTransitionThemes).map(([key, value]) => (
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
          {Object.entries(textHighlightThemes).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
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
          {Object.entries(textAnimationThemes).map(([key, value]) => (
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
          {Object.entries(pageWidthThemes).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      {/* Helper Themes option */}
      {/* <div className="mb-4">
        <label htmlFor="helpers" className="block mb-2 text-sm font-medium">Helpers</label>
        {Object.entries(helpers).map(([key, value]) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              checked={currentTheme.helpers.includes(key)}
              onChange={(e) => handleGlobalOptionChange('helpers', e.target.checked ? [...currentTheme.helpers, key] : currentTheme.helpers.filter(theme => theme !== key))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium">{value}</span>
          </label>
        ))}
      </div> */}



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