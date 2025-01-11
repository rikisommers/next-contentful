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
import Modal, {
  ModalDirection,
  ModalPosition,
  ModalWidth,
} from "../components/base/modal";
import ButtonAlt, { ButtonType } from "../components/base/button-alt";

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


  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Ref use to manage live updates to currentTheme for save to CMS
  const currentThemeRef = useRef(currentTheme);

  // Update the ref whenever currentTheme changes
  // useEffect(() => {
  //   currentThemeRef.current = currentTheme;
  // }, [currentTheme]);

  // State for slider values
  const [colorWeight, setColorWeight] = useState(5);
  const [vibranceWeight, setVibrancyWeight] = useState(5);
  const [funkynessWeight, setFunkynessWeight] = useState(5);

  const setStyleProperties = (theme) => {
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
    const mergedTheme = { ...currentThemeRef.current.data, [key]: value };
    currentThemeRef.current.data = mergedTheme;

    setSingleStyleProperty(key, value);

    console.log("AFFFFTER", currentThemeRef.current.data);
  };

  const handleCustomThemeChange = (selectedThemeKey, source) => {
    const selectedTheme = source.find(
        (theme) => theme.data.key === selectedThemeKey
    );

    console.log('S',selectedTheme)
    console.log('SS',source)
    if (selectedTheme) {
        // Update the theme in the context
       // updateTheme(selectedTheme.data);
        
        // Set the style properties based on the selected theme
        setStyleProperties(selectedTheme.data);
        
        // Update the current theme reference only
        currentThemeRef.current = selectedTheme;

        console.log('Current Theme Reference:', currentThemeRef.current);
    } else {
        console.error("Theme not found for key:", selectedThemeKey);
    }
};

  const handleThemeChange = (e, source) => {
    const selectedThemeKey = e.target.value;
    const newTheme = { ...source[selectedThemeKey] };

    console.log("fff", newTheme);
    //updateTheme(newTheme);
    setStyleProperties(newTheme);
    currentThemeRef.current = newTheme;
  };

  // Save current theme as a new theme
  const saveNewTheme = async () => {
    console.log("#SNT", currentThemeRef.current.data); // Log the current theme data

    try {
      const customKey = toCamelCase(themeName); // Convert name to camelCase and remove spaces

      // Create a clean copy of the theme data
      const { key, ...rest } = currentThemeRef.current.data; // Destructure to avoid circular references

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
      // Optionally, refresh the theme list or update state here
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  // Delete a theme from Contentful
  const deleteTheme = async () => {
    try {
        const entryIdToDelete = currentThemeRef.current.sys.id; // Get the entry ID
        console.log('Attempting to delete theme with entry ID:', entryIdToDelete);

        // Use the entry ID in the URL
        const deleteResponse = await fetch(
            `/api/delete-theme?id=${entryIdToDelete}`, // Send the entry ID as a query parameter
            { method: "DELETE" }
        );

        // Log the response status and body
        const responseBody = await deleteResponse.json();
        console.log('Delete response status:', deleteResponse.status);
        console.log('Delete response body:', responseBody);

        if (!deleteResponse.ok) {
            throw new Error(`Failed to delete theme: ${responseBody.message}`);
        }

        console.log("Theme deleted successfully");
        // Optionally refresh the theme list or update state here
    } catch (error) {
        console.error("Error deleting theme:", error);
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
        const errorData = await response.json();
        throw new Error(`Failed to save theme: ${errorData.message}`);
      }
      console.log("Theme saved to Contentful successfully");
    } catch (error) {
      console.error("Error saving theme to Contentful:", error.message);
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
      options: customThemes.map((theme) => theme.data.key),
      value: "select theme",
      label: "Custom",
      onChange: (value) => {
        handleCustomThemeChange(value, customThemes);
      },
    },
    presets: {
      options: Object.keys(themes),
      value: currentTheme.data.key,
      label: "Presets",
      onChange: (value) => {
        handleThemeChange({ target: { value } }, themes);
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
        value: currentTheme.audio,
        label: "Audio",
        onChange: (value) => updateThemeProp("audio", value), // Call existing handler
      },
      volume: {
        value: currentTheme.volume,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Volume",
        onChange: (value) => updateThemeProp("volume", value), // Call existing handler
      },
    }),
    Globals: folder({
      pageWidth: {
        options: Object.keys(pageWidthThemes),
        value: currentTheme.pageWidth,
        label: "Page Width",
        onChange: (value) => updateThemeProp("pageWidth", value), // Call existing handler
      },
      cursor: {
        options: Object.keys(cursorThemes),
        value: currentTheme.cursor,
        label: "Cursor",
        onChange: (value) => updateThemeProp("cursor", value), // Call existing handler
      },
    }),
    Animation: folder({
      pageTransition: {
        options: Object.keys(pageTransitionThemes),
        value: currentTheme.pageTransition,
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
        value: currentTheme.textAnimationSec,
        label: "Text Anim Sec",
        onChange: (value) => updateThemeProp("textAnimationSec", value), // Call existing handler
      },
      fontFamilyPrimary: {
        options: Object.values(typographyThemes),
        value: currentTheme.fontFamilyPrimary,
        label: "Font Family Primary",
        onChange: (value) => updateThemeProp("fontFamilyPrimary", value), // Call existing handler
      },
      fontFamilySecondary: {
        options: Object.values(typographyThemes),
        value: currentTheme.fontFamilySecondary,
        label: "Font Family Secondary",
        onChange: (value) => updateThemeProp("fontFamilySecondary", value), // Call existing handler
      },
      fontSizeMax: {
        value: currentTheme.fluidFontRatioMax,
        min: 0,
        max: 1.3,
        step: 0.01,
        label: "Fluid Max",
        onChange: (value) => updateThemeProp("fluidFontRatioMax", value), // Call existing handler
      },
      fontSizeMin: {
        value: currentTheme.fluidFontRatioMin,
        min: 0,
        max: 1.3,
        step: 0.01,
        label: "Fluid Min",
        onChange: (value) => updateThemeProp("fluidFontRatioMin", value), // Call existing handler
      },
      textHighlight: {
        options: Object.values(textHighlightThemes),
        value: currentTheme.textHighlight,
        label: "Text Highlight",
        onChange: (value) => updateThemeProp("textHighlight", value), // Call existing handler
      },
      "Body Text": folder({
        dropCap: {
          value: currentTheme.bodyTextStyle?.dropCap, // Default to false
          label: "Drop Cap",
          onChange: (value) =>
            updateThemeProp("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              dropCap: value,
            }), // Update handler
        },
        indent: {
          value: currentTheme.bodyTextStyle?.indent, // Default to false
          label: "Indent",
          onChange: (value) =>
            updateThemeProp("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              indent: value,
            }), // Update handler
        },
        highlight: {
          value: currentTheme.bodyTextStyle?.highlight, // Default to false
          label: "Highlight",
          onChange: (value) =>
            updateThemeProp("bodyTextStyle", {
              ...currentTheme.bodyTextStyle,
              highlight: value,
            }), // Update handler
        },
        align: {
          value: currentTheme.bodyTextStyle?.align, // Default to false
          options: Object.values(bodyTextAlign),
          label: "Align",
          onChange: (value) =>
            updateThemeProp("bodyTextStyle", {
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
        onChange: (value) => updateThemeProp("navPosition", value),
      },
      navigationStyle: {
        options: Object.keys(navigationStyleThemes),
        value: currentTheme.navStyle,
        label: "Style",
        onChange: (value) => updateThemeProp("navStyle", value),
      },
      floating: {
        value: currentTheme.navFloating,
        label: "floating",
        onChange: (value) => updateThemeProp("navFloating", value),
      },
      fixed: {
        value: currentTheme.navFixed,
        label: "fixed",
        onChange: (value) => updateThemeProp("navFixed", value),
      },
      // logoFill: {
      //   value: currentTheme.logoFill,
      //   label: 'logo fill',
      //   onChange: (value) => updateThemeProp('logoFill',  value )
      // },
      border: {
        value: currentTheme.navBorder,
        label: "border",
        onChange: (value) => updateThemeProp("navBorder", value),
      },
      shadow: {
        value: currentTheme.navShadow,
        label: "shadow",
        onChange: (value) => updateThemeProp("navShadow", value),
      },
      shadowColor: {
        value: currentTheme.navShadowColor,
        label: "shadow color",
        onChange: (value) => updateThemeProp("navShadowColor", value),
      },
      shadowSize: {
        options: Object.keys(navigationOptions?.shadowSize),
        value: currentTheme.navShadowSize,
        label: "sahdow size",
        onChange: (value) => updateThemeProp("navShadowSize", value),
      },
    }),
    Footer: folder({
      fixed: {
        value: currentTheme.footerOptions?.fixed,
        label: "fixed",
        onChange: (value) =>
          updateThemeProp("footerPosition", {
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
        onChange: (value) => updateThemeProp("heroHeight", value),
      },
      heroType: {
        options: Object.keys(heroTypeThemes),
        value: currentTheme.heroType,
        label: "Type",
        onChange: (value) => updateThemeProp("heroType", value),
      },
      heroBackgroundStyle: {
        options: Object.keys(heroBackgroundThemes),
        value: currentTheme.heroBackgroundStyle,
        label: "Bg",
        onChange: (value) => updateThemeProp("heroBackgroundStyle", value),
      },
      heroGradMidPoint: {
        value: currentTheme.heroGradMidPoint,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Gradient Mid Point",
        onChange: (value) => updateThemeProp("heroGradMidPoint", value),
      },
      heroTextImageStyle: {
        options: Object.keys(heroTextImageThemes),
        value: currentTheme.heroTextImageStyle,
        label: "Images",
        onChange: (value) => updateThemeProp("heroTextImageStyle", value),
      },
      heroTextLayoutStyle: {
        options: Object.keys(heroTextPositionThemes),
        value: currentTheme.heroTextPosition || "bottom-left",
        label: "TextLayout",
        onChange: (value) => updateThemeProp("heroTextPosition", value),
      },
      heroTextCompStyle: {
        options: Object.keys(heroTextCompositionThemes),
        value: currentTheme.heroTextComposition,
        label: "Compo",
        onChange: (value) => updateThemeProp("heroTextPosition", value),
      },
    }),
    Cards: folder({
      layout: {
        options: Object.keys(cardThemes),
        value: currentTheme.cardLayout || "reone",
        label: "layout",
        onChange: (value) => updateThemeProp("cardLayout", value),
      },
      hover: {
        options: Object.keys(cardHoverThemes),
        value: currentTheme.cardHover,
        label: "hover",
        onChange: (value) => updateThemeProp("cardHover", value),
      },
      grid: {
        options: Object.keys(gridThemes),
        value: currentTheme.cardGrid || "bento1",
        label: "grid",
        onChange: (value) => updateThemeProp("cardGrid", value),
      },
    }),
    Iamges: folder({
      parallax: {
        value: currentTheme.imageParallax,
        label: "parallax",
        onChange: (value) => updateThemeProp("imageParallax", value),
      },
      mixBlendMode: {
        options: Object.keys(mixBlendThemes),
        value: currentTheme.imageMixBlendMode,
        label: "Blend Mode",
        onChange: (value) => updateThemeProp("imageMixBlendMode", value),
      },
    }),
    Color2: folder({
      accentPri: {
        value: currentTheme.accentPri,
        label: "Accent Primary",
        onChange: (newValue) => updateThemeProp("accentPri", newValue),
      },
      accentSec: {
        value: currentTheme.accentSec,
        label: "Accent Secondary",
        onChange: (newValue) => updateThemeProp("accentSec", newValue),
      },
      backgroundColor: {
        value: currentTheme.backgroundColor,
        label: "Background Color",
        onChange: (newValue) => updateThemeProp("backgroundColor", newValue),
      },
      backgroundColorInv: {
        value: currentTheme.backgroundColorInv,
        label: "Background Color Inverted",
        onChange: (newValue) => updateThemeProp("backgroundColorInv", newValue),
      },
      bodyBackgroundColor: {
        value: currentTheme.bodyBackgroundColor,
        label: "Body Background Color",
        onChange: (newValue) =>
          updateThemeProp("bodyBackgroundColor", newValue),
      },
      gradStart: {
        value: currentTheme.gradStart,
        label: "Gradient Start",
        onChange: (newValue) => updateThemeProp("gradStart", newValue),
      },
      gradStop: {
        value: currentTheme.gradStop,
        label: "Gradient Stop",
        onChange: (newValue) => updateThemeProp("gradStop", newValue),
      },
      headingColor: {
        value: currentTheme.headingColor,
        label: "Heading Color",
        onChange: (newValue) => updateThemeProp("headingColor", newValue),
      },
      navBg: {
        value: currentTheme.navBg,
        label: "Navigation Background",
        onChange: (newValue) => updateThemeProp("navBg", newValue),
      },
      subtextColor: {
        value: currentTheme.subtextColor,
        label: "Subtext Color",
        onChange: (newValue) => updateThemeProp("subtextColor", newValue),
      },
      surface1: {
        value: currentTheme.surface1,
        label: "Surface 1",
        onChange: (newValue) => updateThemeProp("surface1", newValue),
      },
      surface2: {
        value: currentTheme.surface2,
        label: "Surface 2",
        onChange: (newValue) => updateThemeProp("surface2", newValue),
      },
      surface3: {
        value: currentTheme.surface3,
        label: "Surface 3",
        onChange: (newValue) => updateThemeProp("surface3", newValue),
      },
      textAccent: {
        value: currentTheme.textAccent,
        label: "Text Accent",
        onChange: (newValue) => updateThemeProp("textAccent", newValue),
      },
      textColor: {
        value: currentTheme.textColor,
        label: "Text Color",
        onChange: (newValue) => updateThemeProp("textColor", newValue),
      },
      textColorInv: {
        value: currentTheme.textColorInv,
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
      <div className="fixed flex flex-col p-3 text-sm text-white bg-red-400 top-3 left-3 z-nav">
        <span>REF: {currentThemeRef.current.data.key}</span>
        <span>CUR: {currentTheme.key}</span>
        <span>NAM: {themeName}</span>
      </div>

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
          
          <h1>{currentThemeRef.current.data.key}</h1>

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
        hideTitleBar={true} // Hide the GUI header
        collapsed={false} // Start the GUI in collapsed state
        hidden={false} // GUI is visible by default
      />
    </>
  );
}
