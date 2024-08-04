import React, { useEffect, useState, useCallback } from "react";
import { useControls, Leva, button } from "leva";
import { useTheme } from "next-themes";
import { themes, getThemeByKey, updateTheme } from "../../utils/theme";
import { useThemeContext } from "../themeContext";

import { useAudioControls, toggleAudio, updateVolume } from "./audio-utils";

export default function ThemeEditor() {
  const { theme, setTheme } = useTheme();
   const [levaKey, setLevaKey] = useState(0);


   const loadInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("currentTheme");
      try {
        console.log('saved theme -__________', savedTheme)
        return savedTheme ? JSON.parse(savedTheme) : themes.dark;
      } catch (e) {
        console.error("Invalid JSON in localStorage:", e);
        return themes.dark;
      }
    }
    return themes.dark;
  };

  const initialTheme = loadInitialTheme();
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  const {
    audioRefs,
    playClick,
    playBeepOn,
    playBeepOff,
    playPlink,
    playDrip,
    playMarimba,
  } = useAudioControls();

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


  const applyCurrentTheme = useCallback( (updatedTheme) => {
    console.log('sss')
  
    if (JSON.stringify(updatedTheme) !== JSON.stringify(themes)) {
      setTheme(updatedTheme.key);
      updateTheme(updatedTheme.key, updatedTheme);
      setCurrentTheme(updatedTheme);

    // Object.entries(updatedTheme).forEach(([key, value]) => {
    //   if (typeof value === "string") {
    //     console.log(`--${key}:`, value);
    //     document.documentElement.style.setProperty(`--${key}`, value);
    //   }
    // });
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
    document.documentElement.style.setProperty('--accent-pri', updatedTheme.accentPri);
    document.documentElement.style.setProperty('--accent-sec', updatedTheme.accentSec);

    localStorage.setItem("currentTheme", JSON.stringify(updatedTheme));
      setLevaKey((prevKey) => prevKey + 1);

    }
  },
  
  [setTheme, updateTheme]
);

  // const applyCurrentTheme = useCallback(
  //   (updatedTheme) => {
  //     updateTheme(updatedTheme);
  //     setTheme(updatedTheme.key);

  //     // Update CSS variables
  //     Object.entries(updatedTheme).forEach(([key, value]) => {
  //       if (typeof value === "string") {
  //         console.log(`--${key}:`, value);
  //         document.documentElement.style.setProperty(`--${key}`, value);
  //       }
  //     });

  //     // Apply audio settings
  //     toggleAudio(audioRefs, updatedTheme.audio);
  //     updateVolume(updatedTheme.volume, updatedTheme.audio);

  //     localStorage.setItem("currentTheme", JSON.stringify(updatedTheme));

  //     // Force re-render of Leva controls
  //     setLevaKey((prevKey) => prevKey + 1);
  //   }, [setTheme, audioRefs]);

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("currentTheme");
  //   if (savedTheme) {
  //     try {
  //       const parsedTheme = JSON.parse(savedTheme);
  //       setCurrentTheme(parsedTheme);
  //       setTheme(parsedTheme.key);
  //       // Apply saved audio settings
  //       updateVolume(audioRefs, parsedTheme.volume, parsedTheme.audio);
  //       toggleAudio(audioRefs, parsedTheme.audio);
  //     } catch (e) {
  //       console.error("Failed to parse theme from localStorage:", e);
  //     }
  //   }
  // }, [setTheme, audioRefs]);

  const [, set] = useControls(() => ({
    Theme: {
      value: currentTheme.key,
      options: Object.keys(themes),
      onChange: (value) => {
        const selectedTheme = themes[value];
        if (selectedTheme) {
          applyCurrentTheme(selectedTheme);
        }
      },
    },
    "Body Background Color": {
      value: themes.custom.bodyBackgroundColor,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, bodyBackgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Background Color": {
      value: themes.custom.backgroundColor,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, backgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Inv Background Color": {
      value: themes.custom.backgroundColorInv,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, backgroundColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Surface 1": {
      value: themes.custom.surface1,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, surface1: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Surface 2": {
      value: themes.custom.surface2,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, surface2: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Surface 3": {
      value: themes.custom.surface3,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, surface3: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Heading Color": {
      value: themes.custom.headingColor,
      onChange: (value) => {
        const updatedTheme = {  ...themes.custom, headingColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Text Color": {
      value: themes.custom.textColor,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, textColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Subtext Color": {
      value: themes.custom.subtextColor,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, subtextColor: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Text Color Inv": {
      value: themes.custom.textColorInv,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, textColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    "Text Accent": {
      value: themes.custom.textAccent,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, textAccent: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    NavBg: {
      value: themes.custom.navBg,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, navBg: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    Accent: {
      value: themes.custom.accent,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, accent: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    AccentPri: {
      value: themes.custom.accentPri,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, accentPri: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    AccentSec: {
      value: themes.custom.accentSec,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, accentSec: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    MixBlendMode: {
      value: themes.custom.mixBlendMode,
      options: mixBlendModes,
      onChange: (value) => {
        const updatedTheme = { ...themes.custom, mixBlendMode: value };
        applyCurrentTheme(updatedTheme);
      },
    },
    // "Audio On": {
    //   value: currentTheme.audio,
    //   onChange: (value) => {
    //     const updatedTheme = {...themes.custom, audio: value };
    //     applyCurrentTheme(updatedTheme);
    //     toggleAudio(audioRefs, value);
    //     console.log(`Audio ${value ? "enabled" : "disabled"}`);
    //   },
    // },
    // "Audio Volume": {
    //   value: currentTheme.volume,
    //   min: 0,
    //   max: 1,
    //   step: 0.01,
    //   onChange: (value) => {
    //     const updatedTheme = { ...themes.custom, volume: value };
    //     applyCurrentTheme(updatedTheme);

    //     updateVolume(audioRefs, value);
    //     console.log(`Volume set to ${value}`);
    //   },
    // },
    // "Audio Play Click": button(() => {
    //   playClick();
    // }),
    // "Audio Play Beep On": button(() => {
    //   playBeepOn();
    // }),
    // "Audio Play Beep Off": button(() => {
    //   playBeepOff();
    // }),
    // "Audio Play Plink": button(() => {
    //   playPlink();
    // }),
    // "Audio Play Drip": button(() => {
    //   playDrip();
    // }),
    // "Audio Play Marimba": button(() => {
    //   playMarimba();
    // }),
  }));

  // const values = useControls(() => controls);

  // useEffect(() => {
  //   const updatedTheme = { ...currentTheme, ...values };
  //   console.log("Updated theme values:", updatedTheme);
  //   if (JSON.stringify(updatedTheme) !== JSON.stringify(currentTheme)) {
  //     applyCurrentTheme(updatedTheme);
  //   }
  // }, [values, currentTheme, applyCurrentTheme]);

  // useControls(() => controls);

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
