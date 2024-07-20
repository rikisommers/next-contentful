// themeContext.js
import React, { createContext, useState, useContext } from 'react';
import { themes } from "./utils/theme";
import { useTheme } from "next-themes";
import { getThemeByKey } from "./utils/theme";
// Define the shape of the context data
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Manage the theme state

  const [theme, setTheme] = useState('light');

  const currentTheme = getThemeByKey(theme);

  // Method to toggle the theme
  const toggleTheme = (theme) => {
    setTheme((theme) => (currentTheme === theme ? currentTheme : theme));
  };

  // Provide the theme and the method to update it to the context
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);