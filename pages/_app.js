import React, { useState, useEffect } from "react";
import { AnimatePresence } from "../utils/motion";
import { MousePosProvider } from "../components/context/mousePosContext";
import { ScrollPositionProvider } from "../components/context/scrollPosContext";
import { RouteProvider } from "../components/context/routeContext";
import { ThemeProvider } from "../components/context/themeContext";
import { ToastProvider } from "../components/context/toastContext";
import Navigation from "../components/navigation/primary-navigation";
import Preloader from "../components/utils/preloader";
import "../styles/index.scss";
import "../styles/prisim-vs-code-dark.scss";
import { getLoading, getThemes } from "../lib/api";
import App from 'next/app'; // Import App from next/app
import { motion } from "../utils/motion";

function MyApp({ Component, pageProps, router, globalData, customThemes }) {
  const [isLoading, setIsLoading] = useState(true);
  
  //console.log('GDATA',  globalData)

  useEffect(() => {


    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    },1000 );

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>
      {globalData?.loadingText &&
      <Preloader show={isLoading} data={globalData.loadingText} logo={globalData.logo} />
      }
      <motion.div className="w-full h-full"
        initial={{ y: 100 }}
        animate={isLoading ? { y: 100 } : { y: 0 }}
        transition={{ duration: 0.5
         }} 
        //  onAnimationComplete={() => {
        //   position:'unset'
        //  }}
      >
          <RouteProvider>
            <ScrollPositionProvider>
              <MousePosProvider>
                <ToastProvider>
                  <ThemeProvider theme={globalData?.currentTheme} customThemes={customThemes}>
                    {globalData.menuCollection &&
                    <Navigation data={globalData.menuCollection.items} logo={globalData.logo}/>
                    }
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
  return { ...appProps, globalData, customThemes};
};

export default MyApp;

