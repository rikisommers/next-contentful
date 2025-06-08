"use client";
import React, { createContext, useContext, useState, useEffect, memo, useCallback } from 'react';
import { themes } from '../../utils/theme';
import { setStyleProperties } from '../../utils/styleUtils';
import ThemeEditor from '../../utils/themeEditor'; 

const THEME_STORAGE_KEY = 'theme';

const ThemeContext = createContext();

// import dynamic from 'next/dynamic';
// const TweakpaneComponent = dynamic(
//   () => import('../../utils/tweakpane'),
//   { 
//     ssr: false,
//     loading: () => <p>Loading controls...</p>
//   }
// );

export const useThemeContext = () => useContext(ThemeContext);

const MemoizedThemeEditor = memo(ThemeEditor);

export const ThemeProvider = ({ children, initialTheme: initialThemeName, customThemes = [] }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        try {
          return JSON.parse(savedTheme);
        } catch (e) {
          console.error('Error parsing saved theme:', e);
        }
      }
    }
    return themes[initialThemeName] || themes.light;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStyleProperties(currentTheme);
  }, [currentTheme]);

  const updateTheme = useCallback((newTheme) => {
    setCurrentTheme(newTheme);
    setStyleProperties(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme }}>
        {children}  
    </ThemeContext.Provider>
  );
};
