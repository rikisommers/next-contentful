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

  console.log('currentTheme', currentTheme);
  
  const [isClient, setIsClient] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

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
    <ThemeContext.Provider value={{ 
      currentTheme, 
      updateTheme, 
      isThemeDialogOpen, 
      setIsThemeDialogOpen 
    }}>
        {children}
        {isThemeDialogOpen && (
          <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
            <div className="overflow-y-auto fixed top-0 right-0 w-96 h-full bg-white shadow-xl"
                 style={{ backgroundColor: 'var(--body-background-color)' }}>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Theme Editor</h2>
                  <button 
                    onClick={() => setIsThemeDialogOpen(false)}
                    className="text-2xl hover:opacity-70"
                  >
                    ×
                  </button>
                </div>
                <MemoizedThemeEditor customThemes={customThemes} />
              </div>
            </div>
          </div>
        )}  
    </ThemeContext.Provider>
  );
};
