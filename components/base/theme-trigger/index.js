"use client";
import React, { useState, useEffect } from "react";
import { useThemeContext } from "../../context/themeContext";
import { themes } from "../../../utils/theme";
import ButtonWipe, { ButtonType } from "../button/button-wipe";

export default function ThemeTrigger() {
  const { currentTheme, updateTheme } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const themeKeys = Object.keys(themes);

  useEffect(() => {
    const initialIndex = themeKeys.findIndex(key => key === currentTheme.data.key);
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
    }
  }, [currentTheme.data.key, themeKeys]);

  const selectNextTheme = () => {
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextThemeKey = themeKeys[nextIndex];
    const nextTheme = themes[nextThemeKey];
    updateTheme(nextTheme);
  };

  return (
    <div onClick={selectNextTheme}>
      <ButtonWipe 
        label={`Theme: ${currentTheme.name}`} 
        type={ButtonType.PRIMARY} 
      />
    </div>
  );
} 