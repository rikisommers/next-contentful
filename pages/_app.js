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

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);

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
