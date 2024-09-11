import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { MousePosProvider } from "../components/mousePosContext";
import { ScrollPositionProvider } from "../components/scrollPosContext";
import { RouteProvider } from "../components/routeContext";
import { ToastProvider } from "../components/toastContext";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider, useThemeContext } from '../components/themeContext';
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "./preloader";
import "../styles/index.scss";

function MainContent({ Component, pageProps, router }) {
  const { isThemeDialogOpen } = useThemeContext();

  


  const handleStart = () => setIsLoading(true);
  const handleComplete = () => {
    // Delay setting isLoading to false by 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="push-content"
      animate={{ 
        width: isThemeDialogOpen ? 'calc(100% - 400px)' : '100%' 
      }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </motion.div>
  );
}

function MyApp({ Component, pageProps, router }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLoading]);
  
  return (
    <RouteProvider>
      <ScrollPositionProvider>
        <NextThemesProvider attribute="data-theme">
          <ThemeProvider>
            <MousePosProvider>
              <ToastProvider>
              {isLoading ? 
         <Preloader /> 
        : 

                <MainContent Component={Component} pageProps={pageProps} router={router} />
              }
                </ToastProvider>
            </MousePosProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </ScrollPositionProvider>
    </RouteProvider>
  );
}

export default MyApp;
