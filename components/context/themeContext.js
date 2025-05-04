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

// Default theme structure to ensure all required properties exist
const defaultTheme = {
  data: {
    key: 'pixelIntensity',
    name: 'Pixel Intensity',
    // Add other default properties as needed
  }
};

export const ThemeProvider = ({ children, theme, customThemes }) => {

  //console.log('theme from cms',theme, customThemes) 

  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  
  // Initialize theme from localStorage or props
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          // Validate the parsed theme has required structure
          if (parsedTheme?.data?.key) {
            return parsedTheme;
          }
        } catch (e) {
          console.error('Error parsing saved theme:', e);
        }
      }
    }
    // Return theme from props or default theme
    return theme?.data?.key ? theme : themes.pixelIntensity;
  });

  const updateTheme = useCallback((newTheme) => {
    setCurrentTheme(prevTheme => {
      // Ensure we have a valid theme structure
      const updatedTheme = {
        ...prevTheme,
        data: {
          ...prevTheme?.data,
          ...newTheme?.data
        }
      };
      
      // Save to localStorage whenever theme changes
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updatedTheme));
        } catch (e) {
          console.error('Error saving theme to localStorage:', e);
        }
      }
      return updatedTheme;
    });
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          // Validate the parsed theme has required structure
          if (parsedTheme?.data?.key) {
            setCurrentTheme(parsedTheme);
          }
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
      setIsThemeDialogOpen 
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
