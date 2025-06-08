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
    <div className="flex items-center gap-2"
    onClick={selectNextTheme}
    >
        <div className="flex items-center gap-2 p-2 text-sm rounded-md"
        style={{
            backgroundColor: currentTheme.data.accenPri,
            color: currentTheme.data.textColor,
    
        }}
        >
        {currentTheme.name}
        </div>
      <ButtonWipe 
      onClick={selectNextTheme}
        icon={'theme'}
        type={ButtonType.PRIMARY} 
      />
    </div>
  );
} 