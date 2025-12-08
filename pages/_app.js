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
  console.log("globalData", globalData);
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
      <div
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 ease-in-out w-full h-full`}
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

        <svg width="0" height="0" style={{position: 'absolute'}}>
          <defs>
            <mask
              id="notchMask"
              maskUnits="objectBoundingBox"
              maskContentUnits="objectBoundingBox"
              x="0"
              y="0"
              width="1"
              height="1"
              mask-type="alpha"
            >
              <rect x="0" y="0" width="1" height="1" fill="black" />
              <rect
                x="0.8"
                y="0.8"
                width="0.2"
                height="0.2"
                rx="0.2"
                ry="0.2"
                fill="black"
              />
            </mask>
            <clipPath id="notchClip" clipPathUnits="objectBoundingBox">
              <path
                clipRule="evenodd"
                d="M0 0 H1 V1 H0 Z M1 1 V0.8 H0.85 A0.05 0.05 0 0 0 0.8 0.85 V1 Z"
              />
            </clipPath>
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
      </div>
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
