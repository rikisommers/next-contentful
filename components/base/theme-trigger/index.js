"use client";
import React, { useState, useEffect } from "react";
import { useThemeContext } from "../../context/themeContext";
import { themes } from "../../../utils/theme";
import ButtonWipe, { ButtonType } from "../button/button-wipe";
import { motion } from "../../../utils/motion";

export default function ThemeTrigger({ toggleThemeEditor }) {
  const { currentTheme, updateTheme } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const themeKeys = Object.keys(themes);

  useEffect(() => {
    const initialIndex = themeKeys.findIndex(
      (key) => key === currentTheme.data.key
    );
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
    <div className="col-span-1 col-start-5 row-start-1 justify-self-end pointer-events-auto goo group">
      <div className="flex relative gap-2 items-center">
        <div
          className="flex gap-2 items-center p-2 bg-gray-600 rounded-xl transition-all cursor-pointer duration-600"
          onClick={selectNextTheme}
          style={{
            backgroundColor: currentTheme.data.accenPri,
            color: currentTheme.data.colorText,
          }}
        >
          <div
            className="flex gap-2 items-center text-sm rounded-md"
            style={{
              backgroundColor: currentTheme.data.accenPri,
              color: currentTheme.data.colorText,
            }}
          >
            {currentTheme.name}
          </div>
          <ButtonWipe
            onClick={selectNextTheme}
            icon={"theme"}
            type={ButtonType.PRIMARY}
          />
        </div>

        {/* <div
          onClick={toggleThemeEditor}
          className="absolute right-0 w-10 h-10 bg-teal-400 rounded-full  group-hover:translate-x-[0px] transition-all duration-300"
        ></div>
        <div className="absolute w-10 h-10 bg-teal-400 rounded-full translate-x-[-50px] group-hover:translate-x-[0px] transition-all duration-300"></div> */}
      </div>
    </div>
  );
}

//return (
//   <div className="flex z-50 gap-1 self-center p-1 bg-gray-600 rounded-xl backdrop-blur-lg pointer-events-auto">
//     <div className="flex gap-1 p-2 rounded-lg aspect-square"
//     style={{
//       backgroundColor: "var(--body-background-color)",
//     }}
//     >
//       <Logo logo={logo} />
//     </div>

//     <div className="flex gap-1 p-1 rounded-lg border border-gray-600">
