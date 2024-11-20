"use client";  // Add this line

// app/providers.js
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import { MousePosProvider } from "./mousePosContext";
import { ScrollPositionProvider } from "./scrollPosContext";
import { RouteProvider } from "./routeContext";
import { PagesRouteProvider } from "./routeContextPages";
import { ToastProvider } from "./toastContext";
import { ThemeProvider } from "./themeContext";
import { themes } from "../utils/theme";
import Navigation from "./navigation/primary-navigation";
import Preloader from "./utils/preloader";

const Providers = ({ children, router }) => {
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

      <PagesRouteProvider>
        <ScrollPositionProvider>
          <MousePosProvider>
            <ThemeProvider>

 

              {isLoading ? (
                <Preloader />
              ) : (
                <>
                  <Navigation />
                  <AnimatePresence mode="wait">
                    {children}
                  </AnimatePresence>
                </>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-filter">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                  </filter>
                </defs>
              </svg>

            </ThemeProvider>
          </MousePosProvider>
        </ScrollPositionProvider>
      </PagesRouteProvider>
  );
};

export default Providers;
