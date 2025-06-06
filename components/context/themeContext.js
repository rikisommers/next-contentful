import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { themes } from "../../utils/theme";
import ThemeEditor from '../../utils/themeEditor'; 

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = 'currentTheme';

// import dynamic from 'next/dynamic';
// const TweakpaneComponent = dynamic(
//   () => import('../../utils/tweakpane'),
//   { 
//     ssr: false,
//     loading: () => <p>Loading controls...</p>
//   }
// );

export const ThemeProvider = ({ children, theme, customThemes }) => {

  //console.log('theme from cms',theme, customThemes) 

  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize theme - use fallback during SSR, localStorage after mount
  const [currentTheme, setCurrentTheme] = useState(() => {
    return theme || themes.pixelIntensity;
  });

  const updateTheme = useCallback((newTheme) => {
    setCurrentTheme(prevTheme => {
      const updatedTheme = { ...prevTheme, ...newTheme };
      // Save to localStorage whenever theme changes
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updatedTheme));
      }
      return updatedTheme;
    });
  }, []);

  // Load theme from localStorage after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          setCurrentTheme(parsedTheme);
        } catch (e) {
          console.error('Error parsing saved theme:', e);
        }
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      updateTheme, 
      isThemeDialogOpen, 
      setIsThemeDialogOpen,
      isMounted
    }}>
      <ThemeEditor customThemes={customThemes}/>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
