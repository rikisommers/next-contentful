import React, { createContext, useState, useContext, useEffect } from 'react';
import { themes, getThemeByKey } from "../utils/theme";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Initialize with default values if not present
    return {
      ...themes.custom,
      volume: themes.custom.volume || 0.5,
      audio: themes.custom.audio !== undefined ? themes.custom.audio : true,
    };
  });
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  const updateTheme = (newTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('currentTheme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      } catch (e) {
        console.error("Failed to parse theme from localStorage:", e);
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
