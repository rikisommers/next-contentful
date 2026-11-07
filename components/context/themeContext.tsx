"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Head from "next/head";
import { setStyleProperties, getThemeCssText } from "../../utils/styleUtils";
import {
  DEFAULT_THEME,
  resolveTheme,
  type Theme,
} from "../../utils/themes/config/default-theme";

const THEME_STORAGE_KEY = "theme";

interface ThemeContextValue {
  currentTheme: Theme;
  updateTheme: (theme: Partial<Theme> | string) => void;
  isThemeDialogOpen: boolean;
  setIsThemeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const noop = () => {};

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: DEFAULT_THEME,
  updateTheme: noop,
  isThemeDialogOpen: false,
  setIsThemeDialogOpen: noop,
});

export const useThemeContext = () => useContext(ThemeContext);

function readSavedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved ? resolveTheme(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Theme from the CMS (object or preset key). Falls back to DEFAULT_THEME. */
  initialTheme?: Partial<Theme> | string | null;
}

/**
 * Provides the active theme.
 *
 * Renders on the server with the CMS (or default) theme and inlines its CSS
 * variables, so crawlers and first paint get real, themed content. A theme the
 * visitor picked earlier is restored from localStorage after hydration.
 */
export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    resolveTheme(initialTheme)
  );
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  useEffect(() => {
    const saved = readSavedTheme();
    if (saved) setCurrentTheme(saved);
  }, []);

  useEffect(() => {
    setStyleProperties(currentTheme);
  }, [currentTheme]);

  const updateTheme = useCallback((next: Partial<Theme> | string) => {
    const resolved = resolveTheme(next);
    setCurrentTheme(resolved);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(resolved));
    } catch {
      /* storage unavailable (private mode): theme still applies for the session */
    }
  }, []);

  const cssText = useMemo(() => getThemeCssText(currentTheme), [currentTheme]);

  const value = useMemo(
    () => ({ currentTheme, updateTheme, isThemeDialogOpen, setIsThemeDialogOpen }),
    [currentTheme, updateTheme, isThemeDialogOpen]
  );

  return (
    <ThemeContext.Provider value={value}>
      <Head>
        <style id="theme-vars" dangerouslySetInnerHTML={{ __html: cssText }} />
      </Head>
      {children}
    </ThemeContext.Provider>
  );
};
