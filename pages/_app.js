import React, { useState, useEffect } from "react";
import { AnimatePresence } from "../utils/motion";
import { MousePosProvider } from "../components/context/mousePosContext";
import { ScrollPositionProvider } from "../components/context/scrollPosContext";
import { RouteProvider } from "../components/context/routeContext";
import { ThemeProvider } from "../components/context/themeContext";
import { ToastProvider } from "../components/context/toastContext";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import ThemeEditor from "../utils/themeEditor";
import "../styles/index.scss";
//import "../styles/prisim-vs-code-dark.scss";
//import "../styles/tailwind-theme.css";
import { getLoading, getThemes } from "../lib/api";
import App from "next/app"; // Import App from next/app
import { motion } from "../utils/motion";

function MyApp({ Component, pageProps, router, globalData, customThemes }) {
  const [isLoading, setIsLoading] = useState(true);
  console.log('globalData',globalData)
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>
      {globalData?.loadingText && (
        <Preloader
          show={isLoading}
          data={globalData.loadingText}
          logo={globalData.logo}
        />
      )}
      <motion.div
        className="w-full h-full"
        initial={{ y: 100 }}
        animate={isLoading ? { y: 100 } : { y: 0 }}
        transition={{ duration: 0.5 }}
        //  onAnimationComplete={() => {
        //   position:'unset'
        //  }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-filter">
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

        <RouteProvider>
          <ScrollPositionProvider>
            <MousePosProvider>
              <ToastProvider>
                <ThemeProvider
                  theme={globalData?.currentTheme}
                  customThemes={customThemes}
                >
                  {globalData?.menuCollection?.items &&
                    globalData?.menuCollection?.items.length > 0 && (
                      <Navigation
                        title={globalData.sitetitle}
                        data={globalData.menuCollection.items}
                        logo={globalData.logo}
                        customThemes={customThemes}
                      />
                    )}
                  <AnimatePresence mode="wait" initial={false}>
                    <Component {...pageProps} key={router.asPath} />
                  </AnimatePresence>
                </ThemeProvider>
              </ToastProvider>
            </MousePosProvider>
          </ScrollPositionProvider>
        </RouteProvider>
      </motion.div>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const globalData = await getLoading();
  const customThemes = await getThemes();
  return { ...appProps, globalData, customThemes };
};

export default MyApp;
