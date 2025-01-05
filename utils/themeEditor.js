import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  themes,
  typographyThemes,
  textAnimationThemes,
  textHighlightThemes,
  pageTransitionThemes,
  pageWidthThemes,
  cardThemes,
  cardHoverThemes,
  heroTypeThemes,
  heroBackgroundThemes,
  heroHeightThemes,
  heroTextImageThemes,
  heroTextCompositionThemes,
  heroTextPositionThemes,
  navigationPositionThemes,
  navigationDragThemes,
  fontSizeThemes,
  footerOptions,
  bodyTextAlign,
  navigationStyleThemes,
  navigationOptions,
  cursorThemes,
  gridThemes,
  mixBlendThemes,
} from "./theme";
import { useThemeContext } from "../components/context/themeContext";
import { Leva, useControls, button, folder } from "leva";
import ThemeModal from "../components/base/theme-modal";
import { toCamelCase } from "../components/utils/toCamelCase";
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
      console.log("Best theme found:", bestTheme); // Log the best theme
    }
  }

  return bestTheme ? themes[bestTheme] : null; // Return the theme object instead of just the name
};

export default function ThemeEditor({ customThemes }) {
  const { currentTheme, updateTheme } = useThemeContext();

  const [customTheme, setCustomTheme] = useState(null);
  const [savedThemes, setSavedThemes] = useState([]);
  const [themeName, setThemeName] = useState("");
  const [themeKey, setThemeKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [selectedCursors, setSelectedCursors] = useState(
    currentTheme.cursor || []
  ); // Initialize with current theme cursor
  const currentThemeRef = useRef(currentTheme); // Create a ref to hold the current theme


  // Update the ref whenever currentTheme changes
  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  // State for slider values
  const [colorWeight, setColorWeight] = useState(5);
  const [vibranceWeight, setVibrancyWeight] = useState(5);
  const [funkynessWeight, setFunkynessWeight] = useState(5);

  // Function to update the current theme based on slider values
  const updateCurrentTheme = useCallback(() => {
    const bestTheme = getBestTheme(
      colorWeight,
      vibranceWeight,
      funkynessWeight
    );
    if (bestTheme) {
      updateTheme(bestTheme); // Update the theme with the best match
      applyCurrentTheme(bestTheme);
    }
  }, [colorWeight, vibranceWeight, funkynessWeight, updateTheme]);

  const setStyleProerties = (theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme.key);

    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === "string" && value.startsWith("#")) {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });

    //root.style.setProperty('--mix-blend-mode', theme.imageMixBlendMode || 'normal');
    root.style.setProperty("--text-highlight", theme.textHighlight || "text");
    root.style.setProperty(
      "--text-animation",
      theme.textAnimation || "linesup"
    );
    root.style.setProperty(
      "--text-animation-sec",
      theme.textAnimationSec || "linesup"
    );
    root.style.setProperty("--page-transition", theme.pageTransition || "fade");
    root.style.setProperty("--page-width", theme.pageWidth || "large");

    root.style.setProperty(
      "--font-family-primary",
      theme.fontFamilyPrimary || "sans-serif"
    );
    root.style.setProperty(
      "--font-family-secondary",
      theme.fontFamilySecondary || "sans-serif"
    );

    root.style.setProperty("--cursor", theme.cursor || "dot");
    root.style.setProperty("--font-ratio-min", theme.fluidFontRatioMin || 1.2);
    root.style.setProperty("--font-ratio-max", theme.fluidFontRatioMax || 1.25);
  };

  const applyCurrentTheme2 = useCallback(
    (key, value) => {
      const mergedTheme = { ...customTheme, [key]: value };
      currentThemeRef.current = mergedTheme;

      updateTheme(mergedTheme);
      setStyleProerties(mergedTheme);
      //localStorage.setItem("currentTheme", JSON.stringify(mergedTheme));
    },
    [currentTheme]
  );

  const applyCurrentTheme = useCallback(
    (key, value) => {
     //console.log("apply current:", key);

      // if (!updatedTheme || typeof updatedTheme !== 'object') {
      //   ccurrentThemeRef.current = currentTheme;onsole.error('Invalid theme object:', updatedTheme);
      //   return;
      // }

      // // Merge the updated theme with the current theme to retain existing values
      // const mergedTheme = { ...currentTheme, ...updatedTheme };
      // updateTheme(mergedTheme); // Update the theme with the merged values

      const mergedTheme = { ...currentTheme, [key]: value };
      //updateTheme(mergedTheme); // Update the theme with the new values

      const root = document.documentElement;
      root.setAttribute("data-theme", mergedTheme.key);

      Object.entries(mergedTheme).forEach(([key, value]) => {
        if (typeof value === "string" && value.startsWith("#")) {
          const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
          root.style.setProperty(cssVar, value);
        }
      });
      
      // Apply global options
      // root.style.setProperty('--mix-blend-mode', mergedTheme.imageMixBlendMode || 'normal');
      // root.style.setProperty('--text-highlight', mergedTheme.textHighlight || 'text');
      // root.style.setProperty('--text-animation', mergedTheme.textAnimation || 'linesup');
      // root.style.setProperty('--page-transition', mergedTheme.pageTransition || 'fade');
      // root.style.setProperty('--page-width', mergedTheme.pageWidth || 'fluid');

      // root.style.setProperty('--font-family-primary', mergedTheme.fontFamilyPrimary || 'sans-serif');
      // root.style.setProperty('--font-family-secondary', mergedTheme.fontFamilySecondary || 'sans-serif');

      // root.style.setProperty('--cursor', mergedTheme.cursor || 'dot');
      // root.style.setProperty('--font-ratio-min', mergedTheme.fluidFontRatioMin || 1.2);
      // root.style.setProperty('--font-ratio-max', mergedTheme.fluidFontRatioMax || 1.25);

      //localStorage.setItem("currentTheme", JSON.stringify(mergedTheme));
    },
    [updateTheme, currentTheme]
  );

  useEffect(() => {
    // const storedTheme = localStorage.getItem('currentTheme');
    // if (storedTheme) {
    //   applyCurrentTheme(JSON.parse(storedTheme));
    // } else {
    //   applyCurrentTheme(themes.light);
    // }

    // const storedCustomTheme = localStorage.getItem('customTheme');
    // if (storedCustomTheme) {
    //   setCustomTheme(JSON.parse(storedCustomTheme));
    // }

    // Call updateCurrentTheme only when sliders change
    updateCurrentTheme();
  }, [colorWeight, vibranceWeight, funkynessWeight, updateCurrentTheme]);

  // Log themeName and themeKey whenever they change
  useEffect(() => {
  //  console.log("Updated themeName:", themeName);
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    //console.log("Updated themeKey:", themeKey);
  }, [themeKey]);


    // Function to handle theme change
    const handleCustomThemeChange = (selectedThemeKey) => {
      const selectedTheme = customThemes.find(theme => theme.data.key === selectedThemeKey);
      if (selectedTheme) {
          console.log("Selected Theme:", selectedTheme); // Log the selected theme for debugging
          updateTheme(selectedTheme); // Update the theme with the best match
          applyCurrentTheme(selectedTheme);
      } else {
          console.error("Theme not found for key:", selectedThemeKey); // Log an error if the theme is not found
      }
  };

  const handleThemeChange = (e) => {
    const selectedThemeKey = e.target.value;
    let newTheme;
    newTheme = { ...themes[selectedThemeKey], key: selectedThemeKey };

    updateTheme(newTheme);
    applyCurrentTheme(newTheme);

    console.log('NEW###', newTheme); // Log the new theme for debugging
    console.log('NEWC###', currentThemeRef.current.data.key); // Log the new theme for debugging

  };

  // Save current theme as a new theme
  const saveNewTheme = async (name) => {
    setIsSaving(true);
    setSaveError(null);
    try {
        const customKey = toCamelCase(name); // Convert name to camelCase and remove spaces
 
        const themeToSave = {
            name: name, // Use the latest theme name
            data: {
              ...currentThemeRef.current.data,
              key: customKey,
          },
        };

        console.log("Theme to save data:", themeToSave.data); // Log immediately after creation
                console.log("Current theme reference:", currentThemeRef.current.data); // Log the current theme ref for debugging

        const response = await fetch('/api/save-new-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(themeToSave), // Send the updated theme data
        });

        if (!response.ok) throw new Error('Failed to save theme');
        console.log('Theme saved successfully', themeToSave);
        // Optionally, refresh the theme list or update state here

    } catch (error) {
        console.error('Error saving theme:', error);
        setSaveError(error.message);
    } finally {
        setIsSaving(false);
    }
};
  // Delete a theme from Contentful
  const deleteTheme = async (key) => {
    try {
      // Fetch all themes to find the entry ID by theme name
      const response = await fetch("/api/get-themes"); // Ensure this endpoint returns all themes
      if (!response.ok) throw new Error("Failed to fetch themes");

      const data = await response.json();
      const themeToDelete = data.themes.find((theme) => theme.data.key === key); // Find the theme by name

      if (!themeToDelete) {
        console.error("Theme not found:", themeKey);
        return;
      }

      // Now delete the theme using the entry ID
      const deleteResponse = await fetch(
        `/api/delete-theme/${themeToDelete.id}`,
        { method: "DELETE" }
      );
      if (!deleteResponse.ok) throw new Error("Failed to delete theme");

      console.log("Theme deleted successfully");
      // fetchThemes(); // Refresh the list of themes
    } catch (error) {
      console.error("Error deleting theme:", error);
    }
  };

  const saveThemeToContentful = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const themeToSave = currentThemeRef.current; // Use the ref to get the latest theme
      console.log("Saving theme to Contentful:", themeToSave);

      const response = await fetch("/api/save-theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(themeToSave),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save theme: ${errorData.message}`);
      }
      console.log("Theme saved to Contentful successfully");
      // localStorage.setItem('currentTheme', JSON.stringify(currentTheme));
      // localStorage.setItem('themeLastFetched', Date.now().toString());
    } catch (error) {
      console.error("Error saving theme to Contentful:", error.message);
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApply = () => {
    saveThemeToContentful();
  };

  const handleWeightChange = (metricType, value) => {
    switch (metricType) {
      case "color":
        setColorWeight(value);
        break;
      case "vibrance":
        setVibrancyWeight(value); // Ensure this updates the state
        break;
      case "funkyness":
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
    //   themeName: {
    //     value: themeName,
    //     label: "Name",
    //     onChange: (value) => { // Use onChange instead of onInput
    //         console.log("Theme Name Updated:", value); // Debugging log
    //         setThemeName(value); // Ensure this updates the state
    //     },
    // },
    // themeKey: {
    //     value: themeKey,
    //     label: "Key",
    //     onChange: (value) => { // Use onChange instead of oninput
    //         console.log("Theme Key Updated:", value); // Debugging log
    //         setThemeKey(value); // Ensure this updates the state
    //     },
    // },
    saveTheme: button(
      () => {
        setIsModalOpen(true);
        // Call saveNewTheme with the latest values
      },
      {
        label: "Save Current Theme",
      }
    ),

    deleteTheme: button(
      () => {
        setIsModalOpen(true);
        // Call saveNewTheme with the latest values
      },
      {
        label: "Save Current Theme",
      }
    ),
    custom: {
      options: customThemes.map((theme) => theme.name), // Use theme keys for options
      value: 'select theme', // Set the current theme key as the default value
      label: "Custom",
      onChange: (value) => {
        console.log("Selected Theme Changed:", value);
        handleCustomThemeChange({ target: { value } }); // Call existing handler
      },
    },
    presets: {
      options: Object.keys(themes),
      value: currentTheme.data.key,
      label: "Presets",
      onChange: (value) => {
        handleThemeChange({ target: { value } }); // Call existing handler
      },
    },
    "Theme Selection": folder({
      colorWeight: {
        value: colorWeight,
        min: 1,
        max: 10,
        label: "Color Weight",
        onChange: (value) => {
          handleWeightChange(value);
          // updateCurrentTheme(); // Call to update the theme based on new weight
        },
      },
      vibranceWeight: {
        value: vibranceWeight,
        min: 1,
        max: 10,
        label: "Vibrance Weight",
        onChange: (value) => {
          handleWeightChange(value);
          // updateCurrentTheme(); // Call to update the theme based on new weight
        },
      },
      funkynessWeight: {
        value: funkynessWeight,
        min: 1,
        max: 10,
        label: "Funkyness Weight",
        onChange: (value) => {
          handleWeightChange(value);
          //   updateCurrentTheme(); // Call to update the theme based on new weight
        },
      },
    }),
    Audio: folder({
      audio: {
        value: currentTheme.audio,
        label: "Audio",
        onChange: (value) => applyCurrentTheme2("audio", value), // Call existing handler
      },
      volume: {
        value: currentTheme.volume,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Volume",
        onChange: (value) => applyCurrentTheme2("volume", value), // Call existing handler
      },
    }),
    Globals: folder({
      pageWidth: {
        options: Object.keys(pageWidthThemes),
        value: currentTheme.pageWidth,
        label: "Page Width",
        onChange: (value) => applyCurrentTheme2("pageWidth", value), // Call existing handler
      },
      cursor: {
        options: Object.keys(cursorThemes),
        value: currentTheme.cursor,
        label: "Cursor",
        onChange: (value) => applyCurrentTheme2("cursor", value), // Call existing handler
      },
    }),
    Animation: folder({
      pageTransition: {
        options: Object.keys(pageTransitionThemes),
        value: currentTheme.pageTransition,
        label: "Page Transition",
        onChange: (value) => applyCurrentTheme2("pageTransition", value), // Call existing handler
      },
    }),
    Typography: folder({
      textAnimation: {
        options: Object.keys(textAnimationThemes),
        value: currentTheme.textAnimation,
        label: "Text Animation",
        onChange: (value) => applyCurrentTheme2("textAnimation", value), // Call existing handler
      },
      textAnimationSec: {
        options: Object.keys(textAnimationThemes),
        value: currentTheme.textAnimationSec,
        label: "Text Anim Sec",
        onChange: (value) => applyCurrentTheme2("textAnimationSec", value), // Call existing handler
      },
      fontFamilyPrimary: {
        options: Object.values(typographyThemes),
        value: currentTheme.fontFamilyPrimary,
        label: "Font Family Primary",
        onChange: (value) => applyCurrentTheme2("fontFamilyPrimary", value), // Call existing handler
      },
      fontFamilySecondary: {
        options: Object.values(typographyThemes),
        value: currentTheme.fontFamilySecondary,
        label: "Font Family Secondary",
        onChange: (value) => applyCurrentTheme2("fontFamilySecondary", value), // Call existing handler
      },
      fontSizeMax: {
        value: currentTheme.fluidFontRatioMax,
        min: 0,
        max: 1.3,
        step: 0.01,
        label: "Fluid Max",
        onChange: (value) => applyCurrentTheme2("fluidFontRatioMax", value), // Call existing handler
      },
      fontSizeMin: {
        value: currentTheme.fluidFontRatioMin,
        min: 0,
        max: 1.3,
        step: 0.01,
        label: "Fluid Min",
        onChange: (value) => applyCurrentTheme2("fluidFontRatioMin", value), // Call existing handler
      },
      textHighlight: {
        options: Object.values(textHighlightThemes),
        value: currentTheme.textHighlight,
        label: "Text Highlight",
        onChange: (value) => applyCurrentTheme2("textHighlight", value), // Call existing handler
      },
      "Body Text": folder({
        dropCap: {
          value: currentTheme.bodyTextStyle?.dropCap, // Default to false
          label: "Drop Cap",
          onChange: (value) =>
            applyCurrentTheme2("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              dropCap: value,
            }), // Update handler
        },
        indent: {
          value: currentTheme.bodyTextStyle?.indent, // Default to false
          label: "Indent",
          onChange: (value) =>
            applyCurrentTheme2("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              indent: value,
            }), // Update handler
        },
        highlight: {
          value: currentTheme.bodyTextStyle?.highlight, // Default to false
          label: "Highlight",
          onChange: (value) =>
            applyCurrentTheme2("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              highlight: value,
            }), // Update handler
        },
        align: {
          value: currentTheme.bodyTextStyle?.align, // Default to false
          options: Object.values(bodyTextAlign),
          label: "Align",
          onChange: (value) =>
            applyCurrentTheme2("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              align: value,
            }), // Update handler
        },
      }),
    }),
    Navigation: folder({
      navigationPosition: {
        options: Object.keys(navigationPositionThemes),
        value: currentTheme.navPosition,
        label: "Position",
        onChange: (value) => applyCurrentTheme2("navPosition", value),
      },
      navigationStyle: {
        options: Object.keys(navigationStyleThemes),
        value: currentTheme.navStyle,
        label: "Style",
        onChange: (value) => applyCurrentTheme2("navStyle", value),
      },
      floating: {
        value: currentTheme.navFloating,
        label: "floating",
        onChange: (value) => applyCurrentTheme2("navFloating", value),
      },
      fixed: {
        value: currentTheme.navFixed,
        label: "fixed",
        onChange: (value) => applyCurrentTheme2("navFixed", value),
      },
      // logoFill: {
      //   value: currentTheme.logoFill,
      //   label: 'logo fill',
      //   onChange: (value) => applyCurrentTheme2('logoFill',  value )
      // },
      border: {
        value: currentTheme.navBorder,
        label: "border",
        onChange: (value) => applyCurrentTheme2("navBorder", value),
      },
      shadow: {
        value: currentTheme.navShadow,
        label: "shadow",
        onChange: (value) => applyCurrentTheme2("navShadow", value),
      },
      shadowColor: {
        value: currentTheme.navShadowColor,
        label: "shadow color",
        onChange: (value) => applyCurrentTheme2("navShadowColor", value),
      },
      shadowSize: {
        options: Object.keys(navigationOptions?.shadowSize),
        value: currentTheme.navShadowSize,
        label: "sahdow size",
        onChange: (value) => applyCurrentTheme2("navShadowSize", value),
      },
    }),
    Footer: folder({
      fixed: {
        value: currentTheme.footerOptions?.fixed,
        label: "fixed",
        onChange: (value) =>
          applyCurrentTheme2("footerPosition", {
            ...currentTheme.footerOptions,
            fixed: value,
          }),
      },
    }),
    Hero: folder({
      height: {
        options: Object.keys(heroHeightThemes),
        value: currentTheme.heroHeight,
        label: "Height",
        onChange: (value) => applyCurrentTheme2("heroHeight", value),
      },
      heroType: {
        options: Object.keys(heroTypeThemes),
        value: currentTheme.heroType,
        label: "Type",
        onChange: (value) => applyCurrentTheme2("heroType", value),
      },
      heroBackgroundStyle: {
        options: Object.keys(heroBackgroundThemes),
        value: currentTheme.heroBackgroundStyle,
        label: "Bg",
        onChange: (value) => applyCurrentTheme2("heroBackgroundStyle", value),
      },
      heroGradMidPoint: {
        value: currentTheme.heroGradMidPoint,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Gradient Mid Point",
        onChange: (value) => applyCurrentTheme2("heroGradMidPoint", value),
      },
      heroTextImageStyle: {
        options: Object.keys(heroTextImageThemes),
        value: currentTheme.heroTextImageStyle,
        label: "Images",
        onChange: (value) => applyCurrentTheme2("heroTextImageStyle", value),
      },
      heroTextLayoutStyle: {
        options: Object.keys(heroTextPositionThemes),
        value: currentTheme.heroTextPosition || "bottom-left",
        label: "TextLayout",
        onChange: (value) => applyCurrentTheme2("heroTextPosition", value),
      },
      heroTextCompStyle: {
        options: Object.keys(heroTextCompositionThemes),
        value: currentTheme.heroTextComposition,
        label: "Compo",
        onChange: (value) => applyCurrentTheme2("heroTextPosition", value),
      },
    }),
    Cards: folder({
      layout: {
        options: Object.keys(cardThemes),
        value: currentTheme.cardLayout || "reone",
        label: "layout",
        onChange: (value) => applyCurrentTheme2("cardLayout", value),
      },
      hover: {
        options: Object.keys(cardHoverThemes),
        value: currentTheme.cardHover,
        label: "hover",
        onChange: (value) => applyCurrentTheme2("cardHover", value),
      },
      grid: {
        options: Object.keys(gridThemes),
        value: currentTheme.cardGrid || "bento1",
        label: "grid",
        onChange: (value) => applyCurrentTheme2("cardGrid", value),
      },
    }),
    Iamges: folder({
      parallax: {
        value: currentTheme.imageParallax,
        label: "parallax",
        onChange: (value) => applyCurrentTheme2("imageParallax", value),
      },
      mixBlendMode: {
        options: Object.keys(mixBlendThemes),
        value: currentTheme.imageMixBlendMode,
        label: "Blend Mode",
        onChange: (value) => applyCurrentTheme2("imageMixBlendMode", value),
      },
    }),
    Color2: folder({
      accentPri: {
        value: currentTheme.accentPri,
        label: "Accent Primary",
        onChange: (newValue) => applyCurrentTheme2("accentPri", newValue),
      },
      accentSec: {
        value: currentTheme.accentSec,
        label: "Accent Secondary",
        onChange: (newValue) => applyCurrentTheme2("accentSec", newValue),
      },
      backgroundColor: {
        value: currentTheme.backgroundColor,
        label: "Background Color",
        onChange: (newValue) => applyCurrentTheme2("backgroundColor", newValue),
      },
      backgroundColorInv: {
        value: currentTheme.backgroundColorInv,
        label: "Background Color Inverted",
        onChange: (newValue) =>
          applyCurrentTheme2("backgroundColorInv", newValue),
      },
      bodyBackgroundColor: {
        value: currentTheme.bodyBackgroundColor,
        label: "Body Background Color",
        onChange: (newValue) =>
          applyCurrentTheme2("bodyBackgroundColor", newValue),
      },
      gradStart: {
        value: currentTheme.gradStart,
        label: "Gradient Start",
        onChange: (newValue) => applyCurrentTheme2("gradStart", newValue),
      },
      gradStop: {
        value: currentTheme.gradStop,
        label: "Gradient Stop",
        onChange: (newValue) => applyCurrentTheme2("gradStop", newValue),
      },
      headingColor: {
        value: currentTheme.headingColor,
        label: "Heading Color",
        onChange: (newValue) => applyCurrentTheme2("headingColor", newValue),
      },
      navBg: {
        value: currentTheme.navBg,
        label: "Navigation Background",
        onChange: (newValue) => applyCurrentTheme2("navBg", newValue),
      },
      subtextColor: {
        value: currentTheme.subtextColor,
        label: "Subtext Color",
        onChange: (newValue) => applyCurrentTheme2("subtextColor", newValue),
      },
      surface1: {
        value: currentTheme.surface1,
        label: "Surface 1",
        onChange: (newValue) => applyCurrentTheme2("surface1", newValue),
      },
      surface2: {
        value: currentTheme.surface2,
        label: "Surface 2",
        onChange: (newValue) => applyCurrentTheme2("surface2", newValue),
      },
      surface3: {
        value: currentTheme.surface3,
        label: "Surface 3",
        onChange: (newValue) => applyCurrentTheme2("surface3", newValue),
      },
      textAccent: {
        value: currentTheme.textAccent,
        label: "Text Accent",
        onChange: (newValue) => applyCurrentTheme2("textAccent", newValue),
      },
      textColor: {
        value: currentTheme.textColor,
        label: "Text Color",
        onChange: (newValue) => applyCurrentTheme2("textColor", newValue),
      },
      textColorInv: {
        value: currentTheme.textColorInv,
        label: "Text Color Inverted",
        onChange: (newValue) => applyCurrentTheme2("textColorInv", newValue),
      },
    }),

    save: button(
      () => {
        handleApply();
      },
      {
        label: "Save Theme to Custom?",
      }
    ),
  };

  // Now use controls in useControls
  const values = useControls(() => controls);

  useEffect(() => {
    const updatedTheme = { ...currentTheme, ...values };
   // console.log("Updated theme values:", updatedTheme);
    if (JSON.stringify(updatedTheme) !== JSON.stringify(currentTheme)) {
      applyCurrentTheme(updatedTheme);
    }
  }, [values, currentTheme, applyCurrentTheme]);

  useEffect(() => {
    if (saveError) {
      console.error("Error saving theme:", saveError);
    }
  }, [saveError]);

  return (
    <>
      <ThemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={saveNewTheme}
      />
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
}
