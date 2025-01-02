import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { themes } from "../../utils/theme";
import ThemeEditor from '../../utils/themeEditor'; 
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, theme }) => {

  console.log('theme from cms',theme) 

  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes.pastelAnime);

  const updateTheme = useCallback((newTheme) => {
    setCurrentTheme(prevTheme => {
      const updatedTheme = { ...prevTheme, ...newTheme };
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
      <ThemeEditor/>
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
