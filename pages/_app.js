import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import { ToastProvider } from "../components/toastContext";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as CustomThemeProvider } from '../components/themeContext';
import { LevaProvider } from "../components/leva-context";
import ThemeEditor from "../components/navigation/themeEditor";
import Navigation from "../components/navigation/primary-navigation";
import { Leva, LevaPanel, useControls } from "leva";
import Preloader from "./preloader";
import { getAllImages } from "../lib/api";

import "../styles/index.scss";
import ScrollContainer from "../components/utils/scroll-container";

const THEME_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function MyApp({ Component, pageProps, router }) {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme.key);

      Object.entries(theme).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
          root.style.setProperty(cssVar, value);
        }
      });
    };

    const fetchAndApplyTheme = async () => {
      try {
        const response = await fetch('/api/get-current-theme');
        if (response.ok) {
          const data = await response.json();
          if (data.currentTheme) {
            applyTheme(data.currentTheme);
            localStorage.setItem('currentTheme', JSON.stringify(data.currentTheme));
            localStorage.setItem('themeLastFetched', Date.now().toString());
          }
        }
      } catch (error) {
        console.error('Error fetching current theme:', error);
      } finally {
        setThemeLoaded(true);
      }
    };

    const storedTheme = localStorage.getItem('currentTheme');
    const themeLastFetched = localStorage.getItem('themeLastFetched');
    const now = Date.now();

    if (storedTheme) {
      applyTheme(JSON.parse(storedTheme));
      setThemeLoaded(true);

      // Check if we need to fetch a fresh theme
      if (!themeLastFetched || now - parseInt(themeLastFetched) > THEME_CACHE_DURATION) {
        fetchAndApplyTheme();
      }
    } else {
      // If no stored theme, fetch from Contentful
      fetchAndApplyTheme();
    }
  }, []);

  if (!themeLoaded) {
    return <div>Loading...</div>; // Or any loading component you prefer
  }

  return (
    <RouteProvider>
      {/* <LevaProvider> */}


      <ScrollPositionProvider>
        <NextThemesProvider attribute="data-theme">
          <CustomThemeProvider>
            <MousePosProvider>
              <ToastProvider>
                {/* {isLoading ? 
         <Preloader /> 
        :  } */}
                <>


                  <Navigation />


                  <AnimatePresence mode="wait" initial={false}>



                    <Component {...pageProps} key={router.asPath} />
                  </AnimatePresence>
                  {/* 
                   <ThemeEditor />
          */}
                </>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="svg-filter"
                >
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="6"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="goo"
                      />
                      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                  </defs>
                </svg>
              </ToastProvider>
            </MousePosProvider>
          </CustomThemeProvider>
        </NextThemesProvider>
      </ScrollPositionProvider>
      {/* </LevaProvider> */}
    </RouteProvider>
  );
}

export default MyApp;
