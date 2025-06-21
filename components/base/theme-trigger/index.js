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
    <div className="flex gap-2 items-center p-2 bg-gray-600 rounded-xl cursor-pointer"
    onClick={selectNextTheme}
    >
        <div className="flex gap-2 items-center text-sm rounded-md"
        style={{
            backgroundColor: currentTheme.data.accenPri,
            color: currentTheme.data.colorText,
    
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


// return (
//   <div className="flex z-50 gap-1 self-center p-1 bg-gray-600 rounded-xl backdrop-blur-lg pointer-events-auto">
//     <div className="flex gap-1 p-2 rounded-lg aspect-square"
//     style={{
//       backgroundColor: "var(--body-background-color)",
//     }}
//     >
//       <Logo logo={logo} />
//     </div>

//     <div className="flex gap-1 p-1 rounded-lg border border-gray-600">