import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { themes, getThemeByKey } from "../utils/theme";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('currentTheme');
      return savedTheme ? JSON.parse(savedTheme) : themes.custom;
    }
    return themes.custom;
  });
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  const updateTheme = useCallback((newTheme) => {
    setCurrentTheme(prevTheme => {
      const updatedTheme = { ...prevTheme, ...newTheme };
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentTheme', JSON.stringify(updatedTheme));
      }
      return updatedTheme;
    });
  }, []);

  useEffect(() => {
    console.log('Theme updated in provider:', currentTheme);
  }, [currentTheme]);

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
