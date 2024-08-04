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

  const applyCurrentTheme = useCallback((updatedTheme) => {
    if (!updatedTheme) return;

    setCurrentTheme(updatedTheme);
    setTheme(updatedTheme.key);
    updateTheme(updatedTheme.key, updatedTheme);

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

    localStorage.setItem("currentTheme", JSON.stringify(updatedTheme));

    setLevaKey((prevKey) => prevKey + 1);
  }, [setTheme]);


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
    NavBg: {
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
    "Audio On": {
      value: currentTheme.audio,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, audio: value };
        applyCurrentTheme(updatedTheme);
        toggleAudio(audioRefs, value);
        console.log(`Audio ${value ? "enabled" : "disabled"}`);
      },
    },
    "Audio Volume": {
      value: currentTheme.volume,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, volume: value };
        applyCurrentTheme(updatedTheme);
        updateVolume(audioRefs, value);
        console.log(`Volume set to ${value}`);
      },
    },
    "Audio Play Click": button(() => {
      playClick();
    }),
    "Audio Play Beep On": button(() => {
      playBeepOn();
    }),
    "Audio Play Beep Off": button(() => {
      playBeepOff();
    }),
    "Audio Play Plink": button(() => {
      playPlink();
    }),
    "Audio Play Drip": button(() => {
      playDrip();
    }),
    "Audio Play Marimba": button(() => {
      playMarimba();
    }),
  }), [currentTheme, applyCurrentTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("currentTheme");
      try {
        const parsedTheme = savedTheme ? JSON.parse(savedTheme) : themes.dark;
        setCurrentTheme(parsedTheme);
        applyCurrentTheme(parsedTheme);
      } catch (e) {
        console.error("Invalid JSON in localStorage:", e);
        applyCurrentTheme(themes.dark);
      }
    }
  }, [applyCurrentTheme]);

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
