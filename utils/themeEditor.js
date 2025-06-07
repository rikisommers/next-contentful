"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  navigationThemes,
  navigationOptions,
  cursorThemes,
  gridThemes,
  gridColumnsSm,
  gridColumnsMd,
  gridColumnsLg,
  gridColumnsXl,
  gridGap,
  gridGalleryThemes,
  mixBlendThemes,
  textHighlightOutlineThemes,
  imageTextureThemes,
  imageTextureContrastThemes,
  textHighlightOutlineNeumorphicStartColor,
  textHighlightOutlineNeumorphicEndColor,
  fontSizes,
  fontFamilies,
  fontWeights,
  lineHeights,
  letterSpacings,
  colors,
  spacing,
  radii,
  shadows,
  gridGaps,
  gridColumnOptions,
  gridColumns,
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
import ButtonWipe, { ButtonType } from "../components/base/button/button-wipe";
import { useToast } from "../components/context/toastContext";
import ThemeTrigger from "../components/base/theme-trigger";
import { themeControlConfig } from "./themeControlConfig";
import { generateControlsFromConfig } from "./controlGenerators";
import TextInput from "../components/base/form/TextInput";
import SelectInput from "../components/base/form/SelectInput";
import CheckboxInput from "../components/base/form/CheckboxInput";
import ColorInput from "../components/base/form/ColorInput";
import SliderInput from "../components/base/form/SliderInput";


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
  }, []);

  // State for slider values
  const [colorWeight, setColorWeight] = useState(5);
  const [vibranceWeight, setVibrancyWeight] = useState(5);
  const [funkynessWeight, setFunkynessWeight] = useState(5);

  const setSingleStyleProperty = (key, value) => {
    const root = document.documentElement;
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

    // Set the CSS variable regardless of the value type
    root.style.setProperty(cssVar, value);
  };

  // Live udates to the current theme.
  // These changes will be lost on global theme change
  // Save as custom thmeme to retain changes
  const updateThemeProp = useCallback((key, value) => {
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
    setSingleStyleProperty(key, value); // Update the specific style property
    updateTheme(mergedTheme); // Update the theme in your state or context

    // console.log('-------merged-', mergedTheme);
    // console.log('-------current-', currentThemeRef.current);
    // console.log('-------current3-', currentTheme);
  }, [updateTheme]);

  const handleThemeChange = (e, target) => {
    const selectedThemeKey = e;

    const selectedTheme = Object.values(target).find(
      (theme) => theme.data.key === selectedThemeKey
    );

    if (selectedTheme) {
      updateTheme(selectedTheme);
      currentThemeRef.current = selectedTheme;
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
      currentThemeRef.current = bestTheme;
    }
  };

  // Helper to render a control based on config
  const renderControl = (key, config, value) => {
    switch (config.type) {
      case "text":
        return (
          <TextInput
            key={key}
            label={config.label}
            value={value ?? ""}
            onChange={val => updateThemeProp(key, val)}
          />
        );
      case "select":
        // options can be array or object
        let options = config.options;
        if (options && !Array.isArray(options)) {
          options = Object.keys(options).map(optKey => ({ value: optKey, label: optKey }));
        } else if (options && Array.isArray(options)) {
          options = options.map(opt => (typeof opt === 'object' ? opt : { value: opt, label: opt }));
        }
        return (
          <SelectInput
            key={key}
            label={config.label}
            value={value ?? ((options && options[0]?.value) || "")}
            options={options || []}
            onChange={val => updateThemeProp(key, val)}
          />
        );
      case "boolean":
        return (
          <CheckboxInput
            key={key}
            label={config.label}
            checked={!!value}
            onChange={val => updateThemeProp(key, val)}
          />
        );
      case "color":
        return (
          <ColorInput
            key={key}
            label={config.label}
            value={value ?? "#000000"}
            onChange={val => updateThemeProp(key, val)}
          />
        );
      case "slider":
        console.log("Slider config", key, config, value);
        return (
          <SliderInput
            key={key}
            label={config.label}
            value={typeof value === 'number' ? value : 0}
            min={config.min}
            max={config.max}
            step={config.step}
            onChange={val => updateThemeProp(key, val)}
          />
        );
      default:
        return null;
    }
  };

  // Helper to render a section
  const renderSection = (sectionName, sectionConfig) => {
    return (
      <fieldset key={sectionName} style={{ marginBottom: 24, border: '1px solid #eee', padding: 12 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>{sectionName}</legend>
        {Object.entries(sectionConfig).map(([key, config]) => {
          if (config.isFolder) {
            // Nested folder
            return renderSection(key, config);
          }
          return renderControl(key, config, currentTheme.data[key]);
        })}
      </fieldset>
    );
  };

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
              <ButtonWipe type={ButtonType.DEFAULT} label="Cancel" />
            </button>
            <button type="submit">
              <ButtonWipe type={ButtonType.PRIMARY} label="Save Theme" />
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
              <ButtonWipe type={ButtonType.DEFAULT} label="Cancel" /> 
            </button>
            <button type="submit">
              <ButtonWipe type={ButtonType.PRIMARY} label="Delete Theme" />
            </button>
          </div>
        </form>
      </Modal>

      {/* Theme Switchers and Actions */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <SelectInput
          label="Custom"
          value={currentTheme.data.key}
          options={Object.keys(customThemes).map(key => ({ value: customThemes[key].data.key, label: customThemes[key].data.key }))}
          onChange={val => handleThemeChange(val, customThemes)}
        />
        <SelectInput
          label="Presets"
          value={currentTheme.data.key}
          options={Object.keys(presetThemes).map(key => ({ value: presetThemes[key].data.key, label: presetThemes[key].data.key }))}
          onChange={val => handleThemeChange(val, presetThemes)}
        />
        <ButtonWipe type={ButtonType.DEFAULT} label="Save Current Theme" onClick={() => setIsSaveModalOpen(true)} />
        <ButtonWipe type={ButtonType.DEFAULT} label="Delete Current Theme" onClick={() => setIsDeleteModalOpen(true)} />
        <ButtonWipe type={ButtonType.PRIMARY} label="Save Theme to Custom?" onClick={handleApply} />
      </div>

      {/* Theme Controls */}
      <form style={{ maxWidth: 800, margin: '0 auto' }}>
        {Object.entries(themeControlConfig).map(([sectionName, sectionConfig]) =>
          renderSection(sectionName, sectionConfig)
        )}
      </form>
    </>
  );
}
