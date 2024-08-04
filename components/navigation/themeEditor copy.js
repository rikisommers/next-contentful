import React, { useEffect, useState, useCallback } from "react";
import { useControls, Leva, button } from "leva";
import { useTheme } from "next-themes";
import { themes, getThemeByKey, updateTheme } from "../../utils/theme";
import { useAudioControls, toggleAudio, updateVolume } from "./audio-utils";

export default function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(loadInitialTheme());

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

  const applyCurrentTheme = (updatedTheme) => {
    setCurrentTheme(updatedTheme);
    setTheme(updatedTheme.key);
    updateTheme(updatedTheme.key, updatedTheme);
    localStorage.setItem('currentTheme', JSON.stringify(updatedTheme));

    // Update CSS variables
    Object.entries(updatedTheme).forEach(([key, value]) => {
      if (typeof value === "string") {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });
  };

  const controls = {
    Theme: {
      value: currentTheme.key,
      options: [...Object.keys(themes), "custom"],
      onChange: (value) => {
        const updatedTheme = value === "custom" ? { ...currentTheme } : getThemeByKey(value);
        applyCurrentTheme(updatedTheme);
      },
    },
    "Body Background Color": {
      value: currentTheme.bodyBackgroundColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, bodyBackgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Background Color": {
      value: currentTheme.backgroundColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, backgroundColor: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    // Add similar controls for all other theme properties
    "Inv Background Color": {
      value: currentTheme.backgroundColorInv,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, backgroundColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Surface 1": {
      value: currentTheme.surface1,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface1: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Surface 2": {
      value: currentTheme.surface2,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface2: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Surface 3": {
      value: currentTheme.surface3,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, surface3: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Heading Color": {
      value: currentTheme.headingColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, headingColor: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Text Color": {
      value: currentTheme.textColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textColor: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Subtext Color": {
      value: currentTheme.subtextColor,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, subtextColor: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Text Color Inv": {
      value: currentTheme.textColorInv,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textColorInv: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Text Accent": {
      value: currentTheme.textAccent,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, textAccent: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    NavBg: {
      value: currentTheme.navBg,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, navBg: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    Accent: {
      value: currentTheme.accent,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accent: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    AccentPri: {
      value: currentTheme.accentPri,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accentPri: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    AccentSec: {
      value: currentTheme.accentSec,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, accentSec: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    MixBlendMode: {
      value: currentTheme.mixBlendMode,
      options: mixBlendModes,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, mixBlendMode: value };
        applyCurrentTheme(updatedTheme);
      },
      disabled: currentTheme.key !== "custom",
    },
    "Audio On": {
      value: currentTheme.audio,
      onChange: (value) => {
        const updatedTheme = { ...currentTheme, audio: value };
        applyCurrentTheme(updatedTheme);
        toggleAudio(audioRefs, value);
      },
      disabled: currentTheme.key !== "custom",
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
      },
      disabled: currentTheme.key !== "custom",
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
  };

  const values = useControls(() => controls);

  useEffect(() => {
    if (currentTheme.key === "custom") {
      const updatedTheme = { ...currentTheme, ...values };
      applyCurrentTheme(updatedTheme);
    }
  }, [values, currentTheme]);

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
