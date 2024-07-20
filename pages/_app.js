import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import { ToastProvider } from "../components/toastContext";

import Navigation from "../components/navigation/primary-navigation";
import Preloader from "./preloader";
import { getAllImages } from "../lib/api";
import { ThemeProvider } from "next-themes";
import { themes } from "../utils/theme";
import ThemeEditor from "../components/navigation/themeEditor";

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
      <ScrollPositionProvider>
      <ThemeProvider attribute="data-theme">
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
        </ThemeProvider>
      </ScrollPositionProvider>
    </RouteProvider>
  );
}

export default MyApp;
