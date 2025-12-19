import React, { useState, useEffect } from "react";
import { AnimatePresence } from "../utils/motion";
import { MousePosProvider } from "../components/context/mousePosContext";
import { ScrollPositionProvider } from "../components/context/scrollPosContext";
import { RouteProvider } from "../components/context/routeContext";
import { ThemeProvider } from "../components/context/themeContext";
import { ToastProvider } from "../components/context/toastContext";
import { MenuProvider } from "../components/context/menuContext";
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

        <svg height="0" width="0" viewBox="0 0 93.88 76.19">
  <clipPath id="crtPath" clipPathUnits="objectBoundingBox" transform="scale(0.01065 0.01312)">
    <path d="M47.78.5c11.65,0,38,.92,41.81,4,3.59,3,3.79,22.28,3.79,34.19,0,11.67-.08,27.79-3.53,31.24S60.3,75.69,47.78,75.69c-11.2,0-39.89-1.16-44-5.27S.57,52.42.57,38.73.31,8.56,4,4.88,34.77.5,47.78.5Z" />
  </clipPath>
</svg>

        {/* <svg width="0" height="0">
  <defs>
    <filter id="crt-effect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" result="blurred" />

      <feComponentTransfer in="blurred" result="offsetRed">
        
        <feFuncG type="discrete" tableValues="3" />
        <feFuncB type="discrete" tableValues="0" />
      </feComponentTransfer>
      <feOffset in="offsetRed" dx="0.5" dy="5" result="offsetRed" />

      <feComponentTransfer in="blurred" result="offsetBlue">
        <feFuncR type="discrete" tableValues="0" />
        <feFuncG type="discrete" tableValues="0" />
        
      </feComponentTransfer>
      <feOffset in="offsetBlue" dx="-5" dy="0" result="offsetBlue" />

      <feMerge>
        <feMergeNode in="offsetRed" />
        <feMergeNode in="offsetBlue" />
        <feMergeNode in="blurred" /> 
      </feMerge>
    </filter>
  </defs>
</svg> */}
        <RouteProvider>
          <ScrollPositionProvider>
            <MousePosProvider>
              <ToastProvider>
                <ThemeProvider
                  theme={globalData?.currentTheme}
                  customThemes={customThemes}
                >
                  <MenuProvider menuData={globalData?.menuCollection?.items}>
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
                  </MenuProvider>
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
