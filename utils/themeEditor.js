"use client";
import React, { useState, useEffect, useRef } from "react";
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
  heroCssGradientThemes,
  heroHeightThemes,
  heroTextImageThemes,
  heroTextCompositionThemes,
  heroTextPositionThemes,
  heroCssGradientRadialPositionThemes,
  navigationPositionThemes,
  navigationDragThemes,
  fontScaleThemes,
  bodyTextAlign,
  navigationStyleThemes,
  navigationOptions,
  cursorThemes,
  gridThemes,
  mixBlendThemes,
  textHighlightOutlineThemes,
  textHighlightOutlineNeumorphicStartColor,
  textHighlightOutlineNeumorphicEndColor,
} from "./theme";
import { useThemeContext } from "../components/context/themeContext";
import { Leva, useControls, button, folder } from "leva";
import ThemeModal from "../components/base/theme-modal";
import { toCamelCase } from "../components/utils/toCamelCase";
import Modal, {
  ModalDirection,
  ModalPosition,
  ModalWidth,
} from "../components/base/modal";
import ButtonAlt, { ButtonType } from "../components/base/button-alt";
import { useToast } from "../components/context/toastContext";


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
  const [themeName, setThemeName] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const presetThemes = themes;
  const showToast = useToast();

  
  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Ref use to manage live updates to currentTheme for save to CMS
  const currentThemeRef = useRef(currentTheme);

  //  Update the ref whenever currentTheme changes
  // TODO: Align theme format This needs to use dataa from custom or defaut
  useEffect(() => {
    console.log("custom", customThemes);
    updateTheme(currentTheme);
    currentThemeRef.current = currentTheme;
    setStyleProperties(currentTheme);
  }, []);

  // State for slider values
  // const [colorWeight, setColorWeight] = useState(5);
  // const [vibranceWeight, setVibrancyWeight] = useState(5);
  // const [funkynessWeight, setFunkynessWeight] = useState(5);

  const setStyleProperties = (theme) => {
    const root = document.documentElement;

    // Check if theme is defined
    if (!theme) {
      console.warn("Theme is not defined. Exiting setStyleProperties.");
      return; // Exit the function if theme is not defined
    }

    //console.log("Setting props -----", theme);

    // Color properties
    root.style.setProperty("--text-highlight", theme.data.textHighlight || "text");
    root.style.setProperty("--text-animation", theme.data.textAnimation || "linesup");
    root.style.setProperty("--text-animation-sec", theme.data.textAnimationSec || "linesup");
    root.style.setProperty("--page-transition", theme.data.pageTransition || "fade");
    root.style.setProperty("--page-width", theme.data.pageWidth || "large");

    // Non-color theme properties
    root.style.setProperty("--cursor", theme.data.cursor || "dot");

    root.style.setProperty("--font-family-primary", theme.data.fontFamilyPrimary || "sans-serif");
    root.style.setProperty("--font-family-secondary", theme.data.fontFamilySecondary || "sans-serif");

    root.style.setProperty("--font-scale", theme.data.fontScale || 'fluid');
    root.style.setProperty("--font-ratio-min", theme.data.fluidFontRatioMin || 1.2);
    root.style.setProperty("--font-ratio-max", theme.data.fluidFontRatioMax || 1.25);
    root.style.setProperty("--body-text-indent", theme.data.bodyTextIndent || "false");

    // Additional properties
    root.style.setProperty("--body-background-color", theme.data.bodyBackgroundColor || "#ffffff");
    root.style.setProperty("--background-color", theme.data.backgroundColor || "#ffffff");
    root.style.setProperty("--surface1", theme.data.surface1 || "#ffffff");
    root.style.setProperty("--surface2", theme.data.surface2 || "#ffffff");
    root.style.setProperty("--surface3", theme.data.surface3 || "#ffffff");
    root.style.setProperty("--heading-color", theme.data.headingColor || "#000000");
    root.style.setProperty("--text-color", theme.data.textColor || "#000000");
    root.style.setProperty("--text-accent", theme.data.textAccent || "#000000");

    root.style.setProperty("--subtext-color", theme.data.subtextColor || "#000000");
    root.style.setProperty("--text-color-inv", theme.data.textColorInv || "#000000");
    root.style.setProperty("--nav-bg", theme.data.navBg || "#ffffff");
    root.style.setProperty("--accent-pri", theme.data.accentPri || "#000000");
    root.style.setProperty("--accent-sec", theme.data.accentSec || "#000000");
    root.style.setProperty("--grad-start", theme.data.gradStart || "#000000");
    root.style.setProperty("--grad-stop", theme.data.gradStop || "#000000");

    // Audio properties
    root.style.setProperty("--audio-enabled", theme.data.audioEnabled || "false");
    root.style.setProperty("--audio-volume", theme.data.audioVolume || 1);

    // Navigation properties
    root.style.setProperty("--nav-position", theme.data.navPosition || "topCenter");
    root.style.setProperty("--nav-style", theme.data.navStyle || "solid");
    root.style.setProperty("--nav-floating", theme.data.navFloating || "false");
    root.style.setProperty("--nav-fixed", theme.data.navFixed || "false");
    root.style.setProperty("--nav-border", theme.data.navBorder || "none");
    root.style.setProperty("--nav-shadow", theme.data.navShadow || "none");
    root.style.setProperty("--nav-shadow-color", theme.data.navShadowColor || "#000000");
    root.style.setProperty("--nav-shadow-size", theme.data.navShadowSize || "0px");
    root.style.setProperty("--nav-label-display", theme.data.navLabelDisplay || "icons");
    // Hero properties
    root.style.setProperty("--hero-height", theme.data.heroHeight || heroHeightThemes.full);
    root.style.setProperty("--hero-type", theme.data.heroType || heroTypeThemes.monks);
    root.style.setProperty("--hero-background-style", theme.data.heroBackgroundStyle || heroBackgroundThemes.gradient);
    root.style.setProperty("--hero-css-gradient", theme.data.heroCssGradient || heroCssGradientThemes.linearVertical);
    root.style.setProperty("--hero-css-gradient-angle", theme.data.heroCssGradientAngle || '90');
    root.style.setProperty("--hero-css-gradient-radial-position", theme.data.heroCssGradientRadialPosition || heroCssGradientRadialPositionThemes.center);
    root.style.setProperty("--hero-grad-mid-point", theme.data.heroGradMidPoint || 0.5);
    root.style.setProperty("--hero-text-image-style", theme.data.heroTextImageStyle || heroTextImageThemes.inline);
    root.style.setProperty("--hero-text-position", theme.data.heroTextPosition || heroTextPositionThemes.bottomLeft);
    root.style.setProperty("--hero-text-composition", theme.data.heroTextComposition || heroTextCompositionThemes.foo);
    root.style.setProperty("--text-highlight-outline", theme.data.textHighlightOutline || textHighlightOutlineThemes.none);
    root.style.setProperty("--text-highlight-outline-neumorphic-start-color", theme.data.textHighlightOutlineNeumorphicStartColor || '#FFFFFF');
    root.style.setProperty("--text-highlight-outline-neumorphic-end-color", theme.data.textHighlightOutlineNeumorphicEndColor || '#000000');

    // Card properties
    root.style.setProperty("--card-layout", theme.data.cardLayout || "default");
    root.style.setProperty("--card-hover", theme.data.cardHover || "none");
    root.style.setProperty("--card-grid", theme.data.cardGrid || "bento1");

    // Image properties
    root.style.setProperty("--image-parallax", theme.data.imageParallax || false);
    root.style.setProperty("--image-mix-blend-mode", theme.data.imageMixBlendMode || "normal");
  };

  const setSingleStyleProperty = (key, value) => {
    const root = document.documentElement;
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

    // Set the CSS variable regardless of the value type
    root.style.setProperty(cssVar, value);
  };

  // Live udates to the current theme.
  // These changes will be lost on global theme change
  // Save as custom thmeme to retain changes
  const updateThemeProp = (key, value) => {
    // This ref is used to store temp/live changes until save
    const { data, ...rest } = currentThemeRef.current; // Destructure to get data and rest

    const mergedTheme = {
        ...rest, // Keep the existing properties except for data
        data: {
            ...data, // Spread the existing data properties
            [key]: value, // Update the specific key with the new value
        },
    };

    currentThemeRef.current = mergedTheme; // Update the ref with the new merged theme
    setStyleProperties(mergedTheme); // Uncomment if you want to apply styles immediately
    //setSingleStyleProperty(key, value); // Update the specific style property
    updateTheme(mergedTheme); // Update the theme in your state or context

    // console.log('-------merged-', mergedTheme);
    // console.log('-------current-', currentThemeRef.current);
    // console.log('-------current3-', currentTheme);
  };

  const handleThemeChange = (e, target) => {
    const selectedThemeKey = e;

    console.log("key:", e);
    // console.log("source:", target);
    // Convert presetThemes object to an array and find the selected theme
    const selectedTheme = Object.values(target).find(
      (theme) => theme.data.key === selectedThemeKey
    );
    //console.log('Available theme keys:', Object.values(target).map(theme => theme.data.key));


    if (selectedTheme) {
      // Do something with the selected theme
      updateTheme(selectedTheme);
      setStyleProperties(selectedTheme);

      // Update the current theme reference only
      currentThemeRef.current = selectedTheme;
      // console.log("Selected theme:", selectedTheme);
      // console.log('Selected theme key:', selectedThemeKey);
    } else {
      console.error("Theme not found for key:", selectedThemeKey);
    }
  };

  // Save current theme as a new theme
  const saveNewTheme = async () => {
    console.log("#SNT", currentThemeRef.current); // Log the current theme data

    try {
      const customKey = toCamelCase(themeName); // Convert name to camelCase and remove spaces

      // Create a clean copy of the theme data

      const { key, ...rest } = currentThemeRef.current.data; // Destructure from currentThemeRef.current.data

      // Create a new object for saving
      const themeToSave = {
        name: themeName, // Use the latest theme name
        data: {
          ...rest, // Include all properties except the key
          key: customKey, // Set the new key
        },
      };

      // Log the theme object before saving
      console.log("Theme to save:", themeToSave);

      // Attempt to save the theme
      const response = await fetch("/api/save-new-theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(themeToSave), // Send the updated theme data
      });


      if (!response.ok) throw new Error("Failed to save theme");
      console.log("Theme saved successfully", themeToSave);
      showToast("Theme saved successfully", themeToSave.name);
      // Optionally, refresh the theme list or update state here
    } catch (error) {
      console.error("Error saving theme:", error);
      showToast("Error saving theme:", error);
    }
  };

  // Delete a theme from Contentful
  const deleteTheme = async () => {
    try {
      const entryIdToDelete = currentThemeRef.current.sys.id; // Get the entry ID
      console.log("Attempting to delete theme with entry ID:", entryIdToDelete);

      // Use the entry ID in the URL
      const deleteResponse = await fetch(
        `/api/delete-theme?id=${entryIdToDelete}`, // Send the entry ID as a query parameter
        { method: "DELETE" }
      );

      // Log the response status and body
      const responseBody = await deleteResponse.json();
      // console.log("Delete response status:", deleteResponse.status);
      // console.log("Delete response body:", responseBody);

      if (!deleteResponse.ok) {
        showToast(`Failed to delete theme: ${responseBody.message}`);
        throw new Error(`Failed to delete theme: ${responseBody.message}`);
      }

      console.log("Theme deleted successfully");
      showToast("Theme deleted successfully", themeToSave.name);

      // Optionally refresh the theme list or update state here
    } catch (error) {
      console.error("Error deleting theme:", error);
      showToast("Error deleting theme:", error);

    }
  };

  const saveThemeToContentful = async () => {
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
        showToast(`Failed to save theme: ${errorData.message}`);
        const errorData = await response.json();
        throw new Error(`Failed to save theme: ${errorData.message}`);
      }
      console.log("Theme saved to Contentful successfully");
      showToast("Theme saved to Contentful successfully");
    } catch (error) {
      console.error("Error saving theme to Contentful:", error.message);
      showToast("Error saving theme to Contentful:", error.message);
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
        setIsSaveModalOpen(true);
        // Call saveNewTheme with the latest values
      },
      {
        label: "Save Current Theme",
      }
    ),

    deleteTheme: button(
      () => {
        setIsDeleteModalOpen(true);
        // Call saveNewTheme with the latest values
      },
      {
        label: "Delete Current Theme",
      }
    ),
    custom: {
      options: Object.keys(customThemes).map(key => customThemes[key].data.key), // Map to get the data.key
      value: customThemes[0].data.key || '',
      label: "Custom",
        onChange: (value) => {
        handleThemeChange(value, customThemes);
      },
    },
    presets: {
      options: Object.keys(presetThemes),
      value: currentTheme.data.key,
      label: "Presets",
        onChange: (value) => {
        handleThemeChange(value, presetThemes);
      },
    },
    // "Theme Selection": folder({
    //   colorWeight: {
    //     value: colorWeight,
    //     min: 1,
    //     max: 10,
    //     label: "Color Weight",
    //     onChange: (value) => {
    //       handleWeightChange(value);
    //       // updateCurrentTheme(); // Call to update the theme based on new weight
    //     },
    //   },
    //   vibranceWeight: {
    //     value: vibranceWeight,
    //     min: 1,
    //     max: 10,
    //     label: "Vibrance Weight",
    //     onChange: (value) => {
    //       handleWeightChange(value);
    //       // updateCurrentTheme(); // Call to update the theme based on new weight
    //     },
    //   },
    //   funkynessWeight: {
    //     value: funkynessWeight,
    //     min: 1,
    //     max: 10,
    //     label: "Funkyness Weight",
    //     onChange: (value) => {
    //       handleWeightChange(value);
    //       //   updateCurrentTheme(); // Call to update the theme based on new weight
    //     },
    //   },
    // }),
    Audio: folder({
      audio: { 
        value: currentTheme.data.audioEnabled,
        label: "Audio",
        onChange: (value) => updateThemeProp("audioEnabled", value),
      },
      volume: { 
        value: currentTheme.data.audioVolume,
        min: 0, 
        max: 1, 
        step: 0.1, 
        label: "Volume",
        onChange: (value) => updateThemeProp("audioVolume", value), // Call existing handler
      },
    }),
    Globals: folder({
      pageWidth: { 
        options: Object.keys(pageWidthThemes), 
        value: currentTheme.data.pageWidth,
        label: "Page Width",
        onChange: (value) => updateThemeProp("pageWidth", value), // Call existing handler
      },
      cursor: { 
        options: Object.keys(cursorThemes), 
        value: currentTheme.data.cursor,
        label: "Cursor",
        onChange: (value) => updateThemeProp("cursor", value), // Call existing handler
      },
    }),
   Transition: folder({
      pageTransition: { 
        options: Object.keys(pageTransitionThemes), 
        value: currentTheme.data.pageTransition,
        label: "Page Transition",
        onChange: (value) => updateThemeProp("pageTransition", value), // Call existing handler
      },
    }),
    Typography: folder({
      textAnimation: { 
        options: Object.keys(textAnimationThemes), 
        value: currentTheme.textAnimation, 
        label: "Text Animation",
        onChange: (value) => updateThemeProp("textAnimation", value), // Call existing handler
      },
      textAnimationSec: { 
        options: Object.keys(textAnimationThemes), 
        value: currentTheme.data.textAnimationSec,
        label: "Text Anim Sec",
        onChange: (value) => updateThemeProp("textAnimationSec", value), // Call existing handler
      },
      fontFamilyPrimary: { 
        options: Object.values(typographyThemes), 
        value: currentTheme.data.fontFamilyPrimary,
        label: "Font Family Primary",
        onChange: (value) => updateThemeProp("fontFamilyPrimary", value), // Call existing handler
      },
      fontFamilySecondary: { 
        options: Object.values(typographyThemes), 
        value: currentThemeRef.fontFamilySecondary,
        label: "Font Family Secondary",
        onChange: (value) => updateThemeProp("fontFamilySecondary", value), // Call existing handler
      },
      
      
      
      fontScale: {
        options: Object.keys(fontScaleThemes),
        value: currentTheme.data.fontScale,
        label: "Scale",
        onChange: (value) => updateThemeProp("fontScale", value), // Call existing handler
      },



      fontSizeMax: {
        value: currentTheme.data.fluidFontRatioMax,
          min: 0, 
          max: 1.3, 
          step: 0.01, 
        label: "Fluid Max",
        onChange: (value) => updateThemeProp("fluidFontRatioMax", value), // Call existing handler
      },
      fontSizeMin: {
        value: currentTheme.data.fluidFontRatioMin,
        min: 0, 
        max: 1.3, 
        step: 0.01, 
        label: "Fluid Min",
        onChange: (value) => updateThemeProp("fluidFontRatioMin", value), // Call existing handler
    },
      textHighlight: { 
        options: Object.values(textHighlightThemes), 
        value: currentTheme.data.textHighlight || 'figma',
        label: "Text Highlight",
        onChange: (value) => updateThemeProp("textHighlight", value), // Call existing handler
      },
      textHighlightOutline: {
        options: Object.values(textHighlightOutlineThemes),
        value: currentTheme?.data?.textHighlightOutline || 'none',
        label: "Text Highlight Outline",
        onChange: (value) => updateThemeProp("textHighlightOutline", value), // Call existing handler
      },
      // textHighlightOutlineNeumorphicSize: {
      //   type: 'slider',
      //   min: 0,
      //   max: 100,
      //   step: 1,
      //   value: currentTheme?.data?.textHighlightOutlineNeumorphicSize || 0,
      //   label: "Text Highlight Outline Neumorphic Size",
      //   onChange: (value) => updateThemeProp("textHighlightOutlineNeumorphicSize", Number(value)), // Convert to number
      // },
      // textHighlightOutlineNeumorphicStartColor: {
      //   type: 'color',
      //   value: currentTheme?.data?.textHighlightOutlineNeumorphicStartColor || '#ffffff',
      //   label: "Text Highlight Outline Neumorphic Start Color",
      //   onChange: (value) => updateThemeProp("textHighlightOutlineNeumorphicStartColor", value),
      // },
      // textHighlightOutlineNeumorphicEndColor: {
      //   type: 'color',
      //   value: currentTheme?.data?.textHighlightOutlineNeumorphicEndColor || '#000000',
      //   label: "Text Highlight Outline Neumorphic End Color",
      //   onChange: (value) => updateThemeProp("textHighlightOutlineNeumorphicEndColor", value),
      // },
      
      
      "Body Text": folder({
        dropCap: { 
          value: currentTheme.data.bodyTextDropCap, // Default to false
          label: "Drop Cap",
          onChange: (value) => updateThemeProp("bodyTextDropCap", value), // Update handler
        },
        indent: { 
          value: currentTheme.data.bodyTextIndent, // Default to false
          label: "Indent",
          onChange: (value) => updateThemeProp("bodyTextIndent", value), // Update handler
        },
        highlight: { 
          value: currentTheme?.data?.bodyTextHighlight || 'figma', // Default to false
          label: "Highlight",
          onChange: (value) => updateThemeProp("bodyTextHighlight", value), // Update handler
        },
       align: { 
          value: currentTheme.data.bodyTextAlign, // Default to false
          options: Object.values(bodyTextAlign), 
          label: "Align",
          onChange: (value) => updateThemeProp("bodyTextAlign", value), // Update handler
        },
      }),
    }),
    Navigation: folder({
      navigationPosition: { 
        options: Object.keys(navigationPositionThemes), 
        value: currentTheme?.data?.navPosition || "topCenter",
        label: "Position",
        onChange: (value) => updateThemeProp("navPosition", value),
      },
      navigationStyle: { 
        options: Object.keys(navigationStyleThemes), 
        value: currentTheme.data.navStyle,
        label: "Style",
        onChange: (value) => updateThemeProp("navStyle", value),
      },
      labelDisplay: {
        options: Object.keys(navigationOptions?.labelDisplay),
        value: currentTheme?.data?.navLabelDisplay || "icons",
        label: "Label Display",
        onChange: (value) => updateThemeProp("navLabelDisplay", value),
      },
      floating: { 
        value: currentTheme.data.navFloating,
        label: "floating",
        onChange: (value) => updateThemeProp("navFloating", value),
      },
      fixed: { 
        value: currentTheme.data.navFixed,
        label: "fixed",
        onChange: (value) => updateThemeProp("navFixed", value),
      },
      // logoFill: { 
      //   value: currentTheme.data.logoFill,
      //   label: 'logo fill',
      //   onChange: (value) => updateThemeProp('logoFill',  value )
      // },
      border: { 
        value: currentTheme.data.navBorder,
        label: "border",
        onChange: (value) => updateThemeProp("navBorder", value),
      },
      shadow: { 
        value: currentTheme.data.navShadow,
        label: "shadow",
        onChange: (value) => updateThemeProp("navShadow", value),
      },
      shadowColor: { 
        value: currentTheme.data.navShadowColor,
        label: "shadow color",
        onChange: (value) => updateThemeProp("navShadowColor", value),
      },
      shadowSize: { 
        options: Object.keys(navigationOptions?.shadowSize), 
        value: currentTheme.data.navShadowSize,
        label: "sahdow size",
        onChange: (value) => updateThemeProp("navShadowSize", value),
      },
    }),
    Footer: folder({
      footerFixed: {
        value: currentTheme.data.footerFixed,
        label: "fixed",
        onChange: (value) => updateThemeProp("footerPosition", value),
      },
    }),
    Hero: folder({
        height: { 
          options: Object.keys(heroHeightThemes), 
        value: currentTheme.data.heroHeight,
        label: "Height",
        onChange: (value) => updateThemeProp("heroHeight", value),
        },
        heroType: { 
          options: Object.keys(heroTypeThemes), 
        value: currentTheme.data.heroType,
        label: "Type",
        onChange: (value) => updateThemeProp("heroType", value),
        },
        heroBackgroundStyle: { 
          options: Object.keys(heroBackgroundThemes), 
        value: currentTheme.data.heroBackgroundStyle,
        label: "Bg",
        onChange: (value) => updateThemeProp("heroBackgroundStyle", value),
      },
      heroCssGradient: {
        options: Object.keys(heroCssGradientThemes),
        value: currentTheme.data.heroCssGradient || heroCssGradientThemes.linear,
        label: "Css Gradient type",
        onChange: (value) => updateThemeProp("heroCssGradient", value),
      },
        heroCssGradientAngle: {
          value: currentTheme.data.heroCssGradientAngle || 45,
          min: 0,
          max: 180,
          step: 1,
          label: "Css Gradient Angle",
          onChange: (value) => updateThemeProp("heroCssGradientAngle", value),
          onEditStart: () => {}, // Empty function to enable continuous updates
          joystick: false, // Disable joystick mode for more precise control
          transient: true, // Enable real-time updates as the user drags
        },
      heroCssGradientRadialPosition: {
        options: Object.keys(heroCssGradientRadialPositionThemes),
        value: currentTheme.data.heroCssGradientRadialPosition,
        label: "Css Gradient Radial Position",
        onChange: (value) => updateThemeProp("heroCssGradientRadialPosition", value),
        },
        heroGradMidPoint: { 
        value: currentTheme.data.heroGradMidPoint,
          min: 0, 
          max: 1, 
          step: 0.1, 
        label: "Gradient Mid Point",
        onChange: (value) => updateThemeProp("heroGradMidPoint", value),
        },
        heroTextImageStyle: { 
          options: Object.keys(heroTextImageThemes), 
        value: currentTheme.data.heroTextImageStyle,
        label: "Images",
        onChange: (value) => updateThemeProp("heroTextImageStyle", value),
        },
        heroTextLayoutStyle: { 
          options: Object.keys(heroTextPositionThemes), 
        value: currentTheme.data.heroTextPosition || "bottom-left",
        label: "TextLayout",
        onChange: (value) => updateThemeProp("heroTextPosition", value),
        },
        heroTextCompStyle: { 
          options: Object.keys(heroTextCompositionThemes), 
        value: currentTheme.data.heroTextComposition,
        label: "Compo",
        onChange: (value) => updateThemeProp("heroTextPosition", value),
      },
    }),
    Cards: folder({
      layout: { 
        options: Object.keys(cardThemes), 
        value: currentTheme.data.cardLayout || "reone",
        label: "layout",
        onChange: (value) => updateThemeProp("cardLayout", value),
      },
      hover: { 
        options: Object.keys(cardHoverThemes), 
        value: currentTheme.data.cardHover,
        label: "hover",
        onChange: (value) => updateThemeProp("cardHover", value),
      },
      grid: { 
        options: Object.keys(gridThemes), 
        value: currentTheme?.data?.cardGrid || "bento1",
        label: "grid",
        onChange: (value) => updateThemeProp("cardGrid", value),
      },
    }),
    Iamges: folder({
      parallax: { 
        value: currentTheme?.data?.imageParallax || false,
        label: "parallax",
        onChange: (value) => updateThemeProp("imageParallax", value),
      },
      mixBlendMode: { 
        options: Object.keys(mixBlendThemes), 
        value: currentTheme.data.imageMixBlendMode,
        label: "Blend Mode",
        onChange: (value) => updateThemeProp("imageMixBlendMode", value),
      },
    }),
    Color: folder({
      accentPri: {
        value: currentTheme.data.accentPri,
        label: "Accent Primary",
        onChange: (newValue) => updateThemeProp("accentPri", newValue),
      },
      accentSec: {
        value: currentTheme.data.accentSec,
        label: "Accent Secondary",
        onChange: (newValue) => updateThemeProp("accentSec", newValue),
      },
      backgroundColor: {
        value: currentTheme.data.backgroundColor,
        label: "Background Color",
        onChange: (newValue) => updateThemeProp("backgroundColor", newValue),
      },
      backgroundColorInv: {
        value: currentTheme.data.backgroundColorInv,
        label: "Background Color Inverted",
        onChange: (newValue) => updateThemeProp("backgroundColorInv", newValue),
      },
      bodyBackgroundColor: {
        value: currentTheme.data.bodyBackgroundColor,
        label: "Body Background Color",
        onChange: (newValue) =>
          updateThemeProp("bodyBackgroundColor", newValue),
      },
            gradStart: {
        value: currentTheme.data.gradStart,
        label: "Gradient Start",
        onChange: (newValue) => updateThemeProp("gradStart", newValue),
      },
      gradStop: {
        value: currentTheme.data.gradStop,
        label: "Gradient Stop",
        onChange: (newValue) => updateThemeProp("gradStop", newValue),
      },
      headingColor: {
        value: currentTheme.data.headingColor,
        label: "Heading Color",
        onChange: (newValue) => updateThemeProp("headingColor", newValue),
      },
      navBg: {
        value: currentTheme.data.navBg,
        label: "Navigation Background",
        onChange: (newValue) => updateThemeProp("navBg", newValue),
      },
      subtextColor: {
        value: currentTheme.data.subtextColor,
        label: "Subtext Color",
        onChange: (newValue) => updateThemeProp("subtextColor", newValue),
      },
      surface1: {
        value: currentTheme.data.surface1,
        label: "Surface 1",
        onChange: (newValue) => updateThemeProp("surface1", newValue),
      },
      surface2: {
        value: currentTheme.data.surface2,
        label: "Surface 2",
        onChange: (newValue) => updateThemeProp("surface2", newValue),
      },
      surface3: {
        value: currentTheme.data.surface3,
        label: "Surface 3",
        onChange: (newValue) => updateThemeProp("surface3", newValue),
      },
      textAccent: {
        value: currentTheme.data.textAccent,
        label: "Text Accent",
        onChange: (newValue) => updateThemeProp("textAccent", newValue),
      },
      textColor: {
        value: currentTheme.data.textColor,
        label: "Text Color",
        onChange: (newValue) => updateThemeProp("textColor", newValue),
      },
      textColorInv: {
        value: currentTheme.data.textColorInv,
        label: "Text Color Inverted",
        onChange: (newValue) => updateThemeProp("textColorInv", newValue),
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

  //useControls must be defined
  const values = useControls(() => controls);

  useEffect(() => {
    console.log("curret", currentTheme);
    updateTheme(currentTheme);
    setStyleProperties(currentTheme);
    currentThemeRef.current = currentTheme;
  }, [updateTheme]);

  const handleSave = (event) => {
    event.preventDefault(); // Prevent default form submission
    saveNewTheme();
    setIsSaveModalOpen(false);
  };

  const handleDelete = (event) => {
    event.preventDefault(); // Prevent default form submission
    deleteTheme();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* <div className="fixed flex flex-col p-3 text-sm text-white bg-red-400 top-3 left-3 z-nav">
        <span>REF: {currentThemeRef.current?.data?.key}</span>
        <span>CUR: {currentTheme.data.key}</span>
        <span>NAM: {themeName}</span>
      </div> */}

      <Modal
        isOpen={isSaveModalOpen}
        onClose={handleCloseSaveModal}
        direction={ModalDirection.BOTTOM}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.CENTER}
        bodyClass="custom-modal-body" // Example of using the bodyClass prop
      >
        <h3 className="text-md">Save theme</h3>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)} // Update state on input change
            placeholder="Enter theme name"
          />

          <div className="flex gap-1">
            <button type="button" onClick={() => setIsSaveModalOpen(false)}>
              <ButtonAlt type={ButtonType.DEFAULT} label="Cancel" />
            </button>
            <button type="submit">
              <ButtonAlt type={ButtonType.PRIMARY} label="Save Theme" />
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        direction={ModalDirection.BOTTOM}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.CENTER}
        bodyClass="custom-modal-body" // Example of using the bodyClass prop
      >
        <h3 className="text-md">Delete theme</h3>

        <form onSubmit={handleDelete} className="flex flex-col gap-3">
          <h1>{currentThemeRef.current?.data?.key}</h1>

          <div className="flex gap-1">
            <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
              <ButtonAlt type={ButtonType.DEFAULT} label="Cancel" />
            </button>
            <button type="submit">
              <ButtonAlt type={ButtonType.PRIMARY} label="Delete Theme" />
            </button>
          </div>
        </form>
      </Modal>

      <Leva
        fill={false} // Make the pane fill the parent DOM node
        flat // Remove border radius and shadow
        oneLineLabels={false} // Alternative layout for labels
        hideTitleBar={false} // Hide the GUI header
        collapsed={true}
        // Start the GUI in collapsed state
        hidden={false} // GUI is visible by default
      />
    </>
  );
}
